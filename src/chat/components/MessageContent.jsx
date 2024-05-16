import React from "react";
import MessageHeader from "./MessageHeader";
import MessageBody from "./MessageBody";
import MessageFooter from "./MessageFooter";

export const MessageContent = ({
  selectedConversation,
  onChange,
  onClick,
  message,
}) => {
  return (
    <div className="h-100 d-flex flex-column">
      <MessageHeader selectedConversation={selectedConversation} />
      <div className="h-50vh border-bottom border-1 overflow-y-auto overflow">
        <MessageBody selectedConversation={selectedConversation} />
      </div>
      <MessageFooter onChange={onChange} onClick={onClick} message={message} />
    </div>
  );
};
