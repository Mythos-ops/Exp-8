import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const roleHierarchy = {
  admin: 3,
  manager: 2,
  user: 1
};

export default function RoleRoute({ minimumRole }) {
  const { user } = useAuth();

  if (!user || roleHierarchy[user.role] < roleHierarchy[minimumRole]) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
