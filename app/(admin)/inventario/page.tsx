"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/lib/types";
import { Minus, Plus, Save, AlertTriangle } from "lucide-react";

type StockItem = Product & { adjustment: number };

export default function InventarioPage() {
  const [items, setItems] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string>("");

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "products"));
      const prods = snap.docs.map(d => ({ id: d.id, ...d.data(), adjustment: 0 } as StockItem));
      prods.sort((a, b) => a.stock - b.stock);
      setItems(prods);
      setLoading(false);
    }
    load();
  }, []);

  const handleAdjust = (id: string, delta: number) => {
    setItems(prev => prev.map(p => p.id === id ? { ...p, adjustment: p.adjustment + delta } : p));
  };

  const handleSetAdjustment = (id: string, value: number) => {
    setItems(prev => prev.map(p => p.id === id ? { ...p, adjustment: value } : p));
  };

  const handleSave = async (item: StockItem) => {
    const newStock = Math.max(0, item.stock + item.adjustment);
    setSaving(item.id);
    try {
      await updateDoc(doc(db, "products", item.id), { stock: newStock });
      setItems(prev => prev.map(p => p.id === item.id ? { ...p, stock: newStock, adjustment: 0 } : p).sort((a, b) => a.stock - b.stock));
    } catch (e) { console.error(e); }
    finally { setSaving(""); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-stone-800">Inventario</h1>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-yellow-200 inline-block"></span> Stock bajo (≤5)</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-200 inline-block"></span> Sin stock</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-stone-500 uppercase text-xs tracking-wider">
              <tr>
                {["Producto", "Stock Actual", "Ajuste", "Nuevo Stock", "Acción"].map(h => (
                  <th key={h} className="px-5 py-3 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center"><div className="inline-block w-6 h-6 border-4 border-nutrisse-sage border-t-transparent rounded-full animate-spin"/></td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-stone-400">No hay productos</td></tr>
              ) : items.map(item => {
                const newStock = Math.max(0, item.stock + item.adjustment);
                const isOutOfStock = item.stock === 0;
                const isLowStock = item.stock > 0 && item.stock <= 5;
                return (
                  <tr key={item.id} className={`transition ${isOutOfStock ? "bg-red-50" : isLowStock ? "bg-yellow-50" : "hover:bg-stone-50"}`}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {(isOutOfStock || isLowStock) && (
                          <AlertTriangle size={16} className={isOutOfStock ? "text-red-500" : "text-yellow-600"} />
                        )}
                        <div>
                          <p className="font-medium text-stone-700">{item.name}</p>
                          {isOutOfStock && <span className="text-xs font-semibold text-red-500">Fuera de stock</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`font-bold text-lg ${isOutOfStock ? "text-red-500" : isLowStock ? "text-yellow-600" : "text-stone-700"}`}>
                        {item.stock}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAdjust(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center bg-stone-100 hover:bg-stone-200 rounded transition"
                        >
                          <Minus size={14}/>
                        </button>
                        <input
                          type="number"
                          value={item.adjustment}
                          onChange={e => handleSetAdjustment(item.id, parseInt(e.target.value) || 0)}
                          className="w-16 text-center border border-stone-200 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-nutrisse-sage focus:outline-none"
                        />
                        <button
                          onClick={() => handleAdjust(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center bg-stone-100 hover:bg-stone-200 rounded transition"
                        >
                          <Plus size={14}/>
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`font-semibold ${item.adjustment !== 0 ? "text-nutrisse-sage" : "text-stone-500"}`}>
                        {newStock}
                        {item.adjustment !== 0 && (
                          <span className={`ml-1 text-sm ${item.adjustment > 0 ? "text-green-600" : "text-red-500"}`}>
                            ({item.adjustment > 0 ? "+" : ""}{item.adjustment})
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleSave(item)}
                        disabled={item.adjustment === 0 || saving === item.id}
                        className="flex items-center gap-1.5 text-xs bg-nutrisse-sage text-white px-3 py-1.5 rounded-lg font-medium hover:bg-nutrisse-sage/90 transition disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {saving === item.id ? (
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"/>
                        ) : (
                          <Save size={13}/>
                        )}
                        Actualizar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="lg:hidden divide-y divide-stone-100">
          {loading ? (
            <div className="p-8 flex justify-center"><div className="w-6 h-6 border-4 border-nutrisse-sage border-t-transparent rounded-full animate-spin" /></div>
          ) : items.length === 0 ? (
            <div className="p-8 text-center text-stone-400">No hay productos</div>
          ) : items.map(item => {
            const isOutOfStock = item.stock === 0;
            const isLowStock = item.stock > 0 && item.stock <= 5;
            return (
              <div key={item.id} className={`p-4 space-y-3 transition ${isOutOfStock ? "bg-red-50" : isLowStock ? "bg-yellow-50" : ""}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      {(isOutOfStock || isLowStock) && <AlertTriangle size={14} className={isOutOfStock ? "text-red-500" : "text-yellow-600"} />}
                      <p className="font-medium text-stone-700 text-sm leading-tight">{item.name}</p>
                    </div>
                    {isOutOfStock && <span className="text-xs font-semibold text-red-500 mt-0.5 block">Fuera de stock</span>}
                  </div>
                  <span className={`font-bold text-lg leading-none ${isOutOfStock ? "text-red-500" : isLowStock ? "text-yellow-600" : "text-stone-700"}`}>
                    {item.stock}
                  </span>
                </div>
                
                <div className="flex items-center justify-between border-t border-stone-200/50 pt-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleAdjust(item.id, -1)} className="w-8 h-8 flex items-center justify-center bg-white border border-stone-200 hover:bg-stone-50 rounded shadow-sm text-stone-600 transition"><Minus size={14}/></button>
                    <input type="number" value={item.adjustment} onChange={e => handleSetAdjustment(item.id, parseInt(e.target.value) || 0)} className="w-14 text-center border border-stone-200 rounded py-1.5 text-sm focus:ring-2 focus:ring-nutrisse-sage focus:outline-none bg-white"/>
                    <button onClick={() => handleAdjust(item.id, 1)} className="w-8 h-8 flex items-center justify-center bg-white border border-stone-200 hover:bg-stone-50 rounded shadow-sm text-stone-600 transition"><Plus size={14}/></button>
                  </div>
                  
                  <button
                    onClick={() => handleSave(item)}
                    disabled={item.adjustment === 0 || saving === item.id}
                    className="flex items-center gap-1.5 text-xs bg-nutrisse-sage text-white px-3 py-1.5 rounded disabled:opacity-40"
                  >
                    {saving === item.id ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"/> : <Save size={13}/>}
                    Guardar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
