import { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, getUsers } from "../../actions/userActions";
import { clearError, clearUserDeleted } from "../../slices/userSlice";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import { Container } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import bgImg from "../../assets/bg-img.jpg";
import MetaData from "../layouts/MetaData";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function UserList() {
  const {
    users = [],
    loading = true,
    error,
    isUserDeleted,
  } = useSelector((state) => state.userState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setUsers = () => {
    const data = {
      columns: [
        { label: "ID", field: "id", sort: "asc" },
        { label: "Name", field: "name", sort: "asc" },
        { label: "Email", field: "email", sort: "asc" },
        { label: "Role", field: "role", sort: "asc" },
        { label: "Actions", field: "actions", sort: "asc" },
      ],
      rows: [],
    };

    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        actions: (
          <Fragment>
            {/* Edit Button */}
            <Link
              to={`/admin/user/${user._id}`}
              className="btn btn-sm btn-primary me-2"
              title="Edit User"
            >
              <FaPencilAlt /> Edit
            </Link>

            {/* Delete Button */}
            <Button
              onClick={(e) => deleteHandler(e, user._id)}
              className="btn btn-sm btn-danger"
              title="Delete User"
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
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        onClose: () => dispatch(clearError()),
      });
      return;
    }
    if (isUserDeleted) {
      toast.success("User Deleted successfully!", {
        position: "bottom-center",
        onOpen: () => dispatch(clearUserDeleted()),
      });
      return;
    }
    dispatch(getUsers);
  }, [dispatch, error, isUserDeleted]);

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
        <MetaData title={"User List"} />
        <Container className="border border-primary border-3 rounded p-4 mt-2 mb-2 bg-light">
          <h3 className="bg-primary text-center text-white rounded p-2 mt-2">
            User List
          </h3>
          <button
            onClick={() => navigate("/admin/users/create")}
            className="btn update-btn btn-success mt-4 mb-3"
          >
            Add User
          </button>
          <div className="bg-white border border-primary border-1 rounded p-2 mt-2 mb-2">
            {loading ? (
              <Loader />
            ) : (
              <div className="table-responsive">
                <MDBDataTable striped bordered small hover data={setUsers()} />
              </div>
            )}
          </div>
        </Container>
      </div>
      <ToastContainer />
    </Fragment>
  );
}

export default UserList;
