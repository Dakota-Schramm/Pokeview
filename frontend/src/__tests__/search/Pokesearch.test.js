import { unmountComponentAtNode } from 'react-dom'

let container = null
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div')
    document.body.appendChild(container)
})

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container)
    container.remove()
    container = null
})
describe('Pokesearch', () => {
    describe('onSubmit', () => {
        describe('pokedex is ""', () => {
            test.todo(
                'check if alert occurs when searchState.value is empty string'
            )
            test.todo('check that submit is rejected')
            test.todo('check that window.location same after handleSubmit')
        })
        describe('pokedex query is valid', () => {
            test.todo('check that window.location changed')
        })
        describe('pokedex query is invalid', () => {
            test.todo('check if alert occurs when pokedex is invalid')
            test.todo('check that submit is rejected')
        })
    })

    describe('onComponentDidMount', () => {
        test.todo('check that pokedex is updated on load.')
    })

    describe('on keyEnterDown', () => {
        test.todo('check if handleSubmit called when prsesed')
    })

    describe('displaySuggestions', () => {
        describe('valid searchState', () => {
            test.todo('check that array shows up to 8 items')
        })

        describe('searchState is ""', () => {
            test.todo('check that suggestions is empty array')
        })
    })
})

describe('useAutoComplete', () => {})
