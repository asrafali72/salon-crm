import {
  Clock3,
  Scissors,
  CalendarDays,
  CheckCircle2,
  User,
} from "lucide-react";

const statusColor = {
  PENDING: "bg-amber-100 text-amber-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  CHECKED_IN: "bg-purple-100 text-purple-700",
  IN_SERVICE: "bg-cyan-100 text-cyan-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const ScheduleCard = ({ item }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 font-bold text-cyan-700">
            {item.customer.name.charAt(0)}
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">
              {item.customer.name}
            </h3>

            <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
              <User size={12} />
              Client
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-cyan-50 px-3 py-2 text-center">
          <div className="flex items-center gap-1 text-cyan-600">
            <Clock3 size={14} />
            <span className="text-sm font-bold">
              {item.startTime}
            </span>
          </div>
        </div>
      </div>

      {/* Service */}
      <div className="mb-4 rounded-xl bg-slate-50 p-3">
        <div className="mb-1 flex items-center gap-2">
          <Scissors size={15} className="text-cyan-600" />
          <span className="text-sm font-medium text-slate-500">
            Service
          </span>
        </div>

        <p className="font-semibold text-slate-800">
          {item.service.name}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-3">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={14} />
          Today
        </div>

        <span
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
            statusColor[item.status] ||
            "bg-slate-100 text-slate-700"
          }`}
        >
          {item.status === "COMPLETED" && (
            <CheckCircle2 size={12} />
          )}
          {item.status.replace("_", " ")}
        </span>
      </div>
    </div>
  );
};

export default ScheduleCard;