import { Fragment, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import bgImg from "../../assets/bg-img.jpg";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearSendEamil, clearError } from "../../slices/requestSlice";
import { sendEmail } from "../../actions/requestActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Test() {
  const dispatch = useDispatch();
  const { loading, isEmailsuccess, error } = useSelector(
    (state) => state.requestState
  );

  const [formData, setFormData] = useState({
    email: "",
    serviceRequest: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendEmail(formData)); // Pass the complete formData
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onClose: () => dispatch(clearError()),
      });
    }
    if (isEmailsuccess) {
      toast.success("Email sent successfully!", {
        position: "bottom-center",
        onClose: () => dispatch(clearSendEamil()),
      });
      setFormData({
        email: "",
        serviceRequest: "",
        message: "",
      });
    }
  }, [dispatch, error, isEmailsuccess]);

  return (
    <Fragment>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MetaData title={"Test"} />
        <Container className="border border-primary border-3 rounded p-4 mt-2 mb-2 bg-light">
          <h3 className="bg-primary text-center text-white rounded p-2 mt-2">
            Test
          </h3>
          <h4 className="mt-3 mb-3 text-primary text-center">Contact Us</h4>
          <div
            className="bg-white shadow rounded p-3 border border-primary border-1 mx-auto mb-2"
            style={{ maxWidth: "1000px" }}
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Please Enter Your Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="serviceRequest" className="form-label">
                  Service Request
                </label>
                <select
                  className="form-select"
                  id="serviceRequest"
                  name="serviceRequest"
                  value={formData.serviceRequest}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Service Request</option>
                  <option value="VCB Testing">VCB Testing</option>
                  <option value="ACB Testing">ACB Testing</option>
                  <option value="Transformer Testing">
                    Transformer Testing
                  </option>
                  <option value="Energy Auditing">Energy Auditing</option>
                  <option value="Industrial Wiring">Industrial Wiring</option>
                  <option value="LT and HT Panel Service">
                    LT and HT Panel Service
                  </option>
                  <option value="SLD Drawing">SLD Drawing</option>
                  <option value="Demand Increase Approval">
                    Demand Increase Approval
                  </option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </Container>
      </div>
      <ToastContainer />
    </Fragment>
  );
}

export default Test;
