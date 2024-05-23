import { Container, Row, Col } from "react-bootstrap";
import { TbLetterX } from "react-icons/tb";

export const InputForm = ({ filters, onClick, clearFilter }) => {
  return (
    <Container className="p-0">
      <Row className="align-items-center p-0">
        <Col>
          <div className="search-box">
            {filters?.map((tag) => {
              return (
                <p className="filter-tag">
                  {tag}
                  <TbLetterX
                    className="button-x"
                    onClick={() => clearFilter(tag)}
                  />
                </p>
              );
            })}

            <p className="clear" onClick={onClick}>
              Clear
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
