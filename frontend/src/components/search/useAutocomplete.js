import { useState } from 'react';
var {Trie} = require('./Trie')


const INITIAL_STATE = {
    value: '',
    suggestions: []
};

const useAutocomplete = (initialState = INITIAL_STATE) => {
    const [searchState, setSearchState] = useState(initialState);
    const [pokedex, setPokedex] = useState([])
    var trie = new Trie()

    function filterPokemon (searchTerm) {
        if (searchTerm === '') return [];
        return pokedex.filter((pokemon) => {
            return pokemon.startsWith(searchTerm)
        })
    }

    const handleValueChange = (e) => {
        console.log(e)
        console.log(pokedex)
        var searchTerm = e.target.value
        setSearchState((s) => ({
            ...s,
            value: searchTerm,
            suggestions: filterPokemon(searchTerm)
        }));
        console.log(searchState)
    };

    // Can remove trie function from here.
    const updatePokedex = (dex) => {
        var arr = []
        for (var pokemon of dex) {
            pokemon = pokemon.toLowerCase()
            // trie.insert(pokemon)
            // console.log(pokemon)
            arr.push(pokemon)
        }
        setPokedex(arr);
        console.log(trie.find("a"))
    }

    return {
        searchState,
        handleValueChange,
        updatePokedex,
    };
};

export default useAutocomplete;