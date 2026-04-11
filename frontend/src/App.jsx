import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RolePage from "./pages/RolePage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

export default function App() {
  return (
    <div className="app-layout">
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route element={<RoleRoute minimumRole="user" />}>
            <Route path="/role/user" element={<RolePage title="User Area" areaPath="user-area" />} />
          </Route>

          <Route element={<RoleRoute minimumRole="manager" />}>
            <Route
              path="/role/manager"
              element={<RolePage title="Manager Area" areaPath="manager-area" />}
            />
          </Route>

          <Route element={<RoleRoute minimumRole="admin" />}>
            <Route path="/role/admin" element={<RolePage title="Admin Area" areaPath="admin-area" />} />
          </Route>
        </Route>

        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}
