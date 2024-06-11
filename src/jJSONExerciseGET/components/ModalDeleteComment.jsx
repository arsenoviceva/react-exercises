import { Modal, Button } from "react-bootstrap";

export const ModalDeleteComment = ({ close, onClick, open, id }) => {
  return (
    <Modal show={open}>
      <Modal.Header>
        <Modal.Title>
          Are you sure you want to delete comment with ID:{" "}
          <strong> {id} </strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="primary" onClick={close}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => onClick(id)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
