import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import { useEffect } from "react";
import store from "./store";
import { loadUser } from "./actions/userActions";
import ProtectedRoute from "./route/ProtectedRoute";
import Login from "./components/Login";
import UserList from "./components/admin/UserList";
import Register from "./components/admin/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ResetPassword from "./components/admin/ResetPassword";
import UpdateUser from "./components/admin/UpdateUser";
import ForgotPassword from "./components/admin/ForgotPassword";
import Home from "./components/user/Home";
import EquipmentList from "./components/admin/EquipmentList";
import AddNewEquipment from "./components/admin/AddNewEquipment";
import UpdateEquipment from "./components/admin/UpdateEquipment";
import Details from "./components/user/Details";
import UpdateDetail from "./components/admin/UpdateDetail";
import AddNewDetail from "./components/admin/AddNewDetail";
import DetailList from "./components/admin/DetailList";
import Dashboard from "./components/user/Dashboard";
import Report0 from "./components/table/Report0";
import Report1 from "./components/table/Report1";
import Report2 from "./components/table/Report2";
import Report3 from "./components/table/Report3";
import Report4 from "./components/table/Report4";
import Report5 from "./components/table/Report5";
import Report6 from "./components/table/Report6";
import Report7 from "./components/table/Report7";
import Report8 from "./components/table/Report8";

function App() {
  useEffect(() => {
    store.dispatch(loadUser); // Correct this to store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            <Route
              path="/myprofile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myprofile/update"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myprofile/update/password"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/details"
              element={
                <ProtectedRoute>
                  <Details />
                </ProtectedRoute>
              }
            />
            <Route
              path="/table/report0"
              element={
                <ProtectedRoute>
                  <Report0 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/table/report1"
              element={
                <ProtectedRoute>
                  <Report1 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/table/report2"
              element={
                <ProtectedRoute>
                  <Report2 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/table/report3"
              element={
                <ProtectedRoute>
                  <Report3 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/table/report4"
              element={
                <ProtectedRoute>
                  <Report4 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/table/report5"
              element={
                <ProtectedRoute>
                  <Report5 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/table/report6"
              element={
                <ProtectedRoute>
                  <Report6 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/table/report7"
              element={
                <ProtectedRoute>
                  <Report7 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/table/report8"
              element={
                <ProtectedRoute>
                  <Report8 />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Routes>
            {/* Admin Routes */}
            <Route
              path="/admin/users/create"
              element={
                <ProtectedRoute isAdmin={true}>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/password/forgot"
              element={
                <ProtectedRoute isAdmin={true}>
                  <ForgotPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UserList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/user/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UpdateUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/equipments"
              element={
                <ProtectedRoute isAdmin={true}>
                  <EquipmentList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/equipment/create"
              element={
                <ProtectedRoute isAdmin={true}>
                  <AddNewEquipment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/equipment/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UpdateEquipment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/details"
              element={
                <ProtectedRoute isAdmin={true}>
                  <DetailList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/detail/create"
              element={
                <ProtectedRoute isAdmin={true}>
                  <AddNewDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/detail/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UpdateDetail />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
