import {
  User,
  Scissors,
  ClipboardCheck,
  Clock3,
  CheckCircle2,
} from "lucide-react";

const TaskCard = ({ task, onUpdate }) => {
  const statusStyle = {
    PENDING: "bg-amber-100 text-amber-700",
    IN_PROGRESS: "bg-cyan-100 text-cyan-700",
    COMPLETED: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-100 font-bold text-cyan-700">
            {task.appointment?.customer?.name?.charAt(0) || "T"}
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">
              {task.title}
            </h3>

            <p className="text-xs text-slate-500">
              Task #{task.id.slice(0, 6)}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            statusStyle[task.status]
          }`}
        >
          {task.status.replace("_", " ")}
        </span>
      </div>

      {/* Description */}
      <p className="mt-4 text-sm leading-6 text-slate-600">
        {task.description}
      </p>

      {/* Appointment Details */}
      {task.appointment && (
        <div className="mt-4 space-y-2 rounded-xl bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <User size={15} className="text-slate-400" />
            <span className="font-medium">Customer:</span>
            {task.appointment.customer.name}
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Scissors size={15} className="text-slate-400" />
            <span className="font-medium">Service:</span>
            {task.appointment.service.name}
          </div>
        </div>
      )}

      {/* Status Update */}
      <div className="mt-5">
        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
          {task.status === "COMPLETED" ? (
            <CheckCircle2 size={16} className="text-emerald-600" />
          ) : (
            <Clock3 size={16} className="text-cyan-600" />
          )}
          Update Status
        </label>

        <div className="relative">
          <ClipboardCheck
            size={16}
            className="absolute left-3 top-3.5 text-slate-400"
          />

          <select
            value={task.status}
            onChange={(e) => onUpdate(task.id, e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-cyan-500 focus:bg-white"
          >
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;