import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getMe } from "../api/user.api";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getMe();
        setIsAuth(true);
      } catch (err) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">loading...</p>
      </div>
    );
  }

  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
}
