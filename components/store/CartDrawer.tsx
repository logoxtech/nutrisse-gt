"use client";

import { useCartStore } from "@/lib/store/cart";
import { useAuth } from "@/lib/context/AuthContext";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem } = useCartStore();
  const { user } = useAuth();
  const router = useRouter();
  
  // Hydration safeguard for Zustand and mounting
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  if (!mounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsOpen(false)}
      />
      
      {/* Drawer */}
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col relative z-10 animate-in slide-in-from-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-200">
          <h2 className="font-serif text-2xl font-bold text-nutrisse-charcoal">Tu Carrito</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-stone-100 rounded-full transition"
          >
            <X size={24} className="text-stone-500" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-grow overflow-y-auto p-4 space-y-6">
          {items.length === 0 ? (
            <div className="text-center text-stone-500 mt-12">
              Tu carrito está vacío.
            </div>
          ) : (
            items.map((item) => (
              <div key={item.productId} className="flex gap-4">
                <div className="w-20 h-20 bg-stone-100 rounded-md overflow-hidden relative">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-stone-300">
                      IMG
                    </div>
                  )}
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-nutrisse-charcoal text-sm line-clamp-2">{item.name}</h3>
                    <p className="text-nutrisse-sage font-bold mt-1">Q {item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-stone-200 rounded-sm">
                      <button 
                        onClick={() => item.quantity > 1 ? updateQuantity(item.productId, item.quantity - 1) : removeItem(item.productId)}
                        className="px-2 py-1 text-stone-500 hover:bg-stone-50 transition"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-2 py-1 text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="px-2 py-1 text-stone-500 hover:bg-stone-50 transition"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.productId)}
                      className="text-stone-400 hover:text-red-500 transition p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-stone-500">Subtotal</span>
              <span className="font-bold text-lg text-nutrisse-charcoal">Q {subtotal.toFixed(2)}</span>
            </div>
            
            {user ? (
               <button 
                 onClick={() => {
                   setIsOpen(false);
                   router.push('/checkout');
                 }}
                 className="w-full py-4 bg-nutrisse-charcoal text-white rounded-md hover:bg-nutrisse-charcoal/90 transition font-medium"
               >
                 Proceder al pago
               </button>
            ) : (
               <button 
                 onClick={() => {
                   setIsOpen(false);
                   router.push('/login?redirect=/checkout');
                 }}
                 className="w-full py-4 bg-nutrisse-terracotta text-white rounded-md hover:bg-nutrisse-terracotta/90 transition font-medium"
               >
                 Inicia sesión para comprar
               </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
