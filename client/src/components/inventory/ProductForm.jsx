import { useState } from "react";
import {
  Package,
  Barcode,
  Building2,
  IndianRupee,
  Boxes,
  Plus,
} from "lucide-react";

const ProductForm = ({ onCreate }) => {
  const [form, setForm] = useState({
    name: "",
    sku: "",
    supplier: "",
    costPrice: "",
    sellingPrice: "",
    minimumStock: 5,
  });

  const update = (key, value) =>
    setForm({ ...form, [key]: value });

  const submit = (e) => {
    e.preventDefault();

    onCreate({
      ...form,
      costPrice: Number(form.costPrice),
      sellingPrice: Number(form.sellingPrice),
      minimumStock: Number(form.minimumStock),
    });

    setForm({
      name: "",
      sku: "",
      supplier: "",
      costPrice: "",
      sellingPrice: "",
      minimumStock: 5,
    });
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        {/* Product Name */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Package size={16} />
            Product Name
          </label>

          <div className="relative">
            <Package
              size={18}
              className="absolute left-3 top-3.5 text-slate-400"
            />

            <input
              type="text"
              placeholder="L'Oréal Shampoo"
              value={form.name}
              onChange={(e) =>
                update("name", e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none focus:border-cyan-500 focus:bg-white"
              required
            />
          </div>
        </div>

        {/* SKU */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Barcode size={16} />
            SKU Code
          </label>

          <div className="relative">
            <Barcode
              size={18}
              className="absolute left-3 top-3.5 text-slate-400"
            />

            <input
              type="text"
              placeholder="SKU-1025"
              value={form.sku}
              onChange={(e) =>
                update("sku", e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none focus:border-cyan-500 focus:bg-white"
              required
            />
          </div>
        </div>

        {/* Supplier */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Building2 size={16} />
            Supplier
          </label>

          <div className="relative">
            <Building2
              size={18}
              className="absolute left-3 top-3.5 text-slate-400"
            />

            <input
              type="text"
              placeholder="L'Oréal India Pvt Ltd"
              value={form.supplier}
              onChange={(e) =>
                update("supplier", e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none focus:border-cyan-500 focus:bg-white"
              required
            />
          </div>
        </div>

        {/* Minimum Stock */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Boxes size={16} />
            Minimum Stock
          </label>

          <div className="relative">
            <Boxes
              size={18}
              className="absolute left-3 top-3.5 text-slate-400"
            />

            <input
              type="number"
              min="0"
              value={form.minimumStock}
              onChange={(e) =>
                update("minimumStock", e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none focus:border-cyan-500 focus:bg-white"
              required
            />
          </div>
        </div>

        {/* Cost Price */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <IndianRupee size={16} />
            Cost Price
          </label>

          <div className="relative">
            <IndianRupee
              size={18}
              className="absolute left-3 top-3.5 text-slate-400"
            />

            <input
              type="number"
              min="0"
              placeholder="350"
              value={form.costPrice}
              onChange={(e) =>
                update("costPrice", e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none focus:border-cyan-500 focus:bg-white"
              required
            />
          </div>
        </div>

        {/* Selling Price */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <IndianRupee size={16} />
            Selling Price
          </label>

          <div className="relative">
            <IndianRupee
              size={18}
              className="absolute left-3 top-3.5 text-slate-400"
            />

            <input
              type="number"
              min="0"
              placeholder="499"
              value={form.sellingPrice}
              onChange={(e) =>
                update("sellingPrice", e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none focus:border-cyan-500 focus:bg-white"
              required
            />
          </div>
        </div>
      </div>

      {/* Profit Preview */}
      {form.costPrice && form.sellingPrice && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-emerald-700">
              Estimated Profit
            </span>

            <span className="text-2xl font-bold text-emerald-600">
              ₹
              {Number(form.sellingPrice) -
                Number(form.costPrice)}
            </span>
          </div>
        </div>
      )}

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-200 transition hover:bg-cyan-700"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>
    </form>
  );
};

export default ProductForm;