import Papa from 'papaparse'

import { Search } from 'react-bootstrap-icons'

import { useEffect, useState } from 'react'

import './SearchBar.css'

export default function SearchBar() {
    const [searchState, setSearchState] = useState('')
    const [pokedex, setPokedex] = useState([])

    /*
      Setting up Pokedex for SearchBar autocomplete.
    ********/
    async function fetchCsv(csvFileName) {
        const response = await fetch(csvFileName)
        const reader = response.body.getReader()
        const result = await reader.read()
        const decoder = new TextDecoder('utf-8')
        const csv = await decoder.decode(result.value)
        return csv
    }

    async function getPokemon() {
        const data = Papa.parse(await fetchCsv('data/pokemon.csv'))

        var pokemon = []
        for (var entry of data.data) {
            pokemon.push(entry[1])
        }

        return pokemon
    }

    const cleanPokemonInput = (dex) => {
        var arr = []
        for (var pokemon of dex) {
            arr.push(pokemon.toLowerCase())
        }
        return arr
    }

    async function fetchPokedex() {
        const dex = await getPokemon()
        const res = cleanPokemonInput(dex)
        setPokedex(res)
    }

    useEffect(() => {
        fetchPokedex()
    }, [])

    /*
    checks if searchstate is empty
    if not, display top 7 pokemon suggestions based on input
    */

    function filterSuggestions(pokedex, searchState) {
        if (pokedex === [] || pokedex === undefined) return []

        const suggestions =
            searchState === ''
                ? []
                : pokedex.filter((pokemon) => {
                      return pokemon.startsWith(searchState)
                  })

        const sliced = suggestions.slice(0, 8)
        const res = sliced.map((pokemon) => {
            return (
                <a className="dropdown-entry" href={`/${pokemon}`}>
                    {pokemon}
                </a>
            )
        })

        return res
    }

    /*
      ///////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////
    */

    /*
        HANDLERS 
    */

    /*
        submits searchState on ENTER
    */
    function handleKeyUp(e) {
        if (e.keyCode === 13) {
            handleSubmit()
        }
    }

    /*
            checks if input is empty --> alerts and rejects if true
            checks if Pokemon is in searchbox Pokedex before accepting --> reject if false
            redirects to /pokemon
        */
    function handleSubmit(event) {
        if (event) event.preventDefault()
        if (searchState.value === '') {
            alert('Name must be filled out')
            return false
        } else if (!pokedex.includes(searchState.value)) {
            const check = pokedex.filter((pokemon) => {
                return pokemon.startsWith(searchState.value.slice(0, 3))
            })
            alert('Pokemon not valid.')
            return false
        }
        window.location.replace(window.location.href + searchState.value)
    }

    const handleValueChange = (e) => {
        var searchTerm = e.target.value
        setSearchState(searchTerm)
    }
    ////////////////////
    //////////////////////

    ////////////////////

    return (
        <div style={{ color: '#000000' }}>
            <form
                autoComplete="off"
                onSubmit={handleSubmit}
                method="post"
                action={'/' + searchState}>
                <input
                    type="text"
                    placeholder="Search a pokemon..."
                    id="myInput"
                    data-testid="search-input"
                    onChange={(e) => {
                        handleValueChange(e)
                    }}
                    onKeyUp={handleKeyUp}
                />
                <button
                    data-testid="submit-button"
                    className="buttonSearch"
                    type="submit"
                    onClick={handleSubmit}>
                    <Search />
                </button>
            </form>
            <div id="dropdown-content" data-testid="suggestions">
                {filterSuggestions(pokedex, searchState)}
            </div>
        </div>
    )
}
