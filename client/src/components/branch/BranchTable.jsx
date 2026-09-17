import {
  Building2,
  MapPin,
  Phone,
  Clock3,
  CheckCircle2,
} from "lucide-react";

const BranchTable = ({ branches }) => {
  const statusStyle = {
    ACTIVE: "bg-emerald-100 text-emerald-700",
    INACTIVE: "bg-rose-100 text-rose-700",
    CLOSED: "bg-slate-100 text-slate-700",
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr className="text-xs uppercase tracking-wider text-slate-500">
            <th className="px-6 py-4 text-left">Branch</th>
            <th className="px-4 py-4 text-left">Contact</th>
            <th className="px-4 py-4 text-left">Working Hours</th>
            <th className="px-6 py-4 text-left">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 bg-white">
          {branches.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="py-12 text-center text-slate-500"
              >
                No branches available.
              </td>
            </tr>
          ) : (
            branches.map((branch) => (
              <tr
                key={branch.id}
                className="hover:bg-slate-50 transition"
              >
                {/* Branch */}
                <td className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 font-bold text-cyan-700">
                      <Building2 size={22} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {branch.name}
                      </h3>

                      <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                        <MapPin size={14} />
                        {branch.address}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Phone */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Phone size={15} className="text-slate-400" />
                    {branch.phone}
                  </div>
                </td>

                {/* Hours */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Clock3 size={15} className="text-slate-400" />
                    {branch.openingTime} – {branch.closingTime}
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                      statusStyle[branch.status] ||
                      "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    <CheckCircle2 size={13} />
                    {branch.status || "ACTIVE"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BranchTable;