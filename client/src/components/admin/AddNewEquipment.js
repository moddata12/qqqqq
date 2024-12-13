import { Fragment, useEffect, useState } from "react";
import bgImg from "../../assets/bg-img.jpg";
import { toast, ToastContainer } from "react-toastify";
import { Container, Form, Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { addEquipment } from "../../actions/adminActions";
import { clearError, clearEquipmentAdded } from "../../slices/adminSlice";
import { useNavigate } from "react-router-dom";

function AddNewEquipment() {
  const [equipmentData, setEquipmentData] = useState({
    equipmentname: "",
    remarks: "",
    nextservicedate: "",
    testingdate: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isEquipmentAdded } = useSelector(
    (state) => state.adminState
  );

  const onChange = (e) => {
    setEquipmentData({ ...equipmentData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!equipmentData.equipmentname || !equipmentData.remarks) {
      toast.error("Please fill all required fields.", {
        position: "bottom-center",
      });
      return;
    }

    dispatch(addEquipment(equipmentData));
  };

  useEffect(() => {
    if (isEquipmentAdded) {
      toast.success("Equipment added successfully!", {
        position: "bottom-center",
        // onOpen: () => dispatch(cleareError())
      });
      dispatch(clearEquipmentAdded());
    }

    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onClose: () => dispatch(clearError()),
      });
    }
  }, [error, isEquipmentAdded, dispatch, navigate]);

  return (
    <Fragment>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh", // Ensure full viewport height
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MetaData title={"Add Equipment"} />
        <Container className="border border-primary border-3 rounded p-4 mt-2 mb-2 bg-light">
          <h3 className="bg-primary text-center text-white rounded p-2 mt-2">
            Add Equipment
          </h3>
          <Form
            onSubmit={submitHandler}
            className="shadow-lg bg-white rounded p-5"
          >
            <Form.Group controlId="equipmentname_field">
              <Form.Label>Equipment Name</Form.Label>
              <Form.Control
                type="text"
                name="equipmentname"
                value={equipmentData.equipmentname}
                onChange={onChange}
                placeholder="Enter equipment name"
                required
              />
            </Form.Group>
            <Form.Group controlId="remarks_field">
              <Form.Label>Remarks</Form.Label>
              <Form.Control
                type="text"
                name="remarks"
                value={equipmentData.remarks}
                onChange={onChange}
                placeholder="Enter remarks"
                required
              />
            </Form.Group>
            <Form.Group controlId="testingdate_field">
              <Form.Label>Testing Date</Form.Label>
              <Form.Control
                type="date"
                name="testingdate"
                value={equipmentData.testingdate}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group controlId="nextservicedate_field">
              <Form.Label>Next Service Date</Form.Label>
              <Form.Control
                type="date"
                name="nextservicedate"
                value={equipmentData.nextservicedate}
                onChange={onChange}
              />
            </Form.Group>
            <Button
              id="update_button"
              type="submit"
              disabled={loading}
              className="btn update-btn btn-success mt-4 mb-3"
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

export default AddNewEquipment;
