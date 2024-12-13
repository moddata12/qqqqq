import { Fragment, useEffect, useState } from "react";
import bgImg from "../../assets/bg-img.jpg";
import { toast, ToastContainer } from "react-toastify";
import { Container, Form, Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layouts/MetaData";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEquipment, updateEquipment } from "../../actions/adminActions";
import { clearError, clearEquipmentUpdated } from "../../slices/adminSlice";

function UpdateEquipment() {
  const [equipmentData, setEquipmentData] = useState({
    equipmentname: "",
    remarks: "",
    nextservicedate: "",
    testingdate: "",
  });

  const { id: equipmentId } = useParams();
  const dispatch = useDispatch();
  const { loading, error, equipment, isEquipmentUpdated } = useSelector(
    (state) => state.adminState
  );

  // Initialize equipment data on load
  useEffect(() => {
    dispatch(getEquipment(equipmentId));
  }, [dispatch, equipmentId]);

  // Update local state with fetched equipment data
  useEffect(() => {
    if (equipment) {
      setEquipmentData({
        equipmentname: equipment.equipmentname || "",
        remarks: equipment.remarks || "",
        nextservicedate: equipment.nextservicedate
          ? equipment.nextservicedate.split("T")[0]
          : "",
        testingdate: equipment.testingdate
          ? equipment.testingdate.split("T")[0]
          : "",
      });
    }
  }, [equipment]);

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

    dispatch(updateEquipment(equipmentId, equipmentData));
  };

  useEffect(() => {
    if (isEquipmentUpdated) {
      toast.success("Equipment updated successfully!", {
        position: "bottom-center",
        onOpen: () => {
          dispatch(clearEquipmentUpdated());
        },
      });
    }

    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onClose: () => dispatch(clearError()),
      });
    }
  }, [error, isEquipmentUpdated, dispatch]);

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
        <MetaData title={"Update Equipment"} />
        <Container className="border border-primary border-3 rounded p-4 mt-2 mb-2 bg-light">
          <h3 className="bg-primary text-center text-white rounded p-2 mt-2">
            Update Equipment
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
              Update
            </Button>
          </Form>
        </Container>
      </div>
      <ToastContainer />
    </Fragment>
  );
}

export default UpdateEquipment;
