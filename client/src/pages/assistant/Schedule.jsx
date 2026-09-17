import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  CalendarDays,
  Clock,
  User,
  Scissors,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    api
      .get("/assistant/schedule")
      .then((res) => setSchedule(res.data))
      .catch(() => {
        // Demo data if API unavailable
        setSchedule([
          {
            id: 1,
            startTime: "09:30",
            status: "CONFIRMED",
            customer: { name: "Priya Sharma" },
            service: { name: "Hair Spa" },
            staff: { user: { name: "Riya" } },
          },
          {
            id: 2,
            startTime: "11:00",
            status: "IN_PROGRESS",
            customer: { name: "Rahul Verma" },
            service: { name: "Hair Cut" },
            staff: { user: { name: "Aman" } },
          },
          {
            id: 3,
            startTime: "02:30",
            status: "COMPLETED",
            customer: { name: "Neha Singh" },
            service: { name: "Facial" },
            staff: { user: { name: "Riya" } },
          },
        ]);
      });
  }, []);

  const completed = schedule.filter(
    (s) => s.status === "COMPLETED"
  ).length;

  const pending = schedule.filter(
    (s) => s.status !== "COMPLETED"
  ).length;

  const statusStyle = {
    CONFIRMED: "bg-blue-100 text-blue-700",
    CHECKED_IN: "bg-purple-100 text-purple-700",
    IN_PROGRESS: "bg-orange-100 text-orange-700",
    COMPLETED: "bg-emerald-100 text-emerald-700",
  };

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
                ASSISTANT • DAILY SCHEDULE
              </p>
            </div>

            <h1 className="mb-2 text-4xl font-bold">
              Today's Schedule
            </h1>

            <p className="max-w-xl text-lg text-slate-200">
              View today's customer appointments and assist
              stylists throughout the day.
            </p>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/15 p-5 backdrop-blur-md">
            <p className="text-sm text-cyan-100">
              Total Appointments
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {schedule.length}
            </h2>

            <div className="mt-4 flex items-center gap-2 text-sm text-emerald-300">
              <CalendarDays size={16} />
              Today's workload
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-cyan-100 p-3 text-cyan-600">
              <CalendarDays size={22} />
            </div>
          </div>

          <h2 className="mt-5 text-3xl font-bold">
            {schedule.length}
          </h2>
          <p className="text-sm text-slate-500">
            Total Appointments
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-orange-100 p-3 text-orange-600 w-fit">
            <Clock size={22} />
          </div>

          <h2 className="mt-5 text-3xl font-bold">
            {pending}
          </h2>
          <p className="text-sm text-slate-500">
            Pending Services
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600 w-fit">
            <CheckCircle2 size={22} />
          </div>

          <h2 className="mt-5 text-3xl font-bold">
            {completed}
          </h2>
          <p className="text-sm text-slate-500">
            Completed Today
          </p>
        </div>
      </div>

      {/* Schedule Timeline */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-800">
            Appointment Timeline
          </h2>

          <p className="text-sm text-slate-500">
            Chronological view of today's schedule
          </p>
        </div>

        <div className="space-y-5">
          {schedule.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center text-slate-500">
              No appointments scheduled for today.
            </div>
          ) : (
            schedule.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-cyan-300 hover:bg-slate-50 md:flex-row md:items-center"
              >
                {/* Time */}
                <div className="min-w-22.5 text-center">
                  <div className="rounded-xl bg-cyan-50 py-3">
                    <Clock
                      size={18}
                      className="mx-auto mb-1 text-cyan-600"
                    />
                    <p className="font-bold text-slate-800">
                      {item.startTime}
                    </p>
                  </div>
                </div>

                {/* Customer */}
                <div className="flex flex-1 items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100 text-lg font-bold text-cyan-700">
                    {item.customer.name.charAt(0)}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-800">
                      {item.customer.name}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Scissors size={14} />
                        {item.service.name}
                      </span>

                      <span className="flex items-center gap-1">
                        <User size={14} />
                        {item.staff.user.name}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center">
                  <span
                    className={`rounded-full px-4 py-2 text-sm font-medium ${
                      statusStyle[item.status]
                    }`}
                  >
                    {item.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;