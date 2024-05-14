import { Modal, Button, Row, Col } from "react-bootstrap";

export const ModalCreateUser = ({
  open,
  close,
  onClick,
  user,

  handleChange,
}) => {
  return (
    <Modal show={open} size="xl">
      <Modal.Header>
        <Modal.Title>Create new user</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col>
            <h6> Please enter personal information</h6>
            <label className="form-label">Name</label>
            <input
              className="form-control my-2"
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
            <label className="form-label">Email address</label>
            <input
              className="form-control my-2"
              type="text"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
            <label className="form-label">Username</label>
            <input
              className="form-control my-2"
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Enter username"
            />
            <label className="form-label">Phone</label>
            <input
              className="form-control my-2"
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              placeholder="Enter telephone"
            />
            <label className="form-label">Street</label>
            <input
              className="form-control my-2"
              type="text"
              name="street"
              value={user.address?.street}
              onChange={(e) => handleChange(e, "address")}
              placeholder="Enter street"
            />
            <label className="form-label">Suite</label>
            <input
              className="form-control my-2"
              type="text"
              name="suite"
              value={user.address?.suite}
              onChange={(e) => handleChange(e, "address")}
              placeholder="Enter suite"
            />
            <label className="form-label">City</label>
            <input
              className="form-control my-2"
              type="text"
              name="city"
              value={user.address?.city}
              onChange={(e) => handleChange(e, "address")}
              placeholder="Enter city"
            />
            <label className="form-label">Zipcode</label>
            <input
              className="form-control my-2"
              type="text"
              name="zipcode"
              value={user.address?.zipCode}
              onChange={(e) => handleChange(e, "address")}
              placeholder="Enter zipcode"
            />
            {/* <label class="form-label" for="customFile">
              Choose file
            </label>
            <input
              type="file"
              class="form-control"
              id="customFile"
              value={user.imgUrl}
              onChange={handleChange}
            /> */}
          </Col>
          <Col>
            <h6> Please enter company information</h6>

            <select
              onChange={(e) => handleChange(e, "company")}
              name="name"
              value={user.company?.name}
              className="my-2 form-select text-black"
            >
              <option value="Choose"> Choose company</option>
              <option value="Hoeger LLC">Hoeger LLC</option>
              <option value="Yost and Sons"> Yost and Sons </option>
              <option value="Abernathy Group"> Abernathy Group </option>
            </select>
            {/* <input
              className="form-control my-2"
              type="text"
              name="name"
              value={user.company?.name}
              onChange={(e) => handleChange(e, "company")}
              placeholder="Enter name"
            /> */}
            <label className="form-label">Catchphrase</label>
            <input
              className="form-control my-2"
              type="text"
              name="catchPhrase"
              value={user.company?.catchPhrase}
              onChange={(e) => handleChange(e, "company")}
              placeholder="Enter catchphrase"
            />
            <label className="form-label">Goal</label>
            <input
              className="form-control my-2"
              type="text"
              name="bs"
              value={user.company?.goal}
              onChange={(e) => handleChange(e, "company")}
              placeholder="Enter goal"
            />
            <label className="form-label">Website</label>
            <input
              className="form-control my-2"
              type="text"
              name="website"
              value={user.website}
              onChange={handleChange}
              placeholder="Enter webcsite"
            />
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        <Button variant="primary" onClick={onClick}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
