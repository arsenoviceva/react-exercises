import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <Container className="mt-5 ">
      <div className="d-flex align-items-center">
        <Button onClick={() => navigate("/movies")}>Movies</Button>
        <Button onClick={() => navigate("/recipes")} className="mx-3">
          Recipes
        </Button>
        <Button onClick={() => navigate("/tasks")}>Tasks</Button>
        <Button onClick={() => navigate("/exercises")} className="mx-3">
          Exercises
        </Button>
        <Button onClick={() => navigate("/users")}>Users</Button>
        <Button onClick={() => navigate("/quiz")} className="mx-3">
          Quiz
        </Button>
        <Button onClick={() => navigate("/test")}>Test</Button>
      </div>
    </Container>
  );
};
