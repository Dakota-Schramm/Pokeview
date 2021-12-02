import './Card.css'

/*
    Create basic cards modeled off of these templates:
        https://codepen.io/heatherketten/pen/VXxedL

    Once fixed, change to be template for other cards.
*/
export default function Card(props) {
    /*
        cardInfo = {

        }

    */
    return (
        <div class="grid-individual-card card-background-yellow">
            <div class="header-basic-pokemon">Basic Pokémon</div>
            <div class="header-pokemon-name">Pikachu</div>
            <div class="header-hp">40 HP</div>
            <div class="header-type-icon">☻</div>
            <div class="image-holder">
                <img
                    className="pokemon-card"
                    src="https://heatherketten.files.wordpress.com/2018/03/my_pikachu.gif"
                    alt="Pikachu"
                />
            </div>
            <div class="description-below-image-empty"></div>
            <div class="description-below-image">
                <span class="description-below-image-background">
                    Mouse Pokémon. Length: 1'4", Weight: 13 lbs.
                </span>
            </div>
            <div class="description-below-image-empty"></div>
            <div class="attack-cost">☻</div>
            <div class="attack-description attack-center">
                <span class="attack-name">Gnaw</span>
            </div>
            <div class="attack-damage">10</div>
            <div class="attack-cost">☻ ☻</div>
            <div class="attack-description">
                <span class="attack-name">Thundershock</span> Flip a coin. If
                tails, Pikachu does 10 damage to itself.
            </div>
            <div class="attack-damage">10</div>
            <div class="weakness wrr-header">weakness</div>
            <div class="resistance wrr-header">resistance</div>
            <div class="retreat wrr-header">retreat cost</div>
            <div class="weakness wrr-cost">☻</div>
            <div class="resistance wrr-cost"></div>
            <div class="retreat wrr-cost">☻</div>
            <div class="description-above-copyright">
                <ul>
                    <li class="description-above-copyright-border">
                        When several of these Pokémon gather, their electricity
                        could build and cause lightning storms. &nbsp; LV. 12
                        &nbsp; #25
                    </li>
                </ul>
            </div>
            <div class="copyright">
                <strong>Illus. Mitsuhiro Arita</strong> ©1995, 96, 98 Nintendo
                Creatures, GAMEFREAK ©1999 Wizards. <strong>58/102 ●</strong>
            </div>
        </div>
    )
}
