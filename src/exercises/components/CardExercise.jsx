import Card from "react-bootstrap/Card";
import { Row, Button } from "react-bootstrap";

export const CardExercise = ({
  title,
  info,
  isFinished,
  onChange,
  id,
  onDeleteHandler,
}) => {
  return (
    <Card className="my-2">
      <Card.Header className={isFinished ? "bg-success" : ""}>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>{info}</Card.Text>
        <label className="me-2">Did you finish this task? </label>
        <input type="checkbox" onChange={() => onChange(id)} />
      </Card.Body>
      <Card.Footer>
        <Button
          variant="danger"
          disabled={isFinished}
          onClick={() => onDeleteHandler(id)}
        >
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
};
