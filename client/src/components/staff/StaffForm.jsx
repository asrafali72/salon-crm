import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  User,
  Mail,
  Lock,
  Briefcase,
  Building2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const roles = [
  "ADMIN",
  "RECEPTIONIST",
  "STYLIST",
  "ASSISTANT",
];

const StaffForm = ({ onCreate }) => {
  const [branches, setBranches] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STYLIST",
    branchId: "",
    position: "",
    skills: "",
  });

  useEffect(() => {
    api.get("/branches").then((res) => {
      setBranches(res.data);

      if (res.data.length) {
        setForm((prev) => ({
          ...prev,
          branchId: res.data[0].id,
        }));
      }
    });
  }, []);

  const update = (key, value) =>
    setForm({ ...form, [key]: value });

  const submit = (e) => {
    e.preventDefault();

    onCreate({
      ...form,
      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    });

    setForm({
      ...form,
      name: "",
      email: "",
      password: "",
      position: "",
      skills: "",
    });
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      {/* Basic Details */}
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <User size={16} />
            Full Name
          </label>

          <input
            type="text"
            placeholder="Ankit Sharma"
            value={form.name}
            onChange={(e) =>
              update("name", e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:bg-white"
            required
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Mail size={16} />
            Email Address
          </label>

          <input
            type="email"
            placeholder="ankit@gmail.com"
            value={form.email}
            onChange={(e) =>
              update("email", e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:bg-white"
            required
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Lock size={16} />
            Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) =>
              update("password", e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:bg-white"
            required
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Briefcase size={16} />
            Position
          </label>

          <input
            type="text"
            placeholder="Senior Hair Stylist"
            value={form.position}
            onChange={(e) =>
              update("position", e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Role */}
      <div>
        <label className="mb-3 block text-sm font-medium text-slate-700">
          Staff Role
        </label>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {roles.map((role) => {
            const active = form.role === role;

            return (
              <button
                key={role}
                type="button"
                onClick={() => update("role", role)}
                className={`rounded-xl border p-4 transition ${
                  active
                    ? "border-cyan-500 bg-cyan-50"
                    : "border-slate-200 hover:border-cyan-300"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <Briefcase
                    size={20}
                    className={
                      active
                        ? "text-cyan-600"
                        : "text-slate-500"
                    }
                  />

                  <span className="text-xs font-semibold">
                    {role}
                  </span>

                  {active && (
                    <CheckCircle2
                      size={16}
                      className="text-cyan-600"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Branch */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
          <Building2 size={16} />
          Assign Branch
        </label>

        <select
          value={form.branchId}
          onChange={(e) =>
            update("branchId", e.target.value)
          }
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:bg-white"
        >
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </select>
      </div>

      {/* Skills */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
          <Sparkles size={16} />
          Skills
        </label>

        <input
          type="text"
          placeholder="Hair Cutting, Beard, Coloring"
          value={form.skills}
          onChange={(e) =>
            update("skills", e.target.value)
          }
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:bg-white"
        />

        <p className="mt-2 text-xs text-slate-500">
          Separate multiple skills with commas.
        </p>

        {form.skills && (
          <div className="mt-3 flex flex-wrap gap-2">
            {form.skills
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean)
              .map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-medium text-cyan-700"
                >
                  {skill}
                </span>
              ))}
          </div>
        )}
      </div>

      {/* Preview */}
      <div className="rounded-2xl border border-cyan-200 bg-linear-to-r from-cyan-50 to-blue-50 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 text-xl font-bold text-white">
            {form.name ? form.name.charAt(0) : "S"}
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-800">
              {form.name || "New Staff Member"}
            </h3>

            <p className="text-sm text-slate-600">
              {form.position || "Position"} •{" "}
              {form.role}
            </p>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-200 transition hover:opacity-95"
        >
          <User size={18} />
          Add Staff Member
        </button>
      </div>
    </form>
  );
};

export default StaffForm;