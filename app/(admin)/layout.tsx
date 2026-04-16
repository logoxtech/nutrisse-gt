"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Menu } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { currentUser, userRole, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        router.push("/login?redirect=" + window.location.pathname);
      } else if (userRole !== "admin") {
        router.push("/cuenta");
      }
    }
  }, [currentUser, userRole, loading, router]);

  if (loading || !currentUser || userRole !== 'admin') {
    return (
      <div className="flex h-screen bg-stone-100">
        <div className="hidden lg:block w-56 bg-white border-r border-stone-200 animate-pulse" />
        <div className="flex-1 p-8">
          <div className="h-8 bg-stone-200 rounded w-48 mb-8 animate-pulse" />
          <div className="grid grid-cols-4 gap-6 mb-8">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-32 bg-stone-200 rounded-xl animate-pulse" />
            ))}
          </div>
          <div className="h-64 bg-stone-200 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-stone-100 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-shrink-0">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="relative z-10 flex-shrink-0">
            <AdminSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center gap-4 px-4 py-3 bg-white border-b border-stone-200">
          <button onClick={() => setSidebarOpen(true)} className="text-stone-500 hover:text-stone-900">
            <Menu size={22} />
          </button>
          <span className="font-serif font-bold text-stone-800">NUTRISSÉ GT Admin</span>
        </div>

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
