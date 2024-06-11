import { Container, Row, Col, Card, Placeholder } from "react-bootstrap";

export const PlaceholderCard = ({ length }) => {
  return (
    <Container>
      <Row>
        {Array.from({ length: length }, (_, index) => (
          <Col lg={4} className="my-3" key={index}>
            <Card>
              <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={12} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                  <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                  <Placeholder xs={8} />
                </Placeholder>
                <div className="d-flex justify-content-between my-3">
                  <Placeholder xs={2} />
                  <Placeholder.Button bg="post-list-button" xs={3} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
