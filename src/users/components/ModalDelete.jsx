import { Modal, Button } from "react-bootstrap";

export const ModalDelete = ({ close, onClick, open, name, user }) => {
  return (
    <Modal show={open} centered>
      <Modal.Header>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete user <strong> {name}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        <Button variant="danger" onClick={() => onClick(user.id)}>
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
