import {
  UserCheck,
  Scissors,
  CheckCircle2,
  Star,
} from "lucide-react";

const StylistSelector = ({
  stylists,
  selected,
  setSelected,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-800">
          Choose Stylist
        </h3>
        <p className="text-sm text-slate-500">
          Select the professional for this appointment
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {stylists.map((staff) => {
          const active = selected?.id === staff.id;

          return (
            <div
              key={staff.id}
              onClick={() => setSelected(staff)}
              className={`cursor-pointer rounded-2xl border p-5 transition-all duration-200 hover:shadow-md ${
                active
                  ? "border-cyan-500 bg-cyan-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-cyan-300"
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full font-bold ${
                      active
                        ? "bg-cyan-500 text-white"
                        : "bg-cyan-100 text-cyan-700"
                    }`}
                  >
                    {staff.user.name.charAt(0)}
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {staff.user.name}
                    </h4>

                    <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                      <Scissors size={13} />
                      Senior Stylist
                    </div>
                  </div>
                </div>

                {active && (
                  <CheckCircle2
                    size={22}
                    className="text-cyan-600"
                  />
                )}
              </div>

              {/* Details */}
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={15} fill="currentColor" />
                  <span className="text-sm font-medium text-slate-700">
                    4.9
                  </span>
                </div>

                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                  Available
                </span>
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 text-sm text-slate-500">
                <UserCheck size={15} />
                Professional Hair & Beauty Expert
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StylistSelector;