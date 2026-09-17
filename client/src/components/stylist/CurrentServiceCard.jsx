import { useState } from "react";
import {
  User,
  Scissors,
  Clock3,
  FileText,
  Play,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const statusColor = {
  CHECKED_IN: "bg-amber-100 text-amber-700",
  IN_SERVICE: "bg-cyan-100 text-cyan-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
};

const CurrentServiceCard = ({
  service,
  onStart,
  onComplete,
}) => {
  const [notes, setNotes] = useState(service?.notes || "");

  if (!service) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
          <Scissors size={28} className="text-slate-400" />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-slate-700">
          No Active Service
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          You're currently not assigned to any customer appointment.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="bg-linear-to-r from-cyan-500 to-blue-600 p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-cyan-100">
              <Sparkles size={16} />
              <span className="text-xs uppercase tracking-wide">
                Current Appointment
              </span>
            </div>

            <h2 className="text-3xl font-bold">
              {service.customer.name}
            </h2>

            <p className="mt-1 text-cyan-100">
              {service.service.name}
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              statusColor[service.status] ||
              "bg-white/20 text-white"
            }`}
          >
            {service.status.replace("_", " ")}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-6 p-6">
        {/* Customer Info */}
        <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 text-xl font-bold text-white">
            {service.customer.name.charAt(0)}
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Customer
            </p>
            <h3 className="text-lg font-semibold text-slate-800">
              {service.customer.name}
            </h3>
          </div>
        </div>

        {/* Service Details */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-500">
              <Clock3 size={16} />
              <span className="text-sm">
                Start Time
              </span>
            </div>

            <p className="text-xl font-bold text-slate-800">
              {service.startTime}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-500">
              <Scissors size={16} />
              <span className="text-sm">
                Duration
              </span>
            </div>

            <p className="text-xl font-bold text-slate-800">
              {service.service.duration} min
            </p>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
            <FileText size={16} />
            Service Notes
          </label>

          <textarea
            rows={5}
            placeholder="Add treatment notes, products used, or customer preferences..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 outline-none transition focus:border-cyan-500 focus:bg-white"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          {service.status === "CHECKED_IN" && (
            <button
              onClick={onStart}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white shadow-lg shadow-cyan-200 transition hover:opacity-95"
            >
              <Play size={18} />
              Start Service
            </button>
          )}

          {service.status === "IN_SERVICE" && (
            <button
              onClick={() => onComplete(notes)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-500 to-green-600 py-3 font-semibold text-white shadow-lg shadow-emerald-200 transition hover:opacity-95"
            >
              <CheckCircle2 size={18} />
              Complete Service
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentServiceCard;