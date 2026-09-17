import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

import CustomerSearch from "../../components/reception/CustomerSearch";
import BookingForm from "../../components/reception/BookingForm";
import BookingSummary from "../../components/reception/BookingSummary";

const NewBooking = () => {
  const { user } = useAuth();

  const [customer, setCustomer] = useState(null);
  const [summary, setSummary] = useState({});
  const [resetForm, setResetForm] = useState(false);

  const createBooking = async (form) => {
    if (!customer) {
      alert("Select customer");
      return;
    }

    const payload = {
      customerId: customer.id,
      staffId: form.staffId,
      serviceId: form.serviceId,
      appointmentDate: form.appointmentDate,
      startTime: form.startTime,
      branchId: user.branchIds[0],
    };

    await api.post("/appointments", payload);

    alert("Appointment Created Successfully!");

    setCustomer(null);
    setSummary({});
    setResetForm(true);
  };

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-1">
      {/* Header */}
      <div className="rounded-3xl bg-linear-to-r from-indigo-600 via-cyan-600 to-teal-500 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">New Booking</h1>
        <p className="mt-3 text-cyan-100 text-lg">
          Create a new appointment for walk-in or existing customers.
        </p>
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Customer Search */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-slate-800">
                Select Customer
              </h2>
              <p className="text-sm text-slate-500">
                Search by name or phone number.
              </p>
            </div>

            <CustomerSearch
              selected={customer}
              setSelected={setCustomer}
            />
          </div>

          {/* Booking Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-slate-800">
                Appointment Details
              </h2>
              <p className="text-sm text-slate-500">
                Choose service, stylist, date and time.
              </p>
            </div>

            <BookingForm
              reset={resetForm}
              onResetDone={() => setResetForm(false)}
              onSubmit={async (data) => {
                setSummary({
                  customer,
                  ...data,
                });

                try {
                  await createBooking(data);
                } catch (err) {
                  alert(
                    err.response?.data?.message ||
                      "Failed to create appointment"
                  );
                }
              }}
            />
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-800">
              Booking Summary
            </h2>
            <p className="text-sm text-slate-500">
              Review before confirming
            </p>
          </div>

          <BookingSummary
            customer={customer}
            service={summary.service}
            stylist={summary.staff}
            date={summary.appointmentDate}
            time={summary.startTime}
          />
        </div>
      </div>
    </div>
  );
};

export default NewBooking;