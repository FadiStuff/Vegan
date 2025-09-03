#!/usr/bin/env python3
# Scrape ONLY the first page of "1000 Years, 1000 People" for names.
# Prints them to the terminal and writes page1_only.csv (rank,name).

import csv
import requests
from bs4 import BeautifulSoup

URL = "https://www.listchallenges.com/1000-years-1000-people"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/605.1.15 "
                  "(KHTML, like Gecko) Version/17.0 Safari/605.1.15"
}

def extract_names(html: str):
    soup = BeautifulSoup(html, "html.parser")
    names = []

    # Primary: the site uses <img alt="Image: Person Name"> per list item.
    for img in soup.select('img[alt^="Image: "]'):
        alt = img.get("alt")  # e.g., "Image: Johannes Gutenberg"
        if not alt:
            continue
        name = alt.split("Image: ", 1)[1].strip()
        if name:
            names.append(name)

    # Fallbacks (just in case the markup varies)
    if not names:
        for sel in (".item-name", ".list-item .name", ".item .name", ".itemTitle"):
            for el in soup.select(sel):
                t = el.get_text(strip=True)
                if t:
                    names.append(t)

    # De-dupe preserving order
    seen, out = set(), []
    for n in names:
        if n not in seen:
            seen.add(n)
            out.append(n)
    return out

def main():
    r = requests.get(URL, headers=HEADERS, timeout=30)
    r.raise_for_status()

    names = extract_names(r.text)
    print(f"Found {len(names)} names on page 1.")
    for i, n in enumerate(names, start=1):
        print(f"{i:>2}. {n}")

    # Write CSV next to this script
    with open("page1_only.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["rank", "name"])
        for i, n in enumerate(names, start=1):
            w.writerow([i, n])
    print("Wrote page1_only.csv")

if __name__ == "__main__":
    main()
