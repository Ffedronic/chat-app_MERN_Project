import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import Logo from "../assets/logo.png";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { loginRoute } from "../utils/ApiRoutes";
import { strongPassword } from "../utils/strongPassword";
import { useDispatch } from "react-redux";
import { SetConnection } from "../utils/store";
import { toastErrorOptions, toastSuccessOptions } from "../utils/toastOptions"

function Login() {

  const hasToken = localStorage.getItem("chat-app-userToken");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if(hasToken) {
      navigate("/chat")
    }
  }, [hasToken, navigate])
  
  
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, email } = values;
      axios
        .post(loginRoute, { email: email, password: password })
        .then((response) => {
          console.log(response)
          dispatch(SetConnection(response.data));
          toast.success(
            `${response.data.message}, ${response.data.username}`,
            toastSuccessOptions
          );
          setTimeout(() => {
            navigate("/chat");
          }, 2000);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  const handleValidation = () => {
    const { password } = values;
    if (!strongPassword.test(password)) {
      toast.error(
        "password must contain at least 1 lowercase alphabetical character,  1 uppercase alphabetical character, 1 numeric character, one special character, must be eight characters or longer.",
        toastErrorOptions
      );
      return false;
    }
    return true;
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Container className="d-flex flex-column align-items-center">
        <h1 className="text-center fw-bold">Register to join us</h1>
        <Form
          onSubmit={handleSubmit}
          className="border border-2 p-3 rounded shadow"
        >
          <div className="text-center">
            <img src={Logo} alt="logo" />
          </div>
          <Form.Group className="mb-3 fs-5" controlId="formBasicEmail">
            <Form.Label className="fw-bold">Email address</Form.Label>
            <Form.Control
              onChange={(event) => handleChange(event)}
              name="email"
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-muted fs-6">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3 fs-5" controlId="formBasicPassword">
            <Form.Label className="fw-bold">Password</Form.Label>
            <Form.Control
              onChange={(event) => handleChange(event)}
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <span className="fs-5">
          Don't already have a account ?{" "}
          <Link className="text-decoration-none" to="/register">
            Register Here
          </Link>
        </span>
      </Container>
      <ToastContainer />
    </div>
  );
  }
export default Login;
