import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux"; // Corrected imports
import { useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";
import { Dropdown, Image } from "react-bootstrap";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const route =
    isAuthenticated && user?.role === "admin" ? "/admin/users" : "/dashboard";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    await dispatch(logout()); // Wait for the logout action to complete
    navigate("/"); // Redirect to home or login page
  };
  const handleNavigation = () => {
    if (route) navigate(route);
  };

  // // Show nothing until `user` is loaded
  // if (!isAuthenticated || !user) {
  //   return null; // Or return a loading spinner/message
  // }

  if (!isAuthenticated || !user) {
    return (
      <Navbar expand="lg" className="bg-primary">
        <Container className="text-white">
          <Navbar.Brand className="text-white fw-3">
            ENERGY MONITORING SYSTEM
          </Navbar.Brand>
        </Container>
      </Navbar>
    );
  }

  return (
    <Navbar expand="lg" className="bg-primary">
      <Container className="text-white">
        <Navbar.Brand className="text-white fw-3" onClick={handleNavigation}>
          ENERGY MONITORING SYSTEM
        </Navbar.Brand>

        {isAuthenticated && (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto text-white fw-medium">
                {user?.role === "user" && (
                  <>
                    <Nav.Link
                      onClick={() => navigate("/home")}
                      className="text-white"
                    >
                      Home
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => navigate("/dashboard")}
                      className="text-white"
                    >
                      Dashboard
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => navigate("/details")}
                      className="text-white"
                    >
                      Details
                    </Nav.Link>
                    <Dropdown className="d-inline">
                      <Dropdown.Toggle
                        variant="default text-white pr-5"
                        id="dropdown-basic"
                      >
                        <figure className="avatar avatar-nav">
                          <Image
                            width="50px"
                            src={user?.avatar ?? "./images/default_avatar.png"}
                          />
                        </figure>
                        <span>{user?.name}</span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={logoutHandler}
                          className="text-danger"
                        >
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                )}
                {user?.role === "admin" && (
                  <>
                    <Nav.Link
                      onClick={() => navigate("/admin/users")}
                      className="text-white"
                    >
                      Users
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => navigate("admin/equipments")}
                      className="text-white"
                    >
                      Equipments
                    </Nav.Link>
                    <Nav.Link
                      onClick={() => navigate("/admin/details")}
                      className="text-white"
                    >
                      Details
                    </Nav.Link>
                    <Dropdown className="d-inline">
                      <Dropdown.Toggle
                        variant="default text-white pr-5"
                        id="dropdown-basic"
                      >
                        <figure className="avatar avatar-nav">
                          <Image
                            width="50px"
                            src={user?.avatar ?? "./images/default_avatar.png"}
                          />
                        </figure>
                        <span>{user?.name}</span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => {
                            navigate("/myprofile");
                          }}
                          className="text-dark"
                        >
                          Profile
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            navigate("admin/password/forgot");
                          }}
                          className="text-dark"
                        >
                          Forgot Password
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={logoutHandler}
                          className="text-danger"
                        >
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
