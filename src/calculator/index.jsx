import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ButtonValues } from "./Button";

export const Calculator = () => {
  const [value, setValue] = useState("");

  const btnValues = [
    7,
    8,
    9,
    "DEL",
    4,
    5,
    6,
    "+",
    1,
    2,
    3,
    "-",
    ".",
    0,
    "/",
    "*",
    "RESET",
    "=",
  ];

  const setValuesHandler = (e) => {
    const query = e.target.value;
    setValue((prev) => prev + query);
  };
  const deleteClickHandler = () => {
    setValue((prev) => prev?.slice(0, -1));
  };
  const resetClickHandler = () => {
    setValue("");
  };
  const equalClickHandler = () => {
    setValue((prev) =>
      eval(prev) % 1 === 0 ? eval(prev) : eval(prev)?.toFixed(3)
    );
  };

  const getCorrectCssClass = (btnName) => {
    if (btnName === "=") {
      return "btn equals";
    } else if (btnName === "RESET") {
      return "btn reset";
    } else if (btnName === "DEL") {
      return "btn del";
    }
    return "btn";
  };
  return (
    <div className="center-calculator-wrapper">
      <Container className="d-grid justify-content-center gap-3">
        <div className="calculator-header justify-content-end">
          <p> {value}</p>
        </div>
        <div className="calculator-body">
          {btnValues?.map((btn) => {
            return (
              <ButtonValues
                key={btn}
                className={getCorrectCssClass(btn)}
                value={btn}
                onClick={
                  btn === "DEL"
                    ? deleteClickHandler
                    : btn === "RESET"
                    ? resetClickHandler
                    : btn === "="
                    ? equalClickHandler
                    : // : btn === "."
                      // ? commaHandler
                      setValuesHandler
                }
              />
            );
          })}
        </div>
      </Container>
      ;
    </div>
  );
};
