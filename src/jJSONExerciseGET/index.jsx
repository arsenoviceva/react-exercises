import { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "./JSONURL";
import axios from "axios";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Comment } from "./components/Comment";
import { ModalDeleteComment } from "./components/ModalDeleteComment";
import { CommentForm } from "./components/CommentForm";
import { FaPencil, FaDeleteLeft } from "react-icons/fa6";
import { useNavigate } from "react-router";
export const JsonExerciseGet = () => {
  const [comments, setComments] = useState([]);
  const [params, setParams] = useState({
    _start: 0,
    _limit: 12,
  });
  const [openForm, setOpenForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState([]);
  const [chosenComment, setChosenComment] = useState(false);
  const formRef = useRef(null);
  const navigate = useNavigate();
  const changeParamsHandler = (index) => {
    setParams((prev) => ({
      ...prev,
      _start: index,
    }));
  };

  const openFormHandler = () => {
    setSelectedComment((prev) => ({
      ...prev,
      name: "",
      id: undefined,
      body: "",
      email: "",
      postId: "",
    }));
    setOpenForm(true);
  };

  const openModalHandler = (commentId) => {
    const currentComment = comments.find((comment) => comment.id === commentId);
    setSelectedComment(currentComment);
    setOpenModal(!openModal);
  };
  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const handleDelete = (commentId) => {
    axios
      .delete(`${BACKEND_URL}/comments/${commentId}`)
      .then((response) => {
        console.log(response);
        if (JSON.stringify(response?.data) === "{}") {
          setComments((prev) =>
            prev?.filter((comment) => comment.id !== commentId)
          );
        }
        setOpenModal(false);
        setSelectedComment((prev) => ({
          ...prev,
          name: "",
          id: undefined,
          body: "",
          email: "",
          postId: "",
        }));
        setChosenComment(false);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  const closeFormHandler = () => {
    setSelectedComment([]);
    setOpenForm(!openForm);
  };

  // const saveCommentHandler = (isUpdate, id) => {
  //   if (isUpdate) {
  //     const updatedComment = comments?.map((comment) => {
  //       if (comment.id === id) {
  //         return selectedComment;
  //       }
  //       return comment;
  //     });

  //     setComments(updatedComment);
  //   } else {
  //     const newComment = comments.concat({
  //       ...selectedComment,
  //       id: Math.floor(Math.random() * (1000 - 500 + 1)) + 500,
  //     });
  //     setComments(newComment);
  //   }
  //   setOpenForm(false);
  //   setSelectedComment([]);
  // };

  const handleCreate = () => {
    console.log(selectedComment, "selectedCommentselectedComment");
    axios
      .post(
        `${BACKEND_URL}/comments`,
        {
          postId:
            selectedComment.postId.length === 0
              ? alert("Must select PostId")
              : selectedComment.postId,
          name:
            selectedComment.name.length === 0
              ? alert("Must write comment name")
              : selectedComment.name,
          email:
            selectedComment.email.length === 0
              ? alert("Must write email adress")
              : selectedComment.email,
          body:
            selectedComment.body.length === 0
              ? alert("Must write comment body")
              : selectedComment.body,
        },
        {
          headers: {
            marija: true,
            tamara: 123,
          },
        }
      )
      .then((response) => {
        console.log(response, "response");
        if (response?.data) {
          setComments((prev) => prev?.concat(response?.data));
        }
        setOpenForm(false);
        setSelectedComment([]);
      })

      .catch((error) => {
        toast.error(error?.message);
      });
  };

  const handleUpdate = (commentId) => {
    axios
      .put(
        `${BACKEND_URL}/comments/${commentId}`,
        {
          postId: selectedComment.postId,
          name: selectedComment.name,
          email: selectedComment.email,
          body: selectedComment.body,
        },
        {
          headers: {
            marija: true,
            tamara: 123,
          },
        }
      )
      .then((response) => {
        if (response?.data) {
          const updatedElement = response?.data;
          setComments((prev) =>
            prev?.map((comment) => {
              if (comment.id === updatedElement?.id) {
                return updatedElement;
              }
              return comment;
            })
          );
        }
        // setSelectedComment([]);

        setOpenForm(false);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  const openCommentHandler = (id) => {
    navigate(`/jsonexerciseget/${id}`);
  };
  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    console.log(value, name);
    setSelectedComment((prev) => ({ ...prev, [name]: value }));
  };

  const openUpdateForm = (id) => {
    const chosenComment = comments.find((comment) => comment.id === id);
    setSelectedComment(chosenComment);
    setOpenForm(true);
    // formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (openForm) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedComment]);

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
    <div className="background-gradient">
      <Container className="h-100">
        <Button
          className="mt-5 bg-info border-0 text-black"
          onClick={openFormHandler}
        >
          Create new comment
        </Button>
        <Row>
          <div className="col-12 ">
            {!!comments?.length && (
              <div className="d-flex flex-wrap align-items-center gap-1 p-0 justify-content-center my-3">
                {Array.from({ length: 50 }, (_, index) => (
                  <Button
                    className={`border-0 ${
                      params._start === index * 10
                        ? "btn-bg-color"
                        : "bg-info text-black "
                    }`}
                    key={index}
                    onClick={() => changeParamsHandler(index * 10)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            )}
          </div>
          {openForm && (
            <div ref={formRef}>
              <CommentForm
                closeFormHandler={closeFormHandler}
                onClick={selectedComment.id ? handleUpdate : handleCreate}
                onChange={onChangeHandler}
                selectedComment={selectedComment}
              />
            </div>
          )}
          {/* {chosenComment ? (
            <Card className="  mx-1 my-2">
              <Card.Header>
                <Card.Title className="m-0">
                  ID: {selectedComment.id}
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">
                  Post ID: {selectedComment.postId}
                </Card.Subtitle>
                <Card.Text className=" ">
                  <p className="text-break-word">
                    <strong> Name </strong> : {selectedComment.name}
                  </p>
                  <p className="text-break-word">
                    <strong> Body: </strong> {selectedComment.body}
                  </p>
                  <p>
                    <strong> Email: </strong>
                    {selectedComment.email}
                  </p>
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <div className="d-flex align-items-center justify-content-end gap-3  ">
                  <FaPencil
                    className="fs-5 cursor-pointer"
                    onClick={() => openUpdateForm(selectedComment.id)}
                  />
                  <FaDeleteLeft
                    className="fs-5 cursor-pointer"
                    onClick={() => openModalHandler(selectedComment.id)}
                  />{" "}
                  <Button onClick={showAllComments} className="btn-bg-color">
                    {" "}
                    Go back
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          ) : ( */}
          {comments?.map((comment) => {
            return (
              <Comment
                selectedComment={selectedComment}
                key={comment.id}
                comment={comment}
                onClick={openModalHandler}
                openUpdateForm={openUpdateForm}
                chosen={chosenComment}
                openCommentHandler={openCommentHandler}
              />
            );
          })}
        </Row>
      </Container>
      <ModalDeleteComment
        open={openModal}
        close={closeModalHandler}
        id={selectedComment.id}
        onClick={handleDelete}
      />
    </div>
  );
};
