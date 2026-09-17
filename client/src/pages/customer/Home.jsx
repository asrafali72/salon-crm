// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div className="min-h-screen space-y-6 bg-slate-50 p-1">
//       {/* Hero */}
//       <div className="rounded-3xl bg-linear-to-r from-pink-600 via-fuchsia-600 to-purple-600 p-8 text-white shadow-lg">
//         <h1 className="text-4xl font-bold">
//           Welcome to Our Salon
//         </h1>

//         <p className="mt-3 max-w-xl text-pink-100 text-lg">
//           Book appointments, track loyalty, and view your service history.
//         </p>

//         <Link
//           to="/customer/book"
//           className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-pink-600 transition hover:scale-105 hover:bg-pink-50"
//         >
//           Book Now
//         </Link>
//       </div>

//       {/* Stats */}
//       <div className="grid gap-5 md:grid-cols-3">
//         <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
//           <p className="text-sm font-medium text-slate-500">
//             Next Appointment
//           </p>

//           <h2 className="mt-4 text-3xl font-bold text-slate-800">
//             --
//           </h2>

//           <p className="mt-2 text-sm text-slate-400">
//             No upcoming appointment
//           </p>
//         </div>

//         <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
//           <p className="text-sm font-medium text-slate-500">
//             Loyalty Points
//           </p>

//           <h2 className="mt-4 text-3xl font-bold text-pink-600">
//             0
//           </h2>

//           <p className="mt-2 text-sm text-slate-400">
//             Available reward points
//           </p>
//         </div>

//         <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
//           <p className="text-sm font-medium text-slate-500">
//             Total Visits
//           </p>

//           <h2 className="mt-4 text-3xl font-bold text-purple-600">
//             0
//           </h2>

//           <p className="mt-2 text-sm text-slate-400">
//             Completed salon visits
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

import {
  CalendarDays,
  Gift,
  Clock,
  Scissors,
  ArrowRight,
  Sparkles,
  Star,
  CheckCircle2,
} from "lucide-react";

