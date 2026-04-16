"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Order } from "@/lib/types";
import { X } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800", confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-indigo-100 text-indigo-800", delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};
const PAYMENT_COLORS: Record<string, string> = {
  pending: "bg-orange-100 text-orange-700", paid: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700", refunded: "bg-stone-100 text-stone-700",
};
const STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente", confirmed: "Confirmado", shipped: "Enviado",
  delivered: "Entregado", cancelled: "Cancelado",
};
const PAYMENT_LABELS: Record<string, string> = {
  pending: "Pendiente", paid: "Pagado", failed: "Fallido", refunded: "Reembolsado",
};
const ORDER_STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

export default function PedidosPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filtered, setFiltered] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState("");

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "orders"));
      const all = snap.docs.map(d => ({ id: d.id, ...d.data() } as Order));
      all.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
      setOrders(all);
      setFiltered(all);
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    setFiltered(statusFilter === "all" ? orders : orders.filter(o => o.status === statusFilter));
  }, [statusFilter, orders]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdating(orderId);
    try {
      await updateDoc(doc(db, "orders", orderId), { status: newStatus, updatedAt: serverTimestamp() });
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus as Order["status"] } : o));
      if (selectedOrder?.id === orderId) setSelectedOrder(s => s ? { ...s, status: newStatus as Order["status"] } : s);
    } catch (e) { console.error(e); }
    finally { setUpdating(""); }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-stone-800">Pedidos</h1>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-white border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-nutrisse-sage"
        >
          <option value="all">Todos los estados</option>
          {ORDER_STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-stone-500 uppercase text-xs tracking-wider">
              <tr>
                {["ID", "Cliente", "Fecha", "Total", "Pago", "Estado", "Acciones"].map(h => (
                  <th key={h} className="px-5 py-3 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr><td colSpan={7} className="px-6 py-10 text-center"><div className="inline-block w-6 h-6 border-4 border-nutrisse-sage border-t-transparent rounded-full animate-spin" /></td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-10 text-center text-stone-400">Sin pedidos</td></tr>
              ) : filtered.map(order => (
                <tr key={order.id} className="hover:bg-stone-50 transition cursor-pointer" onClick={() => setSelectedOrder(order)}>
                  <td className="px-5 py-4 font-mono text-xs text-stone-500">#{order.id.slice(-6).toUpperCase()}</td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-stone-700">{order.userName}</p>
                    <p className="text-xs text-stone-400">{order.userEmail}</p>
                  </td>
                  <td className="px-5 py-4 text-stone-500 whitespace-nowrap">{order.createdAt?.toDate?.()?.toLocaleDateString() || "—"}</td>
                  <td className="px-5 py-4 font-medium">Q {(order.total || 0).toFixed(2)}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${PAYMENT_COLORS[order.paymentStatus] || "bg-stone-100 text-stone-600"}`}>
                      {PAYMENT_LABELS[order.paymentStatus] || order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[order.status] || "bg-stone-100 text-stone-600"}`}>
                      {STATUS_LABELS[order.status] || order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                    <select
                      value={order.status}
                      disabled={updating === order.id}
                      onChange={e => handleStatusChange(order.id, e.target.value)}
                      className="text-xs bg-stone-50 border border-stone-200 rounded px-2 py-1 focus:outline-none"
                    >
                      {ORDER_STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:hidden divide-y divide-stone-100">
          {loading ? (
            <div className="p-8 flex justify-center"><div className="w-6 h-6 border-4 border-nutrisse-sage border-t-transparent rounded-full animate-spin" /></div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-stone-400">Sin pedidos</div>
          ) : filtered.map(order => (
            <div key={order.id} className="p-4 space-y-1 cursor-pointer" onClick={() => setSelectedOrder(order)}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-stone-500">#{order.id.slice(-6).toUpperCase()}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[order.status] || "bg-stone-100 text-stone-600"}`}>
                  {STATUS_LABELS[order.status] || order.status}
                </span>
              </div>
              <p className="font-medium text-stone-700 text-sm">{order.userName}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-stone-400">{order.createdAt?.toDate?.()?.toLocaleDateString() || "—"}</span>
                <span className="font-medium text-sm">Q {(order.total || 0).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Detail Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedOrder(null)} />
          <div className="relative w-full max-w-lg bg-white shadow-xl overflow-y-auto z-10 flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 sticky top-0 bg-white">
              <h2 className="font-bold text-stone-800">Detalle del Pedido #{selectedOrder.id.slice(-6).toUpperCase()}</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-stone-400 hover:text-stone-700"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-stone-600 mb-2 text-sm uppercase tracking-wide">Cliente</h3>
                <p className="font-medium">{selectedOrder.userName}</p>
                <p className="text-stone-500 text-sm">{selectedOrder.userEmail}</p>
              </div>
              <div>
                <h3 className="font-semibold text-stone-600 mb-3 text-sm uppercase tracking-wide">Artículos</h3>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-stone-100">
                      <div>
                        <p className="font-medium text-stone-700">{item.productName}</p>
                        <p className="text-xs text-stone-400">x{item.quantity} × Q {item.unitPrice?.toFixed(2)}</p>
                      </div>
                      <p className="font-semibold">Q {item.subtotal?.toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 font-bold">
                    <span>Total</span>
                    <span>Q {(selectedOrder.total || 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              {selectedOrder.shippingAddress && (
                <div>
                  <h3 className="font-semibold text-stone-600 mb-2 text-sm uppercase tracking-wide">Dirección de Envío</h3>
                  <p className="text-stone-700">{selectedOrder.shippingAddress.street}</p>
                  <p className="text-stone-500 text-sm">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</p>
                  {selectedOrder.shippingAddress.details && <p className="text-stone-400 text-sm">{selectedOrder.shippingAddress.details}</p>}
                </div>
              )}
              <div>
                <h3 className="font-semibold text-stone-600 mb-2 text-sm uppercase tracking-wide">Estado del Pedido</h3>
                <select
                  value={selectedOrder.status}
                  disabled={updating === selectedOrder.id}
                  onChange={e => handleStatusChange(selectedOrder.id, e.target.value)}
                  className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nutrisse-sage"
                >
                  {ORDER_STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                </select>
              </div>
              {selectedOrder.notes && (
                <div>
                  <h3 className="font-semibold text-stone-600 mb-2 text-sm uppercase tracking-wide">Notas</h3>
                  <p className="text-stone-600 bg-stone-50 p-3 rounded">{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
