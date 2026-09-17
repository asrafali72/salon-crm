import { useEffect, useState } from "react";
import api from "../../services/api";
import CheckInTable from "../../components/reception/CheckInTable";
import {
  UserCheck,
  CalendarCheck,
  Clock,
  CheckCircle2,
} from "lucide-react";

const CheckIn = () => {
  const [appointments, setAppointments] = useState([]);

  const load = async () => {
    const res = await api.get("/reception/appointments");
    setAppointments(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const checkIn = async (id) => {
    await api.post(`/reception/appointments/${id}/checkin`);
    load();
  };

  const pending = appointments.filter(
    (a) => a.status === "PENDING"
  ).length;

  const checkedIn = appointments.filter(
    (a) => a.status === "CHECKED_IN"
  ).length;

  const total = appointments.length;

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-1">
      {/* Header */}
      <div className="rounded-3xl bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">Customer Check-In</h1>
        <p className="mt-3 text-emerald-100 text-lg">
          Welcome customers and mark their arrival quickly.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <CalendarCheck className="text-cyan-600" size={26} />
            <span className="text-xs font-semibold text-cyan-600">
              Today
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-bold">{total}</h2>
          <p className="text-sm text-slate-500">Appointments</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <Clock className="text-orange-500" size={26} />
            <span className="text-xs font-semibold text-orange-500">
              Waiting
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-orange-600">
            {pending}
          </h2>
          <p className="text-sm text-slate-500">Pending Check-In</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <CheckCircle2 className="text-emerald-600" size={26} />
            <span className="text-xs font-semibold text-emerald-600">
              Active
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-emerald-600">
            {checkedIn}
          </h2>
          <p className="text-sm text-slate-500">Checked-In</p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-xl bg-emerald-100 p-3">
            <UserCheck className="text-emerald-600" size={22} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Reception Queue
            </h2>
            <p className="text-sm text-slate-500">
              Customers arriving for today's appointments
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <CheckInTable
            appointments={appointments}
            onCheckIn={checkIn}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckIn;