"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Order } from "@/lib/types";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { ShoppingBag, TrendingUp, Clock, Users } from "lucide-react";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from "@/lib/utils";



export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        // Fetch all orders
        const ordersSnap = await getDocs(collection(db, "orders"));
        const allOrders = ordersSnap.docs.map(d => ({ id: d.id, ...d.data() } as Order));
        setOrders(allOrders);

        // Recent 10
        setRecentOrders(
          [...allOrders]
            .sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0))
            .slice(0, 10)
        );

        // User count
        const usersSnap = await getDocs(collection(db, "users"));
        setUserCount(usersSnap.size);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  // KPIs
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const monthOrders = orders.filter(o => {
    const d = o.createdAt?.toDate?.();
    return d && d >= startOfMonth;
  });
  const monthRevenue = monthOrders.reduce((s, o) => s + (o.total || 0), 0);
  const pendingOrders = orders.filter(o => o.status === "pending").length;

  // Daily revenue for last 30 days
  const last30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return { date: `${d.getDate()}/${d.getMonth() + 1}`, revenue: 0, day: d.toDateString() };
  });
  orders.forEach(o => {
    const d = o.createdAt?.toDate?.();
    if (!d) return;
    const key = d.toDateString();
    const slot = last30.find(s => s.day === key);
    if (slot) slot.revenue += o.total || 0;
  });

  // Top 5 products
  const productSales: Record<string, { name: string; units: number }> = {};
  orders.forEach(o => {
    o.items?.forEach(item => {
      if (!productSales[item.productId]) productSales[item.productId] = { name: item.productName, units: 0 };
      productSales[item.productId].units += item.quantity;
    });
  });
  const topProducts = Object.values(productSales).sort((a, b) => b.units - a.units).slice(0, 5);

  const kpis = [
    { label: "Pedidos este mes", value: monthOrders.length, icon: ShoppingBag, color: "text-blue-500 bg-blue-50" },
    { label: "Ingresos este mes", value: `Q ${monthRevenue.toFixed(2)}`, icon: TrendingUp, color: "text-green-600 bg-green-50" },
    { label: "Pedidos pendientes", value: pendingOrders, icon: Clock, color: "text-yellow-600 bg-yellow-50" },
    { label: "Clientes registrados", value: userCount, icon: Users, color: "text-purple-600 bg-purple-50" },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-nutrisse-sage border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-stone-800">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpis.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl p-6 shadow-sm border border-stone-100">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${color}`}>
              <Icon size={22} />
            </div>
            <p className="text-2xl font-bold text-stone-800">{value}</p>
            <p className="text-sm text-stone-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-100">
          <h2 className="font-semibold text-stone-700 mb-4">Ingresos últimos 30 días (GTQ)</h2>
          {orders.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-stone-400 text-sm">Sin datos de pedidos aún</div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={last30}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} interval={4} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => [`Q ${Number(v).toFixed(2)}`, "Ingresos"]} />
                <Line type="monotone" dataKey="revenue" stroke="#7D9B76" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-100">
          <h2 className="font-semibold text-stone-700 mb-4">Top 5 Productos por Unidades Vendidas</h2>
          {topProducts.length === 0 ? (
            <div className="h-48 flex items-center justify-center text-stone-400 text-sm">Sin ventas registradas</div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={120} />
                <Tooltip />
                <Bar dataKey="units" fill="#C4714F" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100">
          <h2 className="font-semibold text-stone-700">Pedidos Recientes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-stone-500 uppercase text-xs tracking-wider">
              <tr>
                {["ID", "Cliente", "Fecha", "Total", "Estado"].map(h => (
                  <th key={h} className="px-6 py-3 text-left font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {recentOrders.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-stone-400">Sin pedidos</td></tr>
              ) : recentOrders.map(order => (
                <tr key={order.id} className="hover:bg-stone-50 transition">
                  <td className="px-6 py-4 font-mono text-xs text-stone-500">#{order.id.slice(-6).toUpperCase()}</td>
                  <td className="px-6 py-4 font-medium text-stone-700">{order.userName}</td>
                  <td className="px-6 py-4 text-stone-500">{order.createdAt?.toDate?.()?.toLocaleDateString() || "—"}</td>
                  <td className="px-6 py-4 font-medium">Q {(order.total || 0).toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${ORDER_STATUS_COLORS[order.status] || "bg-stone-100 text-stone-600"}`}>
                      {ORDER_STATUS_LABELS[order.status] || order.status}
                    </span>
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
