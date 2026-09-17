import {
  User,
  Scissors,
  UserCheck,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const CheckInTable = ({ appointments, onCheckIn }) => {
  const statusStyle = {
    PENDING: "bg-amber-100 text-amber-700",
    CONFIRMED: "bg-cyan-100 text-cyan-700",
    CHECKED_IN: "bg-violet-100 text-violet-700",
    IN_SERVICE: "bg-indigo-100 text-indigo-700",
    COMPLETED: "bg-emerald-100 text-emerald-700",
    CANCELLED: "bg-rose-100 text-rose-700",
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr className="text-xs uppercase tracking-wider text-slate-500">
            <th className="px-6 py-4 text-left">Customer</th>
            <th className="px-4 py-4 text-left">Service</th>
            <th className="px-4 py-4 text-left">Stylist</th>
            <th className="px-4 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {appointments.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="py-12 text-center text-slate-500"
              >
                No appointments available.
              </td>
            </tr>
          ) : (
            appointments.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50 transition"
              >
                {/* Customer */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-100 font-bold text-cyan-700">
                      {item.customer.name.charAt(0)}
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {item.customer.name}
                      </h3>

                      <p className="text-sm text-slate-500">
                        Customer
                      </p>
                    </div>
                  </div>
                </td>

                {/* Service */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Scissors
                      size={15}
                      className="text-cyan-600"
                    />
                    {item.service.name}
                  </div>
                </td>

                {/* Stylist */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <UserCheck
                      size={15}
                      className="text-violet-600"
                    />
                    {item.staff.user.name}
                  </div>
                </td>

                {/* Status */}
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                      statusStyle[item.status] ||
                      "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {item.status === "PENDING" && (
                      <Clock3 size={12} />
                    )}
                    {item.status === "CHECKED_IN" && (
                      <CheckCircle2 size={12} />
                    )}
                    {item.status.replace("_", " ")}
                  </span>
                </td>

                {/* Action */}
                <td className="px-6 py-4 text-right">
                  {item.status === "PENDING" ? (
                    <button
                      onClick={() => onCheckIn(item.id)}
                      className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-700"
                    >
                      <CheckCircle2 size={16} />
                      Check In
                    </button>
                  ) : (
                    <span className="text-sm text-slate-400">
                      —
                    </span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CheckInTable;