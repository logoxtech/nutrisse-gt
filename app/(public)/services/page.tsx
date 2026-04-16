import Link from "next/link";
import { Calendar, ClipboardList, FileText, TrendingUp, Camera, Check } from "lucide-react";
import FaqAccordion from "@/components/public/FaqAccordion";

export const metadata = {
  title: "Servicios | Nutrissé GT",
  description: "Servicios de nutrición personalizados y test epigenético para mejorar tu salud.",
};

const faqs = [
  {
    question: "¿Las consultas son presenciales o virtuales?",
    answer: "[COMPLETAR] Ofrezco consultas tanto presenciales en [CLINICA_UBICACION] como virtuales vía videollamada. Puedes elegir la modalidad que mejor se adapte a tu situación.",
  },
  {
    question: "¿Cuánto tiempo tarda en verse resultados?",
    answer: "[COMPLETAR] Los primeros cambios suelen notarse en las primeras 2-4 semanas. Sin embargo, los resultados más significativos y sostenibles se alcanzan entre los 2 y 3 meses de seguimiento constante.",
  },
  {
    question: "¿Necesito tener el test epigenético para comenzar?",
    answer: "No es obligatorio, pero sí altamente recomendado. El test nos permite diseñar un plan mucho más preciso desde el primer día. Puedes comenzar con una consulta inicial y agregar el test posteriormente.",
  },
  {
    question: "¿Qué incluye el precio de la consulta?",
    answer: "[COMPLETAR CON PRECIOS REALES] Cada consulta incluye [DETALLE]. Los precios están disponibles directamente por WhatsApp o al momento de agendar.",
  },
  {
    question: "¿Trabajan con seguros médicos?",
    answer: "[COMPLETAR] Actualmente [SI/NO] trabajamos con seguros médicos. Para más información sobre formas de pago disponibles, contáctanos directamente.",
  }
];

