import { useState } from "react";
import api from "../../services/api";
import {
  CreditCard,
  Wallet,
  Banknote,
  Smartphone,
  Receipt,
  CheckCircle2,
  X,
} from "lucide-react";

const PaymentModal = ({ appointment, onClose, onPaid }) => {
  const [method, setMethod] = useState("CASH");

  const methods = [
    {
      value: "CASH",
      label: "Cash",
      icon: Banknote,
    },
    {
      value: "CARD",
      label: "Card",
      icon: CreditCard,
    },
    {
      value: "UPI",
      label: "UPI",
      icon: Smartphone,
    },
    {
      value: "WALLET",
      label: "Wallet",
      icon: Wallet,
    },
  ];

  const pay = async () => {
    await api.post("/payments", {
      invoiceId: appointment.invoiceId,
      amount: appointment.service.price,
      method,
    });

    onPaid();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="bg-linear-to-r from-cyan-500 to-blue-600 p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-cyan-100">
                <Receipt size={16} />
                <span className="text-xs uppercase tracking-wide">
                  Payment
                </span>
              </div>

              <h2 className="text-2xl font-bold">
                Accept Payment
              </h2>
            </div>

            <button
              onClick={onClose}
              className="rounded-full bg-white/20 p-2 transition hover:bg-white/30"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-5 p-6">
          {/* Customer */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 font-bold text-cyan-700">
              {appointment.customer.name.charAt(0)}
            </div>

            <div>
              <h3 className="font-semibold text-slate-800">
                {appointment.customer.name}
              </h3>

              <p className="text-sm text-slate-500">
                {appointment.service.name}
              </p>
            </div>
          </div>

          {/* Amount */}
          <div className="rounded-2xl border border-emerald-200 bg-linear-to-r from-emerald-50 to-cyan-50 p-5 text-center">
            <p className="text-sm text-slate-500">
              Total Amount
            </p>

            <h1 className="mt-2 text-4xl font-bold text-emerald-600">
              ₹{appointment.service.price}
            </h1>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="mb-3 font-semibold text-slate-800">
              Choose Payment Method
            </h4>

            <div className="grid grid-cols-2 gap-3">
              {methods.map((m) => {
                const Icon = m.icon;
                const active = method === m.value;

                return (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => setMethod(m.value)}
                    className={`rounded-xl border p-4 transition ${
                      active
                        ? "border-cyan-500 bg-cyan-50"
                        : "border-slate-200 hover:border-cyan-300"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Icon
                        size={22}
                        className={
                          active
                            ? "text-cyan-600"
                            : "text-slate-500"
                        }
                      />
                      <span className="text-sm font-medium">
                        {m.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Invoice Info */}
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-slate-500">Invoice ID</span>
              <span className="font-medium">
                #{appointment.invoiceId?.slice(0, 6)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Method</span>
              <span className="font-medium">{method}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t border-slate-100 p-6">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-300 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={pay}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white shadow-lg shadow-cyan-200 transition hover:opacity-95"
          >
            <CheckCircle2 size={18} />
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;