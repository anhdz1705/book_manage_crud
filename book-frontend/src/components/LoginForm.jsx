import { useState } from "react";

const initialCredentials = {
  username: "",
  password: "",
};

function LoginForm({ onLogin }) {
  const [credentials, setCredentials] = useState({ ...initialCredentials });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateCredential = (field, value) => {
    setCredentials((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await onLogin(credentials);
      setCredentials({ ...initialCredentials });
    } catch (requestError) {
      setError(requestError?.response?.data?.detail || "Đăng nhập thất bại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="login-panel">
        <h1 style={{ textAlign: "center" }}>Login</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            <span>Username</span>
            <input
              type="text"
              value={credentials.username}
              onChange={(event) => updateCredential("username", event.target.value)}
              required
              autoComplete="username"
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              value={credentials.password}
              onChange={(event) => updateCredential("password", event.target.value)}
              required
              autoComplete="current-password"
            />
          </label>

          {error && <p className="status-message error">{error}</p>}

          <button className="primary-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginForm;
