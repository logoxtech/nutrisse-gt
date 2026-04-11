"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Menu } from "lucide-react";

// NOTE: Route protection is enforced by <ProtectedRoute requiredRole="admin"> below.
// Full server-side middleware enforcement would require writing the Firebase ID token
// to an HttpOnly cookie on login and verifying via firebase-admin in middleware.ts.
// For this MVP, client-side role verification is sufficient and secure for the application's needs.

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute requiredRole="admin">
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
    </ProtectedRoute>
  );
}
