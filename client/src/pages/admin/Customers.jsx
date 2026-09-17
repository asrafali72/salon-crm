import { useEffect, useState } from "react";
import api from "../../services/api";

import CustomerForm from "../../components/customer/CustomerForm";
import CustomerTable from "../../components/customer/CustomerTable";

import {
  Users,
  UserPlus,
  Search,
  Phone,
  ArrowUpRight,
  Filter,
} from "lucide-react";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  const loadCustomers = async () => {
    const res = await api.get("/customers", {
      params: { search },
    });
    setCustomers(res.data);
  };

  useEffect(() => {
    loadCustomers();
  }, [search]);

  const createCustomer = async (data) => {
    await api.post("/customers", data);
    loadCustomers();
  };

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-1">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#0F172A] via-[#1E3A8A] to-[#0EA5E9] p-8 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white,transparent_45%)] opacity-20" />

        <div className="relative flex flex-col md:flex-row justify-between gap-5">
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-cyan-200 mb-3">
              CRM • CUSTOMERS
            </p>

            <h1 className="text-4xl font-bold mb-2">
              Customer Management
            </h1>

            <p className="text-slate-200 text-lg">
              Manage customer profiles and appointment history.
            </p>
          </div>

          <button className="flex items-center gap-2 self-start rounded-full border border-white/30 bg-white/20 px-5 py-3 backdrop-blur hover:bg-white/30">
            <UserPlus size={18} />
            Add Customer
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-cyan-100 p-3 text-cyan-600">
              <Users size={22} />
            </div>

            <span className="flex items-center gap-1 text-sm font-medium text-emerald-600">
              <ArrowUpRight size={15} />
              Active
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-bold">
            {customers.length}
          </h2>

          <p className="text-sm text-slate-500">
            Total Customers
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600 w-fit">
            <Phone size={22} />
          </div>

          <h2 className="mt-5 text-3xl font-bold">
            {customers.filter((c) => c.phone).length}
          </h2>

          <p className="text-sm text-slate-500">
            Verified Contacts
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-violet-100 p-3 text-violet-600 w-fit">
            <UserPlus size={22} />
          </div>

          <h2 className="mt-5 text-3xl font-bold">
            +{customers.length}
          </h2>

          <p className="text-sm text-slate-500">
            Customer Growth
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-3 text-slate-400"
              size={18}
            />

            <input
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 outline-none focus:border-cyan-500"
              placeholder="Search by customer name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 hover:bg-slate-50">
            <Filter size={16} />
            Filters
          </button>
        </div>
      </div>

      {/* Add Customer Form */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="text-xl font-bold text-slate-800">
            Register New Customer
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Create a customer profile with contact details.
          </p>
        </div>

        <div className="p-6">
          <CustomerForm onCreate={createCustomer} />
        </div>
      </div>

      {/* Customer Directory */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Customer Directory
            </h2>

            <p className="text-sm text-slate-500">
              Browse and manage all registered customers.
            </p>
          </div>

          <div className="rounded-full bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700">
            {customers.length} Customers
          </div>
        </div>

        <div className="overflow-x-auto p-6">
          <CustomerTable customers={customers} />
        </div>
      </div>
    </div>
  );
};

export default Customers;