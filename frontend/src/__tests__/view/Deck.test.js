import { rest } from 'msw'
import { setupServer } from 'msw/node' // used for server mocking
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Deck from '../../components/view/Deck'

const server = setupServer(
    rest.get('/:pokemon/:generation'),
    (req, res, ctx) => {
        console.log('hit2')
        return res(ctx.json({ serebii: {}, smogon: {}, contest: {} }))
    }
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('check behavior on error', () => {
    render(<Deck pokemon="abra" generation={'error'} />)
    expect(screen.findByTestId('missingno')).toBeDefined()
})

test('testing for success', () => {
    render(<Deck pokemon="abra" generation={1} />)
    expect(screen.findByTestId('deck-view')).toBeDefined()
})
