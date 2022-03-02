import usePokedex from '../usePokedex'

import jirachi from '../../../images/jirachi.png'

import { Search } from 'react-bootstrap-icons'
import { Navigate, Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './PokeSearch.css'

import { useState, useEffect } from 'react'
import useSuggestions from '../useSuggestions'

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
    const [searchState, setSearchState] = useState('')
    const [pokedex, loading] = usePokedex()
    const [suggestions, setSuggestions] = useSuggestions(pokedex, loading)

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
        setSuggestions(searchTerm)
    }

    /*
      ///////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////
    */

    useEffect(() => {
        setSuggestions(searchState)
    }, [searchState])

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
                    {suggestions}
                </div>
            </div>
        </div>
    )
}

export default PokeSearch
