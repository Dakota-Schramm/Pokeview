import Card from './Card'

export default function SerebiiCard(props) {
    const data = props.data

    return <Card cardInfo={data} testid={'serebii'} />
}
