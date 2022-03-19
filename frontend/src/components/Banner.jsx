import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

function Banner() {
  return (
    <header>
      <Navbar className="sticky-top" bg="secondary" expand="lg" variant="light">
        <Container>
          <Navbar.Brand className="fs-1 fw-bold" href="/">Connect Us</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="mt-1 mt-lg-0 text-end justify-content-lg-end" id="basic-navbar-nav">
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
    </header>
  );
}

export default Banner;
