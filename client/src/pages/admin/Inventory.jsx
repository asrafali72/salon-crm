import { useEffect, useState } from "react";
import api from "../../services/api";

import ProductForm from "../../components/inventory/ProductForm";
import PurchaseForm from "../../components/inventory/PurchaseForm";
import InventoryTable from "../../components/inventory/InventoryTable";

import {
  Package,
  Boxes,
  ShoppingCart,
  AlertTriangle,
  Plus,
  ArrowUpRight,
} from "lucide-react";

const Inventory = () => {
  const [products, setProducts] = useState([]);

  const load = async () => {
    const res = await api.get("/inventory");
    setProducts(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (data) => {
    await api.post("/inventory", data);
    load();
  };

  const purchase = async (data) => {
    await api.post("/inventory/purchase", data);
    load();
  };

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, p) => sum + Number(p.stock || 0),
    0
  );

  const lowStock = products.filter(
    (p) => Number(p.stock) < 10
  ).length;

  return (
    <div className="space-y-6 bg-slate-50 min-h-screen p-1">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#0F172A] via-[#1E3A8A] to-[#0EA5E9] p-8 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white,transparent_45%)] opacity-20" />

        <div className="relative flex flex-col md:flex-row justify-between gap-5">
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-cyan-200 mb-3">
              CRM • INVENTORY
            </p>

            <h1 className="text-4xl font-bold mb-2">
              Inventory Management
            </h1>

            <p className="text-slate-200 text-lg">
              Track salon products, purchases and stock levels.
            </p>
          </div>

          <button className="flex items-center gap-2 self-start rounded-full border border-white/30 bg-white/20 px-5 py-3 backdrop-blur hover:bg-white/30">
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-cyan-100 p-3 text-cyan-600">
              <Package size={22} />
            </div>

            <span className="flex items-center gap-1 text-sm font-medium text-emerald-600">
              <ArrowUpRight size={15} />
              Active
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-bold">
            {totalProducts}
          </h2>

          <p className="text-sm text-slate-500">
            Total Products
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-emerald-100 p-3 text-emerald-600 w-fit">
            <Boxes size={22} />
          </div>

          <h2 className="mt-5 text-3xl font-bold">
            {totalStock}
          </h2>

          <p className="text-sm text-slate-500">
            Total Stock Units
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-violet-100 p-3 text-violet-600 w-fit">
            <ShoppingCart size={22} />
          </div>

          <h2 className="mt-5 text-3xl font-bold">
            {totalProducts}
          </h2>

          <p className="text-sm text-slate-500">
            Purchase Items
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-orange-100 p-3 text-orange-600 w-fit">
            <AlertTriangle size={22} />
          </div>

          <h2 className="mt-5 text-3xl font-bold">
            {lowStock}
          </h2>

          <p className="text-sm text-slate-500">
            Low Stock Alerts
          </p>
        </div>
      </div>

      {/* Add Product */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="text-xl font-bold text-slate-800">
            Add New Product
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Register a new inventory item for your salon.
          </p>
        </div>

        <div className="p-6">
          <ProductForm onCreate={create} />
        </div>
      </div>

      {/* Purchase Stock */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="text-xl font-bold text-slate-800">
            Purchase Stock
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Increase inventory by recording new purchases.
          </p>
        </div>

        <div className="p-6">
          <PurchaseForm
            products={products}
            onPurchase={purchase}
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Inventory Stock
            </h2>

            <p className="text-sm text-slate-500">
              Monitor product quantity and stock availability.
            </p>
          </div>

          <div className="rounded-full bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700">
            {totalProducts} Products
          </div>
        </div>

        <div className="overflow-x-auto p-6">
          <InventoryTable products={products} />
        </div>
      </div>
    </div>
  );
};

export default Inventory;