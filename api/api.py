import time
from flask import Flask
import pandas as pd

from utils import serebii_scraper, smogon_scraper, contest_scraper, find_generations_available

app = Flask(__name__)

# Create enum for generations

@app.route('/<pokemon>')
def find_available_generations(pokemon):
    """ returns chronologically ordered list of generations
    present (first-last)

    """
    gens = find_generations_available(pokemon)
    return {
        gens
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