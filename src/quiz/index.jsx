import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { InitialModal } from "./components/InitialModal";

export const Quiz = () => {
  const [openModal, setOpenModal] = useState(false);
  const [inputNumber, setInputNumber] = useState("");
  const [questions, setQuestions] = useState([]);
  const [spentTime, setSpentTime] = useState({ start: 0, end: 0 });
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setInputNumber(value);
  };

  const handleChangeMin = (e) => {
    const { value } = e.target;
    setMin(value);
  };
  const handleChangeMax = (e) => {
    const { value } = e.target;
    setMax(value);
  };
  const generateRandomNumbers = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const generateHandler = () => {
    const array = Array(+inputNumber).fill({});
    setQuestions(
      array.map((item) => ({
        a: generateRandomNumbers(min, max),
        b: generateRandomNumbers(min, max),
        result: "",
        id: Math.random(),
      }))
    );
    setSpentTime((prev) => ({ ...prev, start: new Date().getTime() }));
    setOpenModal(false);
  };

  const openModalHandler = () => {
    setOpenModal(true);
  };
  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const handleResult = (value, id) => {
    setQuestions((prev) =>
      prev.map((currentItem) => {
        if (currentItem.id === id) {
          return {
            ...currentItem,
            result: +value,
          };
        }
        return currentItem;
      })
    );
  };
  const clickHandler = () => {
    const list = questions.map((item) => {
      if (item.a + item.b === item.result) {
        return {
          ...item,
          isCorrect: true,
          isSubmitted: true,
        };
      }
      return {
        ...item,
        isCorrect: false,
        isSubmitted: true,
      };
    });
    setSpentTime((prev) => ({ ...prev, end: new Date().getTime() }));

    setQuestions(list);
  };

  const totalCorrect = questions?.reduce(
    (prev, curr) => (curr.a + curr.b === curr.result ? prev + 1 : prev),
    0
  );

  const totalWrong = questions?.reduce(
    (prev, curr) => (curr.a + curr.b !== curr.result ? prev + 1 : prev),
    0
  );

  return (
    <Container>
      <Row className="w-100 my-3 ">
        <h1> Quiz </h1>
        <p className="d-flex p-0 gap-1 align-items-center">
          {" "}
          Would you like to take the test? If yes, click{" "}
          <Button className="p-0" onClick={openModalHandler}>
            {" "}
            here{" "}
          </Button>
        </p>
      </Row>
      <Row className="align-items-center gy-3">
        {questions?.map((question, index) => {
          return (
            <React.Fragment key={index}>
              <Col
                xs={question?.isSubmitted ? 1 : 2}
                className="d-flex align-items-center"
              >
                <h5 className="mb-0">{index + 1}.</h5>
              </Col>
              <Col xs={3} className="d-flex align-items-center">
                <label htmlFor="a"></label>
                <Form.Control value={question.a} disabled />
              </Col>
              <Col
                xs={1}
                className="d-flex align-items-center justify-content-center"
              >
                +
              </Col>
              <Col xs={3} className="d-flex align-items-center">
                <label htmlFor="a"></label>
                <Form.Control value={question.b} disabled />
              </Col>
              <Col
                xs={1}
                className="d-flex align-items-center justify-content-center"
              >
                =
              </Col>
              <Col xs={2} className="d-flex align-items-center">
                <label htmlFor="a"></label>
                <Form.Control
                  value={question.result}
                  onChange={(e) => handleResult(e.target.value, question.id)}
                  name="result"
                />
              </Col>
              {question?.isSubmitted && (
                <>
                  {question.isCorrect ? (
                    <Col xs={1}>
                      <label className="bg-success p-2 rounded-1">
                        {" "}
                        Correct
                      </label>
                    </Col>
                  ) : (
                    <Col xs={1}>
                      <label className="bg-danger p-2 rounded-1">
                        {" "}
                        Incorrect
                      </label>
                    </Col>
                  )}
                </>
              )}
            </React.Fragment>
          );
        })}
        {questions?.length ? (
          <Button variant="primary" className="w-auto" onClick={clickHandler}>
            Submit
          </Button>
        ) : (
          ""
        )}
        {questions?.length
          ? questions.every((question) => question.isSubmitted) && (
              <div className="d-flex align-items-center gap-3 py-5">
                <label className="bg-success p-2 rounded-1">
                  Number of corrected answers is : {totalCorrect}
                </label>
                <label className="bg-danger p-2 rounded-1">
                  Number of wrong answers is : {totalWrong}
                </label>
                <label className="bg-success p-2 rounded-1">
                  Percent of correct : {(100 / questions.length) * totalCorrect}
                  %
                </label>
                <label className="bg-danger p-2 rounded-1">
                  Your total time spent is :{" "}
                  <strong>
                    {((spentTime.end - spentTime.start) / 1000).toFixed(2)}s
                  </strong>
                </label>
                <Button variant="primary" onClick={openModalHandler}>
                  Restart the quiz
                </Button>
              </div>
            )
          : ""}
        {/* {buttonSubmit ? (
          
        ) : null} */}
      </Row>
      <InitialModal
        open={openModal}
        close={closeModalHandler}
        handleChange={handleChange}
        onClick={generateHandler}
        handleChangeMin={handleChangeMin}
        handleChangeMax={handleChangeMax}
      />
    </Container>
  );
};
