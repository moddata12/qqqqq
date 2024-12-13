import { Fragment, useEffect, useState } from "react";
import bgImg from "../../assets/bg-img.jpg";
import { toast, ToastContainer } from "react-toastify";
import { Container, Form, Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layouts/MetaData";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, updateDetail } from "../../actions/detailActions";
import { clearError, clearDetailUpdated } from "../../slices/detailSlice";

function UpdateDetail() {
  const [detailData, setDetailData] = useState({
    meterid: "",
    incomingsource: "",
    plname: "",
    utility: "",
    breakertype: "",
  });

  const { id: detailId } = useParams();
  const dispatch = useDispatch();
  const { loading, error, detail, isDetailUpdated } = useSelector(
    (state) => state.detailState
  );

  // Initialize detail data on load
  useEffect(() => {
    dispatch(getDetail(detailId));
  }, [dispatch, detailId]);

  // Update local state with fetched detail data
  useEffect(() => {
    if (detail) {
      setDetailData({
        meterid: detail.meterid || "",
        incomingsource: detail.incomingsource || "",
        plname: detail.plname || "",
        breakertype: detail.breakertype || "",
        utility: detail.utility || "",
      });
    }
  }, [detail]);

  const onChange = (e) => {
    setDetailData({ ...detailData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!detailData.incomingsource || !detailData.plname) {
      toast.error("Please fill all required fields.", {
        position: "bottom-center",
      });
      return;
    }

    dispatch(updateDetail(detailId, detailData));
  };

  useEffect(() => {
    if (isDetailUpdated) {
      toast.success("Detail updated successfully!", {
        position: "bottom-center",
        onOpen: () => {
          dispatch(clearDetailUpdated());
        },
      });
    }

    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onClose: () => dispatch(clearError()),
      });
    }
  }, [error, isDetailUpdated, dispatch]);

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
        <MetaData title={"Update Detail"} />
        <Container className="border border-primary border-3 rounded p-4 mt-2 mb-2 bg-light">
          <h3 className="bg-primary text-center text-white rounded p-2 mt-2">
            Update Detail
          </h3>
          <Form
            onSubmit={submitHandler}
            className="shadow-lg bg-white rounded p-5"
          >
            <Form.Group controlId="meterid_field">
              <Form.Label>Meter ID</Form.Label>
              <Form.Control
                type="text"
                name="meterid"
                value={detailData.meterid}
                onChange={onChange}
                placeholder="Enter meter id"
                required
              />
            </Form.Group>
            <Form.Group controlId="incomingsource_field">
              <Form.Label>Incoming Source</Form.Label>
              <Form.Control
                type="text"
                name="incomingsource"
                value={detailData.incomingsource}
                onChange={onChange}
                placeholder="Enter detail name"
                required
              />
            </Form.Group>
            <Form.Group controlId="plname_field">
              <Form.Label>Panel Name</Form.Label>
              <Form.Control
                type="text"
                name="plname"
                value={detailData.plname}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group controlId="breakertype_field">
              <Form.Label>Breaker Type</Form.Label>
              <Form.Control
                type="text"
                name="breakertype"
                value={detailData.breakertype}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group controlId="utility_field">
              <Form.Label>Utility</Form.Label>
              <Form.Control
                type="text"
                name="utility"
                value={detailData.utility}
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

export default UpdateDetail;
