import { Card, Button } from "react-bootstrap";
import { FaPencil, FaDeleteLeft } from "react-icons/fa6";

export const Comment = ({
  comment,
  onClick,
  openUpdateForm,
  openCommentHandler,
}) => {
  return (
    <div className="col-4 my-1 p-1">
      <Card className=" mx-1">
        <Card.Header>
          <Card.Title className="m-0">ID: {comment.id}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            Post ID: {comment.postId}
          </Card.Subtitle>
          <Card.Text className=" ">
            <p className="text-break-word py-1">
              <strong> Name </strong> : {comment.name}
            </p>
            <p className="text-break-word py-1">
              <strong> Body: </strong> {comment.body}
            </p>
            <p>
              <strong> Email: </strong>
              {comment.email}
            </p>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <div className="d-flex align-items-center justify-content-end gap-3  ">
            <FaPencil
              className="fs-5 cursor-pointer"
              onClick={() => openUpdateForm(comment.id)}
            />
            <FaDeleteLeft
              className="fs-5 cursor-pointer"
              onClick={() => onClick(comment.id)}
            />
            <Button
              className="btn-bg-color px-2 py-1"
              onClick={() => openCommentHandler(comment.id)}
            >
              {" "}
              Open{" "}
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};
