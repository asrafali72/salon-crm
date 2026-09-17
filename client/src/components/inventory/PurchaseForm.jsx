import { useMemo, useState } from "react";
import {
  Package,
  Boxes,
  ShoppingCart,
  Warehouse,
} from "lucide-react";

const PurchaseForm = ({ products, onPurchase }) => {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const selectedProduct = useMemo(
    () => products.find((p) => p.id === productId),
    [products, productId]
  );

  const submit = (e) => {
    e.preventDefault();

    if (!productId || !quantity) return;

    onPurchase({
      productId,
      quantity: Number(quantity),
    });

    setProductId("");
    setQuantity("");
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-3">
        {/* Product */}
        <div className="md:col-span-2">
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Package size={16} />
            Select Product
          </label>

          <div className="relative">
            <Package
              size={18}
              className="absolute left-3 top-3.5 text-slate-400"
            />

            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none focus:border-cyan-500 focus:bg-white"
              required
            >
              <option value="">Choose a product</option>

              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Boxes size={16} />
            Quantity
          </label>

          <div className="relative">
            <Boxes
              size={18}
              className="absolute left-3 top-3.5 text-slate-400"
            />

            <input
              type="number"
              min="1"
              placeholder="25"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 outline-none focus:border-cyan-500 focus:bg-white"
              required
            />
          </div>
        </div>
      </div>

      {/* Product Preview */}
      {selectedProduct && (
        <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-cyan-500 p-3 text-white">
              <Warehouse size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-800">
                {selectedProduct.name}
              </h3>

              <p className="text-sm text-slate-500">
                SKU: {selectedProduct.sku}
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-white p-3">
              <p className="text-xs text-slate-500">Current Stock</p>
              <p className="text-xl font-bold text-slate-800">
                {selectedProduct.stock}
              </p>
            </div>

            <div className="rounded-lg bg-white p-3">
              <p className="text-xs text-slate-500">After Purchase</p>
              <p className="text-xl font-bold text-emerald-600">
                {selectedProduct.stock + Number(quantity || 0)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-200 transition hover:bg-cyan-700"
        >
          <ShoppingCart size={18} />
          Add Stock
        </button>
      </div>
    </form>
  );
};

export default PurchaseForm;