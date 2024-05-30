import { useEffect, useState } from "react";
import { BACKEND_URL } from "./JSONURL";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const JsonExerciseGet = () => {
  const [comments, setComments] = useState([]);
  const [params, setParams] = useState({
    _start: 0,
    _limit: 10,
  });

  const pages = 500 / 10;

  const changeParamsHandler = (index) => {
    setParams((prev) => ({
      ...prev,
      _start: index,
    }));
  };

  useEffect(() => {
    console.log(params, "params");
    axios
      .get(`${BACKEND_URL}/comments`, {
        params: params,
      })
      .then((response) => {
        setComments(response.data);
        console.log(comments);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  }, [JSON.stringify(params)]);

  return (
    <Container>
      <Row>
        {!!comments?.length && (
          <div className="d-flex flex-wrap align-items-center gap-1 p-0 justify-content-center my-3">
            {Array.from({ length: pages }, (_, index) => (
              <Button
                className={
                  params._start === index * 10 ? "bg-info text-black" : ""
                }
                variant="primary"
                key={index}
                onClick={() => changeParamsHandler(index * 10)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        )}
        {comments?.map((comment) => {
          return (
            <div className="border border-1 rounded-2 bg-primary text-white my-2">
              <p className="fs-4"> ID: {comment.id} </p>
              <p className="fs-5"> POST ID: {comment.postId} </p>
              <p> NAME: {comment.name} </p>
              <p> BODY: {comment.body} </p>
              <p> EMAIL: {comment.email} </p>
            </div>
          );
        })}
      </Row>
    </Container>
  );
};
