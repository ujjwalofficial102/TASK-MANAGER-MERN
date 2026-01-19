import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/auth.api";
import Input from "../components/Input";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      return setError("all fields are required");
    }

    if (form.password.length < 6) {
      return setError("password must be at least 6 characters");
    }

    setLoading(true);
    try {
      await registerUser(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold">Register</h1>
        <p className="text-sm text-gray-500 mt-1">
          Create your account to continue
        </p>

        {error ? (
          <div className="mt-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
          <Input
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

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
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link className="text-black font-semibold underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
