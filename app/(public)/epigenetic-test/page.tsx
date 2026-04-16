import Link from "next/link";
import FaqAccordion from "@/components/public/FaqAccordion";
import { 
  Calendar, Scissors, FlaskConical, FileText,
  CheckCircle, TrendingUp, Shield, Moon, 
  Droplets, UtensilsCrossed, Activity, Leaf,
  Apple, Camera
} from "lucide-react";

export default function EpigeneticTestPage() {
  return (
    <>
      {/* 1. HERO */}
      <section className="bg-gradient-to-br from-stone-900 to-stone-800 
        text-white px-4 md:px-12 py-24">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row 
          items-center gap-16">
          <div className="flex-1 space-y-8">
            <p className="text-nutrisse-sage font-medium tracking-widest 
              uppercase text-sm">Test Epigenético</p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold 
              leading-tight">
              Descubre lo que tu biología quiere decirte
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-xl">
              Analiza 800 marcadores epigenéticos a través de una simple 
              muestra de cabello. Ciencia de precisión para un plan de 
              nutrición 100% personalizado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/agendar" 
                className="px-8 py-4 bg-nutrisse-terracotta text-white 
                rounded-md text-center hover:bg-nutrisse-terracotta/90 
                transition font-medium">
                Agendar el Test
              </Link>
              <a href="#como-funciona" 
                className="px-8 py-4 border border-white/40 text-white 
                rounded-md text-center hover:bg-white/10 transition 
                font-medium">
                ¿Cómo funciona?
              </a>
            </div>
          </div>
          <div className="flex-1 w-full h-80 bg-stone-700 rounded-xl 
            flex flex-col items-center justify-center text-stone-400 
            border border-stone-600">
            <Camera size={48} className="mb-4 opacity-50" />
            <p className="text-sm text-center px-8 border border-stone-600 
              p-4 rounded-md bg-stone-800 max-w-xs">
              Imagen del kit de muestra epigenética o laboratorio moderno 
              — fondo oscuro neutro, iluminación de estudio, 800x600px
            </p>
          </div>
        </div>
      </section>

      {/* 2. WHAT IS EPIGENETICS */}
      <section className="py-24 px-4 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row 
          items-center gap-16">
          <div className="flex-1 space-y-6">
            <p className="text-nutrisse-terracotta font-medium 
              tracking-widest uppercase text-sm">La ciencia detrás</p>
            <h2 className="font-serif text-4xl font-bold 
              text-nutrisse-charcoal">
              ¿Qué es la Epigenética?
            </h2>
            <p className="text-nutrisse-charcoal/80 leading-relaxed">
              La epigenética es la ciencia que estudia cómo el estilo 
              de vida, la alimentación, el entorno y el comportamiento 
              pueden modificar la expresión de tus genes — sin alterar 
              el ADN en sí mismo.
            </p>
            <p className="text-nutrisse-charcoal/80 leading-relaxed">
              A diferencia de la genética tradicional, las modificaciones 
              epigenéticas son dinámicas y potencialmente reversibles. 
              Esto significa que tienes el poder de influir en cómo se 
              expresan tus genes a través de decisiones conscientes sobre 
              tu alimentación, suplementación y hábitos de vida.
            </p>
            <p className="text-nutrisse-charcoal/80 leading-relaxed">
              El test epigenético traduce esta ciencia en información 
              práctica y accionable, diseñada específicamente para 
              tu biología única.
            </p>
          </div>
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {[
                { number: "800+", label: "Marcadores analizados" },
                { number: "7 días", label: "Para recibir resultados" },
                { number: "90 días", label: "Para ver cambios positivos" },
              ].map(({ number, label }) => (
                <div key={label} className="bg-white rounded-xl p-6 
                  shadow-sm border-t-4 border-nutrisse-sage text-center">
                  <p className="font-serif text-3xl font-bold 
                    text-nutrisse-charcoal mb-2">{number}</p>
                  <p className="text-xs text-stone-500">{label}</p>
                </div>
              ))}
            </div>
            <div className="w-full h-64 bg-stone-200 rounded-xl 
              flex flex-col items-center justify-center text-stone-400">
              <Camera size={40} className="mb-3 opacity-50" />
              <p className="text-xs text-center px-6 border 
                border-stone-300 p-3 rounded bg-stone-100 max-w-xs">
                Ilustración científica de ADN/epigenética — estilo 
                moderno, colores del sitio, 600x400px
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section id="como-funciona" 
        className="py-24 px-4 md:px-12 bg-nutrisse-warmWhite">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold 
              text-nutrisse-charcoal mb-4">¿Cómo funciona el test?</h2>
            <p className="text-nutrisse-charcoal/70 max-w-2xl mx-auto">
              Un proceso simple de 4 pasos para obtener tu perfil 
              epigenético completo.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 
            gap-8">
            {[
              {
                step: "01",
                icon: Calendar,
                color: "bg-nutrisse-sage/10 text-nutrisse-sage",
                title: "Agenda tu cita",
                desc: "Reserva tu cita para la toma de muestra en nuestra clínica. El proceso completo toma entre 10 y 15 minutos."
              },
              {
                step: "02",
                icon: Scissors,
                color: "bg-nutrisse-terracotta/10 text-nutrisse-terracotta",
                title: "Toma de muestra",
                desc: "Se extraen 5 hebras de cabello con el bulbo piloso de la zona occipital. Un proceso completamente indoloro y rápido."
              },
              {
                step: "03",
                icon: FlaskConical,
                color: "bg-nutrisse-sage/10 text-nutrisse-sage",
                title: "Análisis en laboratorio",
                desc: "La muestra es procesada en laboratorios certificados en Alemania usando tecnología de biorresonancia de última generación."
              },
              {
                step: "04",
                icon: FileText,
                color: "bg-nutrisse-terracotta/10 text-nutrisse-terracotta",
                title: "Tu informe personalizado",
                desc: "En 7 días recibes tu informe completo con sesión de interpretación y tu plan de nutrición y suplementación."
              },
            ].map(({ step, icon: Icon, color, title, desc }) => (
              <div key={step} className="bg-white rounded-xl p-8 
                shadow-sm border border-stone-100 relative">
                <span className="absolute top-4 right-4 font-serif 
                  text-5xl font-bold text-stone-100">{step}</span>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${color}`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-serif text-xl font-bold 
                  text-nutrisse-charcoal mb-3">{title}</h3>
                <p className="text-sm text-nutrisse-charcoal/70 
                  leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT DOES IT ANALYZE */}
      <section className="py-24 px-4 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold 
              text-nutrisse-charcoal mb-4">¿Qué analiza el test?</h2>
            <p className="text-nutrisse-charcoal/70 max-w-2xl mx-auto">
              800 marcadores organizados en 4 categorías principales
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Card 1 */}
            <div className="bg-nutrisse-warmWhite rounded-xl p-8 
              border border-stone-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-nutrisse-sage/10 
                  text-nutrisse-sage rounded-full flex items-center 
                  justify-center">
                  <Apple size={22} />
                </div>
                <h3 className="font-serif text-xl font-bold 
                  text-nutrisse-charcoal">Indicadores Nutricionales</h3>
              </div>
              <p className="text-sm text-nutrisse-charcoal/70 mb-6">
                Identifica deficiencias y excesos en los nutrientes 
                esenciales que regulan tu metabolismo y función celular.
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs 
                text-stone-600">
                <div>
                  <p className="font-semibold text-nutrisse-charcoal 
                    mb-2">Vitaminas</p>
                  <p>A, B1, B2, B3, B5, B6, B9, B12, C, D3, E, K, 
                    K1, K2, Biotina, Inositol, Betaína</p>
                </div>
                <div>
                  <p className="font-semibold text-nutrisse-charcoal 
                    mb-2">Minerales</p>
                  <p>Calcio, Magnesio, Zinc, Hierro, Selenio, Yodo, 
                    Cobre, Potasio, Sodio, Fósforo + más</p>
                </div>
                <div>
                  <p className="font-semibold text-nutrisse-charcoal 
                    mb-2">Aminoácidos</p>
                  <p>Glutamina, Lisina, Triptófano, Valina, Leucina, 
                    Carnitina, Taurina + más</p>
                </div>
                <div>
                  <p className="font-semibold text-nutrisse-charcoal 
                    mb-2">Ácidos Grasos</p>
                  <p>Omega 3 (EPA, DHA, ALA), Omega 6 (GLA, AA), 
                    Omega 9, Antioxidantes</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-nutrisse-warmWhite rounded-xl p-8 
              border border-stone-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-nutrisse-terracotta/10 
                  text-nutrisse-terracotta rounded-full flex items-center 
                  justify-center">
                  <Activity size={22} />
                </div>
                <h3 className="font-serif text-xl font-bold 
                  text-nutrisse-charcoal">Sistemas Metabólicos</h3>
              </div>
              <p className="text-sm text-nutrisse-charcoal/70 mb-6">
                Evalúa el equilibrio de los principales sistemas del 
                organismo para detectar desequilibrios antes de que 
                se conviertan en síntomas.
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  "Sistema Cardiovascular",
                  "Sistema Intestinal",
                  "Sistema Inmunológico",
                  "Sistema Adrenal",
                  "Sistema Hormonal",
                  "Sistema de Desintoxicación",
                  "Sistema Músculo-Esquelético",
                  "Estrés Metabólico e Inflamación",
                ].map(system => (
                  <div key={system} className="flex items-center gap-2">
                    <CheckCircle size={14} 
                      className="text-nutrisse-sage flex-shrink-0" />
                    <span className="text-xs text-stone-600">
                      {system}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-nutrisse-warmWhite rounded-xl p-8 
              border border-stone-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-nutrisse-sage/10 
                  text-nutrisse-sage rounded-full flex items-center 
                  justify-center">
                  <Leaf size={22} />
                </div>
                <h3 className="font-serif text-xl font-bold 
                  text-nutrisse-charcoal">Factores Ambientales</h3>
              </div>
              <p className="text-sm text-nutrisse-charcoal/70 mb-6">
                Detecta la exposición a toxinas ambientales y 
                radiaciones que pueden estar interfiriendo con 
                tu bienestar.
              </p>
              <div className="space-y-3">
                {[
                  "Metales pesados (mercurio, plomo, cadmio, arsénico)",
                  "Hidrocarburos y químicos industriales",
                  "Pesticidas y herbicidas",
                  "Radiaciones electromagnéticas",
                  "Aditivos alimentarios",
                  "Disruptores endocrinos",
                ].map(item => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle size={14} 
                      className="text-nutrisse-sage flex-shrink-0 mt-0.5"/>
                    <span className="text-xs text-stone-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-nutrisse-warmWhite rounded-xl p-8 
              border border-stone-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-nutrisse-terracotta/10 
                  text-nutrisse-terracotta rounded-full flex items-center 
                  justify-center">
                  <FlaskConical size={22} />
                </div>
                <h3 className="font-serif text-xl font-bold 
                  text-nutrisse-charcoal">Indicadores de Microbioma</h3>
              </div>
              <p className="text-sm text-nutrisse-charcoal/70 mb-6">
                Identifica desequilibrios en la microbiota intestinal 
                que afectan la absorción de nutrientes, la inmunidad 
                y el estado de ánimo.
              </p>
              <div className="space-y-3">
                {[
                  "Presencia de bacterias patógenas",
                  "Hongos y cándida",
                  "Señal viral y post-viral",
                  "Parásitos intestinales",
                  "Esporas ambientales",
                  "Permeabilidad intestinal",
                ].map(item => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle size={14} 
                      className="text-nutrisse-terracotta flex-shrink-0 mt-0.5"/>
                    <span className="text-xs text-stone-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BENEFITS */}
      <section className="py-24 px-4 md:px-12 bg-nutrisse-charcoal 
        text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold mb-4">
              ¿Qué obtienes con el test?
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Un plan completo y personalizado basado en tu biología única.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
            gap-6">
            {[
              {
                icon: UtensilsCrossed,
                title: "Plan de Alimentación Molecular",
                desc: "Menú personalizado basado exactamente en los nutrientes que tu cuerpo necesita según tus deficiencias identificadas."
              },
              {
                icon: FlaskConical,
                title: "Suplementación de Precisión",
                desc: "Protocolo de suplementos diseñado para corregir deficiencias específicas, sin suplementos innecesarios ni genéricos."
              },
              {
                icon: Droplets,
                title: "Estrategias de Desintoxicación",
                desc: "Plan de desintoxicación personalizado según los tóxicos detectados en tu organismo."
              },
              {
                icon: Moon,
                title: "Optimización del Sueño y Energía",
                desc: "Recomendaciones específicas para mejorar calidad de sueño, niveles de energía y manejo del estrés."
              },
              {
                icon: Shield,
                title: "Prevención Proactiva",
                desc: "Identifica riesgos antes de que aparezcan síntomas, permitiendo una intervención temprana y efectiva."
              },
              {
                icon: TrendingUp,
                title: "Seguimiento a 90 días",
                desc: "Acompañamiento para implementar cambios y evaluar mejoras en los marcadores a los 90 días."
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} 
                className="border border-white/10 rounded-xl p-6 hover:bg-white/5 transition">
                <div className="w-10 h-10 bg-nutrisse-sage/20 text-nutrisse-sage rounded-full flex items-center justify-center mb-4">
                  <Icon size={18} />
                </div>
                <h3 className="font-serif text-lg font-bold mb-2">
                  {title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FOR WHOM + FAQ */}
      <section className="py-24 px-4 md:px-12 bg-nutrisse-warmWhite">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-serif text-3xl font-bold 
              text-nutrisse-charcoal mb-8">
              ¿Para quién es el Test Epigenético?
            </h2>
            <div className="space-y-4">
              {[
                "Sientes fatiga crónica o falta de energía sin causa aparente",
                "Tienes digestión lenta, hinchazón o malestar intestinal frecuente",
                "No logras perder peso a pesar de comer bien y hacer ejercicio",
                "Sufres de alergias, intolerancias o sensibilidades alimentarias",
                "Tienes niveles hormonales alterados o irregularidades menstruales",
                "Presentas niebla mental, dificultad de concentración o memoria",
                "Quieres optimizar tu rendimiento deportivo o cognitivo",
                "Buscas prevención proactiva y medicina personalizada",
                "Has probado múltiples dietas sin resultados sostenibles",
              ].map(item => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-nutrisse-sage flex-shrink-0 mt-0.5" />
                  <p className="text-nutrisse-charcoal/80 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-serif text-3xl font-bold text-nutrisse-charcoal mb-8">Preguntas Frecuentes</h2>
            <FaqAccordion faqs={[
              {
                question: "¿El test epigenético analiza mi ADN?",
                answer: "No. El test analiza marcadores de biorresonancia en la muestra de cabello, que refleja el estado funcional actual de tu organismo. No es un test genético ni expone tu información genética."
              },
              {
                question: "¿Cuánto cabello se necesita?",
                answer: "Solo 5 hebras de cabello con el bulbo piloso (la raíz blanca al final). La toma de muestra es completamente indolora y toma menos de 2 minutos."
              },
              {
                question: "¿Cada cuánto se recomienda hacer el test?",
                answer: "Se recomienda repetir el test cada 90 días durante el primer año para evaluar la respuesta al plan nutricional y ajustar el protocolo."
              },
              {
                question: "¿Los resultados son válidos para todas las edades?",
                answer: "Sí, el test es adecuado para adultos de cualquier edad. Para menores de edad se requiere autorización del tutor. No se recomienda durante el embarazo."
              },
              {
                question: "¿Cuánto tiempo tarda en llegar el informe?",
                answer: "Los resultados están disponibles en aproximadamente 7 días hábiles desde la recepción de la muestra en los laboratorios de Alemania."
              },
            ]} />
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-24 px-4 md:px-12 bg-nutrisse-terracotta text-white">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-serif text-4xl md:text-5xl font-bold">
            Empieza a entender tu biología hoy
          </h2>
          <p className="text-white/90 text-lg">
            El test epigenético es el primer paso hacia una nutrición verdaderamente personalizada.
          </p>
          <p className="text-white/80 text-sm">
            Inversión: Q [PRECIO] — incluye sesión de interpretación de resultados
            <br/>
            <span className="text-white/60 text-xs">
              * Precio sujeto a confirmación. Consulta disponibilidad.
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/agendar" 
              className="px-8 py-4 bg-white text-nutrisse-terracotta rounded-md hover:bg-nutrisse-warmWhite transition font-medium text-center">
              Agendar mi Test
            </Link>
            <a href="https://wa.me/[NUMERO_WHATSAPP]" 
              target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-white text-white rounded-md hover:bg-white/10 transition font-medium text-center">
              {/* TODO: Replace [NUMERO_WHATSAPP] with real number */}
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
