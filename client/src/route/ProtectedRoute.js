import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/layouts/Loader";

export default function ProtectedRoute({ children, isAdmin }) {
  const { isAuthenticated, loading, user } = useSelector(
    (state) => state.authState
  );

  if (!isAuthenticated && !loading) {
    return <Navigate to="/" />;
  }

  if (isAuthenticated) {
    if (isAdmin === true && user.role !== "admin") {
      return <Navigate to="/equipment" />;
    }
    return children;
  }

  if (loading) {
    return <Loader />;
  }
}
