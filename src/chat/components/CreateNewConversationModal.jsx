import { Modal, Button, Row, Col } from "react-bootstrap";

export const CreateNewConversationModal = ({
  close,
  onClick,
  open,
  handleChange,
}) => {
  return (
    <Modal show={open} centered size="lg">
      <Modal.Header>
        <Modal.Title>Start new conversation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <div className="form-floating mb-3">
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                className="form-control"
                id="floatingUsername"
                onChange={handleChange}
              />
              <label for="floatingInput">Please enter username</label>
            </div>
            <div class="form-floating">
              <input
                type="text"
                name="message"
                class="form-control"
                id="floatingMessage"
                placeholder="Message"
                onChange={handleChange}
              />
              <label for="floatingMessage">Enter your message</label>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={close}>
          Close
        </Button>
        <Button variant="success" onClick={onClick}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
