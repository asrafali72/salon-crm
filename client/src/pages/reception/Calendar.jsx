const Calendar = () => {
  return (
    <div className="min-h-screen space-y-6 bg-slate-50 p-1">
      {/* Header */}
      <div className="rounded-3xl bg-linear-to-r from-indigo-600 via-blue-600 to-cyan-600 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">Reception Calendar</h1>
        <p className="mt-3 text-indigo-100 text-lg">
          View and manage daily appointment schedules.
        </p>
      </div>

      {/* Calendar Placeholder */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Appointment Calendar
            </h2>
            <p className="text-sm text-slate-500">
              Today's booking overview
            </p>
          </div>

          <button className="rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700">
            Today
          </button>
        </div>

        <div className="flex h-96 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-slate-700">
              Calendar View
            </h3>
            <p className="mt-2 text-slate-500">
              Your appointment calendar will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;