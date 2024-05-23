import { useEffect, useState } from "react";
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ModalExercise } from "./components/ModalExercise";
import { CardExercise } from "./components/CardExercise";
import { ModalDelete } from "./components/ModalDelete";

const initialCreateTask = {
  title: "",
  description: "",
};

export const Exercises = () => {
  //const storedExercises = JSON.parse(localStorage.getItem("exercises"));

  const [openModal, setOpenModal] = useState(false);
  const [openModalDel, setOpenModalDel] = useState(false);
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("exercises"))
  );
  const [createTask, setCreateTask] = useState(initialCreateTask);
  const [selectedExercise, setSelectedExercise] = useState({});

  const openModalHandler = () => {
    setOpenModal(true);
  };
  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const openModalHandlerDel = (exerciseId) => {
    const currentExercise = list.find((exercise) => exercise.id === exerciseId);
    setSelectedExercise(currentExercise);
    setOpenModalDel(true);
  };
  const closeModalHandlerDel = () => {
    setOpenModalDel(false);
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setCreateTask((prev) => ({ ...prev, [name]: value }));
  };

  const clickHandler = () => {
    console.log(list, "list");
    const updatedExerciseList = list.concat({
      ...createTask,
      id: Math.random(),
    });
    console.log(updatedExerciseList, "new ex");
    //localStorage.setItem("exercises", JSON.stringify(updatedExerciseList));
    setList(updatedExerciseList);
    setOpenModal(false);
    setCreateTask(initialCreateTask);
  };

  const clickHandlerDel = (id) => {
    const updatedExerciseList = list.filter((item) => item.id !== id);
    // localStorage.setItem("exercises", JSON.stringify(updatedExerciseList));
    setList(updatedExerciseList);
    setOpenModalDel(false);
  };

  const handleChangeBgColor = (currentId) => {
    const updatedList = list.map((current) => {
      if (current.id === currentId) {
        return {
          ...current,
          isFinished: !current.isFinished,
        };
      }
      return current;
    });
    setList(updatedList);
    localStorage.setItem("exercises", JSON.stringify(updatedList));
  };

  useEffect(() => {
    localStorage.setItem("exercises", JSON.stringify(list));
  }, [list.length]);
  return (
    <Container className="my-5">
      <Row className="w-100 align-items-center border-bottom border-3">
        <Col md={9}>
          <h1> Exercises</h1>
        </Col>
        <Col md={3} className="text-center">
          <Button variant="primary" onClick={openModalHandler}>
            {" "}
            Create new exercise
          </Button>
        </Col>
      </Row>
      <Row className="w-100 justify-content-between">
        <Col md={12} className="my-2">
          <h4> Current numbers of exercise in a list is: {list.length}</h4>
        </Col>

        {list.length > 0 ? (
          list?.map((listItem) => {
            return (
              <CardExercise
                title={listItem.title}
                isFinished={listItem.isFinished}
                info={listItem.description}
                key={listItem.id}
                onChange={handleChangeBgColor}
                onDeleteHandler={openModalHandlerDel}
                id={listItem.id}
              />
            );
          })
        ) : (
          <Col md={12}>List is empty.</Col>
        )}
      </Row>
      <ModalExercise
        open={openModal}
        close={closeModalHandler}
        newTitle={createTask?.title}
        newInfo={createTask?.description}
        handleChange={handleChange}
        onClick={clickHandler}
      />
      <ModalDelete
        close={closeModalHandlerDel}
        open={openModalDel}
        onClick={() => clickHandlerDel(selectedExercise.id)}
        title={selectedExercise.title}
      />
    </Container>
  );
};
