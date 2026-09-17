import {
  Scissors,
  UserCheck,
  CalendarDays,
  Clock3,
  CheckCircle2,
} from "lucide-react";

const ServiceHistoryCard = ({ item }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
            <Scissors size={22} />
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">
              {item.service.name}
            </h3>

            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <UserCheck size={14} />
              {item.staff.user.name}
            </div>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
          <CheckCircle2 size={13} />
          COMPLETED
        </span>
      </div>

      {/* Date & Time */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-3">
          <div className="mb-1 flex items-center gap-2 text-xs text-slate-500">
            <CalendarDays size={13} />
            DATE
          </div>
          <p className="font-semibold text-slate-800">
            {new Date(item.appointmentDate).toLocaleDateString()}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <div className="mb-1 flex items-center gap-2 text-xs text-slate-500">
            <Clock3 size={13} />
            TIME
          </div>
          <p className="font-semibold text-slate-800">
            {item.startTime}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 border-t border-slate-100 pt-3 text-sm text-slate-500">
        Treatment successfully completed.
      </div>
    </div>
  );
};

export default ServiceHistoryCard;