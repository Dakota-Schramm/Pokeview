import { useState } from 'react'

/*
    checks if searchstate is empty
    if not, display top 7 pokemon suggestions based on input
*/

function filterSuggestions(pokedex, searchState) {
    const suggestions =
        searchState === ''
            ? []
            : pokedex.filter((pokemon) => {
                  return pokemon.startsWith(searchState)
              })

    const res = suggestions.map((pokemon) => {
        return (
            <a className="dropdown-entry" href={`/${pokemon}`}>
                {pokemon}
            </a>
        )
    })

    return suggestions.slice(0, 8)
}

export default function useSuggestions(pokedex, loading) {
    const [matchingPokemon, setMatchingPokemon] = useState([])

    function setSuggestions(sugg) {
        console.log(sugg)
        const newQuery = filterSuggestions(pokedex, sugg)
        console.log(newQuery)
        setMatchingPokemon(newQuery)
    }

    return [matchingPokemon, setSuggestions]
}
