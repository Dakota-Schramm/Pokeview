import 'bootstrap/dist/css/bootstrap.min.css'

import { Pokeview, PokeSearch, Footer } from './components'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PokeSearch />} />
                <Route path=":pokemon" element={<Pokeview />} />
            </Routes>
        </Router>
    )
}

export default App
