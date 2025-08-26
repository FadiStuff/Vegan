#!/usr/bin/env python3
import argparse
import requests
import os
import json
import csv
import time
from datetime import datetime
from tqdm import tqdm

WIKIDATA_SPARQL = "https://query.wikidata.org/sparql"
PAGEVIEWS_API = "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user/{}/daily/{}/{}"

def fetch_candidates(max_candidates, ua, chunk_size=2000, retries=3, backoff=5):
    results = []
    offset = 0
    while len(results) < max_candidates:
        limit = min(chunk_size, max_candidates - len(results))
        query = f"""
        SELECT ?item ?itemLabel ?title ?sitelinks WHERE {{
          ?item wdt:P31 wd:Q5;
                wdt:P569 ?dob.
          FILTER NOT EXISTS {{ ?item wdt:P570 ?dod. }}
          ?sitelink schema:about ?item;
                    schema:isPartOf <https://en.wikipedia.org/>;
                    schema:name ?title.
          ?item wikibase:sitelinks ?sitelinks.
          SERVICE wikibase:label {{ bd:serviceParam wikibase:language "en". }}
        }}
        ORDER BY DESC(?sitelinks)
        LIMIT {limit}
        OFFSET {offset}
        """
        attempt = 0
        while attempt < retries:
            try:
                r = requests.get(
                    WIKIDATA_SPARQL,
                    params={"query": query, "format": "json"},
                    headers={"User-Agent": ua},
                    timeout=120
                )
                r.raise_for_status()
                data = r.json()
                for row in data["results"]["bindings"]:
                    results.append({
                        "qid": row["item"]["value"].split("/")[-1],
                        "title": row["title"]["value"],
                        "sitelinks": int(row["sitelinks"]["value"])
                    })
                print(f"[{datetime.now().strftime('%H:%M:%S')}] ✅ Got {len(results)} / {max_candidates} candidates so far…")
                break
            except Exception as e:
                attempt += 1
                print(f"[{datetime.now().strftime('%H:%M:%S')}] ⚠️ SPARQL attempt {attempt} failed at offset {offset}: {e}")
                if attempt < retries:
                    print(f"   Retrying in {backoff}s…")
                    import time; time.sleep(backoff)
                else:
                    raise
        offset += limit
    return results


def fetch_pageviews(title, start, end, ua):
    url = PAGEVIEWS_API.format(
        requests.utils.quote(title, safe=""), start, end
    )
    r = requests.get(url, headers={"User-Agent": ua}, timeout=60)
    if r.status_code != 200:
        return 0
    data = r.json()
    return sum(item["views"] for item in data.get("items", []))

def write_outputs(outdir, totals, label="final"):
    os.makedirs(outdir, exist_ok=True)
    jsonl_path = os.path.join(outdir, f"enliving_totals_{label}.jsonl")
    csv_path = os.path.join(outdir, f"enliving_totals_{label}.csv")

    with open(jsonl_path, "w", encoding="utf-8") as f:
        for row in totals:
            f.write(json.dumps(row, ensure_ascii=False) + "\n")

    with open(csv_path, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["qid", "title", "views"])
        writer.writeheader()
        for row in totals:
            writer.writerow(row)

    print(f"[{datetime.now().strftime('%H:%M:%S')}] ✅ Wrote {len(totals)} rows to {jsonl_path} and {csv_path}")

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--start", required=True)
    parser.add_argument("--end", required=True)
    parser.add_argument("--outdir", default="out")
    parser.add_argument("--ua", required=True)
    parser.add_argument("--sleep", type=float, default=0.1)
    parser.add_argument("--max_candidates", type=int, default=20000)
    parser.add_argument("--top_k", type=int, default=5000)
    parser.add_argument("--checkpoint_every", type=int, default=500,
                        help="Write checkpoint files every N candidates")
    args = parser.parse_args()

    print(f"[{datetime.now().strftime('%H:%M:%S')}] Phase 1/3: Fetching candidate humans (living, EN sitelinks)…")
    candidates = fetch_candidates(args.max_candidates, args.ua)

    print(f"[{datetime.now().strftime('%H:%M:%S')}] Phase 2/3: Fetching EN pageview totals…")
    totals = []
    for i, cand in enumerate(tqdm(candidates, desc="Fetching views")):
        views = fetch_pageviews(cand["title"], args.start, args.end, args.ua)
        totals.append({"qid": cand["qid"], "title": cand["title"], "views": views})

        # checkpoint every N
        if (i + 1) % args.checkpoint_every == 0:
            write_outputs(args.outdir, totals, label=f"checkpoint_{i+1}")

    print(f"[{datetime.now().strftime('%H:%M:%S')}] Phase 3/3: Selecting top_k…")
    totals_sorted = sorted(totals, key=lambda x: x["views"], reverse=True)[:args.top_k]
    write_outputs(args.outdir, totals_sorted, label="final")

if __name__ == "__main__":
    main()
