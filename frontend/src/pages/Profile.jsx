import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getMe, updateMe } from "../api/user.api";

export default function Profile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await getMe();
      setForm((prev) => ({
        ...prev,
        name: res.data.user.name || "",
      }));
    } catch (err) {
      alert(err?.response?.data?.message || "failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!form.name.trim()) return alert("name is required");

    setLoading(true);
    try {
      await updateMe({
        name: form.name,
        ...(form.password.trim() ? { password: form.password } : {}),
      });

      setForm((prev) => ({ ...prev, password: "" }));
      setMsg("profile updated successfully");
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err) {
      alert(err?.response?.data?.message || "failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold">update profile</h2>
          <p className="text-sm text-gray-600 mt-1">
            update your name or password
          </p>

          {msg ? (
            <div className="mt-4 p-3 rounded-xl bg-green-100 text-green-700 text-sm">
              {msg}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">name</label>
              <input
                className="border rounded-xl px-3 py-2"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">new password</label>
              <input
                className="border rounded-xl px-3 py-2"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="leave empty to keep same password"
              />
            </div>

            <button
              disabled={loading}
              className="bg-black text-white rounded-xl py-2 font-medium disabled:opacity-60"
            >
              {loading ? "updating..." : "update"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
