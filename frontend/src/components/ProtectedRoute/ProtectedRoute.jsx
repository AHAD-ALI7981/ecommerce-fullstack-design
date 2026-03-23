import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";

export default function ProtectedRoute({ children, allowedRole }) {
  const { authUser, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-lg font-semibold">Authenticating...</span>
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/" />;
  }

  if (allowedRole && authUser?.role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
}
