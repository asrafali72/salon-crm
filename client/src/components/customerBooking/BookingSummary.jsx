import {
  Scissors,
  UserCheck,
  CalendarDays,
  Clock3,
  IndianRupee,
  Sparkles,
} from "lucide-react";

const BookingSummary = ({
  service,
  stylist,
  date,
  time,
}) => {
  if (!service) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-linear-to-r from-cyan-500 to-blue-600 p-5 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={18} />
          <span className="text-sm font-medium uppercase tracking-wide">
            Booking Preview
          </span>
        </div>

        <h2 className="text-2xl font-bold">
          {service.name}
        </h2>
      </div>

      {/* Details */}
      <div className="space-y-4 p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-cyan-100 p-2 text-cyan-600">
            <Scissors size={18} />
          </div>
          <div>
            <p className="text-xs text-slate-500">Service</p>
            <p className="font-semibold text-slate-800">
              {service.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-violet-100 p-2 text-violet-600">
            <UserCheck size={18} />
          </div>
          <div>
            <p className="text-xs text-slate-500">Stylist</p>
            <p className="font-semibold text-slate-800">
              {stylist?.user?.name || "Not selected"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-slate-50 p-3">
            <div className="mb-1 flex items-center gap-2 text-slate-500">
              <CalendarDays size={14} />
              <span className="text-xs">Date</span>
            </div>
            <p className="font-semibold text-slate-800">
              {date || "--"}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-3">
            <div className="mb-1 flex items-center gap-2 text-slate-500">
              <Clock3 size={14} />
              <span className="text-xs">Time</span>
            </div>
            <p className="font-semibold text-slate-800">
              {time || "--"}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="rounded-xl bg-linear-to-r from-emerald-50 to-cyan-50 border border-emerald-100 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-700">
              <IndianRupee size={18} />
              <span className="font-medium">Total Price</span>
            </div>

            <h3 className="text-3xl font-bold text-emerald-600">
              ₹{service.price}
            </h3>
          </div>
        </div>

        {/* Duration */}
        {service.duration && (
          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
            <span className="text-sm text-slate-600">
              Estimated Duration
            </span>

            <span className="font-semibold text-slate-800">
              {service.duration} min
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSummary;