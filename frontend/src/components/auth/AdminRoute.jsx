import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AdminRoute = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const role = String(user?.role || "")
    .trim()
    .toLowerCase();

  if (role !== "admin") {
    return <Navigate to="/buyer" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;