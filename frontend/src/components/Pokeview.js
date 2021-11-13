import {useState, useEffect} from 'react'

const Pokeview = props => {
    const [info, setInfo] = useState("");

    useEffect(()=> {
        fetch("/test")
        .then((res) => {
            return res.json()
        })
        .then((json) => {
            setInfo(json.test)
        })
    }, [])

    const output

    return (
        <h1>{info}</h1>
    )
}

export default Pokeview;