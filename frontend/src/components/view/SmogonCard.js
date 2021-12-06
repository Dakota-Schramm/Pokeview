import Card from './card/Card'

export default function SmogonCard(props) {
    const data = props.data

    return <Card cardInfo={data} testid={'smogon'} />
}
