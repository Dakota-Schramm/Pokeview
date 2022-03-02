import { unmountComponentAtNode } from 'react-dom'
import {
    render,
    fireEvent,
    waitFor,
    screen,
    createEvent,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import PokeSearch from './PokeSearch'

/*
    testids needed
        submit button
        suggestions 
        https://stackoverflow.com/questions/53611098/how-can-i-mock-the-window-alert-method-in-jest
*/
function typeIntoAndSubmit(newTextState, textElem, submitButton) {
    fireEvent.change(textElem),
        {
            target: { value: newTextState },
        }
    fireEvent.click(submitButton)
}

it("when searchState is '', check if alert occurs on submit", () => {
    const { getByTestId } = render(<PokeSearch />)

    const submit = getByTestId('submit-button')
    const clickEvent = createEvent.click(submit)
    console.log(clickEvent)

    // check if submit is rejected
    expect()

    expect(getByTestId('suggestions').children.length).toBe(0)
})

it('when searchState is not valid, check if alert occurs on submit', async () => {
    const { getByTestId } = render(<PokeSearch />)

    const textBox = getByTestId('search-input')
    const submit = getByTestId('submit-button')

    fireEvent.change(textBox),
        {
            target: { value: 'a' },
        }

    await waitFor(() => {
        expect(getByTestId('suggestions').children.length).toBe(8)
    })

    const clickEvent = createEvent.click(submit)
    console.log(clickEvent)
})

// test("when searchState is valid, check if window location changes on submit", () => {
//     const {findByTestId} = render(<PokeSearch />)

//     const textBox = findByTestId('search-input')
//     const submit = findByTestId('submit-button')
//     // find submit button
//     typeIntoAndSubmit('abra', textBox, submit)
//     // check if submit is accepted
//     expect()

// })

// test("when searchState is valid, check if submit occurs on keyUp enter", () => {
//     const {findByTestId} = render(<PokeSearch />)

//     const textBox = findByTestId('search-input')
//     const submit = findByTestId('submit-button')
//     // find submit button
//     typeIntoAndSubmit('abra', textBox, submit)
//     // check if submit is accepted
//     expect()

// })
