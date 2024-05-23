import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { TaskCard } from "./components/TaskCard";
import { TaskForm } from "./components/TaskForm";

export const Tasks = () => {
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("listOfTasks"))
  );
  const [newTask, setNewTask] = useState("");
  const finishedTasks = taskList?.filter((task) => task.isFinished);
  const unFinishedTasks = taskList?.filter((task) => !task.isFinished);

  const clickHandler = (taskId) => {
    const updatedTaskList = taskList.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isFinished: !task.isFinished,
        };
      }
      return task;
    });
    localStorage.setItem("listOfTasks", JSON.stringify(updatedTaskList));
    setTaskList(updatedTaskList);
  };

  const handleChange = (e) => {
    const { value, id, name } = e.target;
    setNewTask(value);
  };

  const createNewTask = () => {
    const addedTask = taskList.concat({ name: newTask, id: Math.random() });
    // localStorage.setItem("listOfTasks", JSON.stringify(addedTask));
    setTaskList(addedTask);
    setNewTask("");
  };

  const deleteTaskHandler = (id) => {
    const deletedTask = taskList.filter((task) => task.id !== id);
    // localStorage.setItem("listOfTasks", JSON.stringify(deletedTask));
    setTaskList(deletedTask);
  };
  useEffect(() => {
    localStorage.setItem("listOfTasks", JSON.stringify(taskList));
  }, [taskList.length]);

  return (
    <Container className="w-100">
      <Row className="my-3">
        <Col>
          <h1> Plan for the day</h1>
        </Col>
      </Row>

      <Row className="w-100">
        <Col sm={6} className="text-center my-2 border border-2 py-2">
          <h3>
            To do list <strong> {unFinishedTasks.length}</strong>
          </h3>

          <ul className="list-unstyled  ">
            {unFinishedTasks?.map((task) => {
              return (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClickItem={() => clickHandler(task.id)}
                  deleteTask={deleteTaskHandler}
                />
              );
            })}
          </ul>
        </Col>
        <Col sm={6} className="text-center my-2 border border-2 py-2">
          <h3>
            Completed tasks <strong> {finishedTasks.length}</strong>
          </h3>
          {finishedTasks?.map((task) => {
            return (
              <TaskCard
                task={task}
                key={task.id}
                onClickItem={() => clickHandler(task.id)}
                deleteTask={deleteTaskHandler}
              />
            );
          })}
        </Col>
        <TaskForm
          onClick={createNewTask}
          newTask={newTask}
          onChange={handleChange}
          isDisabled={newTask.length === 0}
        />
      </Row>
    </Container>
  );
};
