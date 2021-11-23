import {
  Container,
  Card
} from 'react-bootstrap';

export default function MyCard({ title, text, children }) {
  return (
    <div>
      <Container>
        <Card>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              {text}
            </Card.Text>
            {children}
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}
