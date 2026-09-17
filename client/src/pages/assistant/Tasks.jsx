// import { useEffect, useState } from "react";
// import api from "../../services/api";
// import TaskCard from "../../components/assistant/TaskCard";

// const Tasks = () => {
//   // const [tasks, setTasks] = useState([]);

//   // const load = () =>
//   //   api
//   //     .get("/assistant/tasks")
//   //     .then((res) => setTasks(res.data));

//   // useEffect(load, []);

//   // const update = async (id, status) => {
//   //   await api.patch(`/assistant/tasks/${id}`, {
//   //     status,
//   //   });

//   //   load();
//   // };

//   return (
//     <div className="space-y-4">
//       <h1 className="text-3xl font-bold">
//         My Tasks
//       </h1>

//       {/* {tasks.map((task) => (
//         <TaskCard
//           key={task.id}
//           task={task}
//           onUpdate={update}
//         />
//       ))} */}
//     </div>
//   );
// };

// export default Tasks;

import { useEffect, useState } from "react";
import api from "../../services/api";
import TaskCard from "../../components/assistant/TaskCard";

import {
  ClipboardList,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Filter,
} from "lucide-react";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("ALL");

  const load = () => {
    api
      .get("/assistant/tasks")
      .then((res) => setTasks(res.data))
      .catch(() => {
        // Demo data if backend is unavailable
        setTasks([
          {
            id: 1,
            title: "Prepare Facial Room",
            description: "Set towels and sanitize equipment.",
            status: "PENDING",
            appointment: {
              customer: { name: "Priya Sharma" },
              service: { name: "Facial" },
            },
          },
          {
            id: 2,
            title: "Assist Hair Coloring",
            description: "Help stylist during hair coloring session.",
            status: "IN_PROGRESS",
            appointment: {
              customer: { name: "Rahul Verma" },
              service: { name: "Hair Coloring" },
            },
          },
          {
            id: 3,
            title: "Clean Styling Station",
            description: "Complete workstation cleaning after service.",
            status: "COMPLETED",
            appointment: {
              customer: { name: "Neha Singh" },
              service: { name: "Hair Cut" },
            },
          },
        ]);
      });
  };

  useEffect(() => {
    load();
  }, []);

  const update = async (id, status) => {
    try {
      await api.patch(`/assistant/tasks/${id}`, {
        status,
      });
      load();
    } catch {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, status } : task
        )
      );
    }
  };

  const filtered =
    filter === "ALL"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  const pending = tasks.filter((t) => t.status === "PENDING").length;
  const progress = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const completed = tasks.filter((t) => t.status === "COMPLETED").length;

  const cards = [
    {
      title: "Total Tasks",
      value: tasks.length,
      icon: ClipboardList,
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Completed",
      value: completed,
      icon: CheckCircle2,
      color: "bg-emerald-100 text-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen space-y-6 bg-linear-to-br from-slate-50 via-cyan-50/30 to-white p-1">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#0F172A] via-[#155E75] to-[#06B6D4] p-8 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white,transparent_45%)] opacity-20" />

        <div className="relative flex flex-col justify-between gap-6 lg:flex-row">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Sparkles size={18} className="text-cyan-300" />
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">
                ASSISTANT • TASK MANAGEMENT
              </p>
            </div>

            <h1 className="mb-2 text-4xl font-bold">My Tasks</h1>

            <p className="max-w-xl text-lg text-slate-200">
              Track assigned work, update progress, and help your salon team stay
              productive.
            </p>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/15 p-5 backdrop-blur-md">
            <p className="text-sm text-cyan-100">Completion Rate</p>

            <h2 className="mt-2 text-4xl font-bold">
              {tasks.length
                ? Math.round((completed / tasks.length) * 100)
                : 0}
              %
            </h2>

            <div className="mt-4 flex items-center gap-2 text-sm text-emerald-300">
              <ArrowUpRight size={16} />
              {completed} tasks completed
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
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className={`rounded-xl p-3 ${item.color}`}>
                  <Icon size={22} />
                </div>

                <span className="text-sm font-medium text-emerald-600">
                  Today
                </span>
              </div>

              <h2 className="mt-5 text-3xl font-bold text-slate-900">
                {item.value}
              </h2>

              <p className="mt-1 text-sm text-slate-500">{item.title}</p>
            </div>
          );
        })}
      </div>

      {/* Filter */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Task List</h2>
            <p className="text-sm text-slate-500">
              Manage and update your assigned tasks
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-slate-100 p-1">
            <Filter size={16} className="ml-2 text-slate-500" />

            {["ALL", "PENDING", "IN_PROGRESS", "COMPLETED"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  filter === status
                    ? "bg-cyan-600 text-white"
                    : "text-slate-600 hover:bg-white"
                }`}
              >
                {status === "IN_PROGRESS"
                  ? "Progress"
                  : status === "ALL"
                  ? "All"
                  : status.charAt(0) + status.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Task Cards */}
      <div className="space-y-5">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center">
            <ClipboardList
              size={42}
              className="mx-auto mb-3 text-slate-300"
            />
            <h3 className="font-semibold text-slate-700">No Tasks Found</h3>
            <p className="mt-1 text-sm text-slate-500">
              There are no tasks matching the selected filter.
            </p>
          </div>
        ) : (
          filtered.map((task) => (
            <div
              key={task.id}
              className="rounded-2xl border border-slate-200 bg-white p-1 shadow-sm transition hover:shadow-md"
            >
              <TaskCard task={task} onUpdate={update} />
            </div>
          ))
        )}
      </div>

      {/* Progress Summary */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">
            Daily Progress
          </h2>

          <span className="font-semibold text-cyan-600">
            {completed}/{tasks.length}
          </span>
        </div>

        <div className="h-3 rounded-full bg-slate-200">
          <div
            className="h-3 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 transition-all"
            style={{
              width: `${
                tasks.length ? (completed / tasks.length) * 100 : 0
              }%`,
            }}
          />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-orange-600">{pending}</p>
            <p className="text-xs text-slate-500">Pending</p>
          </div>

          <div>
            <p className="text-2xl font-bold text-violet-600">{progress}</p>
            <p className="text-xs text-slate-500">In Progress</p>
          </div>

          <div>
            <p className="text-2xl font-bold text-emerald-600">{completed}</p>
            <p className="text-xs text-slate-500">Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;