import { Button, Container, Row, Col, Badge } from "react-bootstrap";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

export const User = ({ user, onClick, selectedUser }) => {
  console.log(user.messageId, selectedUser);
  const savedMessages = JSON.parse(localStorage.getItem("allMessages"));
  const currentMessageArray = savedMessages?.[user?.messageId] || [];
  const active = +user.messageId === +selectedUser;
  return (
    <Row
      className={`ps-2 my-3 clickable mx-0   ${
        active ? "bg-body-secondary " : " "
      } `}
      onClick={() => onClick(user)}
    >
      <Col lg={2}>
        <img src={user.userPhoto} className="user-photo w-100" />
      </Col>
      <Col lg={7} className="p-0">
        <h6 className="text-primary mb-0">{user.username} </h6>
        <p className="long-text">
          {currentMessageArray?.[currentMessageArray.length - 1]?.message}
        </p>
      </Col>
      <Col lg={3}>
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
