import { Container, Row, Col, Button } from "react-bootstrap";
import { Header } from "./components/Header";
import { FaQCard } from "./components/FaQ";
import { useState } from "react";
import { faq } from "../object/faq";

export const FaQ = () => {
  const [openAnswer, setOpenAnswer] = useState(false);
  const [id, setId] = useState(0);

  const openAnswerHandler = (selectedId) => {
    setOpenAnswer(!openAnswer);
    setId(selectedId);
  };
  return (
    <div className="h-100">
      <Header />
      <div className="faq-body-container">
        <FaQCard onClick={openAnswerHandler} openAnswer={openAnswer} id={id} />
      </div>
    </div>
  );
};
