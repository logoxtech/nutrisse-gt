"use client";

import { useEffect, useState } from "react";
import { getProductBySlug } from "@/lib/firestore";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store/cart";
import { Camera, ChevronRight, Minus, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const { addItem } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProductBySlug(params.slug);
        setProduct(data);
        if (data && data.images && data.images.length > 0) {
          setMainImage(data.images[0]);
        }
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 animate-pulse">
         <div className="h-4 bg-stone-200 rounded w-1/4 mb-8"></div>
         <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1 w-full bg-stone-200 h-[500px] rounded-lg"></div>
            <div className="flex-1 space-y-6">
              <div className="h-10 bg-stone-200 rounded w-3/4"></div>
              <div className="h-6 bg-stone-200 rounded w-1/4"></div>
              <div className="h-32 bg-stone-200 rounded w-full"></div>
              <div className="h-12 bg-stone-200 rounded w-1/2"></div>
            </div>
         </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4 text-nutrisse-charcoal">Producto no encontrado</h1>
        <p className="text-stone-500 mb-8">El producto que buscas ya no está disponible o la URL es incorrecta.</p>
        <button onClick={() => router.back()} className="px-6 py-2 bg-nutrisse-sage text-white rounded font-medium">
          Volver
        </button>
      </div>
    );
  }

  const hasDiscount = product.comparePrice && product.comparePrice > product.price;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images?.[0],
    });
  };

  return (
    <div className="bg-white min-h-screen py-12 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm mb-8 text-stone-500">
          <Link href="/tienda" className="hover:text-nutrisse-sage transition">Tienda</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-nutrisse-charcoal truncate">{product.name}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Images */}
          <div className="flex-1 w-full flex flex-col gap-4">
            <div className="relative aspect-square bg-stone-100 rounded-lg overflow-hidden border border-stone-100">
              {mainImage ? (
                <Image src={mainImage} alt={product.name} fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 p-4 text-center">
                  <Camera size={48} className="mb-2 opacity-50" />
                  <span className="text-sm">Imagen principal del producto</span>
                </div>
              )}
            </div>
            
            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setMainImage(img)}
                    className={`relative w-20 h-20 rounded-md overflow-hidden border-2 flex-shrink-0 transition-opacity ${mainImage === img ? 'border-nutrisse-sage' : 'border-transparent hover:opacity-80'}`}
                  >
                    <Image src={img} alt={`${product.name} thumbnail ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-nutrisse-charcoal mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-end gap-3 mb-6 pb-6 border-b border-stone-100">
              <span className="font-bold text-3xl text-nutrisse-charcoal">Q {product.price.toFixed(2)}</span>
              {hasDiscount && (
                <span className="text-lg text-stone-400 line-through mb-1">Q {product.comparePrice?.toFixed(2)}</span>
              )}
              {hasDiscount && (
                <span className="ml-2 bg-nutrisse-terracotta text-white text-xs font-bold px-2 py-1 rounded-sm mb-1.5">
                  Oferta
                </span>
              )}
            </div>

            <div className="text-stone-600 mb-8 whitespace-pre-wrap leading-relaxed">
              {product.description}
            </div>

            {/* Actions */}
            <div className="bg-stone-50 p-6 rounded-lg border border-stone-200 mt-auto">
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                <div className="flex items-center bg-white border border-stone-300 rounded-md w-full sm:w-auto h-12">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-12 h-full flex items-center justify-center text-stone-500 hover:bg-stone-50 transition"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-medium text-nutrisse-charcoal">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    disabled={product.stock > 0 && quantity >= product.stock}
                    className="w-12 h-full flex items-center justify-center text-stone-500 hover:bg-stone-50 transition disabled:opacity-50"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full sm:flex-1 h-12 bg-nutrisse-sage text-white rounded-md flex items-center justify-center gap-2 hover:bg-nutrisse-sage/90 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={20} /> 
                  {product.stock === 0 ? "Agotado" : "Agregar al carrito"}
                </button>
              </div>
              
              <div className="text-sm font-medium">
                {product.stock > 0 ? (
                  product.stock <= 5 ? (
                    <span className="text-nutrisse-terracotta">¡Solo quedan {product.stock} disponibles!</span>
                  ) : (
                    <span className="text-green-600">En stock</span>
                  )
                ) : (
                  <span className="text-red-500">Sin stock temporalmente</span>
                )}
              </div>
            </div>
            
            {/* Long description if exists */}
            {product.longDescription && (
               <div className="mt-12 pt-8 border-t border-stone-100">
                 <h3 className="font-serif text-xl font-bold mb-4 text-nutrisse-charcoal">Detalles del producto</h3>
                 <div className="prose prose-stone max-w-none text-stone-600 whitespace-pre-wrap">
                   {product.longDescription}
                 </div>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
