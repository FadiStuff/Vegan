#!/usr/bin/env python3
"""
Scrape "1000 Years, 1000 People" (listchallenges.com) and export the top 1000.
Writes 1000_years_1000_people.csv to the PROJECT ROOT (same folder as package.json).
"""

import csv
import time
from typing import List
import requests
from bs4 import BeautifulSoup
from pathlib import Path

BASE = "https://www.listchallenges.com/1000-years-1000-people"
HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; data-extractor/1.0)"}

def page_urls_for_top_1000() -> List[str]:
    # Pages 1..25 contain ranks 1..1000. (26 is the “almost made it” page.)
    return [BASE] + [f"{BASE}/list/{i}" for i in range(2, 26)]

def extract_names_from_page(html: str) -> List[str]:
    soup = BeautifulSoup(html, "html.parser")
    names = []
    for img in soup.select('img[alt^="Image:"]'):
        alt = img.get("alt", "")
        if alt.startswith("Image: "):
            name = alt.split("Image: ", 1)[1].strip()
            if name:
                names.append(name)
    return names

def fetch(url: str) -> str:
    r = requests.get(url, headers=HEADERS, timeout=30)
    r.raise_for_status()
    return r.text

def main():
    print("➡️  Scraping top 1000...")
    all_names: List[str] = []
    for idx, url in enumerate(page_urls_for_top_1000(), start=1):
        print(f"  • Page {idx:02d} {url}")
        html = fetch(url)
        all_names.extend(extract_names_from_page(html))
        time.sleep(0.6)  # be polite

    all_names = all_names[:1000]  # hard stop at 1000

    out_path = Path(__file__).resolve().parents[1] / "1000_years_1000_people.csv"
    with out_path.open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["rank", "name"])
        for i, name in enumerate(all_names, start=1):
            w.writerow([i, name])

    print(f"✅ Done. Wrote {len(all_names)} rows to {out_path}")

if __name__ == "__main__":
    main()
