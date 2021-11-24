import { useState, useEffect } from 'react'

import SerebiiCard from './SerebiiCard'
import SmogonCard from './SmogonCard'
import ContestCard from './ContestCard'

export default function Deck(props) {
    const [serebiiInfo, setSerebiiInfo] = useState('')
    const [smogonInfo, setSmogonInfo] = useState('')
    const [contestInfo, setContestInfo] = useState('')

    useEffect(() => {
        fetch('/' + props.pokemon + '/' + props.generation)
            .then((res) => {
                return res.json()
            })
            .then((json) => {
                setSerebiiInfo(json.serebii)
                setSmogonInfo(json.smogon)
                setContestInfo(json.contest)
            })
    }, [])
    return (
        <div>
            <SerebiiCard value={serebiiInfo} />
            <SmogonCard value={smogonInfo} />
            {contestInfo !== '' && contestInfo !== 'n/a' && (
                <ContestCard value={contestInfo} />
            )}
        </div>
    )
}
