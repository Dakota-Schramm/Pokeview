import requests
from bs4 import BeautifulSoup

def find_generations_available(pokemon):
    root = "https://www.serebii.net/"
    query = root + "pokemon" + "/" + pokemon

    response = requests.get(query)
    # print(response.text)

    soup = BeautifulSoup(response.text, "html.parser")
    print(soup)

    generations_table = soup.findAll("td", attrs={'class': 'pkmn'})
    print(generations_table)

    generations = []
    for generation in generations_table:
        result = generation.find("a").findAll(text=True)
        if result != []: generations.append(result)
    print(generations)

    return generations

if __name__ == '__main__':
    find_generations_available('abra')