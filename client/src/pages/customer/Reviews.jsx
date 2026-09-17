import { useEffect, useState } from "react";
import api from "../../services/api";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get("/reviews/mine").then((res) => setReviews(res.data));
  }, []);

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-1">
      {/* Header */}
      <div className="rounded-3xl bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">My Reviews</h1>
        <p className="mt-3 text-orange-100 text-lg">
          Your ratings and feedback for completed services.
        </p>
      </div>

      {/* Reviews */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center text-slate-500">
            No reviews submitted yet.
          </div>
        ) : (
          reviews.map((r) => (
            <div
              key={r.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {r.appointment.service.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                  {r.rating} ⭐
                </span>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="leading-relaxed text-slate-700">
                  {r.comment}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;