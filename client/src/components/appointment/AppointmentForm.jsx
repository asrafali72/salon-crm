import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  User,
  Building2,
  Scissors,
  CalendarDays,
  Clock3,
  FileText,
  UserCheck,
} from "lucide-react";

const AppointmentForm = ({ onCreate }) => {
  const [customers, setCustomers] = useState([]);
  const [staff, setStaff] = useState([]);
  const [services, setServices] = useState([]);
  const [branches, setBranches] = useState([]);

  const [form, setForm] = useState({
    customerId: "",
    staffId: "",
    serviceId: "",
    branchId: "",
    appointmentDate: "",
    startTime: "09:00",
    notes: "",
  });

  useEffect(() => {
    Promise.all([
      api.get("/customers"),
      api.get("/staff"),
      api.get("/services"),
      api.get("/branches"),
    ]).then(([c, s, sv, b]) => {
      setCustomers(c.data);
      setStaff(s.data);
      setServices(sv.data);
      setBranches(b.data);
    });
  }, []);

  const submit = (e) => {
    e.preventDefault();
    onCreate(form);
  };

  const update = (key, value) =>
    setForm({ ...form, [key]: value });

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        {/* Customer */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <User size={16} />
            Customer
          </label>

          <select
            value={form.customerId}
            onChange={(e) => update("customerId", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:bg-white"
            required
          >
            <option value="">Select Customer</option>

            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Branch */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Building2 size={16} />
            Branch
          </label>

          <select
            value={form.branchId}
            onChange={(e) => update("branchId", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:bg-white"
            required
          >
            <option value="">Select Branch</option>

            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        {/* Stylist */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <UserCheck size={16} />
            Stylist
          </label>

          <select
            value={form.staffId}
            onChange={(e) => update("staffId", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:bg-white"
            required
          >
            <option value="">Select Stylist</option>

            {staff
              .filter((s) => s.user.role.name === "STYLIST")
              .map((s) => (
                <option key={s.id} value={s.id}>
                  {s.user.name}
                </option>
              ))}
          </select>
        </div>

        {/* Service */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Scissors size={16} />
            Service
          </label>

          <select
            value={form.serviceId}
            onChange={(e) => update("serviceId", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:bg-white"
            required
          >
            <option value="">Select Service</option>

            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <CalendarDays size={16} />
            Appointment Date
          </label>

          <input
            type="date"
            value={form.appointmentDate}
            onChange={(e) =>
              update("appointmentDate", e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:bg-white"
            required
          />
        </div>

        {/* Time */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Clock3 size={16} />
            Start Time
          </label>

          <input
            type="time"
            value={form.startTime}
            onChange={(e) => update("startTime", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:bg-white"
            required
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
          <FileText size={16} />
          Notes
        </label>

        <textarea
          rows={4}
          value={form.notes}
          placeholder="Add treatment notes, customer requests or remarks..."
          onChange={(e) => update("notes", e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:bg-white resize-none"
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-xl bg-cyan-600 px-8 py-3 font-semibold text-white shadow-lg shadow-cyan-200 transition hover:bg-cyan-700"
        >
          Book Appointment
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;