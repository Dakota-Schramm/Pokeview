import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function SerebiiCard (props) {
    const data = props.value

    return (
        <Card>
            <Card.Body>
            <Card.Title>Where to Find</Card.Title>
            <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit longer.
            </Card.Text>
            </Card.Body>
            <Button />
        </Card>
    )
}