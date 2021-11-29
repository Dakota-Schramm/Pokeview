import { useEffect, useState } from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import Placeholder from 'react-bootstrap/Placeholder'

import '../css/RegionSlider.css'

/* 
    By default, should render the newest region on firstRender.
    
    Creates ToggleButtonGroup of type radio with 
    React controlled elements for slider.

    TODO
        Implement onLoading action for buttons
*/

export default function RegionSlider(props) {
    const generations = props.regions
    const current = props.current
    console.log(current)
    const setCurrent = props.changeGen

    const [value, setValue] = useState('')

    /*
     * The second argument that will be passed to
     * `handleChange` from `ToggleButtonGroup`
     * is the SyntheticEvent object, but we are
     * not using it in this example so we will omit it.
     */
    const handleChange = (val) => setValue(val)

    /* 
        Use map to create list elemments for each region.
        Then, select last one to set as current.

        Not sure if need a tags down below --> 
            just set onClick to change current

    */

    useEffect(() => {
        console.log('Value changed', current)
        setValue(current)
    }, [current])

    function displaySlider() {
        console.log(generations)
        if (generations !== []) {
            return generations.map((region, idx) => {
                return (
                    /* Change to onLoading when scrapers loading*/
                    <ToggleButton id={'tbg-radio-' + idx} value={idx}>
                        {region}
                    </ToggleButton>
                )
            })
        }
    }

    return (
        <div className="region-slider-buttons">
            <ToggleButtonGroup
                type="radio"
                name="generations"
                value={value}
                onChange={handleChange}
                defaultValue={value}>
                {displaySlider()}
            </ToggleButtonGroup>
        </div>
    )
}
