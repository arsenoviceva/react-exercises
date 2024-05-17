import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

export const Calculator = () => {
  const [value, setValue] = useState("");
  return (
    <div className="center-calculator-wrapper">
      <Container className="d-grid justify-content-center gap-3">
        <Row className="calculator-header">
          <div className="prev-output">
            <p> {value} </p>
          </div>
          {/* <div className="curr-output">
            <p> current</p>
          </div> */}
        </Row>
        <Row className="calculator-body">
          <Col sm={3}>
            <input
              type="button"
              className="form-input"
              value="7"
              onClick={(e) => setValue(value + e.target.value)}
            />
            {/* <Button>7</Button> */}
          </Col>
          <Col sm={3}>
            <Button value="8" onClick={(e) => setValue(value + e.target.value)}>
              8
            </Button>
          </Col>
          <Col sm={3}>
            <Button value="9" onClick={(e) => setValue(value + e.target.value)}>
              9
            </Button>
          </Col>
          <Col sm={3}>
            <Button className="bg-primary text-white">DEL</Button>
          </Col>
          <Col sm={3}>
            <Button value="4" onClick={(e) => setValue(value + e.target.value)}>
              4
            </Button>
          </Col>
          <Col sm={3}>
            <Button value="5" onClick={(e) => setValue(value + e.target.value)}>
              5
            </Button>
          </Col>
          <Col sm={3}>
            <Button value="6" onClick={(e) => setValue(value + e.target.value)}>
              6
            </Button>
          </Col>
          <Col sm={3}>
            <Button>+</Button>
          </Col>
          <Col sm={3}>
            <Button value="1" onClick={(e) => setValue(value + e.target.value)}>
              1
            </Button>
          </Col>
          <Col sm={3}>
            <Button value="2" onClick={(e) => setValue(value + e.target.value)}>
              2
            </Button>
          </Col>
          <Col sm={3}>
            <Button value="3" onClick={(e) => setValue(value + e.target.value)}>
              3
            </Button>
          </Col>
          <Col sm={3}>
            <Button>-</Button>
          </Col>
          <Col sm={3}>
            <Button value="." onClick={(e) => setValue(value + e.target.value)}>
              .
            </Button>
          </Col>
          <Col sm={3}>
            <Button>0</Button>
          </Col>
          <Col sm={3}>
            <Button>/</Button>
          </Col>
          <Col sm={3}>
            <Button>x</Button>
          </Col>
          <Col sm={6}>
            <Button className="bg-primary text-white">RESET</Button>
          </Col>
          <Col sm={6}>
            <Button className="bg-danger text-white">=</Button>
          </Col>
        </Row>
      </Container>
      ;
    </div>
  );
};
