import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

import ServiceSelector from "../../components/customerBooking/ServiceSelector";
import StylistSelector from "../../components/customerBooking/StylistSelector";
import TimeSlotPicker from "../../components/customerBooking/TimeSlotPicker";
import BookingSummary from "../../components/customerBooking/BookingSummary";

import {
  CalendarDays,
  Sparkles,
  Scissors,
  UserCheck,
  Clock,
  CheckCircle2,
} from "lucide-react";

const BookAppointment = () => {
  const { user } = useAuth();

  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);

  const [service, setService] = useState(null);
  const [stylist, setStylist] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    Promise.all([
      api.get("/portal/services"),
      api.get("/portal/stylists"),
    ]).then(([s, st]) => {
      setServices(s.data);
      setStylists(st.data);
    });
  }, []);

  const book = async () => {
    try {
      await api.post("/portal/book", {
        customerId: user.id,
        staffId: stylist.id,
        serviceId: service.id,
        branchId: stylist.branchId,
        appointmentDate: date,
        startTime: time,
      });

      alert("Appointment booked successfully!");

      setService(null);
      setStylist(null);
      setDate("");
      setTime("");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  const completedSteps = [
    service,
    stylist,
    date,
    time,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen space-y-6 bg-linear-to-rr from-slate-50 via-cyan-50/30 to-white p-1">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#0F172A] via-[#155E75] to-[#06B6D4] p-8 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white,transparent_45%)] opacity-20" />

        <div className="relative flex flex-col justify-between gap-6 lg:flex-row">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Sparkles
                size={18}
                className="text-cyan-300"
              />
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">
                VYNEXA • PATIENT PORTAL
              </p>
            </div>

            <h1 className="mb-2 text-4xl font-bold">
              Book Appointment
            </h1>

            <p className="max-w-xl text-lg text-slate-200">
              Choose your preferred service, stylist,
              date and time to schedule your salon
              visit.
            </p>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/15 p-5 backdrop-blur-md">
            <p className="text-sm text-cyan-100">
              Booking Progress
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {completedSteps}/4
            </h2>

            <div className="mt-4 h-2 rounded-full bg-white/20">
              <div
                className="h-2 rounded-full bg-white transition-all"
                style={{
                  width: `${(completedSteps / 4) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid gap-5 md:grid-cols-4">
        {[
          {
            label: "Service",
            done: !!service,
            icon: Scissors,
          },
          {
            label: "Stylist",
            done: !!stylist,
            icon: UserCheck,
          },
          {
            label: "Date",
            done: !!date,
            icon: CalendarDays,
          },
          {
            label: "Time",
            done: !!time,
            icon: Clock,
          },
        ].map((step) => {
          const Icon = step.icon;

          return (
            <div
              key={step.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`rounded-xl p-3 ${
                    step.done
                      ? "bg-cyan-100 text-cyan-600"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  <Icon size={22} />
                </div>

                {step.done && (
                  <CheckCircle2
                    size={20}
                    className="text-emerald-500"
                  />
                )}
              </div>

              <h3 className="mt-4 font-semibold text-slate-800">
                {step.label}
              </h3>

              <p className="text-sm text-slate-500">
                {step.done
                  ? "Completed"
                  : "Pending"}
              </p>
            </div>
          );
        })}
      </div>

      {/* Service */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-800">
            Choose Service
          </h2>
          <p className="text-sm text-slate-500">
            Select the treatment you'd like to book.
          </p>
        </div>

        <ServiceSelector
          services={services}
          selected={service}
          setSelected={setService}
        />
      </div>

      {/* Stylist */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-800">
            Select Stylist
          </h2>
          <p className="text-sm text-slate-500">
            Pick your preferred salon professional.
          </p>
        </div>

        <StylistSelector
          stylists={stylists}
          selected={stylist}
          setSelected={setStylist}
        />
      </div>

      {/* Date */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-800">
            Appointment Date
          </h2>
          <p className="text-sm text-slate-500">
            Choose your preferred visit date.
          </p>
        </div>

        <div className="max-w-sm">
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <CalendarDays size={16} />
            Select Date
          </label>

          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-cyan-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Time */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-800">
            Available Time Slots
          </h2>
          <p className="text-sm text-slate-500">
            Choose an available appointment time.
          </p>
        </div>

        <TimeSlotPicker
          selected={time}
          setSelected={setTime}
        />
      </div>

      {/* Summary */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-800">
              Booking Summary
            </h2>
            <p className="text-sm text-slate-500">
              Review your appointment before
              confirmation.
            </p>
          </div>

          <BookingSummary
            customer={user}
            service={service}
            stylist={stylist}
            date={date}
            time={time}
          />
        </div>

        {/* Payment Preview */}
        <div className="rounded-2xl border border-cyan-200 bg-linear-to-rr from-cyan-50 to-blue-50 p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-slate-800">
            Payment Preview
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">
                Service
              </span>
              <span className="font-medium">
                {service?.name || "-"}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-500">
                Stylist
              </span>
              <span className="font-medium">
                {stylist?.user?.name || "-"}
              </span>
            </div>

            <div className="border-t border-cyan-200 pt-3">
              <div className="flex justify-between">
                <span className="font-semibold">
                  Total
                </span>
                <span className="text-2xl font-bold text-cyan-700">
                  ₹{service?.price || 0}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={book}
            disabled={
              !service || !stylist || !date || !time
            }
            className="mt-6 w-full rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-cyan-200 transition hover:opacity-95 disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-400 disabled:shadow-none"
          >
            Confirm Booking
          </button>

          <p className="mt-3 text-center text-xs text-slate-500">
            You'll receive confirmation immediately
            after booking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;