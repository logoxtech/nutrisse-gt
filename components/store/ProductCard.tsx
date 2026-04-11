"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store/cart";
import { Camera, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images?.[0],
    });
  };

  const hasDiscount = product.comparePrice && product.comparePrice > product.price;

  return (
    <div className="group flex flex-col bg-white border border-stone-100 rounded-lg overflow-hidden hover:shadow-lg transition duration-300">
      <Link href={`/tienda/${product.slug}`} className="relative aspect-square bg-stone-100 overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <Image 
            src={product.images[0]} 
            alt={product.name} 
            fill 
            className="object-cover group-hover:scale-105 transition duration-500" 
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 p-4 text-center">
            <Camera size={32} className="mb-2 opacity-50" />
            <span className="text-xs">Imagen del producto</span>
          </div>
        )}
        
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-nutrisse-terracotta text-white text-xs font-bold px-2 py-1 rounded">
            Oferta
          </div>
        )}
      </Link>
      
      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/tienda/${product.slug}`} className="flex-grow">
          <h3 className="font-medium text-nutrisse-charcoal group-hover:text-nutrisse-sage transition line-clamp-2 mb-1">
            {product.name}
          </h3>
          <p className="text-sm text-stone-500 line-clamp-2 mb-4">
            {product.description}
          </p>
        </Link>
        
        <div className="mt-auto">
          <div className="flex items-end gap-2 mb-4">
            <span className="font-bold text-lg text-nutrisse-charcoal">Q {product.price.toFixed(2)}</span>
            {hasDiscount && (
              <span className="text-sm text-stone-400 line-through mb-0.5">Q {product.comparePrice?.toFixed(2)}</span>
            )}
          </div>
          
          {product.stock <= 5 && product.stock > 0 && (
            <p className="text-xs text-nutrisse-terracotta mb-2 font-medium">
              ¡Solo quedan {product.stock} unidades!
            </p>
          )}

          {product.stock === 0 ? (
            <button disabled className="w-full py-2 bg-stone-200 text-stone-500 rounded font-medium text-sm cursor-not-allowed">
              Agotado
            </button>
          ) : (
            <button 
              onClick={handleAddToCart}
              className="w-full py-2 flex items-center justify-center gap-2 bg-nutrisse-sage text-white rounded font-medium text-sm hover:bg-nutrisse-sage/90 transition"
            >
              <ShoppingCart size={16} /> Agregar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
