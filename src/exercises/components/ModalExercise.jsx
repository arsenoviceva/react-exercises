import { Modal, Button } from "react-bootstrap";

export const ModalExercise = ({
  open,
  close,
  newTitle,
  handleChange,
  newInfo,
  onClick,
}) => {
  return (
    <Modal show={open}>
      <Modal.Header>
        <Modal.Title>Create a new exercise</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <h6 className="my-3"> Exercise title</h6>
        <input
          className="form-control"
          type="text"
          name="title"
          value={newTitle}
          onChange={handleChange}
        />
        <h6 className="my-3"> Write your exercise information here</h6>
        <textarea
          className="form-control"
          name="description"
          rows="5"
          value={newInfo}
          onChange={handleChange}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        <Button variant="primary" onClick={onClick}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
