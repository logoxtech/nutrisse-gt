"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Appointment } from "@/lib/types";

const STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente", confirmed: "Confirmado", cancelled: "Cancelado",
};
const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function CitasPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState("");

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "appointments"));
      const all = snap.docs.map(d => ({ id: d.id, ...d.data() } as Appointment));
      all.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
      setAppointments(all);
      setLoading(false);
    }
    load();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdating(id);
    try {
      await updateDoc(doc(db, "appointments", id), { status: newStatus, updatedAt: serverTimestamp() });
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus as Appointment["status"] } : a));
    } catch (e) { console.error(e); }
    finally { setUpdating(""); }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-stone-800">Citas</h1>

      <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-stone-500 uppercase text-xs tracking-wider">
              <tr>
                {["Nombre", "Contacto", "Servicio", "Fecha", "Hora", "Estado", "Notas", "Acciones"].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr><td colSpan={8} className="px-6 py-10 text-center"><div className="inline-block w-6 h-6 border-4 border-nutrisse-sage border-t-transparent rounded-full animate-spin"/></td></tr>
              ) : appointments.length === 0 ? (
                <tr><td colSpan={8} className="px-6 py-10 text-center text-stone-400">No hay citas registradas</td></tr>
              ) : appointments.map(appt => (
                <tr key={appt.id} className="hover:bg-stone-50 transition">
                  <td className="px-4 py-3 font-medium text-stone-700 whitespace-nowrap">{appt.name}</td>
                  <td className="px-4 py-3">
                    <p className="text-stone-600 text-xs">{appt.email}</p>
                    <p className="text-stone-500 text-xs">{appt.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-stone-600 text-xs max-w-[140px] truncate">{appt.service}</td>
                  <td className="px-4 py-3 text-stone-500 whitespace-nowrap">{appt.preferredDate}</td>
                  <td className="px-4 py-3 text-stone-500 whitespace-nowrap">{appt.preferredTime}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${STATUS_COLORS[appt.status] || "bg-stone-100 text-stone-600"}`}>
                      {STATUS_LABELS[appt.status] || appt.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-stone-400 text-xs max-w-[120px] truncate" title={appt.notes}>{appt.notes || "—"}</td>
                  <td className="px-4 py-3 space-y-1">
                    <select
                      value={appt.status}
                      disabled={updating === appt.id}
                      onChange={e => handleStatusChange(appt.id, e.target.value)}
                      className="text-xs bg-stone-50 border border-stone-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-nutrisse-sage"
                    >
                      {Object.keys(STATUS_LABELS).map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                    </select>
                    {/* TODO Phase 2: Add "Crear en Google Calendar" button here
                        Will call n8n webhook with appointment data to create Google Calendar event
                        and trigger WhatsApp/email confirmation flow */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:hidden divide-y divide-stone-100">
          {loading ? (
            <div className="p-8 flex justify-center"><div className="w-6 h-6 border-4 border-nutrisse-sage border-t-transparent rounded-full animate-spin" /></div>
          ) : appointments.length === 0 ? (
            <div className="p-8 text-center text-stone-400">No hay citas registradas</div>
          ) : appointments.map(appt => (
            <div key={appt.id} className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-stone-700 text-sm">{appt.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[appt.status] || "bg-stone-100 text-stone-600"}`}>
                  {STATUS_LABELS[appt.status] || appt.status}
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium">{appt.service}</p>
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span>{appt.preferredDate} - {appt.preferredTime}</span>
              </div>
              <div className="pt-2 border-t border-stone-50 mt-2">
                <select
                  value={appt.status}
                  disabled={updating === appt.id}
                  onChange={e => handleStatusChange(appt.id, e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-nutrisse-sage"
                >
                  {Object.keys(STATUS_LABELS).map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
