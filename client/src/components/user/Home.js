import { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Container } from "react-bootstrap";
import moment from "moment";
import bgImg from "../../assets/bg-img.jpg";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getEquipments,
  sendEmail,
  clearHomeError,
} from "../../actions/adminActions";
import { clearError, clearSendEamil } from "../../slices/adminSlice";
import Loader from "../layouts/Loader";

function Home() {
  const dispatch = useDispatch();

  // Fetch equipment data from Redux store
  const { loading, equipments, isEmailsuccess, error } = useSelector(
    (state) => state.adminState
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
    if (isEmailsuccess) {
      toast.success("Email sent successfully!", {
        position: "bottom-center",
        //onClose: () => dispatch(clearHomeError())
      });
      dispatch(clearSendEamil());
      // Clear the form fields after success
      setFormData({
        email: "",
        serviceRequest: "",
        message: "",
      });
    }

    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onClose: () => dispatch(clearError()),
      });
    }
  }, [dispatch, error, isEmailsuccess]);

  // Fetch equipments when the component is mounted
  useEffect(() => {
    dispatch(getEquipments());

    if (error) {
      console.log(error);
      dispatch(clearHomeError());
    }
  }, [dispatch, error]);

  return (
    <Fragment>
      <ToastContainer />{" "}
      {/* Make sure this is placed here for toasts to work */}
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
        <MetaData title={"Home"} />
        <Container className="border border-primary border-3 rounded p-4 mt-2 mb-2 bg-light">
          <h3 className="bg-primary text-center text-white rounded p-2 mt-2">
            Home
          </h3>
          <h4 className="mt-3 mb-3 text-primary text-center">
            Test Report Status
          </h4>
          <div className="rounded mx-auto" style={{ maxWidth: "800px" }}>
            <div className="bg-white shadow rounded p-3 border border-primary border-1 mx-auto mb-2">
              {/* Show loading spinner or equipment data */}
              {loading ? (
                <Loader />
              ) : equipments.length > 0 ? (
                <Carousel>
                  {equipments.map((equipment) => {
                    const isDue = moment(
                      equipment.nextservicedate
                    ).isSameOrBefore(moment(), "day");
                    let remarks = equipment.remarks;

                    if (isDue) {
                      remarks = "Please contact service vendor.";
                    }

                    return (
                      <div key={equipment._id} className="text-center p-3">
                        <h2
                          className={`text-white rounded ${
                            isDue ? "bg-danger" : "bg-secondary"
                          }`}
                        >
                          {equipment.equipmentname}
                        </h2>
                        <div className="text-primary bg-light rounded p-2 text-bold">
                          <p>
                            Testing Date:{" "}
                            {moment(equipment.testingdate).format(
                              "MMMM Do YYYY"
                            )}
                          </p>
                          <p>
                            Next Service Date:{" "}
                            {moment(equipment.nextservicedate).format(
                              "MMMM Do YYYY"
                            )}
                          </p>
                          <p className={isDue ? "text-danger" : ""}>
                            Remarks: {remarks}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </Carousel>
              ) : (
                <div className="text-center text-danger">
                  <p>No equipment data found. Please try again.</p>
                </div>
              )}
            </div>
            <div className="d-flex justify-content-between">
              <h5 className="text-secondary">*Valid test report</h5>
              <h5 className="text-danger">*Expired test report</h5>
            </div>
          </div>

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
    </Fragment>
  );
}

export default Home;
