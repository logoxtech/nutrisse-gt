"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, UserCircle } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { useAuth } from "@/lib/context/AuthContext";

export default function Navbar() {
  const { items, setIsOpen } = useCartStore();
  const { currentUser, userRole } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const firstName = currentUser?.displayName?.split(" ")[0] || "Cuenta";
  const accountLink = userRole === "admin" ? "/dashboard" : "/cuenta";

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/services", label: "Servicios" },
    { href: "/epigenetic-test", label: "Test Epigenético" },
    { href: "/tienda", label: "Tienda" },
    { href: "/sobre-mi", label: "Sobre mí" },
  ];

  return (
    <>
      <header className="w-full py-4 px-4 md:px-12 flex items-center 
        justify-between bg-nutrisse-warmWhite/80 backdrop-blur-md 
        sticky top-0 z-50 border-b border-stone-200/50">

        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" 
            className="flex items-center gap-2 font-serif text-xl 
            font-bold tracking-wider text-nutrisse-sage"
            onClick={() => setMobileOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="text-nutrisse-sage fill-current">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 
                22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 
                2ZM11 19.93C7.06 19.43 4 16.05 4 12C4 7.95 7.06 
                4.57 11 4.07V19.93ZM13 4.07C16.94 4.57 20 7.95 20 
                12C20 16.05 16.94 19.43 13 19.93V4.07Z"/>
            </svg>
            NUTRISSÉ GT
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center justify-center 
          gap-8 text-sm font-medium uppercase tracking-widest 
          text-nutrisse-charcoal">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} prefetch={true}
              className="hover:text-nutrisse-sage transition">
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="flex items-center gap-4">
          
          {/* Cart */}
          <button onClick={() => setIsOpen(true)}
            className="relative text-nutrisse-charcoal 
            hover:text-nutrisse-sage transition">
            <ShoppingCart size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 
                bg-nutrisse-terracotta text-white text-[10px] 
                font-bold h-5 w-5 rounded-full flex items-center 
                justify-center">
                {itemCount}
              </span>
            )}
          </button>

          {/* Account — desktop only */}
          <div className="hidden md:flex">
            {currentUser ? (
              <Link href={accountLink}
                className="flex items-center gap-2 text-sm font-medium 
                text-nutrisse-charcoal hover:text-nutrisse-sage transition">
                <UserCircle size={20} />
                <span>{firstName}</span>
              </Link>
            ) : (
              <Link href="/login"
                className="text-sm font-medium text-nutrisse-charcoal 
                hover:text-nutrisse-sage transition">
                Iniciar Sesión
              </Link>
            )}
          </div>

          {/* Agenda CTA — desktop only */}
          <div className="hidden md:flex flex-shrink-0">
            <Link href="/agendar" prefetch={true}
              className="bg-nutrisse-sage text-white px-6 py-3 
              rounded-md hover:bg-nutrisse-sage/90 transition 
              text-sm font-medium tracking-wide">
              Agenda tu Cita
            </Link>
          </div>

          {/* Burger — mobile only */}
          <button
            className="md:hidden p-2 text-nutrisse-charcoal 
            hover:text-nutrisse-sage transition"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute top-0 right-0 h-full w-72 
            bg-nutrisse-warmWhite shadow-2xl flex flex-col">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between 
              px-6 py-5 border-b border-stone-200">
              <span className="font-serif font-bold text-nutrisse-charcoal 
                tracking-wider">NUTRISSÉ GT</span>
              <button onClick={() => setMobileOpen(false)}
                className="text-stone-500 hover:text-nutrisse-charcoal 
                transition p-1">
                <X size={22} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col px-6 py-6 gap-1 flex-grow">
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href}
                  onClick={() => setMobileOpen(false)}
                  className="text-nutrisse-charcoal font-medium py-3 
                  border-b border-stone-100 hover:text-nutrisse-sage 
                  transition text-base">
                  {label}
                </Link>
              ))}
              
              {/* Account link in mobile menu */}
              <div className="mt-4 pt-4 border-t border-stone-200">
                {currentUser ? (
                  <Link href={accountLink}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 text-nutrisse-charcoal 
                    font-medium py-3 hover:text-nutrisse-sage transition">
                    <UserCircle size={20} />
                    <span>{firstName}</span>
                  </Link>
                ) : (
                  <Link href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 text-nutrisse-charcoal 
                    font-medium py-3 hover:text-nutrisse-sage transition">
                    <UserCircle size={20} />
                    <span>Iniciar Sesión</span>
                  </Link>
                )}
              </div>
            </nav>

            {/* CTA at bottom of drawer */}
            <div className="px-6 py-6 border-t border-stone-200">
              <Link href="/agendar"
                onClick={() => setMobileOpen(false)}
                className="block w-full bg-nutrisse-sage text-white 
                text-center py-4 rounded-md hover:bg-nutrisse-sage/90 
                transition font-medium tracking-wide">
                Agenda tu Cita
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
