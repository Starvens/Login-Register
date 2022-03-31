import React, { useState } from "react";

import { Link, useHistory } from "react-router-dom";

import { Button, Navbar, Nav } from "react-bootstrap";

export default function Header() {
  let history = useHistory();

  const [token] = useState(localStorage.getItem("token"));

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  const login = () => {
    history.push("/");
  };

  const reg = () => {
    history.push("/reg");
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/home">Home</Link>
          </Nav>
          <Nav className="mr-auto">
            <Link to="/page1">Page 1</Link>
          </Nav>
          <Nav className="mr-auto">
            <Link to="/page2">Page 2</Link>
          </Nav>

          {token && (<Button variant="outline-success" onClick={() => { logout() }}>Log Out</Button>)}

          {!token && (
            <Button
              variant="outline-success"
              onClick={() => {
                login();
              }}
            >
              Login
            </Button>
          )}
          {!token && (
            <Button
              variant="outline-success"
              onClick={() => {
                reg();
              }}
            >
              Register
            </Button>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
