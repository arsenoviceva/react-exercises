import React from "react";
import { Row, Col } from "react-bootstrap";
import { IoSend } from "react-icons/io5";

export default function MessageFooter({ onChange, onClick, message }) {
  return (
    <Row className="my-3 mx-3">
      <Col className="p-0 position-relative">
        <input
          type="text"
          placeholder="Write Something"
          className="w-100 form-control rounded-5 bg-info"
          name="message"
          onChange={onChange}
          value={message}
          onKeyDown={(e) => e.key === "Enter" && onClick()}
        />

        <IoSend
          className="bg-primary text-white p-2 rounded-5 p-0 send-button"
          onClick={onClick}
        />
      </Col>
    </Row>
  );
}
