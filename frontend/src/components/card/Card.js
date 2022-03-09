import './Card.css'

/*
    Create basic cards modeled off of these templates:
        https://codepen.io/heatherketten/pen/YaaBde

    Once fixed, change to be template for other cards.
*/
export default function Card(props) {
    /*
        container = string
        cardType = string
        cardName = string
        cardHP = int || null
        cardType = icon
        srcImage = string
        cardStats = string // Description below img
        attackOne = {
            cost = icon
            attackName = string
            damage = int
            description = string
        }
        attackTwo = {
            cost = icon
            attackName = string
            damage = int
            description = string
        }
        weakness = int / icon
        resistance = int / icon
        retreat cost = int / icon
        cardDescription = string

        testid = string

    */
    return (
        <div
            className="grid-individual-card card-background-yellow"
            data-testid={props.testid}>
            <div className="header-basic-pokemon">Basic Pokémon</div>
            <div className="header-pokemon-name">Pikachu</div>
            <div className="header-hp">40 HP</div>
            <div className="header-type-icon">☻</div>
            <div className="image-holder">
                <img
                    className="pokemon-card"
                    src="https://heatherketten.files.wordpress.com/2018/03/my_pikachu.gif"
                    alt="Pikachu"
                />
            </div>
            <div className="description-below-image-empty"></div>
            <div className="description-below-image">
                <span className="description-below-image-background">
                    Mouse Pokémon. Length: 1'4", Weight: 13 lbs.
                </span>
            </div>
            <div className="description-below-image-empty"></div>
            <div className="attack-cost">☻</div>
            <div className="attack-description attack-center">
                <span className="attack-name">Gnaw</span>
            </div>
            <div className="attack-damage">10</div>
            <div className="attack-cost">☻ ☻</div>
            <div className="attack-description">
                <span className="attack-name">Thundershock</span> Flip a coin.
                If tails, Pikachu does 10 damage to itself.
            </div>
            <div className="attack-damage">10</div>
            <div className="weakness wrr-header">weakness</div>
            <div className="resistance wrr-header">resistance</div>
            <div className="retreat wrr-header">retreat cost</div>
            <div className="weakness wrr-cost">☻</div>
            <div className="resistance wrr-cost"></div>
            <div className="retreat wrr-cost">☻</div>
            <div className="description-above-copyright">
                <ul>
                    <li className="description-above-copyright-border">
                        When several of these Pokémon gather, their electricity
                        could build and cause lightning storms. &nbsp; LV. 12
                        &nbsp; #25
                    </li>
                </ul>
            </div>
            <div className="copyright">
                <strong>Illus. Mitsuhiro Arita</strong> ©1995, 96, 98 Nintendo
                Creatures, GAMEFREAK ©1999 Wizards. <strong>58/102 ●</strong>
            </div>
        </div>
    )
}
