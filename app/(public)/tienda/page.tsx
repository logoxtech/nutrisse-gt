"use client";

import { useEffect, useState } from "react";
import { getCategories, getProducts } from "@/lib/firestore";
import { Category, Product } from "@/lib/types";
import ProductCard from "@/components/store/ProductCard";
import { Search, ChevronDown } from "lucide-react";

export default function TiendaPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [cats, prods] = await Promise.all([
          getCategories(),
          getProducts(activeCategory),
        ]);
        setCategories(cats);
        setProducts(prods);
      } catch (error) {
        console.error("Error loading store data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [activeCategory]);

  // Client-side filtering & sorting
  const filteredProducts = products
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      // "newest" as proxy
      if (sortBy === "newest" && a.createdAt && b.createdAt) {
        return b.createdAt.toMillis() - a.createdAt.toMillis();
      }
      return 0;
    });

  return (
    <div className="bg-nutrisse-warmWhite min-h-screen py-12 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-nutrisse-charcoal mb-8">Tienda Nutrisse</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <h2 className="font-bold text-lg mb-4 text-nutrisse-charcoal">Categorías</h2>
            {loading && categories.length === 0 ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => <div key={i} className="h-6 bg-stone-200 animate-pulse rounded w-3/4"></div>)}
              </div>
            ) : (
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setActiveCategory(null)}
                    className={`block w-full text-left px-3 py-2 rounded-md transition ${activeCategory === null ? 'bg-nutrisse-sage/10 text-nutrisse-sage font-medium' : 'text-stone-600 hover:bg-stone-100'}`}
                  >
                    Todos los productos
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button 
                      onClick={() => setActiveCategory(cat.id)}
                      className={`block w-full text-left px-3 py-2 rounded-md transition ${activeCategory === cat.id ? 'bg-nutrisse-sage/10 text-nutrisse-sage font-medium' : 'text-stone-600 hover:bg-stone-100'}`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </aside>

          {/* Main Area */}
          <div className="flex-grow flex flex-col">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-6 gap-4 border border-stone-100">
              <div className="relative w-full sm:w-64">
                <input 
                  type="text" 
                  placeholder="Buscar productos..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-stone-50 border-transparent rounded-md text-sm focus:ring-2 focus:ring-nutrisse-sage/50 focus:bg-white transition outline-none border focus:border-nutrisse-sage"
                />
                <Search size={18} className="absolute left-3 top-2.5 text-stone-400" />
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-sm text-stone-500 whitespace-nowrap">Ordenar por:</span>
                <div className="relative w-full sm:w-48">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full appearance-none bg-stone-50 border border-stone-200 rounded-md py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-nutrisse-sage/50"
                  >
                    <option value="newest">Más recientes</option>
                    <option value="price_asc">Precio: Menor a Mayor</option>
                    <option value="price_desc">Precio: Mayor a Menor</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-2.5 text-stone-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-white rounded-lg border border-stone-100 p-4 h-[350px] animate-pulse">
                    <div className="w-full h-48 bg-stone-200 rounded-md mb-4"></div>
                    <div className="h-4 bg-stone-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-stone-200 rounded w-1/2 mb-4"></div>
                    <div className="h-8 bg-stone-200 rounded mt-auto"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center bg-white rounded-lg border border-stone-100 p-12 text-center h-64">
                <Search size={48} className="text-stone-300 mb-4" />
                <h3 className="text-xl font-medium text-nutrisse-charcoal mb-2">No se encontraron productos</h3>
                <p className="text-stone-500">Prueba ajustando los filtros o tu búsqueda.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
