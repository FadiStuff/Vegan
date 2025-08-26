#!/usr/bin/env python3
# Build_GlobalFame_FromTopviews_master.py
#
# Pipeline using Toolforge Topviews (100k/year) instead of monthly 1k scraping.
#
# Outputs:
#   - out/seed_global_totals_humans_YEAR.csv
#   - out/people-ranked-global-totals_YEAR.jsonl

import argparse
import os
import math
import time
import requests
import csv
import json
from tqdm import tqdm
from datetime import datetime

WIKIDATA_API = "https://www.wikidata.org/w/api.php"
TOPVIEWS_API = "https://pageviews.wmcloud.org/topviews/topviews_api.php"

# ---- helpers ----
def log(msg):
    print(f"[{datetime.now().strftime('%H:%M:%S')}] {msg}", flush=True)

def fetch_topviews(lang, year, ua, limit):
    """
    Fetch Topviews for each month of a year and aggregate totals.
    Tries multiple Toolforge URL patterns and parses both dict(list) and list shapes.
    """
    totals = {}
    headers = {"User-Agent": ua}

    def try_fetch(date_yyyymm):
        # Try multiple known patterns; return list of dicts with 'article','views' or [].
        candidates = [
            # 1) wmcloud Topviews API (some deployments)
            f"https://pageviews.wmcloud.org/topviews/topviews_api.php?project={lang}.wikipedia.org&platform=all-access&date={date_yyyymm}",
            # 2) toolforge legacy path
            f"https://pageviews.toolforge.org/topviews/api.php?project={lang}.wikipedia.org&platform=all-access&date={date_yyyymm}",
            # 3) UI export (Download → JSON)
            f"https://pageviews.toolforge.org/topviews/?project={lang}.wikipedia.org&platform=all-access&date={date_yyyymm}&format=json",
        ]
        for url in candidates:
            r = requests.get(url, headers=headers)
            if r.status_code != 200:
                continue
            try:
                data = r.json()
            except Exception:
                continue
            # Normalize to list of dicts with keys article/views
            if isinstance(data, dict) and "items" in data and isinstance(data["items"], list):
                return [{"article": it.get("article"), "views": it.get("views", 0)} for it in data["items"]]
            if isinstance(data, list):
                # Sometimes returns list of dicts; sometimes list of [article, views] — handle both.
                out = []
                for it in data:
                    if isinstance(it, dict) and "article" in it:
                        out.append({"article": it.get("article"), "views": it.get("views", 0)})
                    elif isinstance(it, list) and len(it) >= 2:
                        out.append({"article": it[0], "views": int(it[1]) if str(it[1]).isdigit() else 0})
                if out:
                    return out
        return []

    for month in range(1, 13):
        date_yyyymm = f"{year}{month:02d}"
        items = try_fetch(date_yyyymm)
        if not items:
            log(f"Warning: failed to fetch {date_yyyymm} (all URL patterns)")
            continue
        # Keep only top N for the month before aggregating (defensive if endpoint returns >100k)
        for it in items[:limit]:
            art = it.get("article")
            if not art:
                continue
            v = int(it.get("views", 0) or 0)
            totals[art] = totals.get(art, 0) + v
        time.sleep(0.1)  # be polite

    if not totals:
        log("Warning: got zero articles for the entire year")
        return []

    # Return yearly top N (article, views)
    return sorted(totals.items(), key=lambda x: -x[1])[:limit]



def resolve_qids(lang, titles, ua, sleep):
    qids = {}
    for i in tqdm(range(0, len(titles), 50), desc=f"Resolving QIDs [{lang}]"):
        batch = titles[i:i+50]
        params = {
            "action": "wbgetentities",
            "sites": f"{lang}wiki",
            "titles": "|".join(batch),
            "props": "info",
            "format": "json"
        }
        r = requests.get(WIKIDATA_API, params=params, headers={"User-Agent": ua})
        if r.status_code == 200:
            entities = r.json().get("entities", {})
            for ent in entities.values():
                if "id" in ent and "title" in ent:
                    qids[(lang, ent["title"])] = ent["id"]
        time.sleep(sleep)
    return qids

