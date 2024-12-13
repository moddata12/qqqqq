import { Fragment, useEffect, useState } from "react";
import bgImg from "../../assets/bg-img.jpg";
import { toast, ToastContainer } from "react-toastify";
import { Image, Container, Form, Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { register, clearAuthError } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";

function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.png"
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("avatar", avatar);
    dispatch(register(formData));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      toast.success("User Registered successfully!", {
        position: "bottom-center",
      });
      return;
    }
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onClose: () => dispatch(clearAuthError()),
      });
      return;
    }
  }, [error, isAuthenticated, dispatch, navigate]);

  return (
    <Fragment>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MetaData title={"Register"} />
        <Container className="border border-primary border-3 rounded p-4 mt-2 mb-2 bg-light">
          <h3 className="bg-primary text-center text-white rounded p-2 mt-2">
            Register
          </h3>
          <Form
            onSubmit={submitHandler}
            className="shadow-lg bg-white rounded p-5"
            encType="multipart/form-data"
          >
            <Form.Group>
              <Form.Label htmlFor="name_field">Name</Form.Label>
              <Form.Control
                id="name_field"
                type="text"
                name="name"
                onChange={onChange}
                className="form-control"
                placeholder="Enter your name"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="email_field">Email</Form.Label>
              <Form.Control
                id="email_field"
                type="email"
                name="email"
                onChange={onChange}
                className="form-control"
                placeholder="Enter your email"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="password_field">Password</Form.Label>
              <Form.Control
                id="password_field"
                type="password"
                name="password"
                onChange={onChange}
                className="form-control"
                placeholder="Enter your password"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="avatar_upload">Avatar</Form.Label>
              <div className="d-flex align-items-center gap-3">
                <div>
                  <figure className="m-0">
                    <Image
                      src={avatarPreview}
                      roundedCircle
                      alt="Avatar"
                      width="60px"
                      height="60px"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <Form.Control
                    type="file"
                    name="avatar"
                    onChange={onChange}
                    id="avatar_upload"
                    className="custom-file-input"
                  />
                  <Form.Label
                    className="custom-file-label"
                    htmlFor="avatar_upload"
                  >
                    Choose Avatar
                  </Form.Label>
                </div>
              </div>
            </Form.Group>
            <Button
              id="register_button"
              type="submit"
              className="btn register-btn btn-success mt-4 mb-3"
              disabled={loading}
            >
              Create
            </Button>
          </Form>
        </Container>
      </div>
      <ToastContainer />
    </Fragment>
  );
}

export default Register;
