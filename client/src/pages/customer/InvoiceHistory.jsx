import { useEffect, useState } from "react";
import api from "../../services/api";

import InvoiceCard from "../../components/customerBooking/InvoiceCard";
import ServiceHistoryCard from "../../components/customerBooking/ServiceHistoryCard";

const InvoiceHistory = () => {
  const [invoices, setInvoices] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get("/portal/invoices"),
      api.get("/portal/history"),
    ]).then(([i, h]) => {
      setInvoices(i.data);
      setHistory(h.data);
    });
  }, []);

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-1">
      {/* Header */}
      <div className="rounded-3xl bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">
          Invoice & Service History
        </h1>

        <p className="mt-3 text-indigo-100 text-lg">
          View your paid invoices and completed salon services.
        </p>
      </div>

      {/* Paid Invoices */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-800">
            Paid Invoices
          </h2>

          <p className="text-sm text-slate-500">
            Your payment history
          </p>
        </div>

        <div className="space-y-4">
          {invoices.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 py-10 text-center text-slate-500">
              No invoices available
            </div>
          ) : (
            invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="rounded-xl border border-slate-200 bg-white p-1 transition hover:shadow-md"
              >
                <InvoiceCard invoice={invoice} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Completed Services */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-800">
            Completed Services
          </h2>

          <p className="text-sm text-slate-500">
            Your salon visit history
          </p>
        </div>

        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 py-10 text-center text-slate-500">
              No completed services yet
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 bg-white p-1 transition hover:shadow-md"
              >
                <ServiceHistoryCard item={item} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceHistory;