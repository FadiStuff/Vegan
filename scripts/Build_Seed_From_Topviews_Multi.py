import argparse, sys, math, time, json, calendar, random
from datetime import date, timedelta
from pathlib import Path
from collections import defaultdict
import requests

UA = "fame-topviews/0.3 (+https://example.com; mailto:fadigabra@yahoo.com)"

sess = requests.Session()
sess.headers.update({"User-Agent": UA})

# -----------------------------
# Helpers
# -----------------------------
def chunk(seq, n):
    for i in range(0, len(seq), n):
        yield seq[i:i+n]

def fetch_topviews(day, lang, n=1000, verbose=False):
    url = f"https://wikimedia.org/api/rest_v1/metrics/pageviews/top/{lang}.wikipedia/all-access/{day.year}/{day.month:02d}/{day.day:02d}"
    try:
        r = sess.get(url, timeout=30)
        if r.status_code != 200:
            return []
        items = r.json()["items"][0]["articles"]
        if verbose:
            print(f"Fetched {len(items)} topviews for {lang} {day}")
        return [(lang, it["article"], it["views"])
                for it in items if it.get("article") and it.get("views")]
    except Exception:
        return []

def resolve_qids(pairs, verbose=False):
    out = {}
    for batch in chunk(pairs, 50):
        params = {
            "action": "query",
            "titles": "|".join([t for _, t in batch]),
            "prop": "pageprops",
            "ppprop": "wikibase_item",
            "format": "json"
        }
        try:
            r = sess.get(f"https://{batch[0][0]}.wikipedia.org/w/api.php", params=params, timeout=30)
            if r.status_code != 200:
                continue
            pages = r.json().get("query", {}).get("pages", {})
            for p in pages.values():
                if "pageprops" in p and "wikibase_item" in p["pageprops"]:
                    qid = p["pageprops"]["wikibase_item"]
                    title = p["title"].replace(" ", "_")
                    out[(batch[0][0], title)] = qid
            if verbose:
                print(f"Resolved {len(batch)} titles to QIDs")
        except Exception:
            continue
        time.sleep(0.1)
    return out

def filter_humans(qids, verbose=False):
    humans = []
    for batch in chunk(list(qids), 50):
        ids = "|".join(batch)
        params = {
            "action": "wbgetentities",
            "ids": ids,
            "props": "claims",
            "format": "json"
        }
        try:
            r = sess.get("https://www.wikidata.org/w/api.php", params=params, timeout=30)
            if r.status_code != 200:
                continue
            ents = r.json().get("entities", {})
            for qid, ent in ents.items():
                claims = ent.get("claims", {}) or {}
                inst = claims.get("P31", [])
                if any(clm.get("mainsnak", {}).get("datavalue", {}).get("value", {}).get("id") == "Q5" for clm in inst):
                    humans.append(qid)
            if verbose:
                print(f"Checked batch of {len(batch)} QIDs → {len(humans)} humans so far")
        except Exception:
            continue
        time.sleep(0.1)
    return humans

def get_en_label_and_enwiki(qids, verbose=False):
    out = {}
    for batch in chunk(list(qids), 50):
        params = {
            "action": "wbgetentities",
            "ids": "|".join(batch),
            "props": "labels|sitelinks",
            "languages": "en",
            "format": "json",
        }
        try:
            r = sess.get("https://www.wikidata.org/w/api.php", params=params, timeout=30)
        except requests.RequestException:
            continue
        if r.status_code != 200:
            continue
        ents = r.json().get("entities", {})
        for qid, ent in ents.items():
            labels = ent.get("labels", {}) or {}
            en_label = (labels.get("en") or {}).get("value")
            sl = ent.get("sitelinks", {}) or {}
            has_enwiki = "enwiki" in sl
            out[qid] = (en_label, has_enwiki)
        if verbose:
            print(f"Fetched labels for batch of {len(batch)} QIDs")
        time.sleep(0.1)
    return out

