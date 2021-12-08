import Header from '../../header/Header'
import RegionSlider from '../region-slider/RegionSlider'
import convertRomanNumeralToInt from '../region-slider/convertRomanToInt'
import Deck from '../deck/Deck'
import Spinner from 'react-bootstrap/Spinner'
import Footer from '../../footer/Footer'
import './Pokeview.css'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

/*
    On load, the pokemon request is sent to the flask api. 
    If invalid, Missingno should be rendered.
    If valid, RegionSlider is rendered.
    

    SIDE EFFECTS
        [] : load apiPath /pokemon
        [generationList]: reload cards

    TODO:
        Create state to keep track of loading. Use to determine when to render spinner.
        Change so that before load, theres a pokeball spinner.
        
        Change so that cards render based on current button's value 
            - Currently, currentGeneration is the index of the active button in
                RegionSlider. Change so that it can send correct generation to
                Deck.


*/
const Pokeview = (props) => {
    const { pokemon } = useParams()

    const [generationList, setGenerationList] = useState([])
    const [currentGeneration, setCurrentGeneration] = useState(0)

    const GENERATION_CONSTANTS = {
        'Gen VIII': 8,
        'Gen VII': 7,
        'Gen VI': 6,
        'Gen V': 5,
        'Gen IV': 4,
        'Gen III': 3,
        'Gen II': 2,
        'Gen I': 1,
        // 0 is null
        // -1 is error
    }

    /*
        fetches flask endpoint /pokemon
        then stores in generationList
    */
    useEffect(() => {
        fetch(`/${pokemon}`)
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                if (json.error) {
                    setCurrentGeneration(-1)
                } else {
                    console.log(json)
                    const generations = json.generations
                    setGenerationList(generations)

                    const region = generations[generations.length - 1]
                    const text = region.split(' ')
                    const roman = text[1]
                    const gen = convertRomanNumeralToInt(roman)
                    setCurrentGeneration(gen)
                }
            })
    }, [])

    const loadingView = (
        <div data-testid="loading-view" className="loading-view">
            <Spinner animation="border" variant="warning" />
        </div>
    )

    const defaultView = (
        <div data-testid="default-view">
            <RegionSlider
                regions={generationList}
                current={currentGeneration}
                changeGen={setCurrentGeneration}
            />
            <Deck pokemon={pokemon} generation={currentGeneration} />
        </div>
    )

    /*
        Before fetch --> loadingView
        after fetch --> defaultView
    */
    function renderView() {
        /*
            Change so that this displays when loadingScrapers is True.
        */
        return loadingView
        // if (currentGeneration === 0) {
        //     return loadingView
        // } else {
        //     return defaultView
        // }
    }

    return (
        <div>
            <Header />
            {renderView()}
            <Footer />
        </div>
    )
}

export default Pokeview
