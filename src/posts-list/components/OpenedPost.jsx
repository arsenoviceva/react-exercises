import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../../jJSONExerciseGET/JSONURL";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Navbar } from "./Navbar";
import { Container } from "react-bootstrap";
import { PlaceholderCard } from "./PlaceholderCard";
import { Post } from "./Post";

export const OpenedPost = () => {
  const { id } = useParams();
  const [selectedPost, setSelectedPost] = useState(undefined);
  const [users, setUsers] = useState();
  const [user, setUser] = useState();

  const navigate = useNavigate();

  console.log(id, "id");

  const showAllPosts = () => {
    navigate(`/posts-list`);
  };

  useEffect(() => {
    if (!!id) {
      axios
        .get(`${BACKEND_URL}/posts/${id}`)
        .then((response) => {
          if (response?.data) {
            const selected = response?.data;
            console.log(selected, "selected");
            setSelectedPost(selected);
          }
        })
        .catch((error) => {
          toast.error(error?.message);
        });
    }
  }, [id]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/users`)
      .then((response) => {
        setUsers(response?.data);
        console.log(users, "users");
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  }, []);

  useEffect(() => {
    const findUser = users?.find((user) => user?.id === selectedPost?.userId);
    setUser(findUser);

    console.log(user);
  }, [users]);

  return (
    <div>
      <Navbar activeRoute={"/posts-list"} />
      <Container>
        <h2 className="text-center my-3 fw-bold"> Post details #{id}</h2>
        {selectedPost === undefined ? (
          <PlaceholderCard />
        ) : (
          <Post
            key={id}
            post={selectedPost}
            onClick={showAllPosts}
            users={users}
            openedPost
          />
        )}
      </Container>
    </div>
  );
};
