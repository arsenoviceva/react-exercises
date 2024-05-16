import React from "react";
import { Row, Col } from "react-bootstrap";

export default function MessageBody({ selectedConversation }) {
  const { conversation } = selectedConversation;

  return (
    <Row className="py-5">
      {conversation?.map((item) => {
        return (
          <div
            className={`d-flex align-items-start gap-2 mb-2 h-fit-content ${
              !item?.isMyMessage
                ? "flex-row-reverse justify-content-left"
                : "justify-content-end"
            }`}
          >
            <p
              className={`${
                item?.isMyMessage
                  ? "bg-primary text-white"
                  : "bg-body-secondary text-black"
              } p-1 rounded-3 mb-0`}
            >
              {item?.message}
            </p>
            <img
              src={item?.byUser?.userPhoto}
              className="user-photo-conversation"
            />
          </div>
        );
      })}
    </Row>
  );
}