def filter_humans(qids, ua, sleep):
    humans = {}
    qid_list = list(set(qids.values()))
    for i in tqdm(range(0, len(qid_list), 50), desc="Filtering humans (Q5)"):
        batch = qid_list[i:i+50]
        params = {
            "action": "wbgetentities",
            "ids": "|".join(batch),
            "props": "claims",
            "format": "json"
        }
        r = requests.get(WIKIDATA_API, params=params, headers={"User-Agent": ua})
        if r.status_code == 200:
            entities = r.json().get("entities", {})
            for qid, ent in entities.items():
                claims = ent.get("claims", {})
                if "P31" in claims:
                    for c in claims["P31"]:
                        if c["mainsnak"]["datavalue"]["value"]["id"] == "Q5":
                            humans[qid] = True
        time.sleep(sleep)
    return humans

def fetch_labels(qids, ua, sleep):
    labels = {}
    for i in tqdm(range(0, len(qids), 50), desc="Fetching labels"):
        batch = qids[i:i+50]
        params = {
            "action": "wbgetentities",
            "ids": "|".join(batch),
            "props": "labels",
            "languages": "en",
            "format": "json"
        }
        r = requests.get(WIKIDATA_API, params=params, headers={"User-Agent": ua})
        if r.status_code == 200:
            entities = r.json().get("entities", {})
            for qid, ent in entities.items():
                labels[qid] = ent.get("labels", {}).get("en", {}).get("value")
        time.sleep(sleep)
    return labels

# ---- main ----
def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--lang', default='en')
    parser.add_argument('--year', required=True)
    parser.add_argument('--outdir', default='out')
    parser.add_argument('--ua', required=True)
    parser.add_argument('--sleep', type=float, default=0.1)
    parser.add_argument('--limit', type=int, default=100000)
    args = parser.parse_args()

    os.makedirs(args.outdir, exist_ok=True)

    # 1. Fetch Topviews
    log(f"Fetching Topviews {args.year} {args.lang}…")
    topviews = fetch_topviews(args.lang, args.year, args.ua, args.limit)
    log(f"Got {len(topviews)} articles")

    titles = [title for title, _ in topviews]

    # 2. Resolve QIDs
    qmap = resolve_qids(args.lang, titles, args.ua, args.sleep)

    # 3. Filter humans
    humans = filter_humans(qmap, args.ua, args.sleep)

    # 4. Aggregate
    fame_totals = {}
    view_map = dict(topviews)
    for (lang, title), qid in qmap.items():
        if qid not in humans:
            continue
        views = view_map.get(title, 0)
        fame_totals[qid] = fame_totals.get(qid, 0) + views

    # 5. Fetch labels
    labels = fetch_labels(list(fame_totals.keys()), args.ua, args.sleep)

    # 6. Write outputs
    log("Writing outputs…")
    csv_path = os.path.join(args.outdir, f"seed_global_totals_humans_{args.year}.csv")
    with open(csv_path, "w", newline='', encoding="utf-8") as f:
        writer = csv.writer(f, delimiter="\t")
        writer.writerow(["QID", "Name", "Pageviews"])
        for qid, total in sorted(fame_totals.items(), key=lambda x: -x[1]):
            writer.writerow([qid, labels.get(qid, ""), total])

    jsonl_path = os.path.join(args.outdir, f"people-ranked-global-totals_{args.year}.jsonl")
    with open(jsonl_path, "w", encoding="utf-8") as f:
        for qid, total in sorted(fame_totals.items(), key=lambda x: -x[1]):
            obj = {
                "qid": qid,
                "name": labels.get(qid, ""),
                "total_views": total,
                "fame_score": round(math.log10(total+1), 3)
            }
            f.write(json.dumps(obj, ensure_ascii=False) + "\n")

    log("Run completed.")

if __name__ == "__main__":
    main()
