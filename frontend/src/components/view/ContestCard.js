import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function ContestCard (props) {
    const data = props.value

    return (
        <Card>
            <Card.Body>
            <Card.Title>Smogon Strategy</Card.Title>
            <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit longer.
            </Card.Text>
            </Card.Body>
            <Button />
        </Card>
    )
}