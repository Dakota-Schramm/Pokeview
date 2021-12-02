import { useEffect, useState } from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import Placeholder from 'react-bootstrap/Placeholder'

import './RegionSlider.css'

/* 
    By default, should render the newest region on firstRender.
    
    Creates ToggleButtonGroup of type radio with 
    React controlled elements for slider.

    TODO
        Implement onLoading action for buttons
        Need to fix onChange handler.
*/

export default function RegionSlider(props) {
    const generations = props.regions
    const current = props.current
    const setCurrent = props.changeGen

    function displaySlider() {
        if (generations !== []) {
            return generations.map((region, idx) => {
                return (
                    /* Change to onLoading when scrapers loading*/
                    <ToggleButton
                        id={'tbg-radio-' + idx}
                        data-testid={'radio' + idx}
                        value={idx}>
                        {region}
                    </ToggleButton>
                )
            })
        }
    }

    return (
        <div className="region-slider-buttons" data-testid="region-slider">
            <ToggleButtonGroup
                type="radio"
                name="generations"
                value={current}
                onChange={(val) => setCurrent(val)}
                defaultValue={current}>
                {displaySlider()}
            </ToggleButtonGroup>
        </div>
    )
}
