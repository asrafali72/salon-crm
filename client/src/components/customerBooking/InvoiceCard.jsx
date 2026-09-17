import {
  Receipt,
  CalendarDays,
  Scissors,
  User,
  IndianRupee,
  CheckCircle2,
  Wallet,
} from "lucide-react";

const InvoiceCard = ({ invoice }) => {
  const paid = invoice.payments.reduce(
    (sum, p) => sum + Number(p.amount),
    0
  );

  const remaining = invoice.total - paid;
  const isPaid = remaining <= 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="bg-linear-to-r from-cyan-500 to-blue-600 p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2 text-cyan-100">
              <Receipt size={16} />
              <span className="text-xs uppercase tracking-wide">
                Invoice
              </span>
            </div>

            <h3 className="text-xl font-bold">
              {invoice.appointment.service.name}
            </h3>
          </div>

          <div className="text-right">
            <p className="text-xs text-cyan-100">Total</p>
            <h2 className="text-3xl font-bold">
              ₹{invoice.total}
            </h2>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-4 p-5">
        {/* Customer */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-100 font-bold text-cyan-700">
            {invoice.appointment.customer.name.charAt(0)}
          </div>

          <div>
            <p className="font-semibold text-slate-800">
              {invoice.appointment.customer.name}
            </p>

            <p className="text-sm text-slate-500">
              Customer
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-3 rounded-xl bg-slate-50 p-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <Scissors size={15} />
              Service
            </div>

            <span className="font-medium text-slate-800">
              {invoice.appointment.service.name}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <CalendarDays size={15} />
              Date
            </div>

            <span className="font-medium text-slate-800">
              {new Date(invoice.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <IndianRupee size={15} />
              Subtotal
            </div>

            <span>₹{invoice.subtotal}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Tax</span>
            <span>₹{invoice.taxAmount}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Discount</span>
            <span className="text-rose-600">
              -₹{invoice.discount}
            </span>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="rounded-xl border border-slate-200 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet size={18} className="text-emerald-600" />
              <span className="font-medium">
                Payment Status
              </span>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                isPaid
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {isPaid ? "PAID" : "PENDING"}
            </span>
          </div>

          <div className="mb-2 flex justify-between text-sm">
            <span className="text-slate-600">Paid</span>
            <span className="font-semibold text-emerald-600">
              ₹{paid}
            </span>
          </div>

          <div className="mb-3 h-2 rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full bg-emerald-500"
              style={{
                width: `${Math.min(
                  100,
                  (paid / invoice.total) * 100
                )}%`,
              }}
            />
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-slate-500">
              Remaining
            </span>

            <span className="font-bold text-slate-800">
              ₹{remaining}
            </span>
          </div>
        </div>

        {/* Footer */}
        {isPaid && (
          <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 py-3 text-sm font-medium text-emerald-700">
            <CheckCircle2 size={18} />
            Payment Completed
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceCard;