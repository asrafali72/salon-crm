import { useEffect, useState } from "react";
import api from "../../services/api";

import StaffForm from "../../components/staff/StaffForm";
import StaffTable from "../../components/staff/StaffTable";

import {
  Users,
  UserPlus,
  ShieldCheck,
  BriefcaseBusiness,
  ArrowUpRight,
  Plus,
} from "lucide-react";

const Staff = () => {
  const [staff, setStaff] = useState([]);

  const loadStaff = async () => {
    const res = await api.get("/staff");
    setStaff(res.data);
  };

  useEffect(() => {
    loadStaff();
  }, []);

  const createStaff = async (data) => {
    await api.post("/staff", data);
    loadStaff();
  };

  const totalStaff = staff.length;
  const stylists = staff.filter((s) => s.role === "STYLIST").length;
  const receptionists = staff.filter(
    (s) => s.role === "RECEPTIONIST"
  ).length;
  const admins = staff.filter((s) => s.role === "ADMIN").length;

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-1">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#0F172A] via-[#2563EB] to-[#0EA5E9] p-8 text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent_45%)]" />

        <div className="relative flex flex-col md:flex-row justify-between gap-5">
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-cyan-200 mb-3">
              CRM • STAFF
            </p>

            <h1 className="text-4xl font-bold mb-2">
              Staff Management
            </h1>

            <p className="text-cyan-100 text-lg">
              Manage employees, roles and branch assignments.
            </p>
          </div>

          <button className="flex items-center gap-2 self-start rounded-full border border-white/30 bg-white/20 px-5 py-3 backdrop-blur hover:bg-white/30">
            <Plus size={18} />
            Add Staff
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Users size={22} />}
          color="bg-cyan-100 text-cyan-600"
          title="Total Staff"
          value={totalStaff}
        />

        <StatCard
          icon={<BriefcaseBusiness size={22} />}
          color="bg-violet-100 text-violet-600"
          title="Stylists"
          value={stylists}
        />

        <StatCard
          icon={<UserPlus size={22} />}
          color="bg-emerald-100 text-emerald-600"
          title="Receptionists"
          value={receptionists}
        />

        <StatCard
          icon={<ShieldCheck size={22} />}
          color="bg-amber-100 text-amber-600"
          title="Admins"
          value={admins}
        />
      </div>

      {/* Add Staff */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="text-xl font-bold text-slate-800">
            Register New Staff
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Create employee accounts and assign roles.
          </p>
        </div>

        <div className="p-6">
          <StaffForm onCreate={createStaff} />
        </div>
      </div>

      {/* Staff Directory */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Staff Directory
            </h2>

            <p className="text-sm text-slate-500">
              View and manage all salon employees.
            </p>
          </div>

          <div className="rounded-full bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700">
            {totalStaff} Employees
          </div>
        </div>

        <div className="overflow-x-auto p-6">
          <StaffTable staff={staff} />
        </div>
      </div>
    </div>
  );
};

/* ---------- KPI Card ---------- */

const StatCard = ({ icon, color, title, value }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <div className={`rounded-xl p-3 ${color}`}>{icon}</div>

      <span className="flex items-center gap-1 text-sm font-medium text-emerald-600">
        <ArrowUpRight size={15} />
        Active
      </span>
    </div>

    <h2 className="mt-5 text-3xl font-bold text-slate-800">
      {value}
    </h2>

    <p className="text-sm text-slate-500">{title}</p>
  </div>
);

export default Staff;