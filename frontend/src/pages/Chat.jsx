import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import "./Chat.css";
import axios from "axios";
import { getAllUsersRoute } from "../utils/ApiRoutes";
import Contacts from "../components/Contacts/Contacts";
import CurrentUser from "../components/CurrentUser";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

function Chat() {
  const userId = useSelector((state) => state.userId);

  const selectedContact = useSelector((state) => state.SelectedContact);

  const [contacts, SetContacts] = useState([]);

  const navigate = useNavigate();

  
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
    <Container
      fluid
      className=" overflow-auto bg-primary bg-opacity-10 bg-gradient container-app d-flex flex-column justify-content-center align-items-center"
    >
      <Row className="message-container bg-body overflow-auto p-2 rounded rounded-3">
        <Col
          xs={12}
          md={3}
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
          md={9}
        >
          {selectedContact ? <ChatContainer /> : <Welcome />}
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;
