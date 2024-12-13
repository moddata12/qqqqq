import { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteDetail, getDetails } from "../../actions/detailActions";
import { clearError, clearDetailDeleted } from "../../slices/detailSlice";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import { toast, ToastContainer } from "react-toastify";
import { Container } from "react-bootstrap";
import bgImg from "../../assets/bg-img.jpg";
import MetaData from "../layouts/MetaData";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function DetailList() {
  const {
    details = [],
    loading = true,
    error,
    isDetailDeleted,
  } = useSelector((state) => state.detailState || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setDetails = () => {
    const data = {
      columns: [
        { label: "Meter ID", field: "meterid", sort: "asc" },
        { label: "Incoming Source", field: "incomingsource", sort: "asc" },
        { label: "Panel Name", field: "plname", sort: "asc" },
        { label: "Breaker Type", field: "breakertype", sort: "asc" },
        { label: "Utility", field: "utility", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: [],
    };

    details.forEach((detail) => {
      data.rows.push({
        meterid: detail.meterid,
        incomingsource: detail.incomingsource,
        plname: detail.plname,
        breakertype: detail.breakertype,
        utility: detail.utility,
        actions: (
          <Fragment>
            <Link
              to={`/admin/detail/${detail._id}`}
              className="btn btn-sm btn-primary me-2"
              title="Edit Detail"
            >
              <FaPencilAlt /> Edit
            </Link>
            <Button
              onClick={(e) => deleteHandler(e, detail._id)}
              className="btn btn-sm btn-danger"
              title="Delete Detail"
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
    dispatch(deleteDetail(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onClose: () => dispatch(clearError()),
      });
      return;
    }
    if (isDetailDeleted) {
      toast.success("Detail Deleted successfully!", {
        position: "bottom-center",
        onOpen: () => dispatch(clearDetailDeleted()),
      });
      return;
    }
    dispatch(getDetails());
  }, [dispatch, error, isDetailDeleted]);

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
        <MetaData title={"Detail List"} />
        <Container className="border border-primary border-3 rounded p-4 mt-2 mb-2 bg-light">
          <h3 className="bg-primary text-center text-white rounded p-2 mt-2">
            Detail List
          </h3>
          <button
            onClick={() => navigate("/admin/detail/create")}
            className="btn update-btn btn-success mt-4 mb-3"
          >
            Add Detail
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
                  data={setDetails()}
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

export default DetailList;
