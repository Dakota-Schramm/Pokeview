import { useState, useEffect } from 'react'
import { Search } from 'react-bootstrap-icons'
import { Navigate, Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import '../css/PokeSearch.css'

import useAutocomplete from './useAutocomplete'
import { fetchCsv, getPokemon } from './helpers.js'
import jirachi from '../images/jirachi.png'

/*
    Read from CSV and use to render Pokemon names into the suggestions
    under the search bar.

    onEnter / on entering search, should redirect to "/input"
        Need to create state handler to pass value to redirect.

    SOURCES:
        Pokeview Font: https://fontmeme.com/pokemon-font/
        Jirachi image: https://www.deviantart.com/smiley-fakemon/art/Jirachi-421174886

    TODO:
        Change suggestions so that box is responsively as large as it can be for screen.
        Also, add scrollbar
        Add functionality to keyUp function so that user can press up and down to navigate options


*/
const PokeSearch = (props) => {
    const [pokemonInCommon, setPokemonInCommon] = useState([])
    const { searchState, handleValueChange, pokedex, updatePokedex } =
        useAutocomplete()

    /*
        checks if input is empty --> alerts and rejects if true
        checks if Pokemon is in searchbox Pokedex before accepting --> reject if false
        redirects to /pokemon
    */
    function handleSubmit(event) {
        if (event) event.preventDefault()
        console.log(pokedex)
        if (searchState.value === '') {
            alert('Name must be filled out')
            return false
        } else if (!pokedex.includes(searchState.value)) {
            console.log(searchState.value)
            const check = pokedex.filter((pokemon) => {
                return pokemon.startsWith(searchState.value.slice(0, 3))
            })
            console.log(check)
            alert('Pokemon not valid.')
            return false
        }
        window.location.replace(window.location.href + searchState.value)
    }

    /*
        loads csv into pokedex state.
    */
    useEffect(() => {
        async function setupPokedex() {
            const res = await getPokemon()
            console.log(res)
            return res
        }

        setupPokedex().then((res) => {
            updatePokedex(res)
        })
    }, [])

    /*
        checks if searchstate is empty
        if not, display top 7 pokemon suggestions based on input
    */
    function displaySuggestions() {
        var suggestions =
            searchState.suggestions !== '' ? searchState.suggestions : []

        suggestions = searchState.suggestions.map((pokemon) => {
            return (
                <a className="dropdown-entry" href={`/${pokemon}`}>
                    {pokemon}
                </a>
            )
        })

        return suggestions.slice(0, 8)
    }

    /*
        submits searchState on ENTER
    */
    function handleKeyUp(e) {
        if (e.keyCode === 13) {
            handleSubmit()
        }
    }

    // Change css for dropdown.
    return (
        <div className="searchContainer">
            <img
                src="https://fontmeme.com/permalink/211121/0b100e1fbcfeb91ffd617552d9dc8ed6.png"
                alt="POKEVIEW"
                border="0"
            />
            <img className="jirachi" src={jirachi} alt="A picture of jirachi" />
            <div style={{ color: '#000000' }}>
                <form
                    autoComplete="off"
                    onSubmit="return handleSubmit()"
                    method="post"
                    action={'/' + searchState}>
                    <input
                        type="text"
                        placeholder="Search a pokemon..."
                        id="myInput"
                        onChange={(e) => {
                            handleValueChange(e)
                            console.log(searchState)
                        }}
                        onKeyUp={handleKeyUp}
                    />
                    <button
                        className="buttonSearch"
                        type="submit"
                        onClick={handleSubmit}>
                        <Search />
                    </button>
                </form>
                <div id="dropdown-content">{displaySuggestions()}</div>
            </div>
        </div>
    )
}

export default PokeSearch