const Home = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    loyaltyPoints: 0,
    totalVisits: 0,
    nextAppointment: null,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/portal/dashboard");
        setStats(res.data);
      } catch {
        // Demo data (remove after backend is ready)
        setStats({
          loyaltyPoints: 120,
          totalVisits: 8,
          nextAppointment: {
            service: { name: "Hair Spa" },
            staff: { user: { name: "Ankit" } },
            appointmentDate: "2026-09-20",
            startTime: "03:00 PM",
          },
        });
      }
    };

    load();
  }, []);

  const appointment = stats.nextAppointment;

  return (
    <div className="min-h-screen space-y-6 bg-linear-to-rr from-slate-50 via-pink-50/30 to-white p-1">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#831843] via-[#BE185D] to-[#EC4899] p-8 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white,transparent_45%)] opacity-20" />

        <div className="relative flex flex-col justify-between gap-6 lg:flex-row">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Sparkles size={18} className="text-pink-200" />
              <p className="text-xs uppercase tracking-[0.3em] text-pink-100">
                CUSTOMER PORTAL
              </p>
            </div>

            <h1 className="mb-2 text-4xl font-bold">
              Welcome, {user?.name || "Guest"} 👋
            </h1>

            <p className="max-w-xl text-lg text-pink-100">
              Book appointments, earn loyalty rewards, and track your complete salon journey.
            </p>

            <Link
              to="/customer/book"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-pink-600 transition hover:scale-105"
            >
              Book Appointment
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/15 p-5 backdrop-blur-md">
            <p className="text-sm text-pink-100">Loyalty Status</p>

            <div className="mt-3 flex items-center gap-3">
              <Gift size={30} className="text-yellow-300" />
              <div>
                <h2 className="text-3xl font-bold">{stats.loyaltyPoints}</h2>
                <p className="text-sm text-pink-100">Reward Points</p>
              </div>
            </div>

            <div className="mt-4 h-2 rounded-full bg-white/20">
              <div
                className="h-2 rounded-full bg-yellow-300"
                style={{
                  width: `${Math.min(stats.loyaltyPoints / 2, 100)}%`,
                }}
              />
            </div>

            <p className="mt-2 text-xs text-pink-100">
              Gold membership progress
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-pink-100 p-3 text-pink-600">
              <CalendarDays size={22} />
            </div>

            <span className="text-xs font-medium text-emerald-600">
              Upcoming
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-bold">
            {appointment ? "1" : "0"}
          </h2>

          <p className="text-sm text-slate-500">Next Appointment</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-violet-100 p-3 text-violet-600 w-fit">
            <Gift size={22} />
          </div>

          <h2 className="mt-5 text-3xl font-bold">
            {stats.loyaltyPoints}
          </h2>

          <p className="text-sm text-slate-500">Loyalty Points</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-cyan-100 p-3 text-cyan-600 w-fit">
            <Scissors size={22} />
          </div>

          <h2 className="mt-5 text-3xl font-bold">
            {stats.totalVisits}
          </h2>

          <p className="text-sm text-slate-500">Salon Visits</p>
        </div>
      </div>

      {/* Appointment + Rewards */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-5 flex items-center gap-2">
            <Clock size={20} className="text-pink-600" />
            <h2 className="text-xl font-bold text-slate-800">
              Upcoming Appointment
            </h2>
          </div>

          {appointment ? (
            <div className="rounded-xl bg-linear-to-r from-pink-50 to-rose-50 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">
                    {appointment.service.name}
                  </h3>

                  <p className="mt-1 text-slate-600">
                    Stylist • {appointment.staff.user.name}
                  </p>
                </div>

                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                  Confirmed
                </span>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-white p-4">
                  <p className="text-sm text-slate-500">Date</p>
                  <h4 className="mt-1 font-semibold">
                    {new Date(
                      appointment.appointmentDate
                    ).toLocaleDateString()}
                  </h4>
                </div>

                <div className="rounded-lg bg-white p-4">
                  <p className="text-sm text-slate-500">Time</p>
                  <h4 className="mt-1 font-semibold">
                    {appointment.startTime}
                  </h4>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center">
              <CalendarDays
                size={42}
                className="mx-auto mb-3 text-slate-300"
              />

              <h3 className="font-semibold text-slate-700">
                No Upcoming Appointment
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Schedule your next salon visit today.
              </p>

              <Link
                to="/customer/book"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-pink-600 px-5 py-3 font-medium text-white"
              >
                Book Now
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-yellow-200 bg-linear-to-rr from-yellow-50 to-orange-50 p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Star className="text-yellow-500" />
            <h2 className="text-lg font-bold text-slate-800">
              Rewards
            </h2>
          </div>

          <h3 className="text-4xl font-bold text-yellow-600">
            {stats.loyaltyPoints}
          </h3>

          <p className="mt-2 text-sm text-slate-600">
            Every 1 point = ₹1 redeemable during checkout.
          </p>

          <div className="mt-6 rounded-xl bg-white p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Redeem Value
              </span>

              <span className="font-bold text-emerald-600">
                ₹{stats.loyaltyPoints}
              </span>
            </div>
          </div>

          <Link
            to="/customer/loyalty"
            className="mt-5 inline-flex items-center gap-2 font-medium text-pink-600"
          >
            View Loyalty
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-bold text-slate-800">
          Quick Actions
        </h2>

        <div className="grid gap-4 md:grid-cols-4">
          <Link
            to="/customer/book"
            className="rounded-xl border border-slate-200 p-4 transition hover:border-pink-400 hover:bg-pink-50"
          >
            <CalendarDays className="mb-3 text-pink-600" />
            <h3 className="font-semibold">Book</h3>
            <p className="text-sm text-slate-500">
              New appointment
            </p>
          </Link>

          <Link
            to="/customer/bookings"
            className="rounded-xl border border-slate-200 p-4 transition hover:border-pink-400 hover:bg-pink-50"
          >
            <Clock className="mb-3 text-pink-600" />
            <h3 className="font-semibold">Bookings</h3>
            <p className="text-sm text-slate-500">
              Manage visits
            </p>
          </Link>

          <Link
            to="/customer/invoices"
            className="rounded-xl border border-slate-200 p-4 transition hover:border-pink-400 hover:bg-pink-50"
          >
            <CheckCircle2 className="mb-3 text-pink-600" />
            <h3 className="font-semibold">Invoices</h3>
            <p className="text-sm text-slate-500">
              Payment history
            </p>
          </Link>

          <Link
            to="/customer/profile"
            className="rounded-xl border border-slate-200 p-4 transition hover:border-pink-400 hover:bg-pink-50"
          >
            <Star className="mb-3 text-pink-600" />
            <h3 className="font-semibold">Profile</h3>
            <p className="text-sm text-slate-500">
              Update account
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;