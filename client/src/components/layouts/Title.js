import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Title = () => {
  return (
    <Navbar
      className="bg-light border border-primary border-3"
      style={{ margin: 0 }}
    >
      <Container className="d-flex justify-content-center">
        <Navbar.Brand>Krishca Straping Solutions Pvt Ltd</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Title;
