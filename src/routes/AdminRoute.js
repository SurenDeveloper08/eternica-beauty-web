import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const AdminRoute = () => {
  const { admin } = useContext(AuthContext);
  return admin ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default AdminRoute;
