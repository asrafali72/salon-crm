import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  Scissors,
  Clock3,
  IndianRupee,
  Percent,
  UserCheck,
  Sparkles,
  CheckCircle2,
  Palette,
  Gem,
} from "lucide-react";

const categories = [
  { value: "HAIR", icon: Scissors },
  { value: "BEARD", icon: UserCheck },
  { value: "FACIAL", icon: Sparkles },
  { value: "SPA", icon: Gem },
  { value: "NAILS", icon: Palette },
  { value: "MAKEUP", icon: Sparkles },
];

const ServiceForm = ({ onCreate }) => {
  const [stylists, setStylists] = useState([]);

  const [form, setForm] = useState({
    name: "",
    category: "HAIR",
    duration: 30,
    price: "",
    tax: 18,
    stylistIds: [],
  });

  useEffect(() => {
    api.get("/staff").then((res) => {
      const onlyStylists = res.data.filter(
        (staff) => staff.user.role.name === "STYLIST"
      );
      setStylists(onlyStylists);
    });
  }, []);

  const update = (key, value) =>
    setForm({ ...form, [key]: value });

  const toggleStylist = (id) => {
    setForm({
      ...form,
      stylistIds: form.stylistIds.includes(id)
        ? form.stylistIds.filter((x) => x !== id)
        : [...form.stylistIds, id],
    });
  };

  const submit = (e) => {
    e.preventDefault();

    onCreate({
      ...form,
      duration: Number(form.duration),
      price: Number(form.price),
      tax: Number(form.tax),
    });

    setForm({
      name: "",
      category: "HAIR",
      duration: 30,
      price: "",
      tax: 18,
      stylistIds: [],
    });
  };

  const total =
    Number(form.price || 0) +
    (Number(form.price || 0) * Number(form.tax)) / 100;

  return (
    <form onSubmit={submit} className="space-y-6">
      {/* Service Name */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
          <Scissors size={16} />
          Service Name
        </label>

        <input
          type="text"
          placeholder="Premium Hair Cut"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:bg-white"
          required
        />
      </div>

      {/* Categories */}
      <div>
        <label className="mb-3 block text-sm font-medium text-slate-700">
          Service Category
        </label>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const active = form.category === cat.value;

            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => update("category", cat.value)}
                className={`rounded-xl border p-4 transition ${
                  active
                    ? "border-cyan-500 bg-cyan-50"
                    : "border-slate-200 hover:border-cyan-300"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <Icon
                    size={22}
                    className={
                      active
                        ? "text-cyan-600"
                        : "text-slate-500"
                    }
                  />
                  <span className="text-sm font-medium">
                    {cat.value}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Duration, Price, Tax */}
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Clock3 size={16} />
            Duration
          </label>

          <input
            type="number"
            value={form.duration}
            onChange={(e) =>
              update("duration", e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:bg-white"
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <IndianRupee size={16} />
            Price
          </label>

          <input
            type="number"
            value={form.price}
            onChange={(e) =>
              update("price", e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:bg-white"
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Percent size={16} />
            Tax %
          </label>

          <input
            type="number"
            value={form.tax}
            onChange={(e) =>
              update("tax", e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Stylists */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <UserCheck size={16} />
            Eligible Stylists
          </label>

          <span className="text-sm text-cyan-600 font-medium">
            {form.stylistIds.length} Selected
          </span>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {stylists.map((stylist) => {
            const active = form.stylistIds.includes(
              stylist.id
            );

            return (
              <button
                key={stylist.id}
                type="button"
                onClick={() =>
                  toggleStylist(stylist.id)
                }
                className={`rounded-xl border p-4 transition ${
                  active
                    ? "border-cyan-500 bg-cyan-50"
                    : "border-slate-200 hover:border-cyan-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full font-bold ${
                      active
                        ? "bg-cyan-500 text-white"
                        : "bg-cyan-100 text-cyan-700"
                    }`}
                  >
                    {stylist.user.name.charAt(0)}
                  </div>

                  <div className="flex-1 text-left">
                    <p className="font-semibold text-slate-800">
                      {stylist.user.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      Senior Stylist
                    </p>
                  </div>

                  {active && (
                    <CheckCircle2
                      size={20}
                      className="text-cyan-600"
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Summary */}
      <div className="rounded-2xl border border-emerald-200 bg-linear-to-r from-emerald-50 to-cyan-50 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">
              Final Service Price
            </p>
            <h2 className="text-3xl font-bold text-emerald-600">
              ₹{total.toFixed(0)}
            </h2>
          </div>

          <div className="text-right text-sm text-slate-600">
            <p>Base: ₹{form.price || 0}</p>
            <p>Tax: {form.tax}%</p>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-200 transition hover:opacity-95"
        >
          <Sparkles size={18} />
          Create Service
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;