const services = [
  {
    id: "01",
    name: "Consulta Inicial",
    badge: "60-90 minutos | Presencial",
    description: "La consulta inicial es el punto de partida de tu transformación. Realizamos una evaluación completa de tu estado de salud actual, historial clínico, hábitos alimenticios, nivel de actividad física y objetivos personales.",
    includes: [
      "Evaluación completa del estado nutricional",
      "Análisis de composición corporal",
      "Revisión de historial clínico y hábitos",
      "Identificación de deficiencias y áreas de mejora",
      "Plan de acción inicial personalizado",
    ],
    priceText: "[CONSULTAR PRECIO]",
    isPopular: false,
    imgNote: "Foto de consulta médica — nutricionista con paciente en ambiente clínico cálido, luz natural"
  },
  {
    id: "02",
    name: "Plan de Alimentación Personalizado",
    badge: "Entrega en 48-72 horas | Digital",
    description: "Un plan de alimentación no es una dieta restrictiva. Es una guía práctica y flexible diseñada específicamente para tu biología, preferencias y rutina diaria, con el objetivo de lograr cambios sostenibles y duraderos.",
    includes: [
      "Menú semanal personalizado",
      "Lista de compras optimizada",
      "Guía de preparación de alimentos",
      "Sustituciones y alternativas prácticas",
      "Seguimiento de adherencia al plan",
    ],
    priceText: "Desde Q [PRECIO]",
    isPopular: false,
    imgNote: "Foto de alimentos saludables coloridos — bowl con frutas, verduras, granos — luz natural cenital"
  },
  {
    id: "03",
    name: "Test Epigenético",
    badge: "Resultados en 7 días | Muestra de cabello",
    description: "El test epigenético analiza 800 marcadores en tu muestra de cabello para identificar deficiencias de vitaminas, minerales, aminoácidos y ácidos grasos. Una tecnología de vanguardia que permite diseñar un plan 100% molecular y personalizado.",
    includes: [
      "Toma de muestra en clínica (5 hebras de cabello)",
      "Análisis de 800 marcadores epigenéticos",
      "Informe detallado de indicadores nutricionales",
      "Plan de alimentación basado en resultados",
      "Plan de suplementación de precisión",
      "Sesión de interpretación de resultados (30 min)"
    ],
    priceText: "[CONSULTAR PRECIO]",
    isPopular: true,
    imgNote: "Foto del kit de muestra epigenética o laboratorio moderno — fondo neutro, iluminación profesional"
  },
  {
    id: "04",
    name: "Seguimiento y Control",
    badge: "Quincenal o mensual | Presencial o virtual",
    description: "El seguimiento es donde ocurre la verdadera transformación. Las consultas de control nos permiten ajustar el plan según tu evolución, resolver dudas y mantenerte motivado en el camino hacia tus objetivos.",
    includes: [
      "Revisión de progreso y métricas",
      "Ajuste del plan de alimentación",
      "Evaluación de adherencia y obstáculos",
      "Actualización de objetivos",
      "Soporte continuo entre consultas"
    ],
    priceText: "[CONSULTAR PRECIO]",
    isPopular: false,
    imgNote: "Foto de seguimiento — persona revisando app de salud o diario de alimentación, ambiente positivo"
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-nutrisse-warmWhite selection:bg-nutrisse-sage selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="bg-nutrisse-charcoal pt-32 pb-24 md:pt-40 md:pb-32 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="inline-block text-nutrisse-sage font-medium tracking-[0.2em] uppercase text-sm mb-6">
            Servicios
          </p>
          <h1 className="text-white font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
            Soluciones personalizadas para tu bienestar
          </h1>
          <p className="text-stone-300 md:text-lg lg:text-xl md:px-12 mb-10 leading-relaxed font-light">
            Cada persona es única. Por eso cada plan de nutrición está diseñado desde cero, basado en tu biología, tus objetivos y tu estilo de vida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/agendar" className="inline-block bg-white text-nutrisse-charcoal px-8 py-4 rounded-md font-medium tracking-wide hover:bg-stone-100 transition-colors shadow-lg hover:shadow-xl">
              Agenda tu primera cita
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SERVICES DETAIL SECTION */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-6xl mx-auto space-y-24 md:space-y-32">
          {services.map((service, index) => {
            const isEven = index % 2 === 1;
            return (
              <div key={service.id} className={`flex flex-col ${isEven ? "md:flex-row-reverse" : "md:flex-row"} gap-12 lg:gap-20 items-center`}>
                
                {/* Content Side */}
                <div className="w-full md:w-1/2">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl font-serif text-nutrisse-sage/30 font-bold">{service.id}</span>
                    {service.isPopular && (
                      <span className="bg-nutrisse-terracotta text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Más popular
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-3xl lg:text-4xl font-serif font-bold text-nutrisse-charcoal mb-4">
                    {service.name}
                  </h2>
                  
                  <div className="inline-block bg-stone-100 px-4 py-2 rounded-md mb-6">
                    <span className="text-sm font-medium text-stone-600">{service.badge}</span>
                  </div>
                  
                  <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="mb-8 bg-white p-6 rounded-lg border border-stone-200">
                    <h3 className="font-bold text-nutrisse-charcoal mb-4">¿Qué incluye?</h3>
                    <ul className="space-y-3">
                      {service.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="text-nutrisse-sage flex-shrink-0 mt-0.5" size={20} />
                          <span className="text-stone-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <span className="text-xl font-medium text-nutrisse-charcoal">{service.priceText}</span>
                    <Link href="/agendar" className="w-full sm:w-auto inline-block bg-nutrisse-sage text-white text-center px-8 py-3 rounded-md hover:bg-nutrisse-sage/90 transition shadow-md hover:shadow-lg font-medium">
                      Agendar esta consulta
                    </Link>
                  </div>
                </div>

                {/* Image Placeholder Side */}
                <div className="w-full md:w-1/2 aspect-square md:aspect-[4/5] bg-stone-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-stone-300 relative overflow-hidden group">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm text-stone-400">
                    <Camera size={32} />
                  </div>
                  <span className="text-nutrisse-sage font-bold tracking-widest text-sm mb-4 uppercase">[PLACEHOLDER FOTO]</span>
                  <p className="text-stone-500 max-w-sm">
                    {service.imgNote}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="bg-white py-20 px-4 border-y border-stone-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-nutrisse-charcoal mb-4">¿Cómo funciona?</h2>
            <p className="text-stone-500 text-lg">Un proceso simple en 4 pasos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
            {/* Horizontal Line logic (desktop) */}
            <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-0.5 bg-stone-100 z-0"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-nutrisse-warmWhite border-2 border-nutrisse-sage rounded-full flex items-center justify-center mb-6 shadow-sm text-nutrisse-sage">
                <Calendar size={24} />
              </div>
              <h3 className="font-bold text-nutrisse-charcoal mb-2">1. Agenda tu cita</h3>
              <p className="text-sm text-stone-500 px-2 lg:px-4 leading-relaxed">Selecciona el servicio que necesitas y elige el horario que mejor se adapte a tu agenda.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
               <div className="w-14 h-14 bg-nutrisse-warmWhite border-2 border-nutrisse-sage rounded-full flex items-center justify-center mb-6 shadow-sm text-nutrisse-sage">
                <ClipboardList size={24} />
              </div>
              <h3 className="font-bold text-nutrisse-charcoal mb-2">2. Primera consulta</h3>
              <p className="text-sm text-stone-500 px-2 lg:px-4 leading-relaxed">Realizamos una evaluación completa de tu estado actual, historial y objetivos de salud.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
               <div className="w-14 h-14 bg-nutrisse-warmWhite border-2 border-nutrisse-sage rounded-full flex items-center justify-center mb-6 shadow-sm text-nutrisse-sage">
                <FileText size={24} />
              </div>
              <h3 className="font-bold text-nutrisse-charcoal mb-2">3. Tu plan</h3>
              <p className="text-sm text-stone-500 px-2 lg:px-4 leading-relaxed">Recibes un plan 100% diseñado para ti, basado en tu biología y estilo de vida.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
               <div className="w-14 h-14 bg-nutrisse-warmWhite border-2 border-nutrisse-terracotta rounded-full flex items-center justify-center mb-6 shadow-sm text-nutrisse-terracotta">
                <TrendingUp size={24} />
              </div>
              <h3 className="font-bold text-nutrisse-charcoal mb-2">4. Seguimiento</h3>
              <p className="text-sm text-stone-500 px-2 lg:px-4 leading-relaxed">Ajustamos el plan según tu evolución para garantizar resultados sostenibles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRICING / FAQ SECTION */}
      <section className="py-24 px-4 bg-nutrisse-warmWhite">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-nutrisse-charcoal mb-4">Preguntas Frecuentes</h2>
          <div className="w-12 h-1 bg-nutrisse-sage mx-auto rounded-full"></div>
        </div>
        <FaqAccordion faqs={faqs} />
      </section>

      {/* 5. FINAL CTA SECTION */}
      <section className="bg-nutrisse-sage py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6 leading-tight">
            ¿Lista para empezar tu transformación?
          </h2>
          <p className="text-white/90 text-lg md:text-xl font-light mb-10 max-w-xl mx-auto">
            Agenda hoy y da el primer paso hacia una versión más saludable de ti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/agendar" className="w-full sm:w-auto inline-block bg-white text-nutrisse-charcoal px-8 py-4 rounded-md font-medium hover:bg-stone-100 transition shadow-lg">
              Agendar mi primera cita
            </Link>
            <Link href="/epigenetic-test" className="w-full sm:w-auto inline-block bg-transparent text-white border border-white px-8 py-4 rounded-md font-medium hover:bg-white/10 transition">
              Ver el Test Epigenético
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
