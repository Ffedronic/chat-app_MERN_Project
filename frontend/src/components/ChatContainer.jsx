import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import { addMessagesRoute, getAllMessagesRoute } from "../utils/ApiRoutes";
import { useSelector } from "react-redux";
import axios from "axios";
import ChatMessages from "./ChatMessages";
import "./chatContainer.css"

/**
 * This function renders the chat container
 * @returns The ChatContainer component is returning a section element with three children. The first
 * child is an article element with an id of "chatContainer-header". The second child is an article
 * element with an id of "chatContainer-messages". The third child is an article element with an id of
 * "chatContainer-input".
 */
function ChatContainer({socket}) {
  
  const scrollRef = useRef();

  const userId = useSelector((state) => state.userId);

  const selectedContactUserId = useSelector(
    (state) => state.SelectedContact._id
  );

  const tokenIs = localStorage.getItem(`chat-app-userToken/${userId}`);

  const [messages, setMessages] = useState([]);

    const [arrivalMessage, setArrivalMessage] = useState("");

  /**
   * It sends a message to the server.
   */
  const handleSendMessage = (message) => {
    axios.defaults.headers["Authorization"] = `Bearer ${tokenIs}`;
    axios
      .post(`${addMessagesRoute}/${userId}`, {
        message: message,
        from: userId,
        to: selectedContactUserId,
      })
      .then((response) => console.log(response.data.message))
      .catch((error) => console.log(error.response.data.error._message));
    socket.current.emit("send-message", { message: message, to: selectedContactUserId, from: userId})
    const mgsSendToTheServer = [...messages];
    mgsSendToTheServer.push({fromSelf: true, message: message});
    setMessages(mgsSendToTheServer);
  };

 /* A React Hook that is used to fetch data from the server. */
  useEffect(() => {
    axios.defaults.headers["Authorization"] = `Bearer ${tokenIs}`;
    axios
      .post(`${getAllMessagesRoute}/${userId}`, {
        from: userId,
        to: selectedContactUserId,
      })
      .then((response) => {
        setMessages(response.data)
      })
      .catch((error) => console.log(error));
  }, [tokenIs, userId, selectedContactUserId]);

  useEffect(() => {
    if(socket.current) {
      socket.current.on("message-recieved", (messageRecieved) => {
      setArrivalMessage({ fromSelf: false, message: messageRecieved});
      }) 
    }
  }, [socket])

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])
  
  
  return (
    <section className="chatContainer-grid p-2 w-100 h-100">
      <ChatHeader />
      <ChatMessages messages={ messages } />
      <ChatInput handleSendMessage={handleSendMessage} />
    </section>
  );
}

export default ChatContainer;
