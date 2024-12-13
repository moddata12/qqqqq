import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearAuthError } from "../../actions/userActions";
import bgImg from "../../assets/bg-img.jpg";
import { toast, ToastContainer } from "react-toastify";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layouts/MetaData";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.authState);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    dispatch(forgotPassword(formData));
  };

  useEffect(() => {
    if (message) {
      toast.success("Reset link sent to email!", {
        position: "bottom-center",
      });
      setEmail("");
      return;
    }

    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onClose: () => dispatch(clearAuthError()),
      });
      return;
    }
  }, [message, error, dispatch]);

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
        <MetaData title={"Forgot Password"} />
        <Container className="border border-primary border-3 rounded p-4 mt-2 mb-2 bg-light">
          <h3 className="bg-primary text-center text-white rounded p-2 mt-2">
            Forgot Password
          </h3>
          <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
              <Form
                onSubmit={submitHandler}
                className="shadow-lg rounded border border-1 border-light p-5"
              >
                <Form.Group controlId="email_field" className="mb-3">
                  <Form.Label>Enter Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Button
                  id="forgot_password_button"
                  type="submit"
                  className="btn update-btn btn-warning mt-4 mb-3"
                  variant="primary"
                >
                  Send Email
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
      <ToastContainer />
    </Fragment>
  );
}

export default ForgotPassword;
