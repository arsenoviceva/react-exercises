import { Modal, Button } from "react-bootstrap";

export const ModalDelete = ({ close, onClick, open, title }) => {
  return (
    <Modal show={open}>
      <Modal.Header>
        <Modal.Title>
          Are you sure you want to delete recipe <strong> {title} </strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          No
        </Button>
        <Button variant="primary" onClick={onClick}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
