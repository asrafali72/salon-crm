import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  CalendarDays,
  UserCheck,
  Clock,
  IndianRupee,
} from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api
      .get("/reception/dashboard")
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!stats) {
    return (
      <div className="flex h-72 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-1">
      {/* Header */}
      <div className="rounded-3xl bg-linear-to-r from-indigo-600 via-cyan-600 to-teal-500 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">Reception Dashboard</h1>
        <p className="mt-3 text-cyan-100 text-lg">
          Monitor today's bookings, check-ins and revenue.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-cyan-100 p-3">
              <CalendarDays className="text-cyan-600" size={22} />
            </div>
          </div>
          <h2 className="mt-5 text-3xl font-bold text-slate-800">
            {stats.bookings}
          </h2>
          <p className="mt-1 text-sm text-slate-500">Today's Bookings</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-emerald-100 p-3">
              <UserCheck className="text-emerald-600" size={22} />
            </div>
          </div>
          <h2 className="mt-5 text-3xl font-bold text-slate-800">
            {stats.checkedIn}
          </h2>
          <p className="mt-1 text-sm text-slate-500">Checked In</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-orange-100 p-3">
              <Clock className="text-orange-600" size={22} />
            </div>
          </div>
          <h2 className="mt-5 text-3xl font-bold text-slate-800">
            {stats.waiting}
          </h2>
          <p className="mt-1 text-sm text-slate-500">Waiting</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-violet-100 p-3">
              <IndianRupee className="text-violet-600" size={22} />
            </div>
          </div>
          <h2 className="mt-5 text-3xl font-bold text-slate-800">
            ₹{stats.revenue}
          </h2>
          <p className="mt-1 text-sm text-slate-500">Today's Revenue</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;