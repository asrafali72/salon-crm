import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  Users,
  FileText,
  ShieldCheck,
  UserPlus,
} from "lucide-react";

const CustomerForm = ({ onCreate }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "MALE",
    notes: "",
    marketingConsent: false,
  });

  const update = (key, value) =>
    setForm({ ...form, [key]: value });

  const submit = (e) => {
    e.preventDefault();
    onCreate(form);

    setForm({
      name: "",
      phone: "",
      email: "",
      gender: "MALE",
      notes: "",
      marketingConsent: false,
    });
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        {/* Customer Name */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <User size={16} />
            Full Name
          </label>

          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-3.5 text-slate-400"
            />
            <input
              type="text"
              placeholder="Enter customer name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none focus:border-cyan-500 focus:bg-white"
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Phone size={16} />
            Phone Number
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
              onChange={(e) => update("phone", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none focus:border-cyan-500 focus:bg-white"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Mail size={16} />
            Email Address
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-3.5 text-slate-400"
            />
            <input
              type="email"
              placeholder="customer@email.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Users size={16} />
            Gender
          </label>

          <div className="grid grid-cols-3 gap-2">
            {["MALE", "FEMALE", "OTHER"].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => update("gender", g)}
                className={`rounded-xl border px-3 py-3 text-sm font-medium transition ${
                  form.gender === g
                    ? "border-cyan-500 bg-cyan-50 text-cyan-700"
                    : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-white"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
          <FileText size={16} />
          Notes
        </label>

        <textarea
          rows={4}
          placeholder="Customer preferences, allergies or remarks..."
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:bg-white"
        />
      </div>

      {/* Marketing Consent */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.marketingConsent}
            onChange={(e) =>
              update("marketingConsent", e.target.checked)
            }
            className="mt-1 h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
          />

          <div>
            <div className="flex items-center gap-2 font-medium text-slate-800">
              <ShieldCheck size={16} className="text-cyan-600" />
              Marketing Consent
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Customer agrees to receive promotional offers and appointment reminders.
            </p>
          </div>
        </label>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-200 transition hover:bg-cyan-700"
        >
          <UserPlus size={18} />
          Add Customer
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;