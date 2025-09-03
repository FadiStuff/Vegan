import requests
from bs4 import BeautifulSoup
import csv

BASE_URL = "https://www.listchallenges.com/1000-years-1000-people/list/{}"

def scrape_page(page_num):
    # First page has a different URL (no /list/1)
    url = "https://www.listchallenges.com/1000-years-1000-people" if page_num == 1 else BASE_URL.format(page_num)
    print(f"Scraping page {page_num}: {url}")
    response = requests.get(url)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")
    items = soup.select("div.item")

    names = []
    for item in items:
        name = item.select_one("div.item-name")
        rank = item.select_one("div.item-rank")
        if name and rank:
            names.append((rank.text.strip(), name.text.strip()))
    return names

def main():
    all_items = []

    # Loop through all 26 pages
    for page_num in range(1, 27):
        page_items = scrape_page(page_num)
        all_items.extend(page_items)

    # Write to CSV
    with open("people_list.csv", "w", newline="", encoding="utf-8") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(["Rank", "Name"])
        writer.writerows(all_items)

    print(f"✅ Scraped {len(all_items)} items total. Saved to people_list.csv")

if __name__ == "__main__":
    main()
