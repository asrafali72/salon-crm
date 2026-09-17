import { useState } from "react";
import {
  Building2,
  Phone,
  MapPin,
  Clock3,
  Plus,
} from "lucide-react";

const BranchForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    openingTime: "09:00",
    closingTime: "21:00",
  });

  const update = (key, value) =>
    setForm({ ...form, [key]: value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);

    setForm({
      name: "",
      address: "",
      phone: "",
      openingTime: "09:00",
      closingTime: "21:00",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        {/* Branch Name */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Building2 size={16} />
            Branch Name
          </label>

          <div className="relative">
            <Building2
              size={18}
              className="absolute left-3 top-3.5 text-slate-400"
            />

            <input
              type="text"
              placeholder="Whitefield Branch"
              value={form.name}
              onChange={(e) =>
                update("name", e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none focus:border-cyan-500 focus:bg-white"
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Phone size={16} />
            Contact Number
          </label>

          <div className="relative">
            <Phone
              size={18}
              className="absolute left-3 top-3.5 text-slate-400"
            />

            <input
              type="tel"
              placeholder="+91 9876543210"
              value={form.phone}
              onChange={(e) =>
                update("phone", e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none focus:border-cyan-500 focus:bg-white"
              required
            />
          </div>
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <MapPin size={16} />
            Branch Address
          </label>

          <div className="relative">
            <MapPin
              size={18}
              className="absolute left-3 top-3.5 text-slate-400"
            />

            <input
              type="text"
              placeholder="Marathahalli, Bangalore"
              value={form.address}
              onChange={(e) =>
                update("address", e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none focus:border-cyan-500 focus:bg-white"
              required
            />
          </div>
        </div>

        {/* Opening Time */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Clock3 size={16} />
            Opening Time
          </label>

          <input
            type="time"
            value={form.openingTime}
            onChange={(e) =>
              update("openingTime", e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:bg-white"
            required
          />
        </div>

        {/* Closing Time */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Clock3 size={16} />
            Closing Time
          </label>

          <input
            type="time"
            value={form.closingTime}
            onChange={(e) =>
              update("closingTime", e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:bg-white"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-200 transition hover:bg-cyan-700"
        >
          <Plus size={18} />
          Create Branch
        </button>
      </div>
    </form>
  );
};

export default BranchForm;