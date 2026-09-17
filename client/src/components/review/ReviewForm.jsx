import { useState } from "react";
import {
  Star,
  MessageSquare,
  Send,
  Sparkles,
} from "lucide-react";

const ReviewForm = ({
  appointmentId,
  customerId,
  onSubmit,
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submit = (e) => {
    e.preventDefault();

    onSubmit({
      appointmentId,
      customerId,
      rating,
      comment,
    });

    setRating(5);
    setComment("");
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="bg-linear-to-r from-cyan-500 to-blue-600 p-5 text-white">
        <div className="mb-2 flex items-center gap-2 text-cyan-100">
          <Sparkles size={16} />
          <span className="text-xs uppercase tracking-wide">
            Customer Feedback
          </span>
        </div>

        <h2 className="text-2xl font-bold">
          Share Your Experience
        </h2>

        <p className="mt-1 text-sm text-cyan-100">
          Your feedback helps us improve our salon services.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={submit} className="space-y-5 p-6">
        {/* Rating */}
        <div>
          <label className="mb-3 block text-sm font-medium text-slate-700">
            Overall Rating
          </label>

          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="transition hover:scale-110"
              >
                <Star
                  size={34}
                  fill={
                    star <= rating ? "#F59E0B" : "none"
                  }
                  className={
                    star <= rating
                      ? "text-amber-400"
                      : "text-slate-300"
                  }
                />
              </button>
            ))}
          </div>

          <p className="mt-2 text-sm text-slate-500">
            {rating === 5 &&
              "Excellent service!"}
            {rating === 4 && "Very good experience"}
            {rating === 3 && "Good overall"}
            {rating === 2 && "Needs improvement"}
            {rating === 1 &&
              "We're sorry to hear that"}
          </p>
        </div>

        {/* Comment */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <MessageSquare size={16} />
            Comments
          </label>

          <textarea
            rows={5}
            placeholder="Tell us what you liked or what we can improve..."
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 outline-none transition focus:border-cyan-500 focus:bg-white"
          />
        </div>

        {/* Rating Summary */}
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">
              Your Rating
            </span>

            <div className="flex items-center gap-1">
              <span className="text-lg font-bold text-slate-800">
                {rating}
              </span>
              <Star
                size={18}
                fill="#F59E0B"
                className="text-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white shadow-lg shadow-cyan-200 transition hover:opacity-95"
        >
          <Send size={18} />
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;