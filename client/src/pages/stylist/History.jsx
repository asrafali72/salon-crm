import { useEffect, useState } from "react";
import api from "../../services/api";
import HistoryTable from "../../components/stylist/HistoryTable";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api
      .get("/stylist/history")
      .then((res) => setHistory(res.data));
  }, []);

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-1">
      {/* Header */}
      <div className="rounded-3xl bg-linear-to-r from-teal-600 via-cyan-600 to-blue-600 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">Service History</h1>
        <p className="mt-3 text-cyan-100 text-lg">
          View all completed services and customer history.
        </p>
      </div>

      {/* History Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-800">
            Completed Services
          </h2>
          <p className="text-sm text-slate-500">
            Your previous appointments and notes
          </p>
        </div>

        <HistoryTable history={history} />
      </div>
    </div>
  );
};

export default History;