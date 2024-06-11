import { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { BACKEND_URL } from "../JSONURL";
import axios from "axios";
import { toast } from "react-toastify";
import { Card, Button } from "react-bootstrap";
import { FaPencil, FaDeleteLeft } from "react-icons/fa6";
import { useNavigate } from "react-router";

export const JsonExerciseGetUser = () => {
  const { id } = useParams();
  const [selectedComment, setSelectedComment] = useState();
  const navigate = useNavigate();

  console.log(id, "id");

  const showAllComments = () => {
    navigate(`/jsonexerciseget`);
  };
  useEffect(() => {
    if (!!id) {
      axios
        .get(`${BACKEND_URL}/comments/${id}`)
        .then((response) => {
          if (response?.data) {
            const selected = response?.data;
            console.log(selected, "selected");
            setSelectedComment(selected);
            // setChosenComment(true);
          }
        })
        .catch((error) => {
          toast.error(error?.message);
        });
    }
  }, [id]);
  return (
    <div className="background-gradient d-flex align-items-center justify-content-center">
      <Card className=" mx-1 my-2 w-50">
        <Card.Header>
          <Card.Title className="m-0">ID: {selectedComment?.id}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            Post ID: {selectedComment?.postId}
          </Card.Subtitle>
          <Card.Text className=" ">
            <p className="text-break-word">
              <strong> Name </strong> : {selectedComment?.name}
            </p>
            <p className="text-break-word">
              <strong> Body: </strong> {selectedComment?.body}
            </p>
            <p>
              <strong> Email: </strong>
              {selectedComment?.email}
            </p>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <div className="d-flex align-items-center justify-content-end gap-3  ">
            <Button onClick={showAllComments} className="btn-bg-color">
              {" "}
              Go back
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};
