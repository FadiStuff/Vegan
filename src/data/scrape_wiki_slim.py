import argparse, json, re, time, datetime
import requests
from bs4 import BeautifulSoup, Tag

WIKI_PAGES = [
    "https://en.wikipedia.org/wiki/List_of_vegans",
    "https://en.wikipedia.org/wiki/List_of_vegetarians",
]

HEADERS = {
    "User-Agent": "PlantsOverPain-Dataset-Scraper/1.3 (+contact: dataset-maintainer@example.com)"
}

def today_iso() -> str:
    return datetime.date.today().isoformat()

def request_html(url: str, tries: int = 3, sleep_s: float = 1.5) -> str:
    for i in range(tries):
        r = requests.get(url, headers=HEADERS, timeout=20)
        if r.status_code == 200:
            return r.text
        time.sleep(sleep_s * (i + 1))
    r.raise_for_status()
    return ""

def clean_ref_title(raw: str) -> str:
    if not raw:
        return ""
    t = raw.strip()
    if t.startswith("^"):
        t = t[1:].strip()
    t = re.split(r"\b(Retrieved|Archived from)\b", t)[0].strip(" .;,:")
    m = re.search(r"\"([^\"]+)\"", t)
    if m:
        title = m.group(1)
    else:
        title = t
    return re.sub(r"\s+", " ", title)[:160]

def prefer_live_url(li: Tag):
    live = None
    archive = None
    for a in li.select("a[href]"):
        href = a.get("href", "")
        if href.startswith("http"):
            if "web.archive.org" in href:
                archive = archive or href
            else:
                live = live or href
    return live or archive

def wiki_table_rows(soup: BeautifulSoup):
    rows = []
    for table in soup.select("table.wikitable"):
        rows.extend(table.select("tbody > tr"))
    return rows

def row_cells(row: Tag):
    return row.find_all(["td", "th"], recursive=False)

def cell_ref_ids(cell: Tag):
    ids = []
    for a in cell.select("a[href^='#cite_note']"):
        href = a.get("href", "")
        if href.startswith("#"):
            ids.append(href[1:])
    return list(dict.fromkeys(ids))

def resolve_reference(soup: BeautifulSoup, ref_id: str):
    li = soup.find("li", {"id": ref_id})
    if not li:
        return ("", None)
    raw_title = li.get_text(" ", strip=True)
    title = clean_ref_title(raw_title)
    url = prefer_live_url(li)
    return (title, url)

def list_type_from_url(url: str) -> str:
    return "Vegan" if "List_of_vegans" in url else "Vegetarian"

def build_entry(name, diet_type, source_title, source_url):
    entry = {
        "name": name,
        "diet_type": diet_type,
        "sources": []
    }
    if source_title:
        entry["sources"].append({
            "title": clean_ref_title(source_title),
            "url": source_url or "",
            "date": today_iso()
        })
    return entry

def scrape_wiki_lists(limit=None):
    results = []
    for url in WIKI_PAGES:
        html = request_html(url)
        soup = BeautifulSoup(html, "lxml")
        diet_type = list_type_from_url(url)

        count = 0
        for row in wiki_table_rows(soup):
            cells = row_cells(row)
            if len(cells) < 4:
                continue
            name_cell, occ_cell, birthplace_cell, source_cell = cells[:4]
            name = name_cell.get_text(" ", strip=True)
            if not name or name.lower() in ("name", "occupation", "birthplace", "source"):
                continue
            ref_ids = cell_ref_ids(source_cell)
            if ref_ids:
                title, link = resolve_reference(soup, ref_ids[0])
            else:
                title, link = ("", None)
            entry = build_entry(name, diet_type, title, link)
            results.append(entry)
            count += 1
            if limit and count >= limit:
                break
    return results

if __name__ == "__main__":
    ap = argparse.ArgumentParser(description="Slim scraper: Wikipedia vegans/vegetarians → name + sources.")
    ap.add_argument("--out", default="wiki_slim.json", help="Path to write entries")
    ap.add_argument("--limit", type=int, default=None, help="Limit number of entries per list (for testing)")
    args = ap.parse_args()

    entries = scrape_wiki_lists(limit=args.limit)
    out = {
        "people": entries,
        "scraped_at": today_iso(),
        "source": "Wikipedia list of vegans/vegetarians"
    }
    with open(args.out, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

    print(f"✅ Scraped {len(entries)} entries to {args.out}")
