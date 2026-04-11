"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product, Category } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Camera } from "lucide-react";

export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState("");

  useEffect(() => {
    async function load() {
      const [pSnap, cSnap] = await Promise.all([
        getDocs(collection(db, "products")),
        getDocs(collection(db, "categories")),
      ]);
      setProducts(pSnap.docs.map(d => ({ id: d.id, ...d.data() } as Product)));
      setCategories(cSnap.docs.map(d => ({ id: d.id, ...d.data() } as Category)));
      setLoading(false);
    }
    load();
  }, []);

  const handleToggleActive = async (product: Product) => {
    setTogglingId(product.id);
    try {
      await updateDoc(doc(db, "products", product.id), { active: !product.active });
      setProducts(prev => prev.map(p => p.id === product.id ? { ...p, active: !p.active } : p));
    } catch (e) { console.error(e); }
    finally { setTogglingId(""); }
  };

  const getCategoryName = (id: string) => categories.find(c => c.id === id)?.name || "Sin categoría";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">Productos</h1>
        <Link
          href="/productos/nuevo"
          className="flex items-center gap-2 bg-nutrisse-sage text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-nutrisse-sage/90 transition"
        >
          <Plus size={16} /> Nuevo Producto
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-stone-500 uppercase text-xs tracking-wider">
              <tr>
                {["", "Nombre", "Categoría", "Precio", "Stock", "Activo", "Acciones"].map(h => (
                  <th key={h} className="px-5 py-3 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr><td colSpan={7} className="px-6 py-10 text-center"><div className="inline-block w-6 h-6 border-4 border-nutrisse-sage border-t-transparent rounded-full animate-spin" /></td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-stone-400">No hay productos. <Link href="/productos/nuevo" className="text-nutrisse-sage underline">Crea el primero</Link>.</td></tr>
              ) : products.map(product => (
                <tr key={product.id} className="hover:bg-stone-50 transition">
                  <td className="px-5 py-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0 relative flex items-center justify-center">
                      {product.images?.[0] ? (
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                      ) : (
                        <Camera size={18} className="text-stone-300" />
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <p className="font-medium text-stone-700">{product.name}</p>
                    <p className="text-xs text-stone-400 font-mono">{product.slug}</p>
                  </td>
                  <td className="px-5 py-3 text-stone-500">{getCategoryName(product.categoryId)}</td>
                  <td className="px-5 py-3 font-medium">
                    Q {product.price.toFixed(2)}
                    {product.comparePrice && <span className="ml-2 text-xs text-stone-400 line-through">Q {product.comparePrice.toFixed(2)}</span>}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`font-medium ${product.stock === 0 ? "text-red-500" : product.stock <= 5 ? "text-yellow-600" : "text-stone-700"}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => handleToggleActive(product)}
                      disabled={togglingId === product.id}
                      className={`w-11 h-6 rounded-full transition-colors relative ${product.active ? "bg-nutrisse-sage" : "bg-stone-300"}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${product.active ? "left-6" : "left-1"}`} />
                    </button>
                  </td>
                  <td className="px-5 py-3">
                    <Link href={`/productos/${product.id}`} className="flex items-center gap-1 text-xs text-nutrisse-sage hover:underline">
                      <Edit size={14} /> Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
