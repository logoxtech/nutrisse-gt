"use client";

import Link from "next/link";
import { ShoppingCart, Menu, UserCircle } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { useAuth } from "@/lib/context/AuthContext";

export default function Navbar() {
  const { items, setIsOpen } = useCartStore();
  const { currentUser, userRole } = useAuth();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const firstName = currentUser?.displayName?.split(" ")[0] || "Cuenta";
  const accountLink = userRole === "admin" ? "/dashboard" : "/cuenta";

  return (
    <header className="w-full py-6 px-4 md:px-12 flex items-center justify-between bg-nutrisse-warmWhite/80 backdrop-blur-md sticky top-0 z-50 border-b border-stone-200/50">
      <div className="flex-shrink-0 flex items-center">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold tracking-wider text-nutrisse-sage">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-nutrisse-sage fill-current">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.06 19.43 4 16.05 4 12C4 7.95 7.06 4.57 11 4.07V19.93ZM13 4.07C16.94 4.57 20 7.95 20 12C20 16.05 16.94 19.43 13 19.93V4.07Z"/>
          </svg>
          NUTRISSÉ GT
        </Link>
      </div>
      
      <nav className="hidden md:flex align-middle justify-center gap-8 text-sm font-medium uppercase tracking-widest text-nutrisse-charcoal">
        <Link href="/" className="hover:text-nutrisse-sage transition">Inicio</Link>
        <Link href="/services" className="hover:text-nutrisse-sage transition">Servicios</Link>
        <Link href="/epigenetic-test" className="hover:text-nutrisse-sage transition">Test Epigenético</Link>
        <Link href="/tienda" className="hover:text-nutrisse-sage transition">Tienda</Link>
        <Link href="/about" className="hover:text-nutrisse-sage transition">Sobre mí</Link>
      </nav>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsOpen(true)}
          className="relative text-nutrisse-charcoal hover:text-nutrisse-sage transition"
        >
          <ShoppingCart size={24} />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-nutrisse-terracotta text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>

        {/* Account / Login */}
        <div className="hidden md:flex">
          {currentUser ? (
            <Link 
              href={accountLink}
              className="flex items-center gap-2 text-sm font-medium text-nutrisse-charcoal hover:text-nutrisse-sage transition"
            >
              <UserCircle size={20} />
              <span>{firstName}</span>
            </Link>
          ) : (
            <Link 
              href="/login"
              className="text-sm font-medium text-nutrisse-charcoal hover:text-nutrisse-sage transition"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
        
        <div className="hidden md:flex flex-shrink-0">
          <Link href="/agendar" className="bg-nutrisse-sage text-white px-6 py-3 rounded-md hover:bg-nutrisse-sage/90 transition text-sm font-medium tracking-wide">
            Agenda tu Cita
          </Link>
        </div>
        
        <button className="md:hidden p-2 text-nutrisse-charcoal">
          <Menu size={24} />
        </button>
      </div>
    </header>

  );
}
