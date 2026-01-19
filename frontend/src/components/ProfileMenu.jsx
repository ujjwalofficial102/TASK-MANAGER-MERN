import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/auth.api";

export default function ProfileMenu() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.message || "logout failed");
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="px-3 py-2 rounded-xl border hover:bg-gray-100"
      >
        Profile
      </button>

      {open ? (
        <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow p-2">
          <button
            onClick={() => {
              setOpen(false);
              navigate("/profile");
            }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            Update Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-red-600"
          >
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}
