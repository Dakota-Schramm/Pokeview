import requests
import sys
import re
from bs4 import BeautifulSoup

"""
    Scrapes locations that pokemon can be found in in generation from serebii.


    QUERY ONE
    Goes to serebii's pokemon page where each generation's dex can be found.
    Get element's link based on generation that is passed.

    QUERY TWO
    Goes to indepth details in locations section on where to find, then navigates
    to that link.

    QUERY THREE
    Returns dict containing location info for pokemon in its generation

"""
root = "https://www.serebii.net"

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

def send_response_and_make_soup(query):
    response = requests.get(query)
    return BeautifulSoup(response.text, 'html.parser')

def query_one(pokemon, generation):
    """
        :type pokemon: string
        :type generation: int
        :rtype tuple: found, dex_path
            :rtype found: boolean
            :rtype dex_path: dict


        loads main pokedex page for pokemon.
        returns error if page doesn't contain dex info
    """
    query = root + "/pokemon" +  f"/{pokemon}"

    soup = send_response_and_make_soup(query)

    # get href from correct generation
    textToMatch = GENERATION_CONSTANTS[generation]
    a_tag = soup.find('a', string=f"{textToMatch} Dex")

    return (False, None) if not a_tag else (True, a_tag.get('href'))
    

def query_two(generation, dex_path):
    """
        loads in-depth details page for where to get pokemon

        should first navigate to "Locations" tag
        if failed, returns (False, None)
        then checks if In-depth details is found in stripped_strings of table

        returns location info directly from page if cant find "in-depth details"
        else, returns (True, location_path)

        Gen 2 needs genders pulled from query two
        Gen 3 pages do not incorporate In-Depth Details
            - query two should check generation
        
        :type generation: int
        :type dex_path: string
        :rtype tuple: found, output
            :rtype found: boolean
            :rtype output =>
                None,
                string (tag.href),
                dict (locations)
    """
    regional_query = root + dex_path
    soup_two = send_response_and_make_soup(regional_query)

    # find correct element that holds that locations info
    found_table = None
    for table in soup_two.findAll(class_="dextable"):
        try:
            for temp in table.tr.td.stripped_strings:
                if temp.find("Location") != -1: found_table = table
        except:
            print("Skipping element...")

    if not found_table:
        return (False, None)

    # check for in-depth details page
    for string_check in found_table.tr.td.stripped_strings:
        if string_check == "In-Depth Details":
            return (True, found_table.tr.td.a.get('href'))

    # if DNE, return dict with Table info
    # should create check here to add capture rate and gender ratio
    # for gen 3 and 4
    output = []
    for location_entry in found_table.tr.next_siblings:
        print(location_entry, "\n###########################")
        temp = []
        for entry in location_entry.stripped_strings:
            temp.append(entry)

        if temp:
            output.append(temp)
        # games = location_entry.tr.td
        # locations = location_entry.tr.td.next_sibling
        # output[games] = locations
    print(output)

    return (False, output)

def query_three(generation, dex_path, location_path):
    """
        :type generation: int
        :type dex_path: 
        :type location_path
        :rtype dict


    """
    vals = dex_path.split("/")
    _, pokedex, pokeURL = vals
    location_query = f"{root}/{pokedex}/{location_path}"

    soup_three = send_response_and_make_soup(location_query)
    
    location_info = soup_three.findAll(class_="dextable")

    output = {}
    gender_ratio = None
    capture_rate = None
    capturable_locations = []
    """
        Gen 1 has no genders except for Nidorans
        
    """
    for (index, table) in enumerate(location_info):
        if (index == 0): # to get gender ratio and capture rate NEEDS REFACTORED
            """
                Need to check if generation 1
                since gender did not exist in this generation.
            """
            
            print(table)
            info_block = table.tr.next_sibling.next_sibling


            current = info_block.td 
            current = current.next_sibling.next_sibling.next_sibling.next_sibling
            #print(current, temp, sep="\n#####\n")

            if generation != 1:
                temp = current.table.tr.td.next_sibling
                male = temp.text
                female = temp.parent.next_sibling.td.next_sibling.text
                # print(male, female)

                gender_ratio = (male, female)



            current = current.next_sibling.next_sibling.next_sibling.next_sibling
            # print(current)
            capture_rate = int(current.text)

            print(gender_ratio, capture_rate)

        else:
            locations_available = []
            for entry in table.stripped_strings:
                locations_available.append(entry)

            game_title = locations_available.pop(0)

            # Setup result json
            catch_areas = {}
            title_keys = []
            for idx, entry in enumerate(locations_available):
                if (idx // 5) == 0:
                    title_keys.append(entry)
                else:
                    mod = idx % 5
                    catch_areas[title_keys[mod]] = locations_available[idx]

            output[game_title] = catch_areas
    output["gender_ratio"] = gender_ratio
    output["capture_rate"] = capture_rate

    return output


def serebii_scraper(pokemon, generation):
    found, dex_path = query_one(pokemon, generation)
    if not found:
        return {'error': "Generation not found"}

    found_two, result_two = query_two(generation, dex_path)
    if not found_two:
        if not result_two: return {"error": "Couldn't find locations table."}
        else: return {'locations': result_two}
    
    result_three = query_three(generation, found, result_two)

    return {'locations-detailed': result_three}

if __name__ == '__main__':
    print(serebii_scraper('abra', 1))
