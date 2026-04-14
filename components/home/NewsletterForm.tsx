"use client";

export default function NewsletterForm() {
  return (
    <form 
      className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-4" 
      onSubmit={(e) => { e.preventDefault(); }}
    >
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
  );
}
