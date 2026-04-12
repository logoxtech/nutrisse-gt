"use client";

import Link from "next/link";
import { Camera, ArrowRight, ArrowDownToLine, Users, Heart, ClipboardList } from "lucide-react";

export default function LandingPage() {
  return (
    <>
      <main className="flex-grow">
        {/* 2. HERO */}
        <section className="flex flex-col md:flex-row items-center justify-between min-h-[85vh] px-4 md:px-12 py-12 gap-12 bg-nutrisse-warmWhite">
          <div className="flex-1 space-y-8 flex flex-col justify-center max-w-2xl">
            <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight text-nutrisse-charcoal">
              Transforma tu salud <br/>
              <span className="text-nutrisse-sage italic">desde adentro</span>
            </h1>
            <p className="text-lg md:text-xl text-nutrisse-charcoal/80 max-w-lg leading-relaxed">
              Nutrición funcional y personalizada para alcanzar tu bienestar real
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/agendar" className="px-8 py-4 bg-nutrisse-terracotta text-white rounded-md text-center hover:bg-nutrisse-terracotta/90 transition font-medium">
                Agenda tu primera cita
              </Link>
              <Link href="/services" className="px-8 py-4 border border-nutrisse-charcoal text-nutrisse-charcoal rounded-md text-center hover:bg-nutrisse-charcoal/5 transition font-medium">
                Conoce los servicios
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full h-[600px] relative rounded-t-full overflow-hidden bg-stone-200 flex items-center justify-center border-4 border-white shadow-xl">
             {/* // TODO: Replace placeholder with professional headshot — portrait orientation, warm background preferred */}
             <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-stone-500">
               <Camera size={48} className="mb-4 opacity-50" />
               <p className="text-sm border border-stone-300 p-4 bg-stone-100 rounded-md max-w-xs">Foto de perfil principal — retrato vertical, fondo cálido, resolución mínima 800x1000px</p>
             </div>
          </div>
        </section>

        {/* 3. ABOUT / INTRO */}
        <section className="py-24 px-4 md:px-12 bg-white">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 w-full aspect-square relative bg-stone-200 rounded-md overflow-hidden flex items-center justify-center">
              {/* // TODO: Replace with secondary headshot */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-stone-500">
                 <Camera size={48} className="mb-4 opacity-50" />
                 <p className="text-sm border border-stone-300 p-4 bg-stone-100 rounded-md max-w-xs">Retrato secundario (contexto clínica/natural) — resolución cuadrada, 800x800px</p>
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <p className="text-nutrisse-terracotta font-medium tracking-widest uppercase text-sm">Sobre mí</p>
              <h2 className="font-serif text-4xl font-bold text-nutrisse-charcoal">Hola, soy [NOMBRE]</h2>
              <p className="text-lg text-nutrisse-charcoal/70">[CREDENCIALES], me gradué de la [UNIVERSIDAD].</p>
              <p className="text-nutrisse-charcoal/80 leading-relaxed font-light">
                [BIO_TEXTO] Describe aquí brevemente tu enfoque nutricional integrativo, por qué haces lo que haces y cómo ayudas a tus pacientes a lograr resultados sostenibles sin dietas restrictivas extremas.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-nutrisse-sage font-medium hover:underline mt-4">
                Leer más sobre mí <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* 4. SERVICES */}
        <section className="py-24 px-4 md:px-12 bg-nutrisse-warmWhite">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl font-bold text-nutrisse-charcoal mb-4">Mis Servicios</h2>
              <p className="text-nutrisse-charcoal/70 max-w-2xl mx-auto">Planes personalizados y acompañamiento continuo adaptado a tus necesidades biológicas.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Service 1 */}
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition flex flex-col items-start border border-stone-100 mb-2">
                <div className="w-12 h-12 bg-nutrisse-sage/10 text-nutrisse-sage rounded-full flex items-center justify-center mb-6">
                  <Heart size={24} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">Consulta Inicial</h3>
                <p className="text-sm text-nutrisse-charcoal/70 mb-6 flex-grow">
                  [DESCRIPCION_SERVICIO] Evaluación completa de tu estado actual de salud, hábitos e historial clínico.
                </p>
                <Link href="/services" className="text-nutrisse-sage font-medium text-sm hover:underline mt-auto">Ver más</Link>
              </div>

              {/* Service 2 */}
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition flex flex-col items-start border border-stone-100 mb-2">
                <div className="w-12 h-12 bg-nutrisse-terracotta/10 text-nutrisse-terracotta rounded-full flex items-center justify-center mb-6">
                  <ClipboardList size={24} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">Plan de Alimentación</h3>
                <p className="text-sm text-nutrisse-charcoal/70 mb-6 flex-grow">
                  [DESCRIPCION_SERVICIO] Menús y recomendaciones diseñados específicamente para tus objetivos y estilo de vida.
                </p>
                <Link href="/services" className="text-nutrisse-sage font-medium text-sm hover:underline mt-auto">Ver más</Link>
              </div>

              {/* Service 3 */}
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition flex flex-col items-start border border-stone-100 mb-2">
                <div className="w-12 h-12 bg-nutrisse-sage/10 text-nutrisse-sage rounded-full flex items-center justify-center mb-6">
                  <ArrowDownToLine size={24} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">Test Epigenético</h3>
                <p className="text-sm text-nutrisse-charcoal/70 mb-6 flex-grow">
                  [DESCRIPCION_SERVICIO] Toma de muestra en clínica para analizar marcadores y optimizar tu biología.
                </p>
                <Link href="/epigenetic-test" className="text-nutrisse-sage font-medium text-sm hover:underline mt-auto">Ver más</Link>
              </div>

              {/* Service 4 */}
              <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition flex flex-col items-start border border-stone-100 mb-2">
                <div className="w-12 h-12 bg-nutrisse-terracotta/10 text-nutrisse-terracotta rounded-full flex items-center justify-center mb-6">
                  <Users size={24} />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">Seguimiento y Control</h3>
                <p className="text-sm text-nutrisse-charcoal/70 mb-6 flex-grow">
                  [DESCRIPCION_SERVICIO] Ajustes quincenales o mensuales para garantizar resultados duraderos.
                </p>
                <Link href="/services" className="text-nutrisse-sage font-medium text-sm hover:underline mt-auto">Ver más</Link>
              </div>
            </div>
          </div>
        </section>

        {/* 5. TEST EPIGENÉTICO HIGHLIGHT */}
        <section className="bg-nutrisse-terracotta text-white px-4 md:px-12 py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="font-serif text-4xl md:text-5xl font-bold">Descubre tu perfil genético</h2>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light text-balance text-center mx-auto">
              Analiza 800 marcadores epigenéticos a través de una muestra de cabello. Resultados en 1 semana para brindarte un plan de nutrición y suplementación 100% molecular y personalizado.
            </p>
            <div className="pt-4">
              <Link href="/epigenetic-test" className="inline-block px-8 py-4 bg-white text-nutrisse-terracotta rounded-md hover:bg-nutrisse-warmWhite transition font-medium">
                Saber más sobre el test
              </Link>
            </div>
          </div>
        </section>

        {/* 6. TESTIMONIALS */}
        <section className="py-24 px-4 md:px-12 bg-nutrisse-warmWhite">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl font-bold text-center text-nutrisse-charcoal mb-16">Historias de Éxito</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* // TODO: Replace with real client testimonials */}
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white p-8 rounded-lg shadow-sm border border-stone-100 flex flex-col justify-between">
                  <div className="flex gap-1 text-nutrisse-sage mb-6">
                    ★★★★★
                  </div>
                  <p className="text-stone-400 italic mb-8 flex-grow leading-relaxed">
                    &ldquo;[TESTIMONIO DEL CLIENTE] - Reemplazar con reseñas de 3 a 5 líneas sobre los resultados y la atención brindada.&rdquo;
                  </p>
                  <p className="font-medium text-nutrisse-charcoal">- [NOMBRE CLIENTE]</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. INSTAGRAM FEED */}
        <section className="py-24 px-4 md:px-12 bg-white">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-nutrisse-charcoal mb-4">Sígueme en Instagram</h2>
            <p className="text-nutrisse-charcoal/70">@nutrisse.gt</p>
          </div>
          {/* // TODO: Connect Instagram feed — use official Instagram Basic Display API or a service like Behold.so */}
          <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-stone-100 border border-stone-200 rounded-md overflow-hidden relative flex items-center justify-center">
                <div className="absolute inset-x-2 text-center text-stone-400">
                  <Camera size={24} className="mx-auto mb-2 opacity-50" />
                  <p className="text-xs">Post Instagram</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. NEWSLETTER / LEAD MAGNET */}
        <section className="py-24 px-4 md:px-12 bg-nutrisse-sage text-white">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Recibe una guía gratuita de suplementos</h2>
            <p className="text-white/80">Suscríbete a mi newsletter y recibe tips de nutrición funcional directamente en tu correo.</p>
            {/* // TODO: Connect to Mailchimp or n8n workflow for email list */}
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-4" onSubmit={(e) => { e.preventDefault(); }}>
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="flex-grow px-4 py-3 rounded-md text-nutrisse-charcoal focus:outline-none focus:ring-2 focus:ring-white/50 border-0"
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-nutrisse-charcoal text-white rounded-md hover:bg-nutrisse-charcoal/90 transition font-medium whitespace-nowrap"
              >
                Suscribirme
              </button>
            </form>
          </div>
        </section>
      </main>

    </>
  );
}
