import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth.api";
import Input from "../components/Input";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password.trim()) {
      return setError("email and password are required");
    }

    setLoading(true);
    try {
      await loginUser(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back, login to continue
        </p>

        {error ? (
          <div className="mt-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
          <Input
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
          />

          <Input
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
          />

          <button
            disabled={loading}
            className="bg-black text-white rounded-xl py-2 font-medium disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link className="text-black font-semibold underline" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
