import { useEffect, useState } from "react";
import api from "../../services/api";

import ServiceForm from "../../components/service/ServiceForm";
import ServiceTable from "../../components/service/ServiceTable";

import {
  Scissors,
  Sparkles,
  Clock3,
  IndianRupee,
  Plus,
  ArrowUpRight,
} from "lucide-react";

const Services = () => {
  const [services, setServices] = useState([]);

  const load = async () => {
    const res = await api.get("/services");
    setServices(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (data) => {
    await api.post("/services", data);
    load();
  };

  const totalServices = services.length;

  const avgPrice =
    totalServices === 0
      ? 0
      : Math.round(
          services.reduce((sum, s) => sum + Number(s.price || 0), 0) /
            totalServices
        );

  const avgDuration =
    totalServices === 0
      ? 0
      : Math.round(
          services.reduce((sum, s) => sum + Number(s.duration || 0), 0) /
            totalServices
        );

  const activeServices = services.filter(
    (s) => s.status !== "INACTIVE"
  ).length;

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-1">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#0F172A] via-[#2563EB] to-[#06B6D4] p-8 text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent_45%)]" />

        <div className="relative flex flex-col md:flex-row justify-between gap-5">
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-cyan-200 mb-3">
              CRM • SERVICES
            </p>

            <h1 className="text-4xl font-bold mb-2">
              Service Catalog
            </h1>

            <p className="text-cyan-100 text-lg">
              Manage salon services, pricing and treatment duration.
            </p>
          </div>

          <button className="flex items-center gap-2 self-start rounded-full border border-white/30 bg-white/20 px-5 py-3 backdrop-blur hover:bg-white/30">
            <Plus size={18} />
            Add Service
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<Scissors size={22} />}
          color="bg-cyan-100 text-cyan-600"
          title="Total Services"
          value={totalServices}
        />

        <StatCard
          icon={<IndianRupee size={22} />}
          color="bg-emerald-100 text-emerald-600"
          title="Average Price"
          value={`₹${avgPrice}`}
        />

        <StatCard
          icon={<Clock3 size={22} />}
          color="bg-violet-100 text-violet-600"
          title="Avg Duration"
          value={`${avgDuration} min`}
        />

        <StatCard
          icon={<Sparkles size={22} />}
          color="bg-amber-100 text-amber-600"
          title="Active Services"
          value={activeServices}
        />
      </div>

      {/* Add Service */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="text-xl font-bold text-slate-800">
            Create New Service
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Add a salon treatment with pricing and duration.
          </p>
        </div>

        <div className="p-6">
          <ServiceForm onCreate={create} />
        </div>
      </div>

      {/* Services Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Service Directory
            </h2>

            <p className="text-sm text-slate-500">
              View and manage all available salon services.
            </p>
          </div>

          <div className="rounded-full bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700">
            {totalServices} Services
          </div>
        </div>

        <div className="overflow-x-auto p-6">
          <ServiceTable services={services} />
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
        Live
      </span>
    </div>

    <h2 className="mt-5 text-3xl font-bold text-slate-800">{value}</h2>

    <p className="text-sm text-slate-500">{title}</p>
  </div>
);

export default Services;