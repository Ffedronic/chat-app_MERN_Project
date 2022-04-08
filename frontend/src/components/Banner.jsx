import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetDisconnection } from "../utils/store-redux/store";

/**
 * The banner is the top of the page. It contains the logo and the navigation bar. 
 * 
 * The navigation bar contains the login and register buttons. 
 * 
 * The banner is the top of the page. It contains the logo and the navigation bar. 
 * 
 * The navigation bar contains the login and register buttons.
 * @returns The Navbar component is being returned.
 */
function Banner() {

  const dispatch = useDispatch();

  const isConnected = useSelector((state) => state.isConnected)

  const hasToken = localStorage.getItem("chat-app-userToken");

  if(hasToken || isConnected) {
    return (
      <header>
        <Navbar
          className="sticky-top"
          bg="secondary"
          expand="lg"
          variant="light"
        >
          <Container>
            <Navbar.Brand className="fs-1 fw-bold" href="/">
              Connect Us
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              className="mt-1 mt-lg-0 text-end justify-content-lg-end"
              id="basic-navbar-nav"
            >
              <Nav.Item>
                <Nav.Link onClick={() => { dispatch(SetDisconnection())}} className="text-black fw-bold fs-3" href="/login">
                  Log Out
                </Nav.Link>
              </Nav.Item>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet/>
      </header>
    );
  } else {
    return (
      <header>
        <Navbar
          className="sticky-top"
          bg="secondary"
          expand="lg"
          variant="light"
        >
          <Container>
            <Navbar.Brand className="fs-1 fw-bold" href="/">
              Connect Us
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              className="mt-1 mt-lg-0 text-end justify-content-lg-end"
              id="basic-navbar-nav"
            >
              <Nav.Item>
                <Nav.Link className="text-black fw-bold fs-3" href="/register">
                  Register
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-black fw-bold fs-3" href="/login">
                  Login
                </Nav.Link>
              </Nav.Item>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet/>
      </header>
    );
  }
}

export default Banner;
