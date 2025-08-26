#!/usr/bin/env python3
import argparse, time, requests
from urllib.parse import quote

WIKIDATA_API = "https://www.wikidata.org/w/api.php"
API_TOTAL = "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/{lang}.wikipedia/all-access/all-agents/{title}/monthly/{start}/{end}"

def http_get(url, *, params=None, headers=None, timeout=30):
    return requests.get(url, params=params, headers=headers, timeout=timeout)

def get_sitelinks(qid, ua):
    params = {"action": "wbgetentities", "ids": qid, "props": "sitelinks", "format": "json"}
    r = http_get(WIKIDATA_API, params=params, headers={"User-Agent": ua})
    r.raise_for_status()
    ent = r.json()["entities"][qid]
    sl = ent.get("sitelinks", {})
    out = {}
    for k,v in sl.items():
        if not k.endswith("wiki"): continue
        lang = k[:-4]  # 'enwiki' -> 'en'
        out[lang] = v.get("title", "").replace(" ", "_")
    return out

def fetch_total(lang, title, start, end, ua):
    url = API_TOTAL.format(lang=lang, title=quote(title, safe=""), start=start, end=end)
    r = http_get(url, headers={"User-Agent": ua})
    if r.status_code != 200:
        return 0
    j = r.json()
    return sum(i.get("views", 0) for i in j.get("items", []))

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--qid", required=True, help="Wikidata QID (e.g., Q55800 for Ricky Gervais)")
    ap.add_argument("--langs", default="en,de,fr,es,ja", help="Comma-separated languages to check")
    ap.add_argument("--start", required=True, help="YYYYMMDD inclusive")
    ap.add_argument("--end", required=True, help="YYYYMMDD inclusive")
    ap.add_argument("--ua", required=True, help="User-Agent string")
    args = ap.parse_args()

    langs = [x.strip() for x in args.langs.split(",") if x.strip()]
    sitelinks = get_sitelinks(args.qid, args.ua)

    print(f"QID: {args.qid}")
    print("Titles found:")
    for lg in langs:
        print(f"  {lg}: {sitelinks.get(lg, '(none)')}")

    totals = {}
    for lg in langs:
        title = sitelinks.get(lg)
        if not title:
            totals[lg] = 0
            continue
        v = fetch_total(lg, title, args.start, args.end, args.ua)
        totals[lg] = v
        print(f"{lg}: {v:,}")

    grand = sum(totals.values())
    print("-" * 28)
    print(f"GLOBAL TOTAL: {grand:,}")

if __name__ == "__main__":
    main()
