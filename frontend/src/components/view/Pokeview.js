import Header from '../Header'
import Deck from './Deck'
import Footer from '../Footer'
import RegionSlider from './RegionSlider'
import Missingno from './Missingno'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

/*
    If slider works, deck should be shown.
    If not, should show the error page.

    useEffect should be set up so that whenever state on RegionSlider changes,
    deck is reloaded

*/
const Pokeview = (props) => {
    const { pokemon } = useParams()

    const [generationList, setGenerationList] = useState([])
    const [currentGeneration, setCurrentGeneration] = useState('')

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

    useEffect(() => {
        console.log('In generationList useEffect.', generationList)
        if (generationList.length > 0) {
            console.log('Setting current')
            setCurrentGeneration(generationList.length - 1)
            console.log(currentGeneration)
        } else {
            setCurrentGeneration('error')
        }
    }, [generationList])

    function renderView() {
        console.log('CURRENT GEN', currentGeneration)
        if (currentGeneration !== 'error') {
            return (
                <div>
                    <RegionSlider
                        regions={generationList}
                        current={currentGeneration}
                        changeGen={setCurrentGeneration}
                    />
                    <Deck pokemon={pokemon} generation={currentGeneration} />
                </div>
            )
        } else {
            return <Missingno />
        }
    }

    return (
        <div>
            <Header />
            {generationList !== [] && renderView()}
            <Footer />
        </div>
    )
}

export default Pokeview
