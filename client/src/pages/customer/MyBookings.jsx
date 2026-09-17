import { useEffect, useState } from "react";
import api from "../../services/api";
import BookingCard from "../../components/customerBooking/BookingCard";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const load = async () => {
    const res = await api.get("/portal/bookings");
    setBookings(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const cancel = async (id) => {
    const ok = confirm("Cancel this appointment?");
    if (!ok) return;

    await api.post(`/portal/bookings/${id}/cancel`);
    load();
  };

  const upcoming = bookings.filter((b) =>
    ["PENDING", "CONFIRMED"].includes(b.status)
  );

  const history = bookings.filter((b) =>
    ["COMPLETED", "CANCELLED"].includes(b.status)
  );

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-1">
      {/* Header */}
      <div className="rounded-3xl bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">My Bookings</h1>
        <p className="mt-3 text-indigo-100 text-lg">
          Manage your upcoming appointments and view your booking history.
        </p>
      </div>

      {/* Upcoming */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Upcoming Appointments
            </h2>
            <p className="text-sm text-slate-500">
              Your scheduled salon visits
            </p>
          </div>

          <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
            {upcoming.length}
          </span>
        </div>

        <div className="space-y-4">
          {upcoming.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 py-10 text-center text-slate-500">
              No upcoming appointments.
            </div>
          ) : (
            upcoming.map((booking) => (
              <div
                key={booking.id}
                className="rounded-xl border border-slate-200 p-1 transition hover:shadow-md"
              >
                <BookingCard booking={booking} onCancel={cancel} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* History */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">History</h2>
            <p className="text-sm text-slate-500">
              Completed and cancelled appointments
            </p>
          </div>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
            {history.length}
          </span>
        </div>

        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 py-10 text-center text-slate-500">
              No appointment history.
            </div>
          ) : (
            history.map((booking) => (
              <div
                key={booking.id}
                className="rounded-xl border border-slate-200 p-1 transition hover:shadow-md"
              >
                <BookingCard booking={booking} onCancel={cancel} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;