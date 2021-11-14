import {useState, useEffect} from 'react'
import { Search } from 'react-bootstrap-icons';
import { Navigate, Outlet } from "react-router-dom";

import Papa from 'papaparse';

async function getPokemon () {
    const data = Papa.parse(await fetchCsv('data/pokemon.csv'));

    var Pokemon = []
    for (var entry of data.data) {
        Pokemon.push(entry[1])
    }
    console.log(Pokemon)

    return Pokemon;
}

async function fetchCsv (csvFileName) {
    const response = await fetch(csvFileName);
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = await decoder.decode(result.value);
    console.log('csv', csv);
    return csv;
}

/*
    Recreate filter function using map to find all names that start with
    input.

*/

// function filterFunction() {
//     var input, filter, ul, li, a, i;
//     input = document.getElementById("myInput");
//     filter = input.value.toUpperCase();
//     div = document.getElementById("myDropdown");
//     a = div.getElementsByTagName("a");
//     for (i = 0; i < a.length; i++) {
//         txtValue = a[i].textContent || a[i].innerText;
//         if (txtValue.toUpperCase().indexOf(filter) > -1) {
//             a[i].style.display = "";
//         } else {
//             a[i].style.display = "none";
//         }
//     }
// }

/*
    Read from CSV and use to render Pokemon names into the suggestions
    under the search bar.

    onEnter / on entering search, should redirect to "/input"
        Need to create state handler to pass value to redirect.

*/


const PokeSearch = (props) => {
    const [prefix, setPrefix] = useState("")
    const [pokemonInCommon, setPokemonInCommon] = useState([])

    function filterPokemon() {
        const result = () => {
            return pokemonInCommon.filter((val) => {
                return val.startWith(prefix)
            })
        }
        setPokemonInCommon(result)
    }
    const handler = () => <Navigate to={"/" + prefix} />

    // On first render
    useEffect(() => {
        setPokemonInCommon(getPokemon())
    }, []);

    useEffect(() => {
        filterPokemon()
    }, [prefix])

    return (
        <div>
            <div id="myDropdown" style={{color: '#000000'}}>
                <Search />
                <form>
                    <label>
                        Pokemon: 
                    </label>
                    <input type="text" placeholder="Search a pokemon..." 
                        id="myInput"
                        onKeyDown={e => e.key === 'Enter' && handler()}
                        value={prefix} onChange={(e)=>setPrefix({value: e.target.value})}
                    />
                </form>
                {
                    [].map((pokemon) => {
                        return (
                            <a href={`/${pokemon}`}>{pokemon}</a>
                        )
                    })
                }
            </div>
        </div>
        
    )
}

export default PokeSearch;