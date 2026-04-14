"use client";

import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-nutrisse-warmWhite flex items-center justify-center p-4">
        <div className="text-nutrisse-sage animate-pulse font-serif text-xl">Cargando...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
