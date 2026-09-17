import {
  CalendarDays,
  Clock3,
  Building2,
  UserCheck,
  Scissors,
  XCircle,
} from "lucide-react";

const BookingCard = ({ booking, onCancel }) => {
  const statusStyle = {
    PENDING: "bg-amber-100 text-amber-700",
    CONFIRMED: "bg-cyan-100 text-cyan-700",
    CHECKED_IN: "bg-violet-100 text-violet-700",
    IN_SERVICE: "bg-indigo-100 text-indigo-700",
    COMPLETED: "bg-emerald-100 text-emerald-700",
    CANCELLED: "bg-rose-100 text-rose-700",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 font-bold text-cyan-700">
            {booking.service?.name?.charAt(0)}
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">
              {booking.service.name}
            </h3>

            <p className="text-sm text-slate-500">
              {booking.staff.user.name}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            statusStyle[booking.status]
          }`}
        >
          {booking.status.replace("_", " ")}
        </span>
      </div>

      {/* Details */}
      <div className="mt-5 space-y-3 rounded-xl bg-slate-50 p-4">
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <Scissors size={15} className="text-cyan-600" />
          <span className="font-medium">Service:</span>
          {booking.service.name}
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-700">
          <UserCheck size={15} className="text-cyan-600" />
          <span className="font-medium">Stylist:</span>
          {booking.staff.user.name}
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-700">
          <CalendarDays size={15} className="text-cyan-600" />
          <span className="font-medium">Date:</span>
          {new Date(
            booking.appointmentDate
          ).toLocaleDateString()}
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-700">
          <Clock3 size={15} className="text-cyan-600" />
          <span className="font-medium">Time:</span>
          {booking.startTime} – {booking.endTime}
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-700">
          <Building2 size={15} className="text-cyan-600" />
          <span className="font-medium">Branch:</span>
          {booking.branch.name}
        </div>
      </div>

      {/* Footer */}
      {booking.status === "PENDING" && (
        <button
          onClick={() => onCancel(booking.id)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 font-medium text-rose-700 transition hover:bg-rose-100"
        >
          <XCircle size={18} />
          Cancel Appointment
        </button>
      )}

      {booking.status === "COMPLETED" && (
        <div className="mt-5 rounded-xl bg-emerald-50 py-3 text-center text-sm font-medium text-emerald-700">
          ✓ Appointment Completed
        </div>
      )}
    </div>
  );
};

export default BookingCard;