# -----------------------------
# Main
# -----------------------------
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--test", action="store_true")
    ap.add_argument("--verbose", action="store_true")
    args = ap.parse_args()

    today = date.today()
    days = []
    if args.test:
        for i in range(3):
            days.append(today - timedelta(days=i+1))
    else:
        # sample 3 random days per month for 12 months
        for m in range(12):
            month_date = today - timedelta(days=30*m)
            year, month = month_date.year, month_date.month
            month_days = calendar.monthrange(year, month)[1]
            chosen = random.sample(range(1, month_days+1), 3)
            for d in chosen:
                days.append(date(year, month, d))

    counts_by_lang_title = defaultdict(int)
    days_seen = defaultdict(set)

    for d in days:
        for lang in ["en", "de", "fr", "es", "ja"]:
            rows = fetch_topviews(d, lang, verbose=args.verbose)
            if args.verbose:
                print(f"Processing {len(rows)} rows for {lang} {d}")
            for lang, title, views in rows[:1000]:
                counts_by_lang_title[(lang, title)] += views
                days_seen[(lang, title)].add(d)

    qid_map = resolve_qids(list(counts_by_lang_title.keys()), verbose=args.verbose)

    pv_by_qid = defaultdict(int)
    name_by_qid = {}
    langs_seen = defaultdict(set)
    days_seen_qid = defaultdict(set)

    for (lang, title), views in counts_by_lang_title.items():
        qid = qid_map.get((lang, title.replace(" ", "_"))) or qid_map.get((lang, title))
        if not qid: continue
        pv_by_qid[qid] += views
        langs_seen[qid].add(lang)
        if lang == "en":
            name_by_qid.setdefault(qid, title.replace("_", " "))
        else:
            name_by_qid.setdefault(qid, title.replace("_", " "))
        for d in days_seen[(lang, title)]:
            days_seen_qid[qid].add(d)

    humans = filter_humans(pv_by_qid.keys(), verbose=args.verbose)
    meta = get_en_label_and_enwiki(humans, verbose=args.verbose)

    MIN_MONTHS = 1 if args.test else 3
    MIN_DAYS = 1 if args.test else 4

    survivors = []
    for qid in humans:
        months = { (d.year, d.month) for d in days_seen_qid[qid] }
        if len(months) < MIN_MONTHS: continue
        if len(days_seen_qid[qid]) < MIN_DAYS: continue
        survivors.append(qid)

    if args.verbose:
        print(f"Survivors count: {len(survivors)}")

    items = []
    for qid in survivors:
        pv = pv_by_qid[qid]
        score = math.log10(1+pv)
        items.append((score, qid, pv))

    items.sort(reverse=True)

    Path("out").mkdir(exist_ok=True)
    seed_csv = "seed_topviews_humans_multi.csv"
    ranked_jsonl = "out/people-ranked-topviews-multi.jsonl"

    with open(seed_csv, "w", encoding="utf-8") as f:
        f.write("qid,name,pageviews_sum_global,langs_seen\n")
        for score, qid, pv in items:
            en_label, has_enwiki = meta.get(qid, (None, False))
            name = en_label or name_by_qid.get(qid, "")
            langs_str = ",".join(sorted(langs_seen.get(qid, [])))
            f.write(f"{qid},{name},{pv},{langs_str}\n")

    with open(ranked_jsonl, "w", encoding="utf-8") as f:
        for score, qid, pv in items:
            obj = {
                "id": qid,
                "name": (meta.get(qid, (None, False))[0]) or name_by_qid.get(qid, ""),
                "pageviews_sum_global": pv,
                "langs_seen": sorted(langs_seen.get(qid, [])),
                "fame_score": score,
                "computed_at": date.today().isoformat(),
            }
            f.write(json.dumps(obj, ensure_ascii=False) + "\n")

    print(f"Done → {seed_csv} and {ranked_jsonl} ({len(items)} rows)")

if __name__ == "__main__":
    main()
