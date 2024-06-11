import { Button, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <Container className="home-container">
      <div className="home-page">
        <Button onClick={() => navigate("/movies")}>Movies</Button>
        <Button onClick={() => navigate("/recipes")}>Recipes</Button>
        <Button onClick={() => navigate("/tasks")}>Tasks</Button>
        <Button onClick={() => navigate("/exercises")}>Exercises</Button>
        <Button onClick={() => navigate("/users")}>Users</Button>
        <Button onClick={() => navigate("/quiz")}>Quiz</Button>
        <Button onClick={() => navigate("/test")}>Test</Button>
        <Button onClick={() => navigate("/chat")}>Chat</Button>
        <Button onClick={() => navigate("/calculator")}>Calculator</Button>
        <Button onClick={() => navigate("/job-listings")}>Job listings</Button>
        <Button onClick={() => navigate("/faq")}>FaQ</Button>
        <Button onClick={() => navigate("/ecommerce")}>ECommerce</Button>
        <Button onClick={() => navigate("/jsonexerciseget")}>JSON </Button>
        <Button onClick={() => navigate("/monster-rolodex")}>
          Monster Rolodex
        </Button>
        <Button onClick={() => navigate("/posts-list")}>Posts list</Button>
      </div>
    </Container>
  );
};
