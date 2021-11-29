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
