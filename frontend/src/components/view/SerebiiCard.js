import Card from './card/Card'

export default function SerebiiCard(props) {
    const data = props.data

    return <Card cardInfo={data} testid={'serebii'} />
}
