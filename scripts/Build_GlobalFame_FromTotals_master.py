#!/usr/bin/env python3
# Build_GlobalFame_FromTotals_master.py
#
# Production-ready pipeline to compute global fame scores for LIVING humans
# from Wikimedia topviews + per-article totals across multiple languages.
#
# Outputs (created in --outdir):
#   1) people-ranked-global-totals.jsonl  (qid,label,total_views)
#   2) seed_global_totals_humans.csv      (comma CSV: QID,Name,GlobalPageviews)
#
# Usage example:
#   python3 scripts/Build_GlobalFame_FromTotals_master.py \
#     --langs en,de,fr,es,ja \
#     --start 20240818 --end 20250817 \
#     --outdir out \
#     --ua "GlobalFameBot/1.0 (my-email@example.com)" \
#     --sleep 0.05 \
#     --max_items_per_month 1000

import argparse
import os
import time
import math
import csv
import json
from datetime import datetime, timedelta
from urllib.parse import quote
import requests
from tqdm import tqdm

API_TOP = "https://wikimedia.org/api/rest_v1/metrics/pageviews/top/{lang}.wikipedia/all-access/{year}/{month}/all-days"
API_TOTAL = "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/{lang}.wikipedia/all-access/all-agents/{title}/monthly/{start}/{end}"
WIKIDATA_API = "https://www.wikidata.org/w/api.php"
WIKI_SITE_API = "https://{lang}.wikipedia.org/w/api.php"

# ----------------------
# HTTP helper with retries
# ----------------------

def http_get(url, *, params=None, headers=None, retries=4, backoff=1.6, sleep_between=0.0):
    attempt = 0
    while True:
        try:
            r = requests.get(url, params=params, headers=headers, timeout=30)
            if r.status_code == 200:
                return r
            if r.status_code in (429,) or 500 <= r.status_code < 600:
                attempt += 1
                if attempt > retries:
                    return r
                time.sleep((backoff ** attempt) + sleep_between)
                continue
            return r
        except requests.RequestException:
            attempt += 1
            if attempt > retries:
                raise
            time.sleep((backoff ** attempt) + sleep_between)

# ----------------------
# Logging
# ----------------------

def log(msg):
    print(f"[{datetime.now().strftime('%H:%M:%S')}] {msg}", flush=True)

# ----------------------
# Step 1: fetch monthly top titles per lang
# ----------------------

def month_range(start_date, end_date):
    d = start_date.replace(day=1)
    last = end_date.replace(day=1)
    while d <= last:
        yield d.year, d.month
        # jump to first of next month
        d = (d + timedelta(days=32)).replace(day=1)

def fetch_monthly_top(lang, year, month, ua, max_items, sleep_between):
    url = API_TOP.format(lang=lang, year=year, month=str(month).zfill(2))
    r = http_get(url, headers={"User-Agent": ua}, sleep_between=sleep_between)
    if r.status_code != 200:
        return []
    try:
        data = r.json()
        items = data["items"][0]["articles"]
        titles = [i["article"] for i in items[:max_items]]
        return titles
    except Exception:
        return []

# ----------------------
# Step 2: map Wikipedia titles -> Wikidata QIDs (per language)
# We use the Wikipedia site API to read pageprops.wikibase_item, which gives QID per page.
# ----------------------

def resolve_qids_for_lang(lang, titles, ua, sleep_between):
    # Wikipedia API caps titles per request; 50 is safe.
    qmap = {}
    titles = list(titles)
    for i in tqdm(range(0, len(titles), 50), desc=f"Resolve QIDs [{lang}]"):
        batch = titles[i:i+50]
        params = {
            "action": "query",
            "prop": "pageprops",
            "ppprop": "wikibase_item",
            "titles": "|".join(batch),
            "format": "json",
            "redirects": 1,
            "converttitles": 1,
        }
        url = WIKI_SITE_API.format(lang=lang)
        r = http_get(url, params=params, headers={"User-Agent": ua}, sleep_between=sleep_between)
        if r.status_code != 200:
            continue
        j = r.json()
        pages = j.get("query", {}).get("pages", {})
        for pageid, page in pages.items():
            if "missing" in page:
                continue
            title = page.get("title")
            # API sends spaces not underscores. Convert to API title form used by REST.
            api_title = title.replace(" ", "_")
            qid = page.get("pageprops", {}).get("wikibase_item")
            if qid:
                qmap[(lang, api_title)] = qid
        time.sleep(sleep_between)
    return qmap

