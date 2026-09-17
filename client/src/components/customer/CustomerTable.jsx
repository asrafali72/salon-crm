import { Phone, Mail, User } from "lucide-react";

const CustomerTable = ({ customers }) => {
  const genderStyle = {
    MALE: "bg-blue-100 text-blue-700",
    FEMALE: "bg-pink-100 text-pink-700",
    OTHER: "bg-violet-100 text-violet-700",
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr className="text-xs uppercase tracking-wider text-slate-500">
            <th className="px-6 py-4 text-left">Customer</th>
            <th className="px-4 py-4 text-left">Phone</th>
            <th className="px-4 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Gender</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 bg-white">
          {customers.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="py-12 text-center text-slate-500"
              >
                No customers found.
              </td>
            </tr>
          ) : (
            customers.map((customer) => (
              <tr
                key={customer.id}
                className="hover:bg-slate-50 transition"
              >
                {/* Customer */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-100 font-bold text-cyan-700">
                      {customer.name?.charAt(0)}
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {customer.name}
                      </h3>

                      <p className="text-sm text-slate-500">
                        ID: {customer.id.slice(0, 6)}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Phone */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Phone size={15} className="text-slate-400" />
                    {customer.phone}
                  </div>
                </td>

                {/* Email */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail size={15} className="text-slate-400" />
                    {customer.email || "-"}
                  </div>
                </td>

                {/* Gender */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                      genderStyle[customer.gender] ||
                      "bg-slate-100 text-slate-700"
                    }`}
                  >
                    <User size={12} />
                    {customer.gender || "N/A"}
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

export default CustomerTable;