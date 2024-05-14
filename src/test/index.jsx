import { Container, Button, Row, Col } from "react-bootstrap";
import { listOfQuestions } from "../object/listOfQuestions";
import { useState } from "react";

const initialResult = {
  correctAnswers: 0,
  wrongAnswers: 0,
};

export const Test = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIdx, setAnswerIdx] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(initialResult);
  const [showResult, setShowResult] = useState(false);
  const [clicked, setClicked] = useState(false);

  const { question, answers, correctAnswer } = listOfQuestions[currentQuestion];

  const onAnswerClick = (answer, index) => {
    setAnswerIdx(index);
    if (answer === correctAnswer) {
      setAnswer(true);
    } else {
      setAnswer(false);
    }
    setClicked(true);
  };

  const onClickNext = () => {
    setClicked(false);
    setAnswerIdx(null);
    setResult((prev) =>
      answer
        ? {
            ...prev,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (currentQuestion !== listOfQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
  };

  const onClickStart = () => {
    setShowResult(false);
    setResult(initialResult);
    setAnswerIdx(null);
    setAnswer(null);
  };
  console.log(answerIdx, correctAnswer);

  return (
    <Container>
      <h1 className="mt-5"> Kviz znanja</h1>
      {!showResult ? (
        <div className="quiz-container">
          <span className="active-question-no"> {currentQuestion + 1} </span>
          <span className="total-question"> / {listOfQuestions.length} </span>
          <h4> {question}</h4>
          <ul>
            {answers.map((item, index) => (
              <li
                key={item}
                className={
                  !!answerIdx
                    ? answerIdx === index + 1
                      ? answer
                        ? "selected-answer-true bg-success"
                        : "selected-answer-false bg-danger"
                      : item === correctAnswer
                      ? "selected-answer-true"
                      : "selected-answer-false"
                    : ""
                }
              >
                <Button
                  className="bg-transparent border-0 text-black w-100 text-start"
                  disabled={clicked}
                  onClick={() => onAnswerClick(item, index + 1)}
                >
                  {item}
                </Button>
              </li>
            ))}
          </ul>
          <div className="footer">
            <Button onClick={onClickNext} disabled={answerIdx === null}>
              {currentQuestion === listOfQuestions.length - 1
                ? "Finish"
                : "Next"}
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <h5 className="my-3"> Result: </h5>
          <Row className="w-100">
            <Col lg={4}>
              Total questions: <strong> {listOfQuestions.length} </strong>
            </Col>
            <Col lg={4}>
              Correct answers: <strong> {result.correctAnswers} </strong>
            </Col>
            <Col lg={4}>
              Wrong answers: <strong> {result.wrongAnswers} </strong>
            </Col>
          </Row>

          <Button onClick={onClickStart} className="my-3">
            {" "}
            Start again
          </Button>
        </div>
      )}
    </Container>
  );
};
