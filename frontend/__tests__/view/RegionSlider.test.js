import { unmountComponentAtNode } from 'react-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node' // used for server mocking

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

describe('RegionSlider', () => {
    describe('onComponentDidMount', () => {})
    describe('onClick', () => {
        test.todo('check that value is changed on click.')
    })
    describe('displaySlider', () => {
        test.todo("generations in intial state display doesn't render")
        test.todo('if generations fetched then displaySlider')
        test.todo('')
    })
})
