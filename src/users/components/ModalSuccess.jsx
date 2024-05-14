import { Modal, Button, Row, Col } from "react-bootstrap";

export const ModalSuccess = ({ close, onClick, open, user }) => {
  console.log(user, "user");
  return (
    <Modal show={open} centered>
      <Modal.Header>
        <Modal.Title>New user successfully created</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={`https://randomuser.me/api/portraits/men/${user.id}.jpg`}
          alt={user.name}
          className="user-img"
        />
        <h4> {user?.name}</h4>
        <Row>
          <Col>
            <h6>Personal details</h6>
            <p> Username: {user?.username}</p>
            <p> Email: {user?.email}</p>

            <p> Phone: {user?.phone}</p>
            <p>
              Address: {user?.address?.city}, {user?.address?.suite}
            </p>
          </Col>
          <Col>
            <h6> Company details</h6>
            <p> Name: {user?.company?.name}</p>
            <p> Catchphrase: {user?.company?.catchPhrase}</p>
            <p> Website: {user?.website}</p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        <Button variant="primary" onClick={onClick}>
          Go back to user list
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
