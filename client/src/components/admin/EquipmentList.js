import { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteEquipment, getEquipments } from "../../actions/adminActions";
import { clearError, clearEquipmentDeleted } from "../../slices/adminSlice";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import { toast, ToastContainer } from "react-toastify";
import { Container } from "react-bootstrap";
import bgImg from "../../assets/bg-img.jpg";
import MetaData from "../layouts/MetaData";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { formatDate } from "../../utils/dateFormat";

function EquipmentList() {
  const {
    equipments = [],
    loading = true,
    error,
    isEquipmentDeleted,
  } = useSelector((state) => state.adminState || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setEquipments = () => {
    const data = {
      columns: [
        { label: "Equipment Name", field: "equipmentname", sort: "asc" },
        { label: "Test Date", field: "testingdate", sort: "asc" },
        { label: "Next Service Date", field: "nextservicedate", sort: "asc" },
        { label: "Remarks", field: "remarks", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: [],
    };

    equipments.forEach((equipment) => {
      data.rows.push({
        equipmentname: equipment.equipmentname,
        testingdate: equipment.testingdate
          ? formatDate(equipment.testingdate)
          : "",
        nextservicedate: equipment.nextservicedate
          ? formatDate(equipment.nextservicedate)
          : "",
        remarks: equipment.remarks,
        actions: (
          <Fragment>
            <Link
              to={`/admin/equipment/${equipment._id}`}
              className="btn btn-sm btn-primary me-2"
              title="Edit Equipment"
            >
              <FaPencilAlt /> Edit
            </Link>
            <Button
              onClick={(e) => deleteHandler(e, equipment._id)}
              className="btn btn-sm btn-danger"
              title="Delete Equipment"
            >
              <FaTrashAlt /> Delete
            </Button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteEquipment(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onClose: () => dispatch(clearError()),
      });
      return;
    }
    if (isEquipmentDeleted) {
      toast.success("Equipment Deleted successfully!", {
        position: "bottom-center",
        onOpen: () => dispatch(clearEquipmentDeleted()),
      });
      return;
    }
    dispatch(getEquipments());
  }, [dispatch, error, isEquipmentDeleted]);

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
        <MetaData title={"Equipment List"} />
        <Container className="border border-primary border-3 rounded p-4 mt-2 mb-2 bg-light">
          <h3 className="bg-primary text-center text-white rounded p-2 mt-2">
            Equipment List
          </h3>
          <button
            onClick={() => navigate("/admin/equipment/create")}
            className="btn update-btn btn-success mt-4 mb-3"
          >
            Add Equipment
          </button>
          <div className="bg-white border border-primary border-1 rounded p-2 mt-2 mb-2">
            {loading ? (
              <Loader />
            ) : (
              <div className="table-responsive">
                <MDBDataTable
                  striped
                  bordered
                  small
                  hover
                  data={setEquipments()}
                />
              </div>
            )}
          </div>
        </Container>
      </div>
      <ToastContainer />
    </Fragment>
  );
}

export default EquipmentList;
