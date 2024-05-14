import { Col, Button } from "react-bootstrap";

export const FilterRecipe = ({
  searchQuery,
  handleSearch,
  selectedCategory,
  handleChange,
  onClick,
}) => {
  return (
    <div className="row align-items-end w-100 my-5">
      <Col md={5} className="d-flex flex-column">
        <h6> Search your receipt: </h6>
        <input
          type="text"
          placeholder="Search receipts"
          className="form-control"
          value={searchQuery}
          onChange={handleSearch}
        />
      </Col>
      <Col md={5} className="d-flex flex-column">
        <h6> Filter by categories </h6>
        <select
          onChange={handleChange}
          className="form-select text-black"
          value={selectedCategory}
        >
          <option value="All"> All</option>
          <option value="Main course"> Main course</option>
          <option value="Dessert"> Dessert </option>
          <option value="Salad"> Salad </option>
        </select>
      </Col>
      <Col md={2}>
        <Button className="" onClick={onClick}>
          {" "}
          Create new receipt{" "}
        </Button>
      </Col>
    </div>
  );
};
