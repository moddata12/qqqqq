import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import bgImg from "../assets/bg-img.jpg";
import Title from "./layouts/Title";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../components/layouts/MetaData";
import { clearAuthError, login } from "../actions/userActions";
import Loader from "./layouts/Loader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error, user, isAuthenticated } = useSelector(
    (state) => state.authState
  );
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (isAuthenticated && user?.role === "admin") {
      toast.success("Login successfully!", {
        position: "bottom-center",
      });
      navigate("/admin/users");
    }

    if (isAuthenticated && user?.role === "user") {
      toast.success("Login successfully!", {
        position: "bottom-center",
      });
      navigate("/home");
    }

    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onClose: () => dispatch(clearAuthError()),
      });
      return;
    }
  }, [error, user, isAuthenticated, dispatch, navigate]);

  return (
    <Fragment>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "auto",
        }}
      >
        <MetaData title={"Login"} />

        <Title />

        <div
          className="d-flex justify-content-center align-items-center p-5"
          style={{ minHeight: "75vh" }}
        >
          <div className="bg-light p-4 rounded w-25 border border-primary border-3">
            <h2 className="text-primary d-flex justify-content-center align-items-center">
              Login
            </h2>
            {/* {error && <p className="alert alert-danger">{error}</p>} */}
            <form onSubmit={submitHandler}>
              <div className="mb-3 text-primary">
                <label htmlFor="email-input">
                  <strong>Email</strong>
                </label>
                <input
                  id="email-input" // Use id matching the label's "htmlFor"
                  type="email"
                  placeholder="Enter Email"
                  autoComplete="off"
                  name="email"
                  className="form-control rounded-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3 text-primary">
                <label htmlFor="password-input">
                  <strong>Password</strong>
                </label>
                <input
                  id="password-input" // Use id matching the label's "htmlFor"
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  className="form-control rounded-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-100 rounded-10"
              >
                Login
              </button>
              <p className="mt-3 mb-3 text-primary d-flex justify-content-center align-items-center">
                <Loader />
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
}

export default Login;
