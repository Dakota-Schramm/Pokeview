import {useState} from 'react'

/* 
    By default, should render the newest region on firstRender.
    Should 
*/



export default function RegionSlider (props) {
    const regions = props.regions
    const current = props.current
    const setCurrent = props.changeGen

    /* 
        Use map to create list elemments for each region.
        Then, select last one to set as current.

        Not sure if need a tags down below --> 
            just set onClick to change current

    */
    return (
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                {
                    regions.map((region) => {
                        if (region === current) {
                            return (
                                <li class="page-item"><a class="page-link active" aria-current="page" href="#">{region}</a></li>
                            )
                            
                        } else {
                            return (
                                <li class="page-item"><a class="page-link" href="#">{region}</a></li>
                            )
                        }
                        
                    })
                }
            </ul>
        </nav>
    )
}