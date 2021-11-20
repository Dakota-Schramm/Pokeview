import {useState, useEffect} from 'react'
import { Search } from 'react-bootstrap-icons';
import { Navigate, Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Papa from 'papaparse';

import useAutocomplete from './useAutocomplete'

import jirachi from './images/jirachi.png'


/*
    Read from CSV and use to render Pokemon names into the suggestions
    under the search bar.

    onEnter / on entering search, should redirect to "/input"
        Need to create state handler to pass value to redirect.

*/

async function fetchCsv (csvFileName) {
    const response = await fetch(csvFileName);
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = await decoder.decode(result.value);
    console.log('csv', csv);
    return csv;
}

async function getPokemon () {
    const data = Papa.parse(await fetchCsv('data/pokemon.csv'));

    var Pokemon = []
    for (var entry of data.data) {
        Pokemon.push(entry[1])
    }
    console.log(Pokemon)

    return Pokemon;
}


const PokeSearch = (props) => {
    const [pokemonInCommon, setPokemonInCommon] = useState([])
    const { searchState, handleValueChange, updatePokedex} = useAutocomplete();

    const handler = () => <Navigate to={"/" + searchState} />

    function handleSubmit (event) {
        event.preventDefault();
    }

    useEffect(()=> {
        async function setupPokedex () {
            const res = await getPokemon()
            console.log(res)
            return res 
        }
        setupPokedex()
        .then((res) => {
            updatePokedex(res)
        })
    }, [])

    return (
        <div className="searchContainer">
            <font face= "Verdana" size = "+3"><b>POKEVIEW</b></font>
            <img className="jirachi" src={jirachi} alt="A picture of jirachi" />
            <div style={{color: '#000000'}}>
                <form 
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <input type="text" placeholder="Search a pokemon..." 
                        id="myInput"
                        onChange={(e) => {
                            handleValueChange(e)
                            console.log(searchState)
                        }}
                    />
                    <button className="buttonSearch">
                        <Search />
                    </button> 
                </form>
                <div id="dropdown-content">
                    {
                        searchState.suggestions !== '' &&
                        (searchState.suggestions).map((pokemon) => {
                            return (
                                <a className="dropdown-entry" href={`/${pokemon}`}>{pokemon}</a>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default PokeSearch;