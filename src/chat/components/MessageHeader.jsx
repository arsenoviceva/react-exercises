import React from "react";
import { Row, Col } from "react-bootstrap";

export default function MessageHeader({ selectedConversation }) {
  const { user } = selectedConversation;
  return (
    <Row className="align-items-center py-3 border-bottom border-1 mx-1">
      <Col lg={2} className="text-center p-0">
        <img src={user.userPhoto} className="user-photo w-50" />
      </Col>
      <Col lg={10} className="p-0">
        <h3>
          {" "}
          {user.username} <span class="logged-in">●</span>
        </h3>
      </Col>
    </Row>
  );
}
