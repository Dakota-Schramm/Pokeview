import Papa from 'papaparse';

export async function fetchCsv (csvFileName) {
    const response = await fetch(csvFileName);
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = await decoder.decode(result.value);
    console.log('csv', csv);
    return csv;
}

export async function getPokemon () {
    const data = Papa.parse(await fetchCsv('data/pokemon.csv'));

    var Pokemon = []
    for (var entry of data.data) {
        Pokemon.push(entry[1])
    }
    console.log(Pokemon)

    return Pokemon;
}