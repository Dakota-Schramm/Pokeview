import requests
from bs4 import BeautifulSoup

def find_generations_available(pokemon):
    """ Returns list with generations pokemon was available newest to oldest.

    """


    root = "https://www.serebii.net/"
    query = root + "pokemon" + "/" + pokemon

    response = requests.get(query)
    # print(response.text)

    if response.ok:
        soup = BeautifulSoup(response.text, "html.parser")
        #print(soup)

        generations_table = soup.findAll("td", attrs={'class': 'pkmn'})
        #print(generations_table)

        generations = []
        for generation in generations_table:
            result = generation.find("a").findAll(text=True)
            if result != []:
                print(result)
                formatted = result[0].split(" ")
                output = " ".join(formatted[:2])
                generations.append(output)
        # print(generations)

        return generations
    else:
        return None

if __name__ == '__main__':
    find_generations_available('abra')