import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const response = await api.post("/auth/login", form);

      login(response.data);

      if (
        response.data.user.role === "OWNER" ||
        response.data.user.role === "ADMIN"
      ) {
        navigate("/admin");
      } else if (response.data.user.role === "RECEPTIONIST") {
        navigate("/reception");
      } else if (response.data.user.role === "STYLIST") {
        navigate("/stylist");
      } else if (response.data.user.role === "ASSISTANT") {
        navigate("/assistant");
      } else {
        navigate("/customer");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 shadow-xl p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">S</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-800">
            Salon CRM
          </h1>

          <p className="mt-2 text-slate-500">
            Sign in to your account
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-cyan-500 focus:bg-white"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-cyan-500 focus:bg-white"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white transition hover:opacity-95"
          >
            Login
          </button>
        </form>

        <div className="mt-6 border-t border-slate-200 pt-6 text-center">
          <p className="mb-3 text-sm text-slate-500">
            Don't have an account?
          </p>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="w-full rounded-xl border border-cyan-500 py-3 font-semibold text-cyan-600 transition hover:bg-cyan-50"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;