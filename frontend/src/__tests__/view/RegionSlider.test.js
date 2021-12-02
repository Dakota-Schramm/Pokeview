import { unmountComponentAtNode } from 'react-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node' // used for server mocking
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import RegionSlider from '../../components/view/region-slider/RegionSlider'

test('if passed empty regions, check that RegionSlider does not render', () => {
    const { container } = render(<RegionSlider regions={[]} current="" />)
    expect(container.children.length == 0)
})

test('if passed entries in regions, check that RegionSlider renders', () => {
    const regions = ['One', 'Two', 'Three', 'Four', 'Five']
    const { container } = render(<RegionSlider regions={regions} current="" />)
    expect(container.children.length == 5)
})
