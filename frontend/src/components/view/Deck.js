import { useState, useEffect } from 'react'

import SerebiiCard from './SerebiiCard'
import SmogonCard from './SmogonCard'
import ContestCard from './ContestCard'
import Missingno from './Missingno'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

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

    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Centered Modal</h4>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras
                        justo odio, dapibus ac facilisis in, egestas eget quam.
                        Morbi leo risus, porta ac consectetur ac, vestibulum at
                        eros.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

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
            return MyVerticallyCenteredModal()
        } else if (props.generation !== 'error') {
            return (
                <div
                    class="grid-card-container card-fonts"
                    data-testid="deck-view">
                    <SerebiiCard data={serebiiInfo} onClick={handleClicks} />
                    <SmogonCard data={smogonInfo} onClick={handleClicks} />
                </div>
            )
        } else {
            return (
                <div
                    class="grid-card-container card-fonts"
                    data-testid="missingno">
                    <Missingno />
                </div>
            )
        }
    }

    return renderCards()
}
