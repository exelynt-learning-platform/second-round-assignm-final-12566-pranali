import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../features/chat/chatSlice";
import Message from "./Message";
import Loader from "./Loader";
import { IoSend } from "react-icons/io5";
const ChatBox = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const bottomRef = useRef(null);

  const { messages, loading, error } = useSelector(
    (state) => state.chat
  );

  const handleSend = () => {
    if (!input.trim()) return;

    dispatch(sendMessage(input));
    setInput("");
  };


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <Message key={index} msg={msg} />
        ))}

        {loading && <Loader />}
        {error && <p className="error">{error}</p>}

        <div ref={bottomRef}></div>
      </div>

      <div className="input-box">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        {/* <button onClick={handleSend}>Send</button> */}
        {input.trim() && (
    <IoSend className="send-icon" onClick={handleSend} />
  )}

      </div>
    </div>
  );
};

export default ChatBox;