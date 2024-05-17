import { Button, Container, Row, Col, Badge } from "react-bootstrap";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

export const User = ({ user, onClick, selectedUser }) => {
  const savedMessages = JSON.parse(localStorage.getItem("allMessages"));
  const currentMessageArray = savedMessages?.[user?.messageId] || [];
  const active = +user.messageId === +selectedUser;
  return (
    <Row
      className={`p-2 clickable mx-0  align-items-center ${
        active ? "bg-body-secondary " : " "
      } `}
      onClick={() => onClick(user)}
    >
      <Col lg={2}>
        <img src={user.userPhoto} className="user-photo w-100" />
      </Col>
      <Col lg={7} className="ps-0 pt-2">
        <h6 className="text-primary mb-0">{user.username} </h6>
        <p className="long-text">
          {currentMessageArray?.[currentMessageArray.length - 1]?.message}
        </p>
      </Col>
      <Col lg={3} className="d-flex flex-column align-items-end">
        <p className="text-muted mb-0">{user.createdAt}</p>
        {
          <IoCheckmarkDoneSharp
            className={`text-${!user.isSeen ? "muted" : "primary"}`}
          />
        }
      </Col>
    </Row>
  );
};
