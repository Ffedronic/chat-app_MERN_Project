import React, { useState } from "react";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import { addMessagesRoute } from "../utils/ApiRoutes";
import { useSelector } from "react-redux";
import axios from "axios";
import { toastErrorOptions } from "../utils/toastOptions"
import { ToastContainer, toast } from "react-toastify";



/**
 * This function renders the chat container
 * @returns The ChatContainer component is returning a section element with three children. The first
 * child is an article element with an id of "chatContainer-header". The second child is an article
 * element with an id of "chatContainer-messages". The third child is an article element with an id of
 * "chatContainer-input".
 */
function ChatContainer() {
  const userId = useSelector((state) => state.userId);

  const selectedContactUserId = useSelector(
    (state) => state.SelectedContact._id
  );

  const tokenIs = localStorage.getItem(`chat-app-userToken/${userId}`);

  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    axios.defaults.headers["Authorization"] = `Bearer ${tokenIs}`;
    axios
      .post(`${addMessagesRoute}/${userId}`, {
        message: message,
        from: userId,
        to: selectedContactUserId,
      })
      .then((response) => console.log(response.data.message))
      .catch((error) => toast.error(error.response.data.error._message, toastErrorOptions));
  };

  

  return (
    <section className="p-2 d-flex flex-column justify-content-between w-100 h-100">
      <ChatHeader />
      <article id="chatContainer-messages">Messages</article>
      <ChatInput handleSendMessage={handleSendMessage} />
    </section>
  );
}

export default ChatContainer;
