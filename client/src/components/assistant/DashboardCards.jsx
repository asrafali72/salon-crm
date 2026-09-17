import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

const DashboardCards = ({ total, pending, completed }) => {
  const cards = [
    {
      title: "Total Tasks",
      value: total,
      icon: <ClipboardList size={22} />,
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      title: "Pending",
      value: pending,
      icon: <Clock3 size={22} />,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "Completed",
      value: completed,
      icon: <CheckCircle2 size={22} />,
      color: "bg-emerald-100 text-emerald-600",
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {cards.map((card, index) => (
        <div
          key={index}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center justify-between">
            <div className={`rounded-xl p-3 ${card.color}`}>
              {card.icon}
            </div>

            <span className="flex items-center gap-1 text-sm font-medium text-emerald-600">
              <ArrowUpRight size={15} />
              Live
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-bold text-slate-900">
            {card.value}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {card.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;