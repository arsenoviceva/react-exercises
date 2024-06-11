import { Button } from "react-bootstrap";

export const CommentForm = ({
  onChange,
  closeFormHandler,
  onClick,
  selectedComment,
}) => {
  const { name, email, body, postId, id } = selectedComment;
  const isUpdate = !!id;

  return (
    <div className="col-12  ">
      <div className="comment-form ">
        <h4> {isUpdate ? "Update comment" : "Write new comment"} </h4>
        <div className="border-1 border-bottom py-3 mb-3">
          <select
            className="form-select text-black"
            name="postId"
            onChange={(e) => onChange(e)}
          >
            <option selected>{isUpdate ? postId : "Choose post ID"}</option>
            {Array.from({ length: 10 }, (_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          <input
            className="form-control my-2"
            type="text"
            name="name"
            placeholder="Write comment name"
            onChange={onChange}
            value={name}
          />
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="name@example.com"
            value={email}
            onChange={onChange}
          />
          <label className="form-label pt-2">Comment body</label>
          <textarea
            className="form-control mb-3"
            onChange={onChange}
            name="body"
            rows="3"
            value={body}
          />
        </div>
        <div className="d-flex align-items-center justify-content-end gap-2">
          <Button variant="secondary" onClick={closeFormHandler}>
            {" "}
            Cancel{" "}
          </Button>
          <Button variant="success" onClick={() => onClick(id)}>
            {" "}
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
