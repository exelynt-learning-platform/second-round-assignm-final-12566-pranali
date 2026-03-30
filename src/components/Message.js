import React from "react";
import ReactMarkdown from "react-markdown";

const Message = React.memo(({ msg }) => {
  return (
    <div className={msg.role === "user" ? "user-msg" : "ai-msg"}>
      <ReactMarkdown>{msg.content}</ReactMarkdown>
    </div>
  );
});

export default Message;