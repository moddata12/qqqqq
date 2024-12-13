import { Fragment, useEffect, useState } from "react";
import bgImg from "../../assets/bg-img.jpg";
import { toast, ToastContainer } from "react-toastify";
import { Image, Container, Form, Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, clearAuthError } from "../../actions/userActions";
import { clearUpdateProfile } from "../../slices/authSlice";

function UpdateProfile() {
  const { error, user, isUpdated } = useSelector((state) => state.authState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.png"
  );
  const dispatch = useDispatch();

  const onChangeAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(e.target.files[0]);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("avatar", avatar);
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user.avatar) {
        setAvatarPreview(user.avatar);
      }
    }
    if (isUpdated) {
      toast.success("Profile updated successfully!", {
        position: "bottom-center",
        onOpen: () => dispatch(clearUpdateProfile()),
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
  }, [user, isUpdated, error, dispatch]);

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
        <MetaData title={"Update Profile"} />
        <Container className="border border-primary border-3 rounded p-4 mt-2 mb-2 bg-light">
          <h3 className="bg-primary text-center text-white rounded p-2 mt-2">
            Update Profile
          </h3>
          <Form
            onSubmit={submitHandler}
            className="shadow-lg p-5 rounded bg-white"
            encType="multipart/form-data"
          >
            <Form.Group controlId="name_field">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="email_field">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="avatar_upload">
              <Form.Label>Avatar</Form.Label>
              <div className="d-flex align-items-center pl-5">
                <div className="mr-3">
                  <figure className="avatar">
                    {avatarPreview ? (
                      <Image
                        src={avatarPreview}
                        className="rounded-circle"
                        alt="Avatar Preview"
                        width={100}
                        height={100}
                      />
                    ) : (
                      <Image
                        src="default-avatar-url.jpg"
                        className="rounded-circle"
                        alt="Default Avatar"
                        width={100}
                        height={100}
                      />
                    )}
                  </figure>
                </div>
                <div className="custom-file">
                  <Form.Control
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    onChange={onChangeAvatar}
                    required
                  />
                  <Form.Label
                    className="custom-file-label"
                    htmlFor="customFile"
                  >
                    Choose Avatar
                  </Form.Label>
                </div>
              </div>
            </Form.Group>

            <Button
              type="submit"
              className="btn update-btn btn-success mt-4 mb-3"
            >
              Update
            </Button>
          </Form>
        </Container>
      </div>
      <ToastContainer />
    </Fragment>
  );
}

export default UpdateProfile;
