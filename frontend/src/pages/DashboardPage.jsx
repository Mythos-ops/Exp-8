import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getProtectedArea } from "../services/api";

export default function DashboardPage() {
  const { user, token } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getProtectedArea(token, "user-area");
        setMessage(data.message);
      } catch (err) {
        setError(err.message || "Failed to load protected data");
      }
    }

    load();
  }, [token]);

  return (
    <section className="page-card">
      <h2>Dashboard</h2>
      <p>Welcome, {user?.name}</p>
      <p className="chip">Role: {user?.role}</p>
      {message ? <p className="ok-box">{message}</p> : null}
      {error ? <p className="error-box">{error}</p> : null}
    </section>
  );
}
