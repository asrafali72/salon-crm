import { useMemo, useState } from "react";
import {
  Gift,
  User,
  Wallet,
  CheckCircle2,
} from "lucide-react";

const RedeemForm = ({ accounts, onRedeem }) => {
  const [customerId, setCustomerId] = useState("");
  const [points, setPoints] = useState("");

  const selectedAccount = useMemo(
    () =>
      accounts.find(
        (acc) => acc.customerId === customerId
      ),
    [accounts, customerId]
  );

  const redeemValue = Number(points || 0);

  const submit = (e) => {
    e.preventDefault();

    if (!customerId || !points) return;

    onRedeem({
      customerId,
      points: Number(points),
    });

    setCustomerId("");
    setPoints("");
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        {/* Customer */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <User size={16} />
            Loyalty Customer
          </label>

          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-3.5 text-slate-400"
            />

            <select
              value={customerId}
              onChange={(e) =>
                setCustomerId(e.target.value)
              }
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none focus:border-cyan-500 focus:bg-white"
              required
            >
              <option value="">Select Customer</option>

              {accounts.map((account) => (
                <option
                  key={account.customerId}
                  value={account.customerId}
                >
                  {account.customer.name} ({account.points} pts)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Points */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Gift size={16} />
            Redeem Points
          </label>

          <div className="relative">
            <Gift
              size={18}
              className="absolute left-3 top-3.5 text-slate-400"
            />

            <input
              type="number"
              min="1"
              placeholder="100"
              value={points}
              onChange={(e) =>
                setPoints(e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none focus:border-cyan-500 focus:bg-white"
              required
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      {selectedAccount && (
        <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 font-bold text-white">
              {selectedAccount.customer.name.charAt(0)}
            </div>

            <div>
              <h3 className="font-semibold text-slate-800">
                {selectedAccount.customer.name}
              </h3>
              <p className="text-sm text-slate-500">
                {selectedAccount.customer.phone}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-white p-3">
              <div className="mb-1 flex items-center gap-2 text-slate-500">
                <Wallet size={14} />
                <span className="text-xs">
                  Available
                </span>
              </div>
              <p className="text-2xl font-bold text-cyan-600">
                {selectedAccount.points}
              </p>
            </div>

            <div className="rounded-lg bg-white p-3">
              <div className="mb-1 flex items-center gap-2 text-slate-500">
                <Gift size={14} />
                <span className="text-xs">
                  Redeem Value
                </span>
              </div>
              <p className="text-2xl font-bold text-emerald-600">
                ₹{redeemValue}
              </p>
            </div>
          </div>

          {redeemValue > selectedAccount.points && (
            <p className="mt-3 text-sm font-medium text-rose-600">
              Redeem points cannot exceed available balance.
            </p>
          )}
        </div>
      )}

      {/* Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={
            !selectedAccount ||
            redeemValue <= 0 ||
            redeemValue >
              (selectedAccount?.points || 0)
          }
          className="flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-200 transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
        >
          <CheckCircle2 size={18} />
          Redeem Rewards
        </button>
      </div>
    </form>
  );
};

export default RedeemForm;