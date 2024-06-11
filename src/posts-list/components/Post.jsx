import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../jJSONExerciseGET/JSONURL";
import { toast } from "react-toastify";

export const Post = ({ post, onClick, users, openedPost }) => {
  const [user, setUser] = useState();
  const [showComments, setShowComments] = useState(false);
  const [foundComments, setFoundComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const openCommentsHandler = (id) => {
    setIsLoading(true);
    axios
      .get(`${BACKEND_URL}/posts/${id}/comments`)
      .then((response) => {
        setFoundComments(response.data);
        setShowComments(true);
        console.log(foundComments, "axios");
      })
      .catch((error) => {
        toast.error(error?.message);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  };

  const closeCommentsHandler = () => {
    setShowComments(false);
  };

  useEffect(() => {
    const findUser = users?.find((user) => user?.id === post?.userId);
    setUser(findUser);
  }, [users]);

  return (
    <div className="card p-3">
      <div className="card-body p-0  placeholder-glow">
        <h5 className="card-title p-0 fw-bold text-break-word ">
          {post?.title}
        </h5>
        <h6 className="card-subtitle p-0  text-muted  text-break-word-posts placeholder-glow">
          {post?.body}
        </h6>
        <div className="mb-2">
          {showComments ? (
            isLoading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              foundComments?.map((comment) => {
                return (
                  <div
                    className="border border-1 p-2 my-3 rounded-2"
                    key={comment?.id}
                  >
                    <p>
                      <strong> Email: </strong> {comment.email}
                    </p>
                    <p>
                      <strong> Name: </strong> {comment.name}
                    </p>
                    <p>
                      <strong> Body: </strong> {comment.body}
                    </p>
                  </div>
                );
              })
            )
          ) : (
            ""
          )}
          {showComments ? (
            <a
              href="#"
              className="a-link-color"
              onClick={() => closeCommentsHandler()}
            >
              Hide comments
            </a>
          ) : (
            <a
              href={`#${post?.id}`}
              className="a-link-color"
              onClick={() => openCommentsHandler(post.id)}
            >
              Show comments
            </a>
          )}
        </div>
      </div>
      <div className="card-footer p-2">
        <div className="d-flex align-items-center justify-content-between">
          <p>
            <strong> By: </strong> {user?.name}
          </p>
          <button
            className=" btn btn-primary btn-preview-post"
            onClick={() => onClick(post.id)}
          >
            {openedPost ? "Go back" : "Preview"}
          </button>
        </div>
      </div>
    </div>
  );
};
