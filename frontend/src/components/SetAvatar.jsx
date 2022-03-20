import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import Spinner from "../assets/Spinner-1s-311px.gif";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/ApiRoutes";
import { toastErrorOptions } from "../utils/toastOptions";
import { Buffer } from "buffer";

function SetAvatar() {
  const api = "https://api.multiavatar.com";

  const navigate = useNavigate();

  const [Avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState([]);

  const SetProfilPicture = async () => {
      if(selectedAvatar === undefined) {
          toast.error("Select a Avatar now", toastErrorOptions);
      }
      
  };

  useEffect(() => {
    const data = [];
    async function dataAvatars() {
      for (let i = 0; i < 4; i++) {
        const randomUrlAvatar = await `${api}/${Math.floor(
          Math.random() * 100000
        )}.png`;
        data.push(randomUrlAvatar);
      }
      await setAvatars(data);
      await setIsLoading(false);
    }
    dataAvatars();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Container>
          <img src={Spinner} alt="spinner" />
        </Container>
      ) : (
        <Container className="text-center">
          <h1 className="fw-bold text-capitalize mt-5 mb-5">Select your avatar</h1>
          <ul className="list-unstyled border border-1 mb-5">
            {Avatars.map((avatar, index) => {
              return (
                <li
                  key={index}
                  className={`mb-2 avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    className={`w-50 ${selectedAvatar === index ? "border border-5 border-primary p-1 rounded-circle" : ""}`}
                    src={avatar}
                    alt={`${index}-avatar`}
                    onClick={() => {
                      setSelectedAvatar(index);
                    }}
                  />
                </li>
              );
            })}
          </ul>
          <button className="btn btn-primary fw-bold mb-5">Submit Avatar</button>
        </Container>
      )}
    </div>
  );
}

export default SetAvatar;
