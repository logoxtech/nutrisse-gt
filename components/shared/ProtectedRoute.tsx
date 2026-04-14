"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import type { Role } from "@/lib/types";

export default function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode, requiredRole?: Role }) {
  const { currentUser, userRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        router.push("/login?redirect=" + window.location.pathname);
      } else if (requiredRole && userRole && userRole !== requiredRole) {
        router.push("/"); // fallback to home if unauthorized
      }
    }
  }, [currentUser, userRole, loading, router, requiredRole]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-nutrisse-sage border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!currentUser) return null;
  if (requiredRole && userRole !== requiredRole) return null;

  return <>{children}</>;
}
