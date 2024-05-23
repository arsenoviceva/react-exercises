import { Container, Row, Col, Button } from "react-bootstrap";
import { faq } from "../../object/faq";
import Accordion from "react-bootstrap/Accordion";

export const FaQCard = ({ onClick, openAnswer, id }) => {
  return (
    <div className="faq-card">
      <div className="d-flex gap-3 align-items-center justify-content-start">
        <img src="images/faq/icon-star.svg" />{" "}
        <h1 className="faq-title"> FAQs</h1>
      </div>
      {faq?.map((question) => {
        return (
          //   <>
          //     <Accordion>
          //       <Accordion.Item eventKey="0">
          //         <Accordion.Header>{question.question}</Accordion.Header>
          //         <Accordion.Body>{question.answer}</Accordion.Body>
          //       </Accordion.Item>
          //     </Accordion>
          //   </>

          <div onClick={() => onClick(question.id)} className="faq-row ">
            <p className="faq-question">
              {question.question}
              <img
                src={`/images/faq/${
                  openAnswer && id === question.id
                    ? "icon-minus.svg"
                    : "icon-plus.svg"
                }`}
              />
            </p>
            {openAnswer && id === question.id ? (
              <p className="faq-answer"> {question.answer}</p>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
};
