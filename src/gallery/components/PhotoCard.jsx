import { Container, Col, Button, Card } from "react-bootstrap";

export const PhotoCard = ({ photo }) => {
  return (
    <Card>
      <Card.Img variant="top" src={photo.url} />
      <Card.Body>
        <Card.Title className="text-break-word-2lines">
          {photo.title}
        </Card.Title>
        <Card.Text>
          <strong> ALBUM ID</strong> {photo.albumId}
          <strong> ID</strong> {photo.id}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
