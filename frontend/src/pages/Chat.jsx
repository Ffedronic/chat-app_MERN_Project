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

function Chat() {

  const userId = useSelector((state) => state.userId);

  const [contacts, SetContacts] = useState([]);

  const navigate = useNavigate();

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
      <Row className="message-container bg-body">
        <Col xs={12} md={3} className="d-md-flex flex-md-column justify-content-between">
          <CurrentUser/>
          <Contacts contacts={contacts} />
          <div className="fs-2 p-2 text-center shadow">
            Welcome to Connect Us !
          </div>
        </Col>
        <Col xs={12} md={9}>

        </Col>
      </Row>
    </Container>
  );
}

export default Chat;
