import {
  User,
  Scissors,
  CalendarDays,
  Clock3,
  FileText,
} from "lucide-react";

const HistoryTable = ({ history }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr className="text-xs uppercase tracking-wider text-slate-500">
            <th className="px-6 py-4 text-left">Customer</th>
            <th className="px-4 py-4 text-left">Service</th>
            <th className="px-4 py-4 text-left">Date</th>
            <th className="px-4 py-4 text-left">Time</th>
            <th className="px-6 py-4 text-left">Notes</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {history.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="py-12 text-center text-slate-500"
              >
                No completed appointments found.
              </td>
            </tr>
          ) : (
            history.map((item) => (
              <tr
                key={item.id}
                className="transition hover:bg-slate-50"
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

                      <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                        <User size={12} />
                        Client
                      </div>
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
                    <span className="font-medium">
                      {item.service.name}
                    </span>
                  </div>
                </td>

                {/* Date */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 w-fit">
                    <CalendarDays
                      size={14}
                      className="text-slate-500"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      {new Date(
                        item.appointmentDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </td>

                {/* Time */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Clock3
                      size={14}
                      className="text-slate-500"
                    />
                    {item.startTime}
                  </div>
                </td>

                {/* Notes */}
                <td className="px-6 py-4">
                  {item.notes ? (
                    <div className="flex items-start gap-2">
                      <FileText
                        size={14}
                        className="mt-0.5 text-slate-400"
                      />
                      <p className="max-w-xs truncate text-sm text-slate-600">
                        {item.notes}
                      </p>
                    </div>
                  ) : (
                    <span className="text-sm text-slate-400">
                      No notes
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

export default HistoryTable;