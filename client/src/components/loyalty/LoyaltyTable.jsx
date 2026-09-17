import {
  Phone,
  Gift,
  Wallet,
  Crown,
  Star,
} from "lucide-react";

const LoyaltyTable = ({ accounts }) => {
  const tierStyle = {
    BRONZE: "bg-orange-100 text-orange-700",
    SILVER: "bg-slate-200 text-slate-700",
    GOLD: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr className="text-xs uppercase tracking-wider text-slate-500">
            <th className="px-6 py-4 text-left">Customer</th>
            <th className="px-4 py-4 text-left">Contact</th>
            <th className="px-4 py-4 text-left">Reward Points</th>
            <th className="px-4 py-4 text-left">Tier</th>
            <th className="px-6 py-4 text-left">Wallet Value</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 bg-white">
          {accounts.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="py-12 text-center text-slate-500"
              >
                No loyalty members found.
              </td>
            </tr>
          ) : (
            accounts.map((account) => (
              <tr
                key={account.id}
                className="hover:bg-slate-50 transition"
              >
                {/* Customer */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-100 font-bold text-cyan-700">
                      {account.customer.name.charAt(0)}
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {account.customer.name}
                      </h3>

                      <p className="text-sm text-slate-500">
                        Member ID: {account.id.slice(0, 6)}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Phone */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Phone
                      size={15}
                      className="text-slate-400"
                    />
                    {account.customer.phone}
                  </div>
                </td>

                {/* Points */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Gift
                      size={18}
                      className="text-cyan-600"
                    />

                    <div className="w-full">
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="font-bold text-slate-800">
                          {account.points}
                        </span>
                        <span className="text-slate-500">
                          pts
                        </span>
                      </div>

                      <div className="h-2 rounded-full bg-slate-200">
                        <div
                          className="h-2 rounded-full bg-linear-to-r from-cyan-500 to-blue-500"
                          style={{
                            width: `${Math.min(
                              100,
                              (account.points / 1000) * 100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </td>

                {/* Tier */}
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                      tierStyle[account.tier] ||
                      "bg-slate-100 text-slate-700"
                    }`}
                  >
                    <Crown size={13} />
                    {account.tier}
                  </span>
                </td>

                {/* Value */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Wallet
                      size={18}
                      className="text-emerald-600"
                    />

                    <div>
                      <p className="font-bold text-emerald-600">
                        ₹{account.points}
                      </p>

                      <p className="text-xs text-slate-500">
                        Redeemable
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LoyaltyTable;