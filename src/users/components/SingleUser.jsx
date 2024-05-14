import { UserCard } from "./UserCard";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const SingleUser = () => {
  const param = useParams();
  const allUsers = JSON.parse(localStorage.getItem("listOfUsers"));
  const curretnUser = allUsers.find((user) => user.id === +param.id);
  return (
    <Container>
      <Row className="w-100">
        <Col>
          <UserCard user={curretnUser} isSingleUser />
        </Col>
      </Row>
    </Container>
  );
};
