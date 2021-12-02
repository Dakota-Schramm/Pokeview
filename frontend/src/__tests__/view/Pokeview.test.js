import { unmountComponentAtNode } from 'react-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node' // used for server mocking

describe('Pokeview', () => {
    describe('onComponentDidMount', () => {
        describe('check mock api', () => {
            test.todo('currentGeneration is error on fail')
            test.todo('currentGenerationList is set on success')
        })
    })
    describe('onChange generationList', () => {
        test.todo('currentGeneration is error on fail')
        test.todo('currentGeneration is newest gen on success')
    })
})
