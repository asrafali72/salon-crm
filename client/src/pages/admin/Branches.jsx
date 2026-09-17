import { useEffect, useState } from "react";
import api from "../../services/api";

import BranchForm from "../../components/branch/BranchForm";
import BranchTable from "../../components/branch/BranchTable";

import {
  Building2,
  MapPin,
  Plus,
  ArrowUpRight,
} from "lucide-react";

const Branches = () => {
  const [branches, setBranches] = useState([]);

  const fetchBranches = async () => {
    const res = await api.get("/branches");
    setBranches(res.data);
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const createBranch = async (data) => {
    try {
      await api.post("/branches", data);
      fetchBranches();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-1">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#0F172A] via-[#1E3A8A] to-[#0EA5E9] p-8 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white,transparent_45%)] opacity-20" />

        <div className="relative flex flex-col md:flex-row justify-between md:items-center gap-5">
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-cyan-200 mb-3">
              CRM • BRANCHES
            </p>

            <h1 className="text-4xl font-bold mb-2">
              Branch Management
            </h1>

            <p className="text-slate-200 text-lg">
              Manage all salon locations from one dashboard.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-5 py-3 backdrop-blur hover:bg-white/30">
            <Plus size={18} />
            New Branch
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-cyan-100 p-3 text-cyan-600">
              <Building2 size={22} />
            </div>

            <span className="flex items-center gap-1 text-sm font-medium text-emerald-600">
              <ArrowUpRight size={15} />
              Active
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-bold">
            {branches.length}
          </h2>

          <p className="text-sm text-slate-500">
            Total Branches
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600 w-fit">
            <MapPin size={22} />
          </div>

          <h2 className="mt-5 text-3xl font-bold">
            {branches.length}
          </h2>

          <p className="text-sm text-slate-500">
            Cities Covered
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-violet-100 p-3 text-violet-600 w-fit">
            <Building2 size={22} />
          </div>

          <h2 className="mt-5 text-3xl font-bold">
            100%
          </h2>

          <p className="text-sm text-slate-500">
            Operational Branches
          </p>
        </div>
      </div>

      {/* Branch Form */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="text-xl font-bold text-slate-800">
            Add New Branch
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Create and register a new salon location.
          </p>
        </div>

        <div className="p-6">
          <BranchForm onSubmit={createBranch} />
        </div>
      </div>

      {/* Branch List */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Branch Directory
            </h2>

            <p className="text-sm text-slate-500">
              View and manage all registered branches.
            </p>
          </div>

          <div className="rounded-full bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700">
            {branches.length} Branches
          </div>
        </div>

        <div className="p-6 overflow-x-auto">
          <BranchTable branches={branches} />
        </div>
      </div>
    </div>
  );
};

export default Branches;