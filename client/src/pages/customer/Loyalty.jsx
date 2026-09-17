import { useEffect, useState } from "react";
import api from "../../services/api";

const Loyalty = () => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    api.get("/portal/loyalty").then((res) => setAccount(res.data));
  }, []);

  if (!account)
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-pink-500 border-t-transparent" />
      </div>
    );

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-1">
      {/* Header */}
      <div className="rounded-3xl bg-linear-to-r from-pink-600 via-fuchsia-600 to-purple-600 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">My Loyalty</h1>
        <p className="mt-3 text-pink-100 text-lg">
          Track your reward points and membership benefits.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
          <p className="text-sm font-medium text-slate-500">
            Available Points
          </p>

          <h2 className="mt-4 text-4xl font-bold text-pink-600">
            {account.points}
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Redeem during checkout
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
          <p className="text-sm font-medium text-slate-500">
            Membership Tier
          </p>

          <h2 className="mt-4 text-4xl font-bold text-yellow-500">
            {account.tier}
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Premium customer status
          </p>
        </div>
      </div>

      {/* Transactions */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h3 className="text-2xl font-bold text-slate-800">
            Transaction History
          </h3>

          <p className="text-sm text-slate-500">
            Your loyalty points activity
          </p>
        </div>

        <div className="space-y-3">
          {account.transactions.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 py-10 text-center text-slate-500">
              No transactions found
            </div>
          ) : (
            account.transactions.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between rounded-xl border border-slate-100 p-4 transition hover:bg-slate-50"
              >
                <div>
                  <p className="font-semibold text-slate-800">
                    {t.note}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-bold ${
                    t.points > 0
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {t.points > 0 ? "+" : ""}
                  {t.points}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Loyalty;