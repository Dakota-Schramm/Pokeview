import requests
import sys
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup

"""
    SEARCH ONE
    Goes to serebii's pokemon page where each generation's dex can be activated.
    Click on link based on generation that is passed.

    SEARCH TWO
    Goes to indepth details in locations section on where to find, then navigates
    to that link.

"""
def serebii_scraper(pokemon, generation):
    GENERATION_CONSTANTS = {
        8: 'Gen VIII',
        7: 'Gen VII',
        6: 'Gen VI',
        5: 'Gen V',
        4: 'Gen IV',
        3: 'Gen III',
        2: 'Gen II',
        1: 'Gen I'
    }
    
    root = "https://www.serebii.net"
    query = root + "/pokemon" +  f"/{pokemon}"

    response = requests.get(query)
    #print(response)

    soup = BeautifulSoup(response.text, 'html.parser')
    #print(soup)

    # dexTables = soup.findAll(attrs={'class': 'pkmn'})
    # print(dexTables)

    textToMatch = GENERATION_CONSTANTS[generation]
    a_tag = soup.find('a', string=f"{textToMatch} Dex")
    found = a_tag.get('href')
    
    if not found:
        return {
            'error': "Generation not found"
        }
    vals = found.split("/")
    pokedex, pokeURL = vals[0], vals[1]

    regional_query = root + found
    response_two = requests.get(regional_query)
    soup_two = BeautifulSoup(response_two.text, 'html.parser')

    locations_section = soup_two.findAll(class_="fooevo")

    found_two = None
    for location in locations_section:
        if location.a:
            found_two = location.a.get('href')
    #print(f"href = {found_two}")

    if not found_two:
        return {
            'error': "Error finding location details."
        }

    response_three = requests.get(regional_query + found_two)
    soup_three = BeautifulSoup(response_two.text, 'html.parser')
    #print(soup_three)

    catchable_locations = soup_three.findAll(class_="dextable")
    print("catchable", catchable_locations)

    """ 
        Get tables with location information from website. Use first row as def for 
        json and other entries modeled in same way.    

        return dictionary with 
            keys --> str gameTitle
            values --> list dictionary (k: def v: metainfo)
    """

    

        

        


if __name__ == '__main__':
    serebii_scraper('abra', 1)
