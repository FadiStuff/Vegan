#!/usr/bin/env python3
"""
Fetch page 2 of "1000 Years, 1000 People" and dump the raw HTML to debug_page2.html
"""

import requests

URL = "https://www.listchallenges.com/1000-years-1000-people/list/2"
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/605.1.15 "
        "(KHTML, like Gecko) Version/17.0 Safari/605.1.15"
    )
}

def main():
    print(f"Fetching {URL}")
    r = requests.get(URL, headers=HEADERS, timeout=30)
    r.raise_for_status()
    with open("debug_page2.html", "w", encoding="utf-8") as f:
        f.write(r.text)
    print("✅ Wrote debug_page2.html — open it to see what the site actually sent.")

if __name__ == "__main__":
    main()
