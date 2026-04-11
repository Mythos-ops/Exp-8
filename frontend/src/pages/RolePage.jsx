import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getProtectedArea } from "../services/api";

export default function RolePage({ areaPath, title }) {
  const { token } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getProtectedArea(token, areaPath);
        setMessage(data.message);
      } catch (err) {
        setError(err.message || "Failed to load role data");
      }
    }

    load();
  }, [token, areaPath]);

  return (
    <section className="page-card">
      <h2>{title}</h2>
      {message ? <p className="ok-box">{message}</p> : null}
      {error ? <p className="error-box">{error}</p> : null}
    </section>
  );
}
