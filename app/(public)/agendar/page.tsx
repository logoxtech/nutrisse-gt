"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle, AlertTriangle, MessageCircle, CalendarClock } from "lucide-react";
import Link from "next/link";

const availableServices = [
  {
    id: "consulta-inicial",
    title: "Consulta Inicial",
    description: "Evaluación completa de tu estado actual de salud, hábitos e historial clínico.",
    price: "Consultar precio"
  },
  {
    id: "plan-alimentacion",
    title: "Plan de Alimentación",
    description: "Menús y recomendaciones diseñados específicamente para tus objetivos y estilo de vida.",
    price: "Consultar precio"
  },
  {
    id: "test-epigenetico",
    title: "Test Epigenético",
    description: "Toma de muestra en clínica para analizar marcadores y optimizar tu biología.",
    price: "Consultar precio"
  },
  {
    id: "seguimiento-control",
    title: "Seguimiento y Control",
    description: "Ajustes quincenales o mensuales para garantizar resultados duraderos.",
    price: "Consultar precio"
  }
];

const availableTimes = [
  "08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"
];

const formSchema = z.object({
  name: z.string().min(2, "Por favor ingresa tu nombre"),
  email: z.string().email("Correo electrónico inválido"),
  phone: z.string().min(8, "Por favor ingresa un teléfono válido"),
  service: z.string().min(1, "Selecciona un servicio"),
  preferredDate: z.string().min(1, "Selecciona una fecha").refine((dateStr) => {
    const [year, month, day] = dateStr.split('-');
    const d = new Date(Number(year), Number(month) - 1, Number(day));
    return d.getDay() !== 0; // 0 is Sunday
  }, "La clínica está cerrada los domingos. Por favor selecciona otro día."),
  preferredTime: z.string().min(1, "Selecciona un horario"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function AgendarPage() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Create ISO string for today to use as HTML min attribute for date picker
  const today = new Date();
  // Adjust for local timezone to prevent selecting yesterday accidentally
  const todayStr = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split('T')[0];

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    // Pre-fill user data if authenticated
    if (currentUser) {
      if (currentUser.displayName) setValue("name", currentUser.displayName);
      if (currentUser.email) setValue("email", currentUser.email);
    }
  }, [currentUser, setValue]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      // TODO PHASE 2: Replace form submission with Google Calendar API call via n8n webhook
      // The n8n flow will: check calendar availability → create event → send confirmation email → send WhatsApp to nutritionist
      // For MVP, simply write the document to Firestore
      
      const payload = {
        userId: currentUser ? currentUser.uid : null,
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        notes: data.notes || "",
        status: "pending",
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, "appointments"), payload);
      setSuccess(true);
      reset();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Hubo un error al procesar tu solicitud. Por favor intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-nutrisse-warmWhite">
        <div className="max-w-xl w-full bg-white rounded-lg shadow-sm border border-stone-100 p-12 text-center">
          <div className="w-20 h-20 bg-nutrisse-sage/10 rounded-full flex items-center justify-center mx-auto mb-6 text-nutrisse-sage">
            <CheckCircle size={40} />
          </div>
          <h1 className="font-serif text-3xl font-bold text-nutrisse-charcoal mb-4">Cita Solicitada</h1>
          <p className="text-stone-600 mb-8 text-lg leading-relaxed">
            Tu solicitud de cita fue enviada exitosamente. Te contactaremos vía WhatsApp en menos de 24 horas para confirmar la disponibilidad.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => setSuccess(false)}
              className="px-6 py-3 border border-stone-200 text-stone-600 rounded-md hover:bg-stone-50 transition font-medium"
            >
              Agendar otra cita
            </button>
            <Link 
              href={currentUser ? "/cuenta" : "/"}
              className="px-6 py-3 bg-nutrisse-sage text-white rounded-md hover:bg-nutrisse-sage/90 transition font-medium"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-nutrisse-warmWhite min-h-screen py-12 px-4 md:px-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Disclaimer Banner */}
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md p-4 flex gap-3 text-sm">
          <AlertTriangle className="flex-shrink-0 mt-0.5" size={18} />
          <p>
            <strong className="font-semibold block mb-1">Próximamente: agendamiento automático en tiempo real.</strong>
            Por ahora, nos estaremos contactando en un plazo de 24 horas para confirmar tu cita y afinar los detalles.
          </p>
        </div>

        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-nutrisse-charcoal mb-4">Agenda tu Cita</h1>
          <p className="text-stone-500 max-w-2xl mx-auto">Selecciona el servicio, el día y la hora que mejor se adapte a tu horario, y daremos inicio a tu transformación celular.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Side: Services Info */}
          <div className="lg:w-1/3 flex-shrink-0 space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-8 h-full">
               <h2 className="font-bold text-xl text-nutrisse-charcoal mb-6 flex items-center gap-2">
                 <CalendarClock size={20} className="text-nutrisse-sage"/>
                 Servicios Clínicos
               </h2>
               
               <div className="space-y-6">
                 {availableServices.map((service) => (
                   <div key={service.id} className="border-b border-stone-100 pb-6 last:border-0 last:pb-0">
                     <h3 className="font-serif text-lg font-bold text-nutrisse-charcoal mb-2">{service.title}</h3>
                     <p className="text-sm text-stone-500 mb-3">{service.description}</p>
                     <p className="inline-block bg-stone-100 text-stone-700 text-xs font-semibold px-2 py-1 rounded">
                       {service.price}
                     </p>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Right Side: Booking Form */}
          <div className="lg:w-2/3 bg-white rounded-xl shadow-sm border border-stone-100 p-8">
            <h2 className="font-bold text-xl text-nutrisse-charcoal mb-6">Detalles de la Cita</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-nutrisse-charcoal mb-1">Nombre Completo *</label>
                  <input 
                    {...register("name")}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-md focus:ring-2 focus:ring-nutrisse-sage focus:outline-none transition border-transparent hover:border-stone-200"
                    placeholder="Tu nombre"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-nutrisse-charcoal mb-1">Correo Electrónico *</label>
                  <input 
                    {...register("email")}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-md focus:ring-2 focus:ring-nutrisse-sage focus:outline-none transition border-transparent hover:border-stone-200"
                    placeholder="tu@correo.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-nutrisse-charcoal mb-1 flex items-center justify-between">
                  <span>Teléfono *</span>
                  <span className="text-xs font-normal text-nutrisse-sage flex items-center gap-1.5"><MessageCircle size={14} /> Preferente WhatsApp</span>
                </label>
                <input 
                  {...register("phone")}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-md focus:ring-2 focus:ring-nutrisse-sage focus:outline-none transition border-transparent hover:border-stone-200"
                  placeholder="+502 0000 0000"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-sm font-medium text-nutrisse-charcoal mb-1">Servicio *</label>
                <select 
                  {...register("service")}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-md focus:ring-2 focus:ring-nutrisse-sage focus:outline-none transition border-transparent hover:border-stone-200 appearance-none"
                  defaultValue=""
                >
                  <option value="" disabled>Selecciona el servicio deseado</option>
                  {availableServices.map((service) => (
                    <option key={service.id} value={service.title}>{service.title}</option>
                  ))}
                </select>
                {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-nutrisse-charcoal mb-1">Fecha Preferida *</label>
                  <input 
                    type="date"
                    min={todayStr}
                    {...register("preferredDate")}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-md focus:ring-2 focus:ring-nutrisse-sage focus:outline-none transition border-transparent hover:border-stone-200 text-nutrisse-charcoal"
                  />
                  {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate.message}</p>}
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium text-nutrisse-charcoal mb-1">Hora Preferida *</label>
                  <select 
                    {...register("preferredTime")}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-md focus:ring-2 focus:ring-nutrisse-sage focus:outline-none transition border-transparent hover:border-stone-200 appearance-none text-nutrisse-charcoal"
                    defaultValue=""
                  >
                    <option value="" disabled>Selecciona una hora</option>
                    {availableTimes.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  {errors.preferredTime && <p className="text-red-500 text-xs mt-1">{errors.preferredTime.message}</p>}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-nutrisse-charcoal mb-1">Notas Adicionales (Opcional)</label>
                <textarea 
                  {...register("notes")}
                  rows={4}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-md focus:ring-2 focus:ring-nutrisse-sage focus:outline-none transition border-transparent hover:border-stone-200 resize-none"
                  placeholder="¿Hay algún objetivo o condición específica de la que te gustaría hablar?"
                />
              </div>

              {/* Submit */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-nutrisse-charcoal text-white rounded-md hover:bg-nutrisse-charcoal/90 transition font-medium text-lg mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Procesando..." : "Solicitar Cita"}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
