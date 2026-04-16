import Link from "next/link";
import { 
  Heart, Award, BookOpen, Camera, ArrowRight,
  CheckCircle, Mail, Phone
} from "lucide-react";

const Instagram = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function SobreMiPage() {
  return (
    <>
      {/* 1. HERO */}
      <section className="bg-nutrisse-warmWhite px-4 md:px-12 py-24">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row 
          items-center gap-16">
          <div className="flex-1 w-full max-w-md mx-auto lg:mx-0">
            <div className="aspect-[3/4] bg-stone-200 rounded-2xl 
              overflow-hidden flex flex-col items-center justify-center 
              text-stone-400 relative shadow-xl">
              <Camera size={48} className="mb-4 opacity-50" />
              <p className="text-sm text-center px-8 border 
                border-stone-300 p-4 rounded-md bg-stone-100 max-w-xs">
                Foto principal de la nutricionista — retrato vertical 
                profesional, fondo cálido, expresión amigable, 
                mínimo 800x1100px
              </p>
            </div>
          </div>
          <div className="flex-1 space-y-8">
            <p className="text-nutrisse-terracotta font-medium 
              tracking-widest uppercase text-sm">Sobre mí</p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold 
              leading-tight text-nutrisse-charcoal">
              Hola, soy<br/>
              <span className="text-nutrisse-sage">[NOMBRE]</span>
            </h1>
            <p className="text-xl text-nutrisse-charcoal/70 
              font-light leading-relaxed">
              [TÍTULO PROFESIONAL] especializada en nutrición funcional 
              e integrativa, con enfoque en el bienestar real y 
              sostenible de cada persona.
            </p>
            <p className="text-nutrisse-charcoal/80 leading-relaxed">
              [BIO_PÁRRAFO_1] Describe aquí en 2-3 oraciones tu historia 
              personal con la nutrición — por qué elegiste esta carrera, 
              qué te motivó a especializarte en nutrición funcional.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/agendar" 
                className="px-8 py-4 bg-nutrisse-terracotta text-white 
                rounded-md hover:bg-nutrisse-terracotta/90 transition 
                font-medium">
                Agenda una cita
              </Link>
              <Link href="/services" 
                className="px-8 py-4 border border-nutrisse-charcoal 
                text-nutrisse-charcoal rounded-md hover:bg-nutrisse-charcoal/5 
                transition font-medium">
                Ver servicios
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MY STORY */}
      <section className="py-24 px-4 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-nutrisse-terracotta font-medium 
              tracking-widest uppercase text-sm mb-4">Mi historia</p>
            <h2 className="font-serif text-4xl font-bold 
              text-nutrisse-charcoal">
              Por qué hago lo que hago
            </h2>
          </div>
          <div className="prose prose-lg max-w-none text-nutrisse-charcoal/80 
            space-y-6">
            <p className="leading-relaxed">
              [BIO_PÁRRAFO_1] Este es el espacio para contar tu historia 
              personal con la nutrición. ¿Tuviste alguna experiencia 
              propia con la salud que te llevó a este camino? ¿Qué 
              transformación viviste en carne propia?
            </p>
            <p className="leading-relaxed">
              [BIO_PÁRRAFO_2] Habla sobre tu enfoque y filosofía. 
              ¿Por qué crees en la nutrición funcional en lugar de las 
              dietas restrictivas? ¿Qué significa para ti el bienestar 
              integral? ¿Cómo defines el éxito con tus pacientes?
            </p>
            <p className="leading-relaxed">
              [BIO_PÁRRAFO_3] Cierra con tu misión personal. ¿Qué 
              quieres lograr a través de tu trabajo? ¿Cómo imaginas 
              el impacto que quieres generar en tus pacientes y en 
              la comunidad?
            </p>
          </div>
          <div className="mt-12 p-8 bg-nutrisse-warmWhite rounded-xl 
            border-l-4 border-nutrisse-sage">
            <p className="font-serif text-xl italic text-nutrisse-charcoal">
              &ldquo;[FRASE O FILOSOFÍA PERSONAL — Una cita que te 
              represente, tu mantra de trabajo o una frase que defina 
              tu enfoque con los pacientes.]&rdquo;
            </p>
            <p className="text-nutrisse-sage font-medium mt-4">
              — [NOMBRE]
            </p>
          </div>
        </div>
      </section>

      {/* 3. CREDENTIALS */}
      <section className="py-24 px-4 md:px-12 bg-nutrisse-warmWhite">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-nutrisse-terracotta font-medium 
              tracking-widest uppercase text-sm mb-4">Formación</p>
            <h2 className="font-serif text-4xl font-bold 
              text-nutrisse-charcoal">
              Preparación y credenciales
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Education */}
            <div className="bg-white rounded-xl p-8 shadow-sm 
              border border-stone-100">
              <div className="w-12 h-12 bg-nutrisse-sage/10 
                text-nutrisse-sage rounded-full flex items-center 
                justify-center mb-6">
                <BookOpen size={22} />
              </div>
              <h3 className="font-serif text-xl font-bold 
                text-nutrisse-charcoal mb-6">Educación</h3>
              <div className="space-y-5">
                <div>
                  <p className="font-medium text-nutrisse-charcoal text-sm">
                    [TÍTULO UNIVERSITARIO]
                  </p>
                  <p className="text-stone-500 text-xs mt-1">
                    [UNIVERSIDAD] — [AÑO]
                  </p>
                </div>
                <div>
                  <p className="font-medium text-nutrisse-charcoal text-sm">
                    [ESPECIALIZACIÓN O POSGRADO]
                  </p>
                  <p className="text-stone-500 text-xs mt-1">
                    [INSTITUCIÓN] — [AÑO]
                  </p>
                </div>
                <div>
                  <p className="font-medium text-nutrisse-charcoal text-sm">
                    [CERTIFICACIÓN ADICIONAL]
                  </p>
                  <p className="text-stone-500 text-xs mt-1">
                    [INSTITUCIÓN] — [AÑO]
                  </p>
                </div>
              </div>
            </div>

            {/* Specializations */}
            <div className="bg-white rounded-xl p-8 shadow-sm 
              border border-stone-100">
              <div className="w-12 h-12 bg-nutrisse-terracotta/10 
                text-nutrisse-terracotta rounded-full flex items-center 
                justify-center mb-6">
                <Award size={22} />
              </div>
              <h3 className="font-serif text-xl font-bold 
                text-nutrisse-charcoal mb-6">Especializaciones</h3>
              <div className="space-y-3">
                {[
                  "Nutrición Funcional e Integrativa",
                  "Test Epigenético y Biorresonancia",
                  "Medicina Nutricional de Precisión",
                  "Microbiota y Salud Intestinal",
                  "Nutrición Hormonal",
                  "[AGREGAR ESPECIALIZACIÓN]",
                ].map(spec => (
                  <div key={spec} className="flex items-center gap-2">
                    <CheckCircle size={14} 
                      className="text-nutrisse-sage flex-shrink-0" />
                    <span className="text-sm text-nutrisse-charcoal/80">
                      {spec}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Approach */}
            <div className="bg-white rounded-xl p-8 shadow-sm 
              border border-stone-100">
              <div className="w-12 h-12 bg-nutrisse-sage/10 
                text-nutrisse-sage rounded-full flex items-center 
                justify-center mb-6">
                <Heart size={22} />
              </div>
              <h3 className="font-serif text-xl font-bold 
                text-nutrisse-charcoal mb-6">Mi enfoque</h3>
              <div className="space-y-3">
                {[
                  "Tratamiento 100% personalizado",
                  "Sin dietas restrictivas extremas",
                  "Enfoque integrativo mente-cuerpo",
                  "Educación nutricional continua",
                  "Resultados sostenibles a largo plazo",
                  "Acompañamiento empático y cercano",
                ].map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle size={14} 
                      className="text-nutrisse-terracotta flex-shrink-0" />
                    <span className="text-sm text-nutrisse-charcoal/80">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PHOTO GALLERY PLACEHOLDER */}
      <section className="py-24 px-4 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold 
              text-nutrisse-charcoal mb-4">En la clínica</h2>
            <p className="text-nutrisse-charcoal/70">
              [GALERÍA DE FOTOS — Solicitar a la nutricionista: 
              fotos en consulta, con pacientes (con permiso), 
              del espacio de trabajo, eventos o talleres]
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Foto en consulta con paciente",
              "Foto del espacio de la clínica",
              "Foto preparando materiales",
              "Foto en evento o taller",
              "Foto casual / lifestyle",
              "Foto con equipo o colegas",
            ].map((caption, i) => (
              <div key={i} 
                className={`bg-stone-200 rounded-xl overflow-hidden flex flex-col items-center justify-center text-stone-400 ${i === 0 ? 'md:col-span-2 aspect-video' : 'aspect-square'}`}>
                <Camera size={32} className="mb-3 opacity-50" />
                <p className="text-xs text-center px-4 border border-stone-300 p-2 rounded bg-stone-100 max-w-[180px]">
                  {caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONTACT / CONNECT */}
      <section className="py-24 px-4 md:px-12 bg-nutrisse-sage text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="font-serif text-4xl font-bold">
            ¿Hablamos?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Estoy aquí para acompañarte en tu camino hacia el bienestar. 
            Si tienes preguntas o quieres saber más antes de agendar, 
            no dudes en escribirme.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto pt-4">
            <a href="https://wa.me/[NUMERO_WHATSAPP]" 
              target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 bg-white/10 rounded-xl hover:bg-white/20 transition">
              {/* TODO: Replace with real WhatsApp number */}
              <Phone size={24} />
              <span className="font-medium text-sm">WhatsApp</span>
              <span className="text-white/70 text-xs">[NÚMERO]</span>
            </a>
            <a href="mailto:[EMAIL]" 
              className="flex flex-col items-center gap-3 p-6 bg-white/10 rounded-xl hover:bg-white/20 transition">
              {/* TODO: Replace with real email */}
              <Mail size={24} />
              <span className="font-medium text-sm">Email</span>
              <span className="text-white/70 text-xs">[EMAIL]</span>
            </a>
            <a href="https://instagram.com/[USUARIO_IG]" 
              target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 bg-white/10 rounded-xl hover:bg-white/20 transition">
              {/* TODO: Replace with real Instagram handle */}
              <Instagram size={24} />
              <span className="font-medium text-sm">Instagram</span>
              <span className="text-white/70 text-xs">@[USUARIO_IG]</span>
            </a>
          </div>
          <div className="pt-4">
            <Link href="/agendar" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-nutrisse-sage rounded-md hover:bg-nutrisse-warmWhite transition font-medium">
              Agenda tu primera cita
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
