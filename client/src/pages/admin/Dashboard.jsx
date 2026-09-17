import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  IndianRupee,
  Wallet,
  CalendarDays,
  Users,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api
      .get("/reports/dashboard")
      .then((res) => setData(res.data));
  }, []);

  if (!data) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
      </div>
    );
  }

  const cards = data.cards;

  const stats = [
    {
      title: "Revenue Today",
      value: `₹${cards.revenueToday}`,
      icon: <IndianRupee size={22} />,
      color: "bg-cyan-100 text-cyan-600",
      growth: "+12%",
    },
    {
      title: "Monthly Revenue",
      value: `₹${cards.monthlyRevenue}`,
      icon: <Wallet size={22} />,
      color: "bg-emerald-100 text-emerald-600",
      growth: "+18%",
    },
    {
      title: "Appointments",
      value: cards.appointmentsToday,
      icon: <CalendarDays size={22} />,
      color: "bg-violet-100 text-violet-600",
      growth: "+6%",
    },
    {
      title: "Customers",
      value: cards.totalCustomers,
      icon: <Users size={22} />,
      color: "bg-orange-100 text-orange-600",
      growth: "+9%",
    },
  ];

  return (
    <div className="min-h-screen space-y-6 bg-linear-to-br from-slate-50 via-cyan-50/30 to-white p-1">
      {/* HERO SECTION */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#0F172A] via-[#132D5B] to-[#0EA5E9] p-8 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white,transparent_45%)] opacity-20" />

        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="text-cyan-300" size={18} />
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">
                Vynexa Salon CRM
              </p>
            </div>

            <h1 className="mb-3 text-4xl font-bold">
              Welcome back, Admin 👋
            </h1>

            <p className="max-w-xl text-lg text-slate-200">
              Monitor appointments, revenue, customer
              growth and salon performance from one
              intelligent dashboard.
            </p>
          </div>

          {/* Revenue Card */}
          <div className="min-w-60 rounded-2xl border border-white/20 bg-white/15 p-5 backdrop-blur-md">
            <p className="text-sm text-cyan-100">
              Today's Revenue
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              ₹{cards.revenueToday}
            </h2>

            <div className="mt-4 flex items-center gap-2 text-sm text-emerald-300">
              <TrendingUp size={16} />
              12% higher than yesterday
            </div>
          </div>
        </div>

        {/* Decorative Bars */}
        <div className="mt-10 flex gap-2 opacity-40">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className={`rounded-full bg-white ${
                i % 5 === 0
                  ? "h-6 w-2"
                  : "mt-2 h-1.5 w-5"
              }`}
            />
          ))}
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div
                className={`rounded-xl p-3 transition-transform duration-300 group-hover:scale-110 ${item.color}`}
              >
                {item.icon}
              </div>

              <span className="flex items-center gap-1 text-sm font-medium text-emerald-600">
                <ArrowUpRight size={15} />
                {item.growth}
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold text-slate-900">
              {item.value}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* BUSINESS SUMMARY */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Business Overview
            </h2>

            <p className="text-sm text-slate-500">
              Revenue and performance summary
            </p>
          </div>

          <span className="rounded-full bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700">
            September
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm text-slate-500">
              Today's Revenue
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              ₹{cards.revenueToday}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Monthly Revenue
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              ₹{cards.monthlyRevenue}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Appointments
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              {cards.appointmentsToday}
            </h3>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-slate-500">
                Business Target
              </span>

              <span className="font-semibold text-cyan-600">
                78%
              </span>
            </div>

            <div className="h-3 rounded-full bg-slate-200">
              <div className="h-3 w-[78%] rounded-full bg-linear-to-r from-cyan-500 to-blue-600" />
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Target completion
            </p>
          </div>
        </div>
      </div>

      {/* CHART + RECENT ACTIVITY */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Chart */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Top Services
              </h2>

              <p className="text-sm text-slate-500">
                Most booked salon services this month
              </p>
            </div>

            <span className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700">
              Monthly
            </span>
          </div>

          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart data={data.topServices}>
                <XAxis
                  dataKey="name"
                  tick={{
                    fill: "#64748b",
                    fontSize: 12,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{
                    fill: "#64748b",
                    fontSize: 12,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  cursor={{ fill: "#F1F5F9" }}
                  contentStyle={{
                    borderRadius: 12,
                    border: "none",
                    boxShadow:
                      "0 10px 30px rgba(0,0,0,.08)",
                  }}
                />

                <Bar
                  dataKey="total"
                  radius={[10, 10, 0, 0]}
                  fill="#0891B2"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              Recent Activity
            </h2>

            <p className="text-sm text-slate-500">
              Top performing services
            </p>
          </div>

          <div className="space-y-5">
            {data.topServices
              .slice(0, 5)
              .map((service, index) => (
                <div
                  key={service.name}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-100 font-bold text-cyan-700">
                    {service.name.charAt(0)}
                  </div>

                  <div className="flex-1">
                    <p className="font-medium text-slate-700">
                      {service.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {service.total} bookings
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-cyan-600">
                      #{index + 1}
                    </p>

                    <p className="text-xs text-slate-400">
                      Popular
                    </p>
                  </div>
                </div>
              ))}
          </div>

          <div className="mt-8 rounded-xl bg-cyan-50 p-4">
            <p className="text-sm text-slate-600">
              Best Performing
            </p>

            <h3 className="mt-1 text-lg font-bold text-cyan-700">
              {data.topServices[0]?.name}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {data.topServices[0]?.total} appointments this
              month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;