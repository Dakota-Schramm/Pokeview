import Papa from 'papaparse'

import { useEffect, useState } from 'react'

async function fetchCsv(csvFileName) {
    const response = await fetch(csvFileName)
    const reader = response.body.getReader()
    const result = await reader.read()
    const decoder = new TextDecoder('utf-8')
    const csv = await decoder.decode(result.value)
    console.log('csv', csv)
    return csv
}

async function getPokemon() {
    const data = Papa.parse(await fetchCsv('data/pokemon.csv'))

    var Pokemon = []
    for (var entry of data.data) {
        Pokemon.push(entry[1])
    }
    console.log(Pokemon)

    return Pokemon
}

const cleanPokemonInput = (dex) => {
    var arr = []
    for (var pokemon of dex) {
        pokemon = pokemon.toLowerCase()
        // trie.insert(pokemon)
        // console.log(pokemon)
        arr.push(pokemon)
    }
}

export default function usePokedex() {
    const [pokedex, setPokedex] = useState([])
    const [loading, setLoading] = useState('false')

    useEffect(() => {
        async function fetchPokedex() {
            try {
                setLoading('true')
                const dex = await getPokemon()
                const res = cleanPokemonInput(dex)
                console.log(res)
                setPokedex(res)
            } catch (e) {
                setLoading(undefined)
            }
        }
        if (pokedex === []) {
            fetchPokedex()
        }
    }, [pokedex])

    return [pokedex, loading]
}
