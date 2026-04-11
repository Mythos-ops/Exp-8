import { useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function validate(values) {
  const errors = {};

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return errors;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading, authMessage } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [submitError, setSubmitError] = useState("");

  const errors = useMemo(() => validate(form), [form]);
  const isFormValid = Object.keys(errors).length === 0;

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setTouched({ email: true, password: true });
    setSubmitError("");

    if (!isFormValid) {
      return;
    }

    const result = await login(form.email, form.password);

    if (result.ok) {
      navigate("/dashboard", { replace: true });
      return;
    }

    setSubmitError(result.message || "Login failed");
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(event) {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  return (
    <main className="auth-shell">
      <section className="glass-card">
        <h1>Login</h1>
        <p className="subtitle">Use one of these demo accounts: admin@example.com / manager@example.com / user@example.com</p>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email ? <span className="error">{errors.email}</span> : null}
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Min 8 characters"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password ? <span className="error">{errors.password}</span> : null}
          </label>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        {submitError ? <p className="feedback error-box">{submitError}</p> : null}
        {authMessage && !submitError ? <p className="feedback ok-box">{authMessage}</p> : null}
      </section>
    </main>
  );
}
