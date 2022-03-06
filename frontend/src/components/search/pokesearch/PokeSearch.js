import jirachi from '../../../images/jirachi.png'

import { Navigate, Outlet } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './PokeSearch.css'

import { useState, useEffect } from 'react'
import SearchBar from '../SearchBar/'

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
    // Change css for dropdown.
    return (
        <div className="searchContainer">
            <img
                src="https://fontmeme.com/permalink/211121/0b100e1fbcfeb91ffd617552d9dc8ed6.png"
                alt="POKEVIEW"
                border="0"
            />
            <img className="jirachi" src={jirachi} alt="A picture of jirachi" />
            <SearchBar />
        </div>
    )
}

export default PokeSearch
