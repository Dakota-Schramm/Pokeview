import requests
from bs4 import BeautifulSoup

def contest_scraper(pokemon, generation):
    generation_query = {
        8 : "pokedex-swsh"
    }

    root = "https://www.serebii.net/"
    query = root + generation_query[generation] + "/" + pokemon

    response = requests.get(SEARCH_QUERY_FOR_JAVA)

    soup = BeautifulSoup(response, 'html.parser')
    print(soup)

    # dexTables = soup.findAll(attrs={'class': 'dextable'}, "Location")
    # print(dexTables)

if __name__ == '__main__':
    contest_scraper('abra', 8)