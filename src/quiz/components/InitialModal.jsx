import { Modal, Button } from "react-bootstrap";

export const InitialModal = ({
  open,
  close,
  handleChange,
  onClick,
  numOfInput,
  minNumm,
  maxNumm,
  handleChangeMin,
  handleChangeMax,
}) => {
  return (
    <Modal show={open} centered size="lg">
      <Modal.Header>
        <Modal.Title>Customize the test</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        How many questions would you want this quiz to contain? Please input the
        desired amount below.
        <div className="d-flex align-items-center gap-2">
          <input
            className="form-control ps-0 my-2"
            type="text"
            name="numOfInput"
            value={numOfInput}
            placeholder="Enter number of tasks"
            onChange={handleChange}
          />
          <input
            className="form-control ps-0 my-2"
            type="text"
            name="minNum"
            value={minNumm}
            placeholder="Enter minimum number of range"
            onChange={handleChangeMin}
          />
          <input
            className="form-control ps-0 my-2"
            type="text"
            name="maxNum"
            value={maxNumm}
            placeholder="Enter maximum number of range"
            onChange={handleChangeMax}
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        <Button variant="primary" onClick={onClick}>
          {" "}
          Generate Quiz
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