# ----------------------
# Step 3: filter to LIVING humans (P31=Q5 and NOT P570 set)
# ----------------------

def filter_living_humans(qids, ua, sleep_between):
    living = set()
    all_qs = list(set(qids.values()))
    for i in tqdm(range(0, len(all_qs), 50), desc="Filter living humans (Q5, no P570)"):
        batch = all_qs[i:i+50]
        params = {
            "action": "wbgetentities",
            "ids": "|".join(batch),
            "props": "claims",
            "format": "json",
        }
        r = http_get(WIKIDATA_API, params=params, headers={"User-Agent": ua}, sleep_between=sleep_between)
        if r.status_code != 200:
            continue
        entities = r.json().get("entities", {})
        for qid, ent in entities.items():
            claims = ent.get("claims", {})
            p31 = claims.get("P31", [])
            is_human = False
            for c in p31:
                mainsnak = c.get("mainsnak", {})
                dv = mainsnak.get("datavalue", {})
                v = dv.get("value", {})
                if isinstance(v, dict) and v.get("id") == "Q5":
                    is_human = True
                    break
            if not is_human:
                continue
            # Exclude if date of death (P570) present with any value
            if "P570" in claims and len(claims["P570"]) > 0:
                continue
            living.add(qid)
        time.sleep(sleep_between)
    return living

# ----------------------
# Step 4: fetch per-article totals for date range and aggregate by QID
# ----------------------

def fetch_total_views(lang, title, start, end, ua, sleep_between):
    safe_title = quote(title, safe="")
    url = API_TOTAL.format(lang=lang, title=safe_title, start=start, end=end)
    r = http_get(url, headers={"User-Agent": ua}, sleep_between=sleep_between)
    if r.status_code != 200:
        return 0
    try:
        data = r.json()
        return sum(i.get("views", 0) for i in data.get("items", []))
    except Exception:
        return 0

# ----------------------
# Step 5: fetch English labels for QIDs
# ----------------------

def fetch_labels(qids, ua, sleep_between):
    labels = {}
    qids = list(qids)
    for i in tqdm(range(0, len(qids), 50), desc="Fetch labels [en]"):
        batch = qids[i:i+50]
        params = {
            "action": "wbgetentities",
            "ids": "|".join(batch),
            "props": "labels",
            "languages": "en",
            "format": "json",
        }
        r = http_get(WIKIDATA_API, params=params, headers={"User-Agent": ua}, sleep_between=sleep_between)
        if r.status_code != 200:
            continue
        entities = r.json().get("entities", {})
        for qid, ent in entities.items():
            labels[qid] = ent.get("labels", {}).get("en", {}).get("value")
        time.sleep(sleep_between)
    return labels

# ----------------------
# Main
# ----------------------

