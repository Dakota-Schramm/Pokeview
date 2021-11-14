import time
from flask import Flask
import pandas as pd

from utils import serebii_scraper, smogon_scraper, contest_scraper, find_generations_available

app = Flask(__name__)



@app.route('/<pokemon>')
def pokemon_search(pokemon):
    """ Checks if pokemon string is valid pokemon.
    If it is, returns chronologically ordered list of generations
    present (first-last)
    Else, returns error message

    """
    # read csv file
    pokedex = pd.read_csv("./data/pokemon.csv")

    # Need to change to see if pokemon string can be found in csv
    valid = pokedex[pokemon]
    print(valid)

    if valid:
        # redirect to default generation (D/P/P)
        gens = find_generations_available(pokemon)
        return {
            gens
        }
    else:
        # Redirect to error page.
        return {
           ["error"]
        }

@app.route('/<pokemon>/<generation>')
def load_pokescrapers(pokemon, generation):
    """

    """
    # Check if generation is one with contest
    contest_generations = []
    if generation in contest_generations:
        return {
            'serebii': serebii_scraper(pokemon, generation),
            'smogon': smogon_scraper(pokemon, generation),
            'contest': contest_scraper(pokemon, generation)
        }
    else: 
        return {
            'serebii': serebii_scraper(pokemon, generation),
            'smogon': smogon_scraper(pokemon, generation),
            'contest': "n/a"
        }


# @app.route('/test')
# def get_current_time():
#     return {'test': time.time()}