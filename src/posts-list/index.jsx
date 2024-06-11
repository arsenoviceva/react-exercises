import { Navbar } from "./components/Navbar";
import { Container, Col, Button } from "react-bootstrap";
import { BACKEND_URL } from "../jJSONExerciseGET/JSONURL";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Post } from "./components/Post";
import { PlaceholderCard } from "./components/PlaceholderCard";
import { useNavigate } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";

export const PostsList = () => {
  const initialParams = { _start: 0, _limit: 15 };
  const [params, setParams] = useState({
    _start: 0,
    _limit: 10,
  });
  const [posts, setPosts] = useState(undefined);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelecterUser] = useState(undefined);
  const navigate = useNavigate();
  const [comments, setComments] = useState();
  const [selectedUserFilter, setSelectedUserFilter] = useState("all");
  const [hasMore, setHasMore] = useState(false);

  const handleChange = (e) => {
    const user = e.target.value;
    setSelecterUser(user);
    setSelectedUserFilter(user);
    setParams((prev) => ({
      ...prev,
      userId: user === "all" ? undefined : +user,
    }));
  };

  const openPostHandler = (id) => {
    axios
      .get(`${BACKEND_URL}/comments`)
      .then((response) => {
        setComments(response?.data);
        navigate(`/posts-list/${id}`);
        console.log(users);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  const clearFilterHandler = () => {
    axios
      .get(`${BACKEND_URL}/posts`, {
        params: initialParams,
      })
      .then((response) => {
        setPosts(response?.data);
        setSelecterUser(undefined);
        setSelectedUserFilter("all");
        console.log(selectedUser);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  const changeLimitHandler = () => {
    setParams((prev) => ({ ...prev, _limit: prev._limit + 10 }));
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/posts`, {
        params: params,
      })
      .then((response) => {
        const totalNumberOfItems = +response?.headers?.["x-total-count"];
        setPosts(response?.data);
        setHasMore(params?._limit < totalNumberOfItems);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  }, [JSON.stringify(params)]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/users`)
      .then((response) => {
        setUsers(response?.data);
        console.log(users);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  }, []);

  return (
    <div>
      <Navbar className="position-relative" activeRoute={"/posts-list"} />

      <div>
        <select
          className={
            selectedUser === undefined
              ? "form-select select-user"
              : "form-select select-user-selected"
          }
          name="userId"
          value={selectedUserFilter}
          onChange={(e) => handleChange(e)}
        >
          {" "}
          <option selected value={"all"}>
            Filter by users
          </option>
          {users?.map((user) => {
            return (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>
        {selectedUser === undefined ? (
          ""
        ) : (
          <Button
            className="bg-white border-primary text-black btn-clear"
            onClick={clearFilterHandler}
          >
            {" "}
            Clear
          </Button>
        )}
      </div>

      <Container>
        <h2 className="text-center my-3 fw-bold"> Posts list</h2>
        {posts === undefined ? (
          <PlaceholderCard length={params._limit} />
        ) : (
          <InfiniteScroll
            style={{ overflow: "hidden" }}
            dataLength={posts?.length || 0} //This is important field to render the next data
            next={changeLimitHandler}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <div className="row align-items-center">
              {posts?.map((post) => {
                return (
                  <Col lg={4} className="my-3" key={post?.id}>
                    <Post
                      post={post}
                      onClick={openPostHandler}
                      users={users}
                      comments={comments}
                    />
                  </Col>
                );
              })}
            </div>
          </InfiniteScroll>
        )}
      </Container>
    </div>
  );
};
