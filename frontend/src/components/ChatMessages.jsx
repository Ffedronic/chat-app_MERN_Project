import React, { useRef } from "react";

/**
 * This function renders a list of messages.
 * @returns The ChatMessages component is returning a list of messages. Each message is a list item.
 */
function ChatMessages({ messages }) {
  const scrollRef = useRef();

  return (
    <ul className="list-unstyled d-flex flex-column mt-2 overflow-auto text">
      {messages.map((message, index) => {
        return (
          <li
            ref={scrollRef}
            className={`rounded-3 d-inline-block text-break border border-1 border-black mb-2 ${
              message.fromSelf
                ? "bg-info bg-opacity-50 align-self-end text-end"
                : "bg-success bg-opacity-50 align-self-start text-start"
            }`}
            key={index}
          >
            <p className="mb-0 p-2 text-black fw-bold">{message.message}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default ChatMessages;
