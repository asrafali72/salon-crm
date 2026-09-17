import { useEffect, useState } from "react";
import api from "../../services/api";
import ReviewTable from "../../components/review/ReviewTable";

import {
  MessageSquare,
  Star,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const load = () =>
    api.get("/reviews").then((res) => setReviews(res.data));

  useEffect(() => {
    load();
  }, []);

  const resolve = async (id) => {
    await api.patch(`/reviews/${id}/resolve`);
    load();
  };

  const totalReviews = reviews.length;
  const resolved = reviews.filter((r) => r.resolved).length;
  const pending = totalReviews - resolved;

  const avgRating =
    totalReviews === 0
      ? 0
      : (
          reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) /
          totalReviews
        ).toFixed(1);

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-1">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#0F172A] via-[#0EA5E9] to-[#14B8A6] p-8 text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent_45%)]" />

        <div className="relative flex flex-col md:flex-row justify-between gap-5">
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-cyan-200 mb-3">
              CRM • REVIEWS
            </p>

            <h1 className="text-4xl font-bold mb-2">
              Customer Reviews
            </h1>

            <p className="text-cyan-100 text-lg">
              Monitor customer satisfaction and resolve feedback quickly.
            </p>
          </div>

          <button className="flex items-center gap-2 self-start rounded-full border border-white/30 bg-white/20 px-5 py-3 backdrop-blur hover:bg-white/30">
            <Sparkles size={18} />
            View Insights
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={<MessageSquare size={22} />}
          color="bg-cyan-100 text-cyan-600"
          title="Total Reviews"
          value={totalReviews}
        />

        <StatCard
          icon={<Star size={22} />}
          color="bg-amber-100 text-amber-600"
          title="Average Rating"
          value={avgRating}
        />

        <StatCard
          icon={<CheckCircle2 size={22} />}
          color="bg-emerald-100 text-emerald-600"
          title="Resolved"
          value={resolved}
        />

        <StatCard
          icon={<Clock size={22} />}
          color="bg-rose-100 text-rose-600"
          title="Pending"
          value={pending}
        />
      </div>

      {/* Rating Overview */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-1">
            Customer Satisfaction
          </h2>

          <p className="text-sm text-slate-500 mb-6">
            Overall review performance across all salon branches
          </p>

          <div className="flex items-center gap-6">
            <div className="h-28 w-28 rounded-full bg-cyan-50 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-slate-800">
                  {avgRating}
                </h3>
                <div className="flex justify-center text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.round(avgRating) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-3">
              <Progress label="5 Stars" value={82} color="bg-emerald-500" />
              <Progress label="4 Stars" value={60} color="bg-cyan-500" />
              <Progress label="3 Stars" value={32} color="bg-amber-500" />
              <Progress label="2 Stars" value={15} color="bg-orange-500" />
              <Progress label="1 Star" value={8} color="bg-rose-500" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-linear-to-br from-cyan-600 to-teal-500 p-6 text-white">
          <div className="flex items-center gap-2">
            <MessageSquare size={20} />
            <p className="font-semibold">Feedback Status</p>
          </div>

          <h2 className="mt-6 text-4xl font-bold">{resolved}</h2>
          <p className="text-cyan-100">Reviews resolved this month</p>

          <div className="mt-8 space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span>Resolved</span>
                <span>{resolved}</span>
              </div>

              <div className="mt-1 h-2 rounded-full bg-white/20">
                <div
                  className="h-2 rounded-full bg-white"
                  style={{
                    width: `${
                      totalReviews ? (resolved / totalReviews) * 100 : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span>Pending</span>
                <span>{pending}</span>
              </div>

              <div className="mt-1 h-2 rounded-full bg-white/20">
                <div
                  className="h-2 rounded-full bg-cyan-200"
                  style={{
                    width: `${
                      totalReviews ? (pending / totalReviews) * 100 : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Customer Feedback
            </h2>

            <p className="text-sm text-slate-500">
              Review comments, ratings and resolution status
            </p>
          </div>

          <div className="rounded-full bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700">
            {totalReviews} Reviews
          </div>
        </div>

        <div className="overflow-x-auto p-6">
          <ReviewTable reviews={reviews} onResolve={resolve} />
        </div>
      </div>
    </div>
  );
};

/* ---------- Components ---------- */

const StatCard = ({ icon, color, title, value }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <div className={`rounded-xl p-3 ${color}`}>{icon}</div>

      <span className="flex items-center gap-1 text-sm font-medium text-emerald-600">
        <ArrowUpRight size={15} />
        Live
      </span>
    </div>

    <h2 className="mt-5 text-3xl font-bold text-slate-800">{value}</h2>
    <p className="text-sm text-slate-500">{title}</p>
  </div>
);

const Progress = ({ label, value, color }) => (
  <div>
    <div className="mb-1 flex justify-between text-sm text-slate-600">
      <span>{label}</span>
      <span>{value}%</span>
    </div>

    <div className="h-2 rounded-full bg-slate-200">
      <div
        className={`h-2 rounded-full ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export default Reviews;