import Header from '../Header'
import Deck from './Deck'
import Footer from '../Footer'
import RegionSlider from './RegionSlider'
import Missingno from './Missingno'

import { useState, useEffect } from 'react'

/*
    If slider works, deck should be shown.
    If not, should show the error page.

    useEffect should be set up so that whenever state on RegionSlider changes,
    deck is reloaded

*/
const Pokeview = (props) => {
    function getURLParameter(name) {
        // var output = decodeURI(
        //     (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [
        //         ,
        //         null,
        //     ])[1]
        // )
        // console.log(output)
        // return output
    }

    const pokemon = getURLParameter()

    const [generationList, setGenerationList] = useState([])
    const [currentGeneration, setCurrentGeneration] = useState('')

    useEffect(() => {
        fetch(`/${pokemon}`)
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                setGenerationList(json)
                if (generationList[0] !== 'error') {
                    setCurrentGeneration(generationList[-1])
                } else {
                    setCurrentGeneration('error')
                }
            })
    }, [generationList])

    return (
        <div>
            <Header />
            {generationList !== [] && currentGeneration !== 'error' ? (
                <div>
                    <RegionSlider
                        regions={generationList}
                        current={currentGeneration}
                        changeGen={setCurrentGeneration}
                    />
                    <Deck pokemon={pokemon} generation={currentGeneration} />
                </div>
            ) : (
                <Missingno />
            )}
            <Footer />
        </div>
    )
}

export default Pokeview
