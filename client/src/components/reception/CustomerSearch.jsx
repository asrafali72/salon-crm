import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  Search,
  Phone,
  User,
  CheckCircle2,
} from "lucide-react";

const CustomerSearch = ({ selected, setSelected }) => {
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    api
      .get(`/reception/customers?search=${search}`)
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error(err));
  }, [search]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h3 className="text-xl font-bold text-slate-800">
          Select Customer
        </h3>
        <p className="text-sm text-slate-500">
          Search by customer name or phone number
        </p>
      </div>

      {/* Search Box */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-3.5 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none focus:border-cyan-500 focus:bg-white"
        />
      </div>

      {/* Customer List */}
      <div className="max-h-72 overflow-y-auto rounded-2xl border border-slate-200 bg-white">
        {customers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-400">
            <User size={32} />
            <p className="mt-2 text-sm">
              No customers found
            </p>
          </div>
        ) : (
          customers.map((customer) => {
            const active = selected?.id === customer.id;

            return (
              <button
                key={customer.id}
                type="button"
                onClick={() => setSelected(customer)}
                className={`flex w-full items-center justify-between border-b border-slate-100 p-4 text-left transition last:border-none ${
                  active
                    ? "bg-cyan-50"
                    : "hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full font-bold ${
                      active
                        ? "bg-cyan-500 text-white"
                        : "bg-cyan-100 text-cyan-700"
                    }`}
                  >
                    {customer.name.charAt(0)}
                  </div>

                  {/* Details */}
                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {customer.name}
                    </h4>

                    <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                      <Phone size={13} />
                      {customer.phone}
                    </div>
                  </div>
                </div>

                {/* Selected Icon */}
                {active && (
                  <CheckCircle2
                    size={22}
                    className="text-cyan-600"
                  />
                )}
              </button>
            );
          })
        )}
      </div>

      {/* Selected Customer Preview */}
      {selected && (
        <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 font-bold text-white">
              {selected.name.charAt(0)}
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Selected Customer
              </p>
              <h3 className="font-semibold text-slate-800">
                {selected.name}
              </h3>
              <p className="text-sm text-slate-600">
                {selected.phone}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerSearch;