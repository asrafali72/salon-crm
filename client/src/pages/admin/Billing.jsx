import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  IndianRupee,
  Receipt,
  Wallet,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";

const Billing = () => {
  const [appointments, setAppointments] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const load = async () => {
    try {
      const [a, i] = await Promise.all([
        api.get("/appointments"),
        api.get("/billing"),
      ]);

      setAppointments(
        a.data.filter((x) => x.status === "COMPLETED")
      );
      setInvoices(i.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const generate = async (id) => {
    try {
      await api.post("/billing/invoice", {
        appointmentId: id,
        discount: 0,
      });

      alert("Invoice generated successfully!");
      load();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to generate invoice"
      );
    }
  };

  const pay = async (invoiceId, total) => {
    try {
      await api.post("/billing/payment", {
        invoiceId,
        amount: Number(total),
        method: "UPI",
      });

      alert("Payment successful!");
      load();
    } catch (err) {
      alert(
        err.response?.data?.message || "Payment failed"
      );
    }
  };

  const totalRevenue = invoices.reduce(
    (sum, i) => sum + Number(i.paidAmount || 0),
    0
  );

  const pendingRevenue = invoices.reduce(
    (sum, i) =>
      sum +
      (Number(i.total || 0) -
        Number(i.paidAmount || 0)),
    0
  );

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-1">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#0F172A] via-[#1E3A8A] to-[#0EA5E9] p-8 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white,transparent_45%)] opacity-20" />

        <div className="relative flex items-center justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-200">
              CRM • BILLING
            </p>

            <h1 className="mb-2 text-4xl font-bold">
              Billing & Invoices
            </h1>

            <p className="text-slate-200">
              Generate invoices and manage customer
              payments.
            </p>
          </div>

          <button className="rounded-full border border-white/30 bg-white/20 px-5 py-3 backdrop-blur hover:bg-white/30">
            + New Invoice
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-cyan-100 p-3 text-cyan-600">
              <Receipt size={22} />
            </div>

            <span className="flex items-center gap-1 text-sm font-medium text-emerald-600">
              <ArrowUpRight size={15} />
              {invoices.length}
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-bold">
            {invoices.length}
          </h2>

          <p className="text-sm text-slate-500">
            Total Invoices
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="w-fit rounded-xl bg-emerald-100 p-3 text-emerald-600">
            <IndianRupee size={22} />
          </div>

          <h2 className="mt-5 text-3xl font-bold">
            ₹{totalRevenue}
          </h2>

          <p className="text-sm text-slate-500">
            Revenue Collected
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="w-fit rounded-xl bg-orange-100 p-3 text-orange-600">
            <Wallet size={22} />
          </div>

          <h2 className="mt-5 text-3xl font-bold">
            ₹{pendingRevenue}
          </h2>

          <p className="text-sm text-slate-500">
            Pending Payments
          </p>
        </div>
      </div>

      {/* Completed Appointments */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-xl font-bold">
            Completed Appointments
          </h2>
          <p className="text-sm text-slate-500">
            Ready to generate invoices
          </p>
        </div>

        <div className="space-y-4">
          {appointments.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 py-10 text-center text-slate-500">
              No completed appointments found.
            </div>
          ) : (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex flex-col items-start justify-between rounded-xl border border-slate-200 p-4 transition hover:border-cyan-300 hover:bg-slate-50 md:flex-row md:items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 text-lg font-bold text-cyan-700">
                    {appointment.customer?.name?.charAt(
                      0
                    ) || "?"}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {appointment.customer?.name ||
                        "Unknown Customer"}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {appointment.service?.name ||
                        "Unknown Service"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    generate(appointment.id)
                  }
                  className="mt-3 rounded-xl bg-cyan-600 px-5 py-2.5 font-medium text-white hover:bg-cyan-700 md:mt-0"
                >
                  Generate Invoice
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Invoice History */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-xl font-bold">
            Invoice History
          </h2>
          <p className="text-sm text-slate-500">
            Track payments and outstanding balances
          </p>
        </div>

        <div className="space-y-4">
          {invoices.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 py-10 text-center text-slate-500">
              No invoices generated yet.
            </div>
          ) : (
            invoices.map((invoice) => {
              const remaining =
                Number(invoice.total || 0) -
                Number(invoice.paidAmount || 0);

              const paid = remaining === 0;

              return (
                <div
                  key={invoice.id}
                  className="rounded-xl border border-slate-200 p-5 transition hover:shadow-md"
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row">
                    <div>
                      <div className="mb-2 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 font-bold text-cyan-700">
                          {invoice.appointment?.customer?.name?.charAt(
                            0
                          ) || "?"}
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-slate-800">
                            {invoice.appointment?.customer
                              ?.name ||
                              "Unknown Customer"}
                          </h3>

                          <p className="text-sm text-slate-500">
                            {invoice.appointment?.service
                              ?.name ||
                              "Unknown Service"}
                          </p>
                        </div>

                        <span
                          className={`ml-2 rounded-full px-3 py-1 text-xs font-medium ${
                            paid
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {paid ? "Paid" : "Pending"}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-5 text-sm">
                        <span>
                          Total:
                          <strong className="ml-1">
                            ₹{invoice.total}
                          </strong>
                        </span>

                        <span>
                          Paid:
                          <strong className="ml-1 text-emerald-600">
                            ₹{invoice.paidAmount}
                          </strong>
                        </span>

                        <span>
                          Remaining:
                          <strong className="ml-1 text-orange-600">
                            ₹{remaining}
                          </strong>
                        </span>
                      </div>
                    </div>

                    {!paid && (
                      <button
                        onClick={() =>
                          pay(invoice.id, remaining)
                        }
                        className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-700"
                      >
                        <CreditCard size={18} />
                        Pay Remaining
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Billing;