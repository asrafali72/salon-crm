import {
  Package,
  Barcode,
  Warehouse,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const InventoryTable = ({ products }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr className="text-xs uppercase tracking-wider text-slate-500">
            <th className="px-6 py-4 text-left">Product</th>
            <th className="px-4 py-4 text-left">SKU</th>
            <th className="px-4 py-4 text-left">Stock</th>
            <th className="px-4 py-4 text-left">Minimum</th>
            <th className="px-6 py-4 text-left">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 bg-white">
          {products.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="py-12 text-center text-slate-500"
              >
                No products available.
              </td>
            </tr>
          ) : (
            products.map((p) => {
              const lowStock = p.stock <= p.minimumStock;

              return (
                <tr
                  key={p.id}
                  className="hover:bg-slate-50 transition"
                >
                  {/* Product */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 text-cyan-700">
                        <Package size={22} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {p.name}
                        </h3>

                        <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                          <Warehouse size={13} />
                          {p.supplier || "Unknown Supplier"}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* SKU */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Barcode size={14} className="text-slate-400" />
                      <span className="font-medium">{p.sku}</span>
                    </div>
                  </td>

                  {/* Stock */}
                  <td className="px-4 py-4">
                    <div className="w-28">
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="font-semibold text-slate-800">
                          {p.stock}
                        </span>
                        <span className="text-slate-500">pcs</span>
                      </div>

                      <div className="h-2 rounded-full bg-slate-200">
                        <div
                          className={`h-2 rounded-full ${
                            lowStock
                              ? "bg-rose-500"
                              : "bg-emerald-500"
                          }`}
                          style={{
                            width: `${Math.min(
                              100,
                              (p.stock / Math.max(p.minimumStock * 2, 1)) * 100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Minimum */}
                  <td className="px-4 py-4 font-medium text-slate-700">
                    {p.minimumStock}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    {lowStock ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
                        <AlertTriangle size={13} />
                        Low Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                        <CheckCircle2 size={13} />
                        In Stock
                      </span>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;