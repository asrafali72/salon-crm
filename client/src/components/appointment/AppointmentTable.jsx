import api from "../../services/api";
import {
  CalendarDays,
  Clock3,
  User,
  Scissors,
  CheckCircle2,
  Play,
  XCircle,
} from "lucide-react";

const AppointmentTable = ({ appointments, reload }) => {
  const update = async (id, action) => {
    await api.post(`/appointments/${id}/${action}`);
    reload();
  };

  const statusStyle = {
    PENDING: "bg-sky-100 text-sky-700",
    BOOKED: "bg-violet-100 text-violet-700",
    CONFIRMED: "bg-amber-100 text-amber-700",
    CHECKED_IN: "bg-cyan-100 text-cyan-700",
    IN_SERVICE: "bg-purple-100 text-purple-700",
    COMPLETED: "bg-emerald-100 text-emerald-700",
    CANCELLED: "bg-rose-100 text-rose-700",
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr className="text-xs uppercase tracking-wider text-slate-500">
            <th className="px-6 py-4 text-left">Patient</th>
            <th className="px-4 py-4 text-left">Stylist</th>
            <th className="px-4 py-4 text-left">Service</th>
            <th className="px-4 py-4 text-left">Schedule</th>
            <th className="px-4 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 bg-white">
          {appointments.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="py-14 text-center text-slate-500"
              >
                No appointments found.
              </td>
            </tr>
          ) : (
            appointments.map((a) => (
              <tr
                key={a.id}
                className="hover:bg-slate-50 transition"
              >
                {/* Patient */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-100 font-semibold text-cyan-700">
                      {a.customer?.name?.charAt(0)}
                    </div>

                    <div>
                      <p className="font-semibold text-slate-800">
                        {a.customer?.name}
                      </p>

                      <p className="text-sm text-slate-500">
                        ID: {a.customer?.id?.slice(0, 6)}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Stylist */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <User size={15} className="text-slate-400" />
                    {a.staff?.user?.name}
                  </div>
                </td>

                {/* Service */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Scissors size={15} className="text-slate-400" />
                    {a.service?.name}
                  </div>
                </td>

                {/* Date & Time */}
                <td className="px-4 py-4">
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-slate-700">
                      <CalendarDays
                        size={14}
                        className="text-slate-400"
                      />
                      {a.appointmentDate?.slice(0, 10)}
                    </div>

                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock3
                        size={14}
                        className="text-slate-400"
                      />
                      {a.startTime}
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="px-4 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      statusStyle[a.status] ||
                      "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {a.status.replace("_", " ")}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    {a.status === "CONFIRMED" && (
                      <button
                        onClick={() =>
                          update(a.id, "checkin")
                        }
                        className="flex items-center gap-1 rounded-lg bg-cyan-600 px-3 py-2 text-xs font-medium text-white hover:bg-cyan-700"
                      >
                        <CheckCircle2 size={14} />
                        Check-in
                      </button>
                    )}

                    {a.status === "CHECKED_IN" && (
                      <button
                        onClick={() => update(a.id, "start")}
                        className="flex items-center gap-1 rounded-lg bg-violet-600 px-3 py-2 text-xs font-medium text-white hover:bg-violet-700"
                      >
                        <Play size={14} />
                        Start
                      </button>
                    )}

                    {a.status === "IN_SERVICE" && (
                      <button
                        onClick={() =>
                          update(a.id, "complete")
                        }
                        className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium text-white hover:bg-emerald-700"
                      >
                        <CheckCircle2 size={14} />
                        Complete
                      </button>
                    )}

                    {["CONFIRMED", "CHECKED_IN"].includes(
                      a.status
                    ) && (
                      <button
                        onClick={() =>
                          update(a.id, "cancel")
                        }
                        className="flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 hover:bg-rose-100"
                      >
                        <XCircle size={14} />
                        Cancel
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;