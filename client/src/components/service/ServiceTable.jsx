import {
  Scissors,
  Clock3,
  IndianRupee,
  UserCheck,
} from "lucide-react";

const categoryColor = {
  HAIR: "bg-cyan-100 text-cyan-700",
  BEARD: "bg-amber-100 text-amber-700",
  FACIAL: "bg-pink-100 text-pink-700",
  SPA: "bg-emerald-100 text-emerald-700",
  NAILS: "bg-violet-100 text-violet-700",
  MAKEUP: "bg-rose-100 text-rose-700",
};

const ServiceTable = ({ services }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr className="text-xs uppercase tracking-wider text-slate-500">
            <th className="px-6 py-4 text-left">Service</th>
            <th className="px-4 py-4 text-left">Duration</th>
            <th className="px-4 py-4 text-left">Price</th>
            <th className="px-6 py-4 text-left">Assigned Stylists</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {services.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="py-12 text-center text-slate-500"
              >
                No services available.
              </td>
            </tr>
          ) : (
            services.map((service) => (
              <tr
                key={service.id}
                className="hover:bg-slate-50 transition"
              >
                {/* Service */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
                      <Scissors size={22} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {service.name}
                      </h3>

                      <span
                        className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                          categoryColor[service.category] ||
                          "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {service.category}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Duration */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Clock3
                      size={16}
                      className="text-slate-400"
                    />
                    <span className="font-medium">
                      {service.duration} min
                    </span>
                  </div>
                </td>

                {/* Price */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1">
                    <IndianRupee
                      size={16}
                      className="text-emerald-600"
                    />
                    <span className="text-lg font-bold text-emerald-600">
                      {service.price}
                    </span>
                  </div>
                </td>

                {/* Stylists */}
                <td className="px-6 py-4">
                  {service.stylists?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {service.stylists.map((stylist) => (
                        <div
                          key={stylist.id}
                          className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1"
                        >
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-xs font-bold text-white">
                            {stylist.user.name.charAt(0)}
                          </div>

                          <span className="text-sm font-medium text-slate-700">
                            {stylist.user.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-slate-400">
                      <UserCheck size={16} />
                      <span className="text-sm">
                        No stylist assigned
                      </span>
                    </div>
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

export default ServiceTable;