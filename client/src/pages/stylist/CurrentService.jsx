import { useEffect, useState } from "react";
import api from "../../services/api";
import CurrentServiceCard from "../../components/stylist/CurrentServiceCard";

const CurrentService = () => {
  const [service, setService] = useState(null);

  const load = () => {
    api
      .get("/stylist/current")
      .then((res) => setService(res.data));
  };

  useEffect(load, []);

  const start = async () => {
    await api.post(`/stylist/${service.id}/start`);
    load();
  };

  const complete = async (notes) => {
    await api.post(`/stylist/${service.id}/complete`, {
      notes,
    });
    load();
  };

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-1">
      {/* Header */}
      <div className="rounded-3xl bg-linear-to-r from-teal-600 via-cyan-600 to-blue-600 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">Current Service</h1>
        <p className="mt-3 text-cyan-100 text-lg">
          Manage the customer currently assigned to you.
        </p>
      </div>

      {/* Service Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <CurrentServiceCard
          service={service}
          onStart={start}
          onComplete={complete}
        />
      </div>
    </div>
  );
};

export default CurrentService;