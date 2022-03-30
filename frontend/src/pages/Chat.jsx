import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import "./Chat.css";
import axios from "axios";
import { getAllUsersRoute, host } from "../utils/ApiRoutes";
import Contacts from "../components/Contacts/Contacts";
import CurrentUser from "../components/CurrentUser";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client"

function Chat() {

  const socket = useRef();

  const userId = useSelector((state) => state.userId);

  const selectedContact = useSelector((state) => state.SelectedContact);

  const [contacts, SetContacts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if(userId) {
      socket.current = io(host);
      socket.current.emit("add-user", userId);
    }
  }, [userId])
  
  /* This is a React Hook that is used to fetch the list of contacts from the mongoDB database. */
  useEffect(() => {
    if (!userId) {
      navigate("/login");
    } else {
      axios
        .get(`${getAllUsersRoute}/${userId}`)
        .then((response) => SetContacts(response.data.users))
        .catch((error) => console.log(error));
    }
  }, [navigate, userId]);

  /* This is a React Hook that is used to fetch the user avatar image from the local storage. */
  useEffect(() => {
    const avatarImage = localStorage.getItem(`chat-app-userAvatar/${userId}`);
    if (!avatarImage) {
      navigate("/setAvatar");
    }
  }, [userId, navigate]);

  return (
    <div className="container-app">
      <Container
      fluid
      className="h-100 border border-3 bg-primary bg-opacity-10 bg-gradient d-flex flex-column justify-content-center align-items-center"
    >
      <Row className="w-100 h-100 overflow-auto bg-body p-2 rounded rounded-3">
        <Col
          xs={12}
          md={5}
          lg={3}
          className="listOfContacts d-md-flex flex-md-column justify-content-between"
        >
          <CurrentUser />
          <Contacts contacts={contacts} />
          <div className="fs-2 p-2 mb-2 text-center shadow">
            Welcome to Connect Us !
          </div>
        </Col>
        <Col
          className="bg-primary bg-opacity-10 my-1 overflow-auto rounded-3"
          xs={12}
          md={7}
          lg={9}
        >
          {selectedContact ? <ChatContainer socket={socket} /> : <Welcome />}
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default Chat;
