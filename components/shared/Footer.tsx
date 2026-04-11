import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-nutrisse-charcoal text-white pt-16 pb-8 px-4 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-serif text-xl font-bold tracking-wider text-nutrisse-warmWhite">
            NUTRISSÉ GT
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            Nutrición integrativa y funcional en Guatemala. Transforma tu salud desde adentro con planes 100% personalizados.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-nutrisse-sage uppercase tracking-wider text-sm">Navegación</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li><Link href="/" className="hover:text-white transition">Inicio</Link></li>
            <li><Link href="/about" className="hover:text-white transition">Sobre mí</Link></li>
            <li><Link href="/services" className="hover:text-white transition">Servicios</Link></li>
            <li><Link href="/epigenetic-test" className="hover:text-white transition">Test Epigenético</Link></li>
            <li><Link href="/tienda" className="hover:text-white transition">Tienda</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-nutrisse-sage uppercase tracking-wider text-sm">Contacto</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li>Teléfono: [TELEFONO]</li>
            <li>Email: [EMAIL]</li>
            <li>Clínica: [CLINICA_UBICACION]</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-nutrisse-sage uppercase tracking-wider text-sm">Legal & Tienda</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li><Link href="/terms" className="hover:text-white transition">Términos y Condiciones</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition">Políticas de Privacidad</Link></li>
            <li><Link href="/faq" className="hover:text-white transition">Preguntas Frecuentes</Link></li>
            <li><Link href="/login" className="hover:text-white transition">Iniciar Sesión / Portal</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
        <p>&copy; {new Date().getFullYear()} Nutrissé GT. Todos los derechos reservados.</p>
        <div className="flex gap-4">
           <span className="hover:text-white cursor-pointer transition">IG</span>
           <span className="hover:text-white cursor-pointer transition">FB</span>
           <span className="hover:text-white cursor-pointer transition">WA</span>
        </div>
      </div>
    </footer>
  );
}
