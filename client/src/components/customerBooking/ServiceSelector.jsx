import {
  Scissors,
  Clock3,
  IndianRupee,
  CheckCircle2,
} from "lucide-react";

const ServiceSelector = ({
  services,
  selected,
  setSelected,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-800">
          Select Service
        </h3>
        <p className="text-sm text-slate-500">
          Choose the treatment for this appointment
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => {
          const active = selected?.id === service.id;

          return (
            <div
              key={service.id}
              onClick={() => setSelected(service)}
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
                    className={`rounded-xl p-3 ${
                      active
                        ? "bg-cyan-500 text-white"
                        : "bg-cyan-100 text-cyan-600"
                    }`}
                  >
                    <Scissors size={20} />
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {service.name}
                    </h4>

                    <p className="text-sm text-slate-500">
                      Salon Treatment
                    </p>
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
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock3 size={16} />
                  <span className="text-sm">
                    {service.duration} min
                  </span>
                </div>

                <div className="flex items-center gap-1 text-emerald-600">
                  <IndianRupee size={16} />
                  <span className="text-xl font-bold">
                    {service.price}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceSelector;