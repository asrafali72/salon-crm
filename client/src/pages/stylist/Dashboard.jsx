import { useEffect, useState } from "react";
import api from "../../services/api";
import DashboardCards from "../../components/stylist/DashboardCards";

const Dashboard = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
  const load = async () => {
    try {
      const res = await api.get("/stylist/schedule");
      // console.log("SUCCESS:", res.data);
      setSchedule(res.data);
    } catch (err) {
      console.log("ERROR:", err.response?.status);
      console.log(err.response?.data);
      console.log(err.message);
    }
  };

  load();
  }, []);

  const completed = schedule.filter(
    (i) => i.status === "COMPLETED"
  ).length;

  const remaining = schedule.filter(
    (i) =>
      i.status !== "COMPLETED" &&
      i.status !== "CANCELLED"
  ).length;

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-1">
      {/* Header */}
      <div className="rounded-3xl bg-linear-to-r from-teal-600 via-cyan-600 to-blue-600 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">
          Stylist Dashboard
        </h1>
        <p className="mt-3 text-cyan-100 text-lg">
          Manage your appointments and today's schedule.
        </p>
      </div>

      {/* Stats */}
      <DashboardCards
        total={schedule.length}
        completed={completed}
        remaining={remaining}
      />

      {/* Schedule */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-800">
            Today's Schedule
          </h2>
          <p className="text-sm text-slate-500">
            Your assigned appointments
          </p>
        </div>

        <div className="space-y-3">
          {schedule.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50"
            >
              <div>
                <p className="text-lg font-semibold text-slate-800">
                  {item.customer.name}
                </p>
                <p className="text-sm text-slate-500">
                  {item.service.name}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-slate-800">
                  {item.startTime}
                </p>
                <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium text-cyan-700">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;