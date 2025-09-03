#!/usr/bin/env python3
"""
Scrape ONLY page 1 and page 2 of "1000 Years, 1000 People"
and write a CSV with rank,name columns.
"""

import csv
import requests
from bs4 import BeautifulSoup

PAGES = [
    "https://www.listchallenges.com/1000-years-1000-people",
    "https://www.listchallenges.com/1000-years-1000-people/list/2"
]
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/605.1.15 "
        "(KHTML, like Gecko) Version/17.0 Safari/605.1.15"
    )
}

def extract_names(html: str):
    soup = BeautifulSoup(html, "html.parser")
    names = []
    for img in soup.select('img[alt^="Image: "]'):
        alt = img.get("alt", "")
        if alt and alt.startswith("Image: "):
            name = alt.split("Image: ", 1)[1].strip()
            if name:
                names.append(name)
    return names

def fetch(url: str):
    r = requests.get(url, headers=HEADERS, timeout=30)
    r.raise_for_status()
    return r.text

def main():
    all_names = []
    for idx, url in enumerate(PAGES, start=1):
        print(f"Fetching page {idx}: {url}")
        html = fetch(url)
        names = extract_names(html)
        print(f"  Found {len(names)} names")
        all_names.extend(names)

    with open("page1_and_2.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["rank", "name"])
        for i, name in enumerate(all_names, start=1):
            w.writerow([i, name])
    print(f"✅ Done. Wrote {len(all_names)} names to page1_and_2.csv")

if __name__ == "__main__":
    main()
