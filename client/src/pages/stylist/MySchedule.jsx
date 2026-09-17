import { useEffect, useState } from "react";
import api from "../../services/api";
import ScheduleCard from "../../components/stylist/ScheduleCard";

const MySchedule = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/stylist/schedule").then((res) => setItems(res.data));
  }, []);

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-1">
      {/* Header */}
      <div className="rounded-3xl bg-linear-to-r from-teal-600 via-cyan-600 to-blue-600 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">Today's Schedule</h1>
        <p className="mt-3 text-cyan-100 text-lg">
          View all your appointments for today.
        </p>
      </div>

      {/* Schedule List */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-800">
            Appointment Schedule
          </h2>
          <p className="text-sm text-slate-500">
            Your assigned customers and service timings
          </p>
        </div>

        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 py-10 text-center text-slate-500">
              No appointments scheduled for today.
            </div>
          ) : (
            items.map((item) => (
              <ScheduleCard key={item.id} item={item} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MySchedule;