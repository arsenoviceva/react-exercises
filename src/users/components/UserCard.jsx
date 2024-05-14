import { isDisabled } from "@testing-library/user-event/dist/utils";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const UserCard = ({
  user,
  isSingleUser,
  onClick,
  isDeleted,
  restore,
}) => {
  const navigate = useNavigate();
  const { name, username, email, phone, id, address, website, company } = user;

  return (
    <Card className={`${isDeleted ? "border-danger" : ""} mb-3`}>
      <Card.Header>
        <Row className="align-items-center">
          <Col md={2}>
            <img
              src={`https://randomuser.me/api/portraits/men/${id}.jpg`}
              alt={name}
              className="user-img"
            />
          </Col>
          <Col md={10}>
            <h4>{name}</h4>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <h6> Personal details </h6>
            <p> Username: {username}</p>
            <p> Email: {email} </p>
            <p> Phone: {phone}</p>
            <p>
              {" "}
              Address : {address?.city}, {address?.street}, {address?.suite}
            </p>
          </Col>
          <Col>
            <h6> Company details </h6>
            <p> Name: {company?.name}</p>
            <p> Catchphrase: {company?.catchPhrase} </p>
            <p> Website: {website}</p>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        {isSingleUser ? (
          <div className="">
            <Button onClick={() => navigate(`/users/`)}>Back</Button>
          </div>
        ) : (
          <div className="d-flex justify-content-end gap-2">
            <Button
              onClick={() => navigate(`/users/${id}`)}
              disabled={isDeleted}
            >
              Open
            </Button>
            {!isDeleted ? (
              <Button variant="danger" onClick={() => onClick(id)}>
                Delete
              </Button>
            ) : (
              <Button variant="success" onClick={() => restore(id)}>
                {" "}
                Restore{" "}
              </Button>
            )}
          </div>
        )}
      </Card.Footer>
    </Card>
  );
};
