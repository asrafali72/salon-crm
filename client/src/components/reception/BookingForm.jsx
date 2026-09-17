import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import {
  Scissors,
  UserCheck,
  CalendarDays,
  Clock3,
  Sparkles,
  IndianRupee,
  CheckCircle2,
} from "lucide-react";

const BookingForm = ({ onSubmit }) => {
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);

  const [serviceId, setServiceId] = useState("");
  const [staffId, setStaffId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [serviceRes, stylistRes] = await Promise.all([
          api.get("/portal/services"),
          api.get("/portal/stylists"),
        ]);

        setServices(serviceRes.data);
        setStylists(stylistRes.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    load();
  }, []);

  const selectedService = useMemo(
    () => services.find((s) => s.id === serviceId),
    [services, serviceId]
  );

  const selectedStaff = useMemo(
    () => stylists.find((s) => s.id === staffId),
    [stylists, staffId]
  );

  const submit = (e) => {
    e.preventDefault();

    if (!serviceId || !staffId || !date || !time) {
      return alert("Please fill all fields");
    }

    onSubmit({
      serviceId,
      staffId,
      appointmentDate: date,
      startTime: time,
      service: selectedService,
      staff: selectedStaff,
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Form */}
      <form
        onSubmit={submit}
        className="space-y-5 lg:col-span-2"
      >
        {/* Service */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Scissors size={16} />
            Select Service
          </label>

          <select
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:bg-white"
            required
          >
            <option value="">Choose a service</option>

            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} • ₹{s.price}
              </option>
            ))}
          </select>
        </div>

        {/* Stylist */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <UserCheck size={16} />
            Choose Stylist
          </label>

          <select
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:bg-white"
            required
          >
            <option value="">Select stylist</option>

            {stylists.map((stylist) => (
              <option key={stylist.id} value={stylist.id}>
                {stylist.user.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date & Time */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <CalendarDays size={16} />
              Appointment Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:bg-white"
              required
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Clock3 size={16} />
              Start Time
            </label>

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:bg-white"
              required
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white shadow-lg shadow-cyan-200 transition hover:opacity-95"
        >
          <CheckCircle2 size={18} />
          Create Appointment
        </button>
      </form>

      {/* Booking Summary */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="rounded-t-2xl bg-linear-to-r from-cyan-500 to-blue-600 p-5 text-white">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles size={18} />
            <span className="text-sm uppercase tracking-wide">
              Booking Summary
            </span>
          </div>

          <h2 className="text-2xl font-bold">
            {selectedService?.name || "New Appointment"}
          </h2>
        </div>

        <div className="space-y-4 p-5">
          <div className="flex items-center gap-3">
            <Scissors className="text-cyan-600" size={18} />
            <div>
              <p className="text-xs text-slate-500">
                Service
              </p>
              <p className="font-semibold text-slate-800">
                {selectedService?.name || "--"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <UserCheck className="text-violet-600" size={18} />
            <div>
              <p className="text-xs text-slate-500">
                Stylist
              </p>
              <p className="font-semibold text-slate-800">
                {selectedStaff?.user?.name || "--"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 p-3">
              <div className="mb-1 flex items-center gap-2 text-slate-500">
                <CalendarDays size={14} />
                <span className="text-xs">DATE</span>
              </div>
              <p className="font-semibold">
                {date || "--"}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3">
              <div className="mb-1 flex items-center gap-2 text-slate-500">
                <Clock3 size={14} />
                <span className="text-xs">TIME</span>
              </div>
              <p className="font-semibold">
                {time || "--"}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-700">
                <IndianRupee size={18} />
                <span className="font-medium">
                  Total Price
                </span>
              </div>

              <h3 className="text-3xl font-bold text-emerald-600">
                ₹{selectedService?.price || 0}
              </h3>
            </div>
          </div>

          {selectedService?.duration && (
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <span className="text-sm text-slate-600">
                Estimated Duration
              </span>

              <span className="font-semibold">
                {selectedService.duration} min
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;