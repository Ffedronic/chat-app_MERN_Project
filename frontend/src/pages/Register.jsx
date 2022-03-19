import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import Logo from "../assets/logo.png";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { registerRoute } from "../utils/ApiRoutes";

function Register() {

  const toastOptions = {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    progress: undefined,
  };

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if(handleValidation()) {
      const { password, email, username } = values;
      axios.post(registerRoute, {username: username, email: email, password: password})
        .then(res => console.log(res.data))
        .catch(res => console.log(res));
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username } = values;
    if (password !== confirmPassword) {
      toast.error("password and confirm password should be same.", toastOptions);
      return false;
    } else if(username.length < 3) {
      toast.error("username length should be greater than 3 characters.", toastOptions);
      return false;
    } else if(password.length < 8) {
      toast.error("password length should be equal or greater than 3 characters.", toastOptions);
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
          <Form.Group className="mb-3 fs-5" controlId="formBasicUserName">
            <Form.Label className="fw-bold">Username</Form.Label>
            <Form.Control
              onChange={(event) => handleChange(event)}
              name="username"
              type="text"
              placeholder="Enter a username"
              required
            />
          </Form.Group>
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
          <Form.Group
            className="mb-3 fs-5"
            controlId="formBasicConfirmPassword"
          >
            <Form.Label className="fw-bold">Confirm Password</Form.Label>
            <Form.Control
              onChange={(event) => handleChange(event)}
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <span className="fs-5">
          Already have a account ?{" "}
          <Link className="text-decoration-none" to="/login">
            Login Here
          </Link>
        </span>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default Register;
