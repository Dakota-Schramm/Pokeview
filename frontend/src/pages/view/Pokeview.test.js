import { rest } from 'msw'
import { setupServer } from 'msw/node' // used for server mocking
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Pokeview from '../../components/view/Pokeview'

const server = setupServer(
    rest.get('/:pokemon', (req, res, ctx) => {
        console.log('hit2')
        return res(ctx.json({ generations: [1, 2, 3] }))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('check that display changes correctly on click', () => {
    const { findByTestId } = render(<Pokeview />)
    expect(findByTestId('deck-view')).toBeDefined()
})
