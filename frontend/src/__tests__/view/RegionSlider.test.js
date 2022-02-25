import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import RegionSlider from '../../components/view/region-slider/RegionSlider'
import convertRomanNumeralToInt from '../../components/view/region-slider/convertRomanToInt'

test('if passed empty regions, check that RegionSlider does not render', () => {
    const { getByTestId } = render(<RegionSlider regions={[]} current={-1} />)
    // Need to navigate to ToggleButtonGroup
    const slider = getByTestId('region-slider')
    expect(slider.firstChild.children.length).toBe(0)
})

test('if passed entries in regions, check that RegionSlider renders', () => {
    // Should render 2*n children (label and input for each button)
    const regions = ['Gen I', 'Gen II', 'Gen III', 'Gen IV', 'Gen V']
    const { getByTestId, debug } = render(
        <RegionSlider regions={regions} current={1} />
    )

    const slider = getByTestId('region-slider')

    // Need to navigate to ToggleButtonGroup
    expect(slider.firstChild.children.length).toBe(10)
})

test('if passed entries in regions, check that ToggleButton value reflects region rendered', () => {
    const regions = ['Gen III', 'Gen IV', 'Gen V']
    const { getByTestId, getByText, debug } = render(
        <RegionSlider regions={regions} current={1} />
    )

    const button0 = getByTestId('radio-0')
    const button1 = getByTestId('radio-1')
    const button2 = getByTestId('radio-2')

    expect(button0).toBeDefined()
    expect(button1).toBeDefined()
    expect(button2).toBeDefined()

    expect(getByText('Gen III')).toBeDefined()
    expect(getByText('Gen IV')).toBeDefined()
    expect(getByText('Gen V')).toBeDefined()
})
