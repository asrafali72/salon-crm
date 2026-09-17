import {
  Crown,
  Gift,
  Wallet,
  Phone,
  Star,
} from "lucide-react";

const LoyaltyCard = ({ account }) => {
  const tierStyle = {
    BRONZE: {
      badge: "bg-orange-100 text-orange-700",
      gradient: "from-orange-500 to-amber-500",
      max: 500,
    },
    SILVER: {
      badge: "bg-slate-200 text-slate-700",
      gradient: "from-slate-500 to-slate-700",
      max: 1000,
    },
    GOLD: {
      badge: "bg-yellow-100 text-yellow-700",
      gradient: "from-yellow-500 to-amber-400",
      max: 1500,
    },
  };

  const style = tierStyle[account.tier] || tierStyle.BRONZE;

  const progress = Math.min(
    100,
    (account.points / style.max) * 100
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div
        className={`bg-linear-to-r ${style.gradient} p-5 text-white`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-lg font-bold backdrop-blur">
              {account.customer.name.charAt(0)}
            </div>

            <div>
              <h2 className="text-lg font-bold">
                {account.customer.name}
              </h2>

              <div className="mt-1 flex items-center gap-1 text-sm text-white/90">
                <Phone size={13} />
                {account.customer.phone}
              </div>
            </div>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}
          >
            {account.tier}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-4 p-5">
        {/* Points & Value */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-500">
              <Gift size={15} />
              <span className="text-xs">POINTS</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-800">
              {account.points}
            </h3>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-500">
              <Wallet size={15} />
              <span className="text-xs">VALUE</span>
            </div>

            <h3 className="text-2xl font-bold text-emerald-600">
              ₹{account.points}
            </h3>
          </div>
        </div>

        {/* Tier Progress */}
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <Crown size={15} />
              <span>Loyalty Progress</span>
            </div>

            <span className="font-medium text-slate-700">
              {progress.toFixed(0)}%
            </span>
          </div>

          <div className="h-2 rounded-full bg-slate-200">
            <div
              className={`h-2 rounded-full bg-linear-to-r ${style.gradient}`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-2 text-xs text-slate-500">
            {style.max - account.points > 0
              ? `${style.max - account.points} points to next milestone`
              : "Maximum loyalty level achieved"}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Star size={15} className="text-amber-500" />
            Reward Member
          </div>

          <span className="font-semibold text-slate-800">
            {account.tier}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyCard;