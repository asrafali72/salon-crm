// import { useEffect, useState } from "react";
// import api from "../../services/api";
// import DashboardCards from "../../components/assistant/DashboardCards";

// const Dashboard = () => {
//   // const [stats, setStats] = useState(null);

//   // useEffect(() => {
//   //   api
//   //     .get("/assistant/dashboard")
//   //     .then((res) => setStats(res.data));
//   // }, []);

//   // if (!stats) return <p>Loading...</p>;

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">
//         Assistant Dashboard
//       </h1>

//       {/* <DashboardCards
//         total={stats.total}
//         pending={stats.pending}
//         completed={stats.completed}
//       /> */}
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  CheckCircle2,
  Clock,
  ClipboardList,
  Sparkles,
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api
      .get("/assistant/dashboard")
      .then((res) => setStats(res.data))
      .catch(() => {
        // Demo fallback
        setStats({
          total: 18,
          pending: 7,
          completed: 11,
          tasks: [
            {
              title: "Prepare Facial Room",
              customer: "Priya Sharma",
              time: "10:30 AM",
              status: "PENDING",
            },
            {
              title: "Assist Hair Coloring",
              customer: "Rahul Verma",
              time: "12:00 PM",
              status: "IN_PROGRESS",
            },
            {
              title: "Sanitize Equipment",
              customer: "General",
              time: "2:30 PM",
              status: "COMPLETED",
            },
          ],
        });
      });
  }, []);

  if (!stats) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
      </div>
    );
  }

  const cards = [
    {
      title: "Total Tasks",
      value: stats.total,
      icon: ClipboardList,
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
      color: "bg-emerald-100 text-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen space-y-6 bg-linear-to-br from-slate-50 via-cyan-50/30 to-white p-1">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#0F172A] via-[#155E75] to-[#06B6D4] p-8 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white,transparent_45%)] opacity-20" />

        <div className="relative flex flex-col justify-between gap-6 lg:flex-row">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Sparkles size={18} className="text-cyan-300" />
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">
                VYNEXA • ASSISTANT PORTAL
              </p>
            </div>

            <h1 className="mb-2 text-4xl font-bold">
              Assistant Dashboard
            </h1>

            <p className="max-w-xl text-lg text-slate-200">
              Track daily salon tasks, assist stylists, and
              stay organized throughout your shift.
            </p>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/15 p-5 backdrop-blur-md">
            <p className="text-sm text-cyan-100">
              Completion Rate
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {Math.round(
                (stats.completed /
                  Math.max(stats.total, 1)) *
                  100
              )}
              %
            </h2>

            <div className="mt-4 flex items-center gap-2 text-sm text-emerald-300">
              <ArrowUpRight size={16} />
              Great productivity today
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-5 md:grid-cols-3">
        {cards.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`rounded-xl p-3 ${item.color}`}
                >
                  <Icon size={22} />
                </div>

                <span className="text-sm font-medium text-emerald-600">
                  Today
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-bold text-slate-900">
                {item.value}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {item.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Tasks + Quick Actions */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Today's Tasks */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Today's Tasks
              </h2>

              <p className="text-sm text-slate-500">
                Assigned assistant activities
              </p>
            </div>

            <span className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700">
              {stats.total} Tasks
            </span>
          </div>

          <div className="space-y-4">
            {stats.tasks?.map((task, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-cyan-300 hover:bg-slate-50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-100 font-bold text-cyan-700">
                    {task.customer.charAt(0)}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {task.title}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {task.customer} • {task.time}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    task.status === "COMPLETED"
                      ? "bg-emerald-100 text-emerald-700"
                      : task.status === "IN_PROGRESS"
                      ? "bg-violet-100 text-violet-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {task.status.replace("_", " ")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold text-slate-800">
            Quick Actions
          </h2>

          <div className="space-y-4">
            <button className="flex w-full items-center gap-3 rounded-xl bg-cyan-50 p-4 text-left transition hover:bg-cyan-100">
              <ClipboardList className="text-cyan-600" />
              <div>
                <p className="font-semibold text-slate-800">
                  View My Tasks
                </p>
                <p className="text-xs text-slate-500">
                  Check assigned work
                </p>
              </div>
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl bg-violet-50 p-4 text-left transition hover:bg-violet-100">
              <CalendarDays className="text-violet-600" />
              <div>
                <p className="font-semibold text-slate-800">
                  Today's Schedule
                </p>
                <p className="text-xs text-slate-500">
                  View appointments
                </p>
              </div>
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl bg-emerald-50 p-4 text-left transition hover:bg-emerald-100">
              <CheckCircle2 className="text-emerald-600" />
              <div>
                <p className="font-semibold text-slate-800">
                  Completed Tasks
                </p>
                <p className="text-xs text-slate-500">
                  Review finished work
                </p>
              </div>
            </button>
          </div>

          {/* Progress */}
          <div className="mt-8 rounded-xl bg-slate-50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Daily Progress
              </span>

              <span className="text-sm font-semibold text-cyan-600">
                {Math.round(
                  (stats.completed /
                    Math.max(stats.total, 1)) *
                    100
                )}
                %
              </span>
            </div>

            <div className="h-3 rounded-full bg-slate-200">
              <div
                className="h-3 rounded-full bg-linear-to-r from-cyan-500 to-blue-600"
                style={{
                  width: `${
                    (stats.completed /
                      Math.max(stats.total, 1)) *
                    100
                  }%`,
                }}
              />
            </div>

            <p className="mt-2 text-xs text-slate-500">
              {stats.completed} of {stats.total} tasks completed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;