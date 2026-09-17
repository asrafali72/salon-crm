import { useEffect, useState } from "react";
import api from "../../services/api";

import LoyaltyCard from "../../components/loyalty/LoyaltyCard";
import LoyaltyTable from "../../components/loyalty/LoyaltyTable";
import RedeemForm from "../../components/loyalty/RedeemForm";

import {
  Gift,
  Star,
  Trophy,
  Wallet,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const Loyalty = () => {
  const [accounts, setAccounts] = useState([]);

  const load = async () => {
    const res = await api.get("/loyalty");
    setAccounts(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const redeem = async (data) => {
    await api.post("/loyalty/redeem", data);
    load();
  };

  const totalMembers = accounts.length;
  const totalPoints = accounts.reduce(
    (sum, acc) => sum + Number(acc.points || 0),
    0
  );
  const avgPoints =
    totalMembers === 0 ? 0 : Math.round(totalPoints / totalMembers);

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-1">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#0F172A] via-[#6D28D9] to-[#EC4899] p-8 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white,transparent_45%)] opacity-20" />

        <div className="relative flex flex-col md:flex-row justify-between gap-5">
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-pink-200 mb-3">
              CRM • LOYALTY
            </p>

            <h1 className="text-4xl font-bold mb-2">
              Loyalty Rewards Program
            </h1>

            <p className="text-pink-100 text-lg">
              Reward loyal customers and manage redeemable points.
            </p>
          </div>

          <button className="flex items-center gap-2 self-start rounded-full border border-white/30 bg-white/20 px-5 py-3 backdrop-blur hover:bg-white/30">
            <Sparkles size={18} />
            Reward Campaign
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-pink-100 p-3 text-pink-600">
              <Gift size={22} />
            </div>

            <span className="flex items-center gap-1 text-sm font-medium text-emerald-600">
              <ArrowUpRight size={15} />
              Active
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-bold">{totalMembers}</h2>

          <p className="text-sm text-slate-500">Loyalty Members</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-violet-100 p-3 text-violet-600 w-fit">
            <Star size={22} />
          </div>

          <h2 className="mt-5 text-3xl font-bold">{totalPoints}</h2>

          <p className="text-sm text-slate-500">Total Reward Points</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-amber-100 p-3 text-amber-600 w-fit">
            <Trophy size={22} />
          </div>

          <h2 className="mt-5 text-3xl font-bold">{avgPoints}</h2>

          <p className="text-sm text-slate-500">Average Points</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600 w-fit">
            <Wallet size={22} />
          </div>

          <h2 className="mt-5 text-3xl font-bold">100%</h2>

          <p className="text-sm text-slate-500">Reward Engagement</p>
        </div>
      </div>

      {/* Redeem Form */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="text-xl font-bold text-slate-800">
            Redeem Customer Points
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Apply loyalty rewards during billing and checkout.
          </p>
        </div>

        <div className="p-6">
          <RedeemForm accounts={accounts} onRedeem={redeem} />
        </div>
      </div>

      {/* Loyalty Cards */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Premium Members
            </h2>

            <p className="text-sm text-slate-500">
              Customer reward profiles and available points
            </p>
          </div>

          <span className="rounded-full bg-pink-50 px-4 py-2 text-sm font-medium text-pink-700">
            {totalMembers} Members
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="rounded-2xl border border-slate-200 bg-white p-1 shadow-sm hover:shadow-md transition"
            >
              <LoyaltyCard account={account} />
            </div>
          ))}
        </div>
      </div>

      {/* Loyalty Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Loyalty Accounts
            </h2>

            <p className="text-sm text-slate-500">
              Complete overview of reward members and point balances.
            </p>
          </div>

          <div className="rounded-full bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700">
            {totalPoints} Points Issued
          </div>
        </div>

        <div className="overflow-x-auto p-6">
          <LoyaltyTable accounts={accounts} />
        </div>
      </div>
    </div>
  );
};

export default Loyalty;