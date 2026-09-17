import {
  User,
  Scissors,
  Star,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";

const ReviewTable = ({ reviews, onResolve }) => {
  const statusStyle = {
    OPEN: "bg-amber-100 text-amber-700",
    RESOLVED: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr className="text-xs uppercase tracking-wider text-slate-500">
            <th className="px-6 py-4 text-left">Customer</th>
            <th className="px-4 py-4 text-left">Service</th>
            <th className="px-4 py-4 text-left">Rating</th>
            <th className="px-4 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {reviews.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="py-12 text-center text-slate-500"
              >
                No customer reviews available.
              </td>
            </tr>
          ) : (
            reviews.map((review) => (
              <tr
                key={review.id}
                className="hover:bg-slate-50 transition"
              >
                {/* Customer */}
                <td className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-100 font-bold text-cyan-700">
                      {review.customer.name.charAt(0)}
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {review.customer.name}
                      </h3>

                      {review.comment && (
                        <div className="mt-1 flex items-start gap-1 text-sm text-slate-500">
                          <MessageSquare
                            size={13}
                            className="mt-0.5"
                          />
                          <p className="line-clamp-2 max-w-xs">
                            {review.comment}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </td>

                {/* Service */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Scissors
                      size={15}
                      className="text-cyan-600"
                    />
                    {review.appointment.service.name}
                  </div>
                </td>

                {/* Rating */}
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={15}
                        fill={
                          star <= review.rating
                            ? "#F59E0B"
                            : "none"
                        }
                        className={
                          star <= review.rating
                            ? "text-amber-400"
                            : "text-slate-300"
                        }
                      />
                    ))}

                    <span className="ml-1 text-sm font-medium text-slate-700">
                      {review.rating}.0
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                      statusStyle[review.status] ||
                      "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {review.status === "RESOLVED" && (
                      <CheckCircle2 size={12} />
                    )}
                    {review.status}
                  </span>
                </td>

                {/* Action */}
                <td className="px-6 py-4 text-right">
                  {review.status === "OPEN" ? (
                    <button
                      onClick={() => onResolve(review.id)}
                      className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-700"
                    >
                      <CheckCircle2 size={16} />
                      Resolve
                    </button>
                  ) : (
                    <span className="text-sm text-emerald-600 font-medium">
                      Completed
                    </span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewTable;