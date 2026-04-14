"use client";

import { Suspense } from "react";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-nutrisse-warmWhite flex items-center justify-center p-4">
        <div className="text-nutrisse-sage animate-pulse font-serif text-xl">Cargando...</div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
