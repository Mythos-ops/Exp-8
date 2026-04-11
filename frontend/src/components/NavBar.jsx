import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="topbar">
      <div className="brand">Secure Portal</div>
      <nav className="menu">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/role/user">User</Link>
            <Link to="/role/manager">Manager</Link>
            <Link to="/role/admin">Admin</Link>
            <span className="chip">{user?.role}</span>
            <button className="ghost" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}
