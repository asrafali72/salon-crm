import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";

import AppointmentForm from "../../components/appointment/AppointmentForm";
import AppointmentTable from "../../components/appointment/AppointmentTable";

import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../context/AuthContext";

import {
  CalendarDays,
  Search,
  Plus,
  ClipboardList,
  Clock3,
  UserCheck,
  Eye,
} from "lucide-react";

const Calendar = () => {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [resetKey, setResetKey] = useState(0);

  const { socket } = useSocket();
  const { user } = useAuth();

  const load = async () => {
    try {
      const res = await api.get("/appointments");
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (socket && user?.branchIds?.length) {
      socket.emit("joinBranch", user.branchIds[0]);
    }
  }, [socket, user]);

  useEffect(() => {
    if (!socket) return;

    const created = (appointment) => {
      setAppointments((prev) => [appointment, ...prev]);
    };

    const updated = (appointment) => {
      setAppointments((prev) =>
        prev.map((item) =>
          item.id === appointment.id ? appointment : item
        )
      );
    };

    socket.on("appointmentCreated", created);
    socket.on("appointmentUpdated", updated);

    return () => {
      socket.off("appointmentCreated", created);
      socket.off("appointmentUpdated", updated);
    };
  }, [socket]);

  const create = async (data) => {
    try {
      await api.post("/appointments", data);

      alert("Appointment booked successfully!");

      await load();
      setResetKey((prev) => prev + 1);
    } catch (err) {
      console.error(err.response?.data);
      alert(
        err.response?.data?.message || "Failed to create appointment"
      );
    }
  };

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      const customer = a.customer?.name?.toLowerCase() || "";
      const service = a.service?.name?.toLowerCase() || "";

      return (
        customer.includes(search.toLowerCase()) ||
        service.includes(search.toLowerCase())
      );
    });
  }, [appointments, search]);

  const pending = filtered.filter((a) => a.status === "PENDING");
  const confirmed = filtered.filter((a) => a.status === "CONFIRMED");
  const checkedIn = filtered.filter((a) => a.status === "CHECKED_IN");
  const completed = filtered.filter((a) => a.status === "COMPLETED");

  const Column = ({ title, color, icon, items }) => (
    <div className="rounded-2xl border border-slate-200 bg-slate-100/70">
      <div className="flex items-center gap-2 border-b border-slate-200 p-4">
        <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
        {icon}
        <h3 className="font-semibold text-slate-800">{title}</h3>
        <span className="ml-auto text-sm text-slate-500">
          {items.length}
        </span>
      </div>

      <div className="min-h-105 space-y-3 p-3">
        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 py-8 text-center text-sm text-slate-400">
            No appointments
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <h4 className="font-semibold text-slate-800">
                  {item.customer?.name}
                </h4>

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                  {item.customer?.name?.charAt(0)}
                </div>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                {item.service?.name}
              </p>

              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                <CalendarDays size={13} />
                {new Date(item.appointmentDate).toLocaleDateString()}

                <Clock3 size={13} />
                {item.startTime}
              </div>

              <span className="mt-3 inline-block rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700">
                {item.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-1">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-linear-to-r from-cyan-50 via-white to-violet-50 p-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-slate-500">
              CRM • APPOINTMENTS
            </p>

            <h1 className="mb-2 text-4xl font-bold text-slate-900">
              Appointment Calendar
            </h1>

            <p className="text-lg text-slate-600">
              Manage daily salon appointments in real time.
            </p>
          </div>

          <button className="flex items-center gap-2 self-start rounded-xl bg-cyan-600 px-5 py-3 font-medium text-white hover:bg-cyan-700">
            <Plus size={18} />
            New Appointment
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-bold">Create Appointment</h2>
          <p className="text-sm text-slate-500">
            Book a new customer appointment
          </p>
        </div>

        <div className="p-6">
          <AppointmentForm
            key={resetKey}
            onCreate={create}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative">
          <Search
            className="absolute left-3 top-3 text-slate-400"
            size={18}
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer or service..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center gap-6 border-b border-slate-200">
          <button className="border-b-2 border-cyan-600 pb-3 font-semibold text-cyan-700">
            Pipeline
          </button>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          <Column
            title="Pending"
            color="bg-sky-500"
            icon={<ClipboardList size={18} className="text-sky-600" />}
            items={pending}
          />

          <Column
            title="Confirmed"
            color="bg-violet-500"
            icon={<CalendarDays size={18} className="text-violet-600" />}
            items={confirmed}
          />

          <Column
            title="Checked In"
            color="bg-amber-500"
            icon={<UserCheck size={18} className="text-amber-600" />}
            items={checkedIn}
          />

          <Column
            title="Completed"
            color="bg-emerald-500"
            icon={<Eye size={18} className="text-emerald-600" />}
            items={completed}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-bold">All Appointments</h2>
        </div>

        <div className="overflow-x-auto p-6">
          <AppointmentTable appointments={filtered} reload={load} />
        </div>
      </div>
    </div>
  );
};

export default Calendar;