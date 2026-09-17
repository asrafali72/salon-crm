import { useEffect, useState } from "react";
import api from "../../services/api";
import PaymentModal from "../../components/reception/PaymentModal";

const Checkout = () => {
  const [appointments, setAppointments] = useState([]);
  const [selected, setSelected] = useState(null);

  const load = async () => {
    try {
      const res = await api.get("/reception/appointments");
      setAppointments(
        res.data.filter((a) => a.status === "CHECKED_IN")
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const complete = async (id) => {
    const res = await api.post(
      `/reception/appointments/${id}/complete`
    );
    setSelected(res.data);
  };

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-1">
      {/* Header */}
      <div className="rounded-3xl bg-linear-to-r from-purple-600 via-indigo-600 to-cyan-600 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">Checkout</h1>
        <p className="mt-3 text-indigo-100 text-lg">
          Complete services and collect customer payments.
        </p>
      </div>

      {/* Checkout List */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-800">
            Ready for Checkout
          </h2>
          <p className="text-sm text-slate-500">
            Customers with checked-in appointments
          </p>
        </div>

        <div className="space-y-4">
          {appointments.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 py-10 text-center text-slate-500">
              No customers ready for checkout.
            </div>
          ) : (
            appointments.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:shadow-md md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 text-xl font-bold text-purple-700">
                    {item.customer.name.charAt(0)}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      {item.customer.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {item.service.name}
                    </p>
                    <p className="mt-1 text-sm font-medium text-emerald-600">
                      ₹{item.service.price}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => complete(item.id)}
                  className="rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 px-5 py-3 font-medium text-white transition hover:opacity-90"
                >
                  Complete & Pay
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {selected && (
        <PaymentModal
          appointment={selected}
          onClose={() => setSelected(null)}
          onPaid={() => {
            setSelected(null);
            load();
          }}
        />
      )}
    </div>
  );
};

export default Checkout;