import { Clock3, CheckCircle2 } from "lucide-react";

const slots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const TimeSlotPicker = ({ selected, setSelected }) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h3 className="text-xl font-bold text-slate-800">
          Available Time Slots
        </h3>
        <p className="text-sm text-slate-500">
          Choose a convenient appointment time
        </p>
      </div>

      {/* Time Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {slots.map((time) => {
          const active = selected === time;

          return (
            <button
              key={time}
              type="button"
              onClick={() => setSelected(time)}
              className={`relative rounded-xl border p-3 transition-all duration-200 ${
                active
                  ? "border-cyan-500 bg-cyan-500 text-white shadow-lg shadow-cyan-200"
                  : "border-slate-200 bg-white text-slate-700 hover:border-cyan-300 hover:bg-cyan-50"
              }`}
            >
              {active && (
                <CheckCircle2
                  size={16}
                  className="absolute right-2 top-2"
                />
              )}

              <div className="flex flex-col items-center gap-1">
                <Clock3 size={18} />
                <span className="text-sm font-semibold">{time}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Slot */}
      {selected && (
        <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-4">
          <div className="flex items-center gap-2 text-cyan-700">
            <CheckCircle2 size={18} />
            <span className="font-medium">Selected Time</span>
          </div>

          <p className="mt-1 text-2xl font-bold text-slate-800">
            {selected}
          </p>
        </div>
      )}
    </div>
  );
};

export default TimeSlotPicker;