import requests
from bs4 import BeautifulSoup
import csv

# Pages to scrape
pages = [
    "https://www.listchallenges.com/1000-years-1000-people",
    "https://www.listchallenges.com/1000-years-1000-people/list/2"
]

all_names = []

for url in pages:
    print(f"Scraping: {url}")
    response = requests.get(url)
    response.raise_for_status()  # Throw error if bad status
    soup = BeautifulSoup(response.text, "html.parser")

    # Extract all names
    items = soup.select("div.item-name")
    for item in items:
        name = item.get_text(strip=True)
        all_names.append(name)

# Save to CSV
with open("two_pages.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["Name"])
    for name in all_names:
        writer.writerow([name])

print(f"Scraped {len(all_names)} names total.")
