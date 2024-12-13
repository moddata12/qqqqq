import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import bgImg from "../../assets/bg-img.jpg";
import { ToastContainer } from "react-toastify";
import { Image, Container, Row, Col, Card } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layouts/MetaData";

function Profile() {
  const { user } = useSelector((state) => state.authState);

  return (
    <Fragment>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "auto", // Set height to full viewport
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MetaData title={"Profile"} />
        <Container className="border border-primary border-3 rounded p-4 mt-2 mb-2 bg-light">
          <h3 className="bg-primary text-center text-white rounded p-2 mt-2">
            Profile
          </h3>
          <Card className="rounded">
            <Card.Body>
              <Row className="justify-content-center align-items-center">
                <Col xs={12} md={4} className="text-center">
                  <Image
                    width="150px"
                    className="rounded-circle img-fluid"
                    src={user.avatar ?? "./images/default_avatar.png"}
                    alt="Profile Avatar"
                  />
                </Col>
                <Col xs={12} md={6}>
                  <h4>Full Name</h4>
                  <p>{user.name}</p>
                  <h4>Email Address</h4>
                  <p>{user.email}</p>
                  <h4>Joined</h4>
                  <p>{String(user.createdAt).substring(0, 10)}</p>
                  <div className="d-flex flex-column mt-3">
                    <Link
                      to="/myprofile/update"
                      id="edit_profile"
                      className="btn btn-success mb-2"
                    >
                      Edit Profile
                    </Link>
                    <Link
                      to="/myprofile/update/password"
                      className="btn btn-warning"
                    >
                      Change Password
                    </Link>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
      <ToastContainer />
    </Fragment>
  );
}

export default Profile;
