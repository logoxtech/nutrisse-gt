"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, getDocs, doc, updateDoc, getDoc, Timestamp } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { Order, Appointment, User as UserType } from "@/lib/types";

export default function AccountPage() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<"pedidos" | "citas" | "perfil">("pedidos");
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [profile, setProfile] = useState<UserType | null>(null);
  const [loadingData, setLoadingData] = useState(true);

  // Profile Edit State
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    if (!currentUser) return;

    async function loadUserData() {
      setLoadingData(true);
      try {
        // Fetch Orders
        const qOrders = query(collection(db, "orders"), where("userId", "==", currentUser!.uid));
        const snapOrders = await getDocs(qOrders);
        setOrders(snapOrders.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order)));

        // Fetch Appointments
        const qAppointments = query(collection(db, "appointments"), where("userId", "==", currentUser!.uid));
        const snapAppt = await getDocs(qAppointments);
        setAppointments(snapAppt.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment)));

        // Fetch Profile
        const docRef = doc(db, "users", currentUser!.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userD = docSnap.data() as UserType;
          setProfile(userD);
          setEditName(userD.displayName || "");
          setEditPhone(userD.phone || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoadingData(false);
      }
    }

    loadUserData();
  }, [currentUser]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setSavingProfile(true);
    setSaveMessage("");
    try {
      const docRef = doc(db, "users", currentUser.uid);
      await updateDoc(docRef, {
        displayName: editName,
        phone: editPhone
      });
      setProfile(prev => prev ? { ...prev, displayName: editName, phone: editPhone } : null);
      setSaveMessage("Perfil actualizado exitosamente.");
    } catch {
      setSaveMessage("Error al actualizar perfil.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const renderStatus = (status: string) => {
    const maps: Record<string, { label: string, color: string }> = {
      pending: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
      confirmed: { label: "Confirmado", color: "bg-blue-100 text-blue-800" },
      shipped: { label: "Enviado", color: "bg-indigo-100 text-indigo-800" },
      delivered: { label: "Entregado", color: "bg-green-100 text-green-800" },
      cancelled: { label: "Cancelado", color: "bg-red-100 text-red-800" },
    };
    const s = maps[status] || { label: status, color: "bg-stone-100 text-stone-800" };
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${s.color}`}>{s.label}</span>;
  };

  const parseOrFormatDate = (dateField: unknown) => {
    if (!dateField) return "Fecha desconocida";
    if (dateField instanceof Timestamp) return dateField.toDate().toLocaleDateString();
    if (typeof dateField === "object" && dateField !== null && "toDate" in dateField) return (dateField as { toDate: () => Date }).toDate().toLocaleDateString();
    return new Date(dateField as string | number).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-nutrisse-warmWhite py-12 px-4 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="font-serif text-4xl font-bold text-nutrisse-charcoal mb-2">Mi Cuenta</h1>
            <p className="text-stone-500">Bienvenido/a, {profile?.displayName || currentUser?.displayName || "Usuario"}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="text-sm text-nutrisse-terracotta border border-nutrisse-terracotta px-4 py-2 rounded hover:bg-nutrisse-terracotta hover:text-white transition"
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-stone-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-stone-100 overflow-x-auto">
            <button 
              onClick={() => setActiveTab("pedidos")}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition ${activeTab === "pedidos" ? "border-nutrisse-sage text-nutrisse-sage" : "border-transparent text-stone-500 hover:text-stone-700"}`}
            >
              Mis Pedidos
            </button>
            <button 
              onClick={() => setActiveTab("citas")}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition ${activeTab === "citas" ? "border-nutrisse-sage text-nutrisse-sage" : "border-transparent text-stone-500 hover:text-stone-700"}`}
            >
              Mis Citas
            </button>
            <button 
              onClick={() => setActiveTab("perfil")}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition ${activeTab === "perfil" ? "border-nutrisse-sage text-nutrisse-sage" : "border-transparent text-stone-500 hover:text-stone-700"}`}
            >
              Mi Perfil
            </button>
          </div>

          <div className="p-6 md:p-8 min-h-[400px]">
            {loadingData ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-4 border-nutrisse-sage border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                {/* PEDIDOS TAB */}
                {activeTab === "pedidos" && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 text-nutrisse-charcoal">Historial de Pedidos</h2>
                    {orders.length === 0 ? (
                      <p className="text-stone-500">No has realizado ningún pedido aún.</p>
                    ) : (
                      <div className="space-y-4">
                        {orders.map(order => (
                          <div key={order.id} className="border border-stone-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <p className="font-medium text-nutrisse-charcoal">Pedido #{order.id.slice(-6).toUpperCase()}</p>
                              <p className="text-sm text-stone-500">{parseOrFormatDate(order.createdAt)}</p>
                              <p className="text-sm text-stone-500 mt-1">{order.items?.length || 0} {(order.items?.length || 0) === 1 ? 'artículo' : 'artículos'}</p>
                            </div>
                            <div className="flex flex-col md:items-end gap-2">
                              <p className="font-bold">Q {(order.total || 0).toFixed(2)}</p>
                              {renderStatus(order.status)}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* CITAS TAB */}
                {activeTab === "citas" && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 text-nutrisse-charcoal">Mis Citas Programadas</h2>
                    {appointments.length === 0 ? (
                      <p className="text-stone-500">No tienes citas agendadas.</p>
                    ) : (
                      <div className="space-y-4">
                        {appointments.map(appt => (
                          <div key={appt.id} className="border border-stone-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <p className="font-medium text-nutrisse-charcoal">{appt.service}</p>
                              <p className="text-sm text-stone-500">Fecha: {appt.preferredDate} | Hora: {appt.preferredTime}</p>
                            </div>
                            <div>
                              {renderStatus(appt.status)}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* PERFIL TAB */}
                {activeTab === "perfil" && (
                  <div className="max-w-md">
                    <h2 className="text-xl font-bold mb-6 text-nutrisse-charcoal">Mis Datos Personales</h2>
                    {saveMessage && (
                      <div className={`p-3 rounded-md text-sm mb-6 ${saveMessage.includes("Error") ? "bg-red-50 text-red-500" : "bg-green-50 text-green-600"}`}>
                        {saveMessage}
                      </div>
                    )}
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-nutrisse-charcoal mb-1">Nombre Completo</label>
                        <input 
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-4 py-2 border border-stone-200 rounded-md focus:ring-2 focus:ring-nutrisse-sage focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-nutrisse-charcoal mb-1">Correo Electrónico (No editable)</label>
                        <input 
                          type="email"
                          value={profile?.email || currentUser?.email || ""}
                          disabled
                          className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-md text-stone-500 cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-nutrisse-charcoal mb-1">Teléfono</label>
                        <input 
                          type="tel"
                          value={editPhone}
                          onChange={(e) => setEditPhone(e.target.value)}
                          placeholder="+502 0000-0000"
                          className="w-full px-4 py-2 border border-stone-200 rounded-md focus:ring-2 focus:ring-nutrisse-sage focus:outline-none"
                        />
                      </div>
                      
                      <button 
                        type="submit"
                        disabled={savingProfile}
                        className="bg-nutrisse-sage text-white py-2 px-6 rounded-md hover:bg-nutrisse-sage/90 transition font-medium mt-4"
                      >
                        {savingProfile ? "Guardando..." : "Guardar Cambios"}
                      </button>
                    </form>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
