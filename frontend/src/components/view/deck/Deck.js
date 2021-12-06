import { useState, useEffect } from 'react'

import SerebiiCard from '../SerebiiCard'
import SmogonCard from '../SmogonCard'
import Missingno from '../Missingno'

import Terminal from './Terminal'

/*
    Wrapper for cards on Pokeview.

    Fetches api, then displays cards based on if load successful
        Unsuccessful: loads Missingno, which doesnt have onClick
        Successful: loads cards with onClcik effects
*/
export default function Deck(props) {
    const [serebiiInfo, setSerebiiInfo] = useState('') // 0
    const [smogonInfo, setSmogonInfo] = useState('') // 1

    const [terminalOpen, setTerminalOpen] = useState(false)
    const [focusedInfo, setFocusedInfo] = useState(-1)

    useEffect(() => {
        fetch('/' + props.pokemon + '/' + props.generation)
            .then((res) => {
                return res.json()
            })
            .then((json) => {
                setSerebiiInfo(json.serebii)
                setSmogonInfo(json.smogon)
            })
    }, [])

    useEffect(() => {
        if (terminalOpen) {
        }
    }, [terminalOpen])

    function handleClicks(e) {
        console.log(e)
        if (!terminalOpen) {
            setTerminalOpen(true)
        }
    }

    function renderCards() {
        if (terminalOpen) {
            return Terminal() // should pass in clicked Card as props
        } else if (props.generation !== 'error') {
            return (
                <div
                    className="grid-card-container card-fonts"
                    data-testid="deck-view">
                    <SerebiiCard data={serebiiInfo} onClick={handleClicks} />
                    <SmogonCard data={smogonInfo} onClick={handleClicks} />
                </div>
            )
        } else {
            return (
                <div
                    className="grid-card-container card-fonts"
                    data-testid="missingno">
                    <Missingno />
                </div>
            )
        }
    }

    return renderCards()
}
