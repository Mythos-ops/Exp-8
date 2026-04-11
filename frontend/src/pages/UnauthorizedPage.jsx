import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
    <section className="page-card">
      <h2>403 Unauthorized</h2>
      <p>You do not have enough permissions to view this resource.</p>
      <Link className="ghost-link" to="/dashboard">
        Back to dashboard
      </Link>
    </section>
  );
}
