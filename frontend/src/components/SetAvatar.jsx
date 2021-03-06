import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import Spinner from "../assets/Spinner-1s-311px.gif";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/ApiRoutes";
import { toastErrorOptions, toastSuccessOptions } from "../utils/toastOptions";
import { Buffer } from "buffer";
import { SetProfilPicture } from "../utils/store-redux/store";

/**
 * Used to set the avatar of the user
 * @returns The return is a function that will render the avatar selection page.
 */
function SetAvatar() {

  const api = "https://api.multiavatar.com";

  const navigate = useNavigate();
  
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userId);

  const tokenIs = localStorage.getItem(`chat-app-userToken/${userId}`);

  const [Avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState([]);

  /**
   * It sets the avatar of the user.
   */
  const AddAvatarAsProfilPicture = () => {
    if (selectedAvatar.length === 0) {
      toast.error("Pick up a avatar.", toastErrorOptions);
    }
    axios.defaults.headers['Authorization'] =`Bearer ${tokenIs}`;
    axios.post(`${setAvatarRoute}/${userId}`, {image: Avatars[selectedAvatar]}).then((response) => {
      console.log(response)
      const isSet = response.data.isSet ; 
      if(!isSet) {
        toast.error(`${response.data.message}`, toastErrorOptions)
      }
      toast.success(`${response.data.message}`, toastSuccessOptions)
      dispatch(SetProfilPicture(Avatars[selectedAvatar]))
      setTimeout(() => {
        navigate("/chat")
      }, 2000);
    }).catch((error) => {
      console.log(error)
    })
  };

  /* This is a React Hooks. It is used to check if the user is logged in. If not, it will redirect to
  the login page. */
  useEffect(() => {
    const isLogged = localStorage.getItem(`chat-app-userToken/${userId}`);
    if(!isLogged) {
      navigate("/login")
    }
  }, [userId, navigate])
  
  
  /* Used to get the avatars of the user. */
  useEffect(() => {
    const data = [];
    const avatarImage = localStorage.getItem(`chat-app-userAvatar/${userId}`);
    if(avatarImage){
      dispatch(SetProfilPicture(avatarImage));
      navigate("/chat");
    } else {
      async function dataAvatars() {
        for (let i = 0; i < 4; i++) {
          const response = await axios.get(
            `${api}/78955/${Math.floor(Math.random() * 10000)}`
          );
          const buffer = new Buffer(response.data).toString("base64");
          data.push(buffer);
        }
        setAvatars(data);
        setIsLoading(false);
      }
      dataAvatars();
    }
  }, [userId, navigate, dispatch]);

  return (
    <div>
      {isLoading ? (
        <Container className="text-center mw-100 mh-100 mt-lg-5">
          <div className="mh-100 mw-100 d-flex flex-column justify-content-center align-items-center">
            <img src={Spinner} alt="spinner" />
          </div>
        </Container>
      ) : (
        <Container className="text-center mw-100 mh-100 mt-lg-5">
          <h1 className="fw-bold text-capitalize mt-5 mb-5">
            Select your avatar
          </h1>
          <ul className="mw-100 mh-100 list-unstyled border border-1 mb-5 d-md-flex justify-content-md-between justify-content-center">
            {Avatars.map((avatar, index) => {
              return (
                <li
                  key={index}
                  className={`mb-2 avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    className={`w-50 ${
                      selectedAvatar === index
                        ? "border border-5 border-primary p-1 rounded-circle"
                        : ""
                    }`}
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt={`${index}-avatar`}
                    onClick={() => {
                      setSelectedAvatar(index);
                    }}
                  />
                </li>
              );
            })}
          </ul>
          <Button
            onClick={AddAvatarAsProfilPicture}
            className="btn btn-primary fw-bold mb-5"
          >
            Submit Avatar
          </Button>
        </Container>
      )}
      <ToastContainer />
    </div>
  );
}

export default SetAvatar;
