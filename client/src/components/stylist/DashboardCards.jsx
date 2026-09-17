import {
  Users,
  CheckCircle2,
  Clock3,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const DashboardCards = ({
  total,
  completed,
  remaining,
}) => {
  const completionRate =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  const cards = [
    {
      title: "Today's Clients",
      value: total,
      icon: Users,
      bg: "bg-cyan-100",
      color: "text-cyan-600",
      trend: "Daily Schedule",
    },
    {
      title: "Completed",
      value: completed,
      icon: CheckCircle2,
      bg: "bg-emerald-100",
      color: "text-emerald-600",
      trend: `${completionRate}% completed`,
    },
    {
      title: "Remaining",
      value: remaining,
      icon: Clock3,
      bg: "bg-amber-100",
      color: "text-amber-600",
      trend: "Pending services",
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div
                className={`rounded-xl p-3 ${card.bg}`}
              >
                <Icon
                  size={22}
                  className={card.color}
                />
              </div>

              <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-600">
                <TrendingUp size={12} />
                <ArrowUpRight size={11} />
              </div>
            </div>

            {/* Value */}
            <div className="mt-5">
              <h2 className="text-3xl font-bold text-slate-800">
                {card.value}
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                {card.title}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-4 border-t border-slate-100 pt-3">
              <p className="text-xs text-slate-500">
                {card.trend}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardCards;