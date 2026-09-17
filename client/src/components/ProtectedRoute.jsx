import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Sparkles } from "lucide-react";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();

  // Premium loading screen
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 text-white shadow-lg">
            <Sparkles size={28} />
          </div>

          <h2 className="text-xl font-bold text-slate-800">
            Vynexa Healthcare
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Verifying your access...
          </p>

          <div className="mx-auto mt-5 h-1.5 w-44 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-1/2 animate-[pulse_1.2s_ease-in-out_infinite] rounded-full bg-linear-to-r from-cyan-500 to-blue-600" />
          </div>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Role not allowed
  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;