def main():
    ap = argparse.ArgumentParser(description="Compute global fame totals (living humans) from Wikimedia pageviews")
    ap.add_argument("--langs", default="en", help="Comma-separated language codes (e.g. en,de,fr,es,ja)")
    ap.add_argument("--start", required=True, help="Start date YYYYMMDD (inclusive)")
    ap.add_argument("--end", required=True, help="End date YYYYMMDD (inclusive)")
    ap.add_argument("--outdir", default="out", help="Output directory")
    ap.add_argument("--ua", required=True, help="User-Agent string for API politeness")
    ap.add_argument("--sleep", type=float, default=0.05, help="Sleep seconds between requests (politeness)")
    ap.add_argument("--max_items_per_month", type=int, default=1000, help="Top N per month per language")
    args = ap.parse_args()

    langs = [x.strip() for x in args.langs.split(",") if x.strip()]
    os.makedirs(args.outdir, exist_ok=True)

    start_dt = datetime.strptime(args.start, "%Y%m%d")
    end_dt = datetime.strptime(args.end, "%Y%m%d")
    if end_dt < start_dt:
        raise SystemExit("--end must be >= --start")

    # 1) Collect monthly titles
    log("Collecting monthly topviews titles…")
    per_lang_titles = {lang: set() for lang in langs}
    months = list(month_range(start_dt, end_dt))
    for year, month in tqdm(months, desc="Topviews months"):
        for lang in langs:
            titles = fetch_monthly_top(lang, year, month, args.ua, args.max_items_per_month, args.sleep)
            per_lang_titles[lang].update(titles)
            time.sleep(args.sleep)

    # 2) Resolve titles -> QIDs per language
    log("Resolving titles to QIDs…")
    title_qid = {}  # key: (lang, title), val: QID
    for lang in langs:
        qmap = resolve_qids_for_lang(lang, per_lang_titles[lang], args.ua, args.sleep)
        title_qid.update(qmap)

    if not title_qid:
        raise SystemExit("No titles resolved to QIDs. Aborting.")

    # 3) Filter to living humans
    log("Filtering to living humans (Q5, no P570)…")
    living_qids = filter_living_humans(title_qid, args.ua, args.sleep)

    # 4) Fetch totals and aggregate per QID
    log("Fetching per-article totals and aggregating…")
    fame_totals = {}
    eligible_pairs = [(lang, title, qid) for (lang, title), qid in title_qid.items() if qid in living_qids]

    total_pairs = len(eligible_pairs)
    pbar = tqdm(total=total_pairs, desc="Summing totals", unit="article")
    for lang, title, qid in eligible_pairs:
        views = fetch_total_views(lang, title, args.start, args.end, args.ua, args.sleep)
        if views:
            fame_totals[qid] = fame_totals.get(qid, 0) + views
        pbar.update(1)
    pbar.close()

    # Drop zero-view entries (can happen with REST gaps or mapping edge cases)
    fame_totals = {qid: v for qid, v in fame_totals.items() if v > 0}

    if not fame_totals:
        raise SystemExit("No totals computed after filtering. Aborting.")

    # 5) Fetch English labels
    log("Fetching English labels…")
    labels = fetch_labels(list(fame_totals.keys()), args.ua, args.sleep)

    # 6) Write outputs
    log("Writing outputs…")
    # JSONL (spec schema)
    jsonl_path = os.path.join(args.outdir, "people-ranked-global-totals.jsonl")
    with open(jsonl_path, "w", encoding="utf-8") as jf:
        for qid, total in sorted(fame_totals.items(), key=lambda kv: -kv[1]):
            row = {"qid": qid, "label": labels.get(qid) or "", "total_views": int(total)}
            jf.write(json.dumps(row, ensure_ascii=False) + "\n")

    # CSV (comma, header)
    csv_path = os.path.join(args.outdir, "seed_global_totals_humans.csv")
    with open(csv_path, "w", newline="", encoding="utf-8") as cf:
        w = csv.writer(cf)
        w.writerow(["QID", "Name", "GlobalPageviews"])
        for qid, total in sorted(fame_totals.items(), key=lambda kv: -kv[1]):
            w.writerow([qid, labels.get(qid) or "", int(total)])

    # Summary
    log(f"Finished. Living humans: {len(fame_totals):,} | Title pairs processed: {total_pairs:,}")
    log(f"JSONL: {jsonl_path}")
    log(f"CSV:    {csv_path}")

if __name__ == "__main__":
    main()
