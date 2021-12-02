import Header from '../header/Header'
import RegionSlider from './region-slider/RegionSlider'
import Deck from './Deck'
import Spinner from 'react-bootstrap/Spinner'
import Footer from '../footer/Footer'

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
    const [currentGeneration, setCurrentGeneration] = useState('')

    const GENERATION_CONSTANTS = {
        'Gen VIII': 8,
        'Gen VII': 7,
        'Gen VI': 6,
        'Gen V': 5,
        'Gen IV': 4,
        'Gen III': 3,
        'Gen II': 2,
        'Gen I': 1,
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
                console.log('Setting genList', json)
                if (json.error) {
                    setCurrentGeneration('error')
                } else {
                    const generations = json.generations
                    setGenerationList(generations)
                    console.log(generationList)
                }
            })
    }, [])

    /* Once generationList has been loaded, set currentGeneration
        to the end of the list.
    */
    useEffect(() => {
        console.log('In generationList useEffect.', generationList)
        const checkLength = generationList.length > 0
        if (currentGeneration !== '' || checkLength) {
            if (checkLength) {
                console.log('Setting current')
                for (var key in generationList) {
                    var value = generationList[key]
                    // if (value == )
                }
                setCurrentGeneration(generationList.length - 1)
                console.log(currentGeneration)
            } else {
                setCurrentGeneration('error')
            }
        }
    }, [generationList])

    const loadingView = (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            }}>
            <Spinner animation="border" variant="warning" />
        </div>
    )

    const defaultView = (
        <div>
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
        onError --> 

        Should change so that 
    */
    function renderView() {
        console.log('CURRENT GEN', currentGeneration)
        /*
            Change so that this displays when loadingScrapers is True.
        */
        if (currentGeneration === '') {
            return loadingView
        } else {
            return defaultView
        }
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
