const Customers = () => {
  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-1">
      {/* Header */}
      <div className="rounded-3xl bg-linear-to-r from-indigo-600 via-cyan-600 to-teal-500 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">Customer Search</h1>
        <p className="mt-3 text-cyan-100 text-lg">
          Search and manage customer information from the reception desk.
        </p>
      </div>

      {/* Search Placeholder */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-800">
            Find Customer
          </h2>
          <p className="text-sm text-slate-500">
            Search by name, phone number, or customer ID.
          </p>
        </div>

        <div className="flex h-80 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-slate-700">
              Customer Search Panel
            </h3>
            <p className="mt-2 text-slate-500">
              Customer records will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;