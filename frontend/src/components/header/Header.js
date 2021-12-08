import './Header.css'
import jirachi from '../images/jirachi.png'
import eye from '../images/eye.png'
/*
    SOURCES
        Eye: https://www.deviantart.com/sureindragon/art/Jirachi-Download-207252511
*/
export default function Header() {
    return (
        <div className="header">
            <img className="header-eye" src={eye} alt="Jirachi's stomach eye" />
            <a href="/">
                <img
                    className="header-title"
                    src="https://fontmeme.com/permalink/211121/0b100e1fbcfeb91ffd617552d9dc8ed6.png"
                    alt="POKEVIEW"
                    border="0"
                />
            </a>
            <img className="header-jirachi" src={jirachi} alt="Jirachi" />
        </div>
    )
}
