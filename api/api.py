import time
from flask import Flask
import pandas as pd
from enum import Enum

from scrapers.serebii_scraper import serebii_scraper
from scrapers.smogon_scraper import smogon_scraper
from scrapers.contest_scraper import contest_scraper
from scrapers.find_generations_available import find_generations_available



app = Flask(__name__)

# # Create enum for generations
# class Generations(Enum):
    
#     GSC: 2
#     RGBY: 1


@app.route('/<pokemon>')
def find_available_generations(pokemon):
    """ returns chronologically ordered list of generations
    present (first-last)

    """
    gens = find_generations_available(pokemon)
    print(gens)
    if gens:
        return {
            "generations": gens[::-1]
        }
    else:
        return {
            "error": "Error: Pokemon not found."
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