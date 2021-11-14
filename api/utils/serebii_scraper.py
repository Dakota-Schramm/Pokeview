import requests
from bs4 import BeautifulSoup

def serebii_scraper(pokemon, generation):
    generation_query = {
        : "pokedex-swsh"
    }

    root = "https://www.serebii.net/"
    query = root + generation_query[generation] + "/" + pokemon

    response = requests.get(SEARCH_QUERY_FOR_JAVA)

    soup = BeautifulSoup(response, 'html.parser')
    print(soup)

    dexTables = soup.findAll(attrs={'class': 'dextable'}, "Location")
    print(dexTables)

if __name__ == '__main__':
    serebii_scraper('abra', )
