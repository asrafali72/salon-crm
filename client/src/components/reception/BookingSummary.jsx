import {
  User,
  Scissors,
  UserCheck,
  CalendarDays,
  Clock3,
  IndianRupee,
  Sparkles,
} from "lucide-react";

const BookingSummary = ({
  customer,
  service,
  stylist,
  date,
  time,
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="bg-linear-to-r from-cyan-500 to-blue-600 p-5 text-white">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles size={18} />
          <span className="text-sm uppercase tracking-wide">
            Appointment Preview
          </span>
        </div>

        <h2 className="text-2xl font-bold">
          {service?.name || "New Appointment"}
        </h2>

        <p className="mt-1 text-sm text-cyan-100">
          Review your booking details before confirming
        </p>
      </div>

      {/* Body */}
      <div className="space-y-4 p-5">
        {/* Customer */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 font-bold text-cyan-700">
            {customer?.name?.charAt(0) || "C"}
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Customer
            </p>
            <p className="font-semibold text-slate-800">
              {customer?.name || "Not Selected"}
            </p>
          </div>
        </div>

        <div className="h-px bg-slate-100" />

        {/* Service */}
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-cyan-100 p-2 text-cyan-600">
            <Scissors size={18} />
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Service
            </p>
            <p className="font-semibold text-slate-800">
              {service?.name || "--"}
            </p>
          </div>
        </div>

        {/* Stylist */}
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-violet-100 p-2 text-violet-600">
            <UserCheck size={18} />
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Stylist
            </p>
            <p className="font-semibold text-slate-800">
              {stylist?.user?.name || "Not Assigned"}
            </p>
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-slate-50 p-3">
            <div className="mb-1 flex items-center gap-2 text-slate-500">
              <CalendarDays size={14} />
              <span className="text-xs">DATE</span>
            </div>

            <p className="font-semibold text-slate-800">
              {date || "--"}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-3">
            <div className="mb-1 flex items-center gap-2 text-slate-500">
              <Clock3 size={14} />
              <span className="text-xs">TIME</span>
            </div>

            <p className="font-semibold text-slate-800">
              {time || "--"}
            </p>
          </div>
        </div>

        {/* Duration */}
        {service?.duration && (
          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
            <span className="text-sm text-slate-600">
              Estimated Duration
            </span>

            <span className="font-semibold text-slate-800">
              {service.duration} min
            </span>
          </div>
        )}

        {/* Total Price */}
        <div className="rounded-xl border border-emerald-200 bg-linear-to-r from-emerald-50 to-cyan-50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-700">
              <IndianRupee size={18} />
              <span className="font-medium">
                Total Amount
              </span>
            </div>

            <h3 className="text-3xl font-bold text-emerald-600">
              ₹{service?.price || 0}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;