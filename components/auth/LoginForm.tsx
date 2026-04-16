"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import GoogleIcon from "@/components/ui/GoogleIcon";

const loginSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  const searchParams = useSearchParams();
  const redirectParams = searchParams?.get('redirect');

  const { register, handleSubmit: hookFormSubmit, formState: { errors }, getValues } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    hookFormSubmit(onSubmit)(e);
  };

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      // AuthContext will update userRole — redirect handled by cuenta page
      window.location.href = redirectParams || "/cuenta";
    } catch {
      setError("Credenciales inválidas. Por favor intenta de nuevo.");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      window.location.href = redirectParams || "/cuenta";
    } catch {
      setError("Error al iniciar sesión con Google.");
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    const email = getValues("email");
    if (!email) {
      setError("Por favor ingresa tu correo electrónico para restablecer la contraseña.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage("Se ha enviado un correo para restablecer tu contraseña.");
      setError("");
    } catch {
      setError("Error al enviar el correo. Verifica que el correo esté registrado.");
    }
  };

  return (
    <div className="min-h-screen bg-nutrisse-warmWhite flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full px-4 py-8 md:p-8 rounded-lg shadow-sm border border-stone-100">
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex items-center gap-2 font-serif text-2xl font-bold text-nutrisse-charcoal tracking-wide hover:text-nutrisse-sage transition">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-nutrisse-sage fill-current">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.06 19.43 4 16.05 4 12C4 7.95 7.06 4.57 11 4.07V19.93ZM13 4.07C16.94 4.57 20 7.95 20 12C20 16.05 16.94 19.43 13 19.93V4.07Z"/>
            </svg>
            NUTRISSÉ GT
          </Link>
        </div>
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-nutrisse-charcoal mb-2">Bienvenido a Nutrissé</h1>

          <p className="text-stone-500">Inicia sesión en tu cuenta</p>
        </div>

        {error && <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm mb-6">{error}</div>}
        {resetMessage && <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm mb-6">{resetMessage}</div>}

        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white border border-stone-200 text-nutrisse-charcoal py-3 px-4 rounded-md hover:bg-stone-50 transition mb-6 font-medium"
        >
          <GoogleIcon size={20} />
          Continuar con Google
        </button>

        <div className="relative flex items-center py-2 mb-6">
          <div className="flex-grow border-t border-stone-200"></div>
          <span className="flex-shrink-0 mx-4 text-stone-400 text-sm">o continua con correo</span>
          <div className="flex-grow border-t border-stone-200"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-nutrisse-charcoal mb-1">Correo Electrónico</label>
            <input 
              {...register("email")}
              className="w-full px-4 py-2 border border-stone-200 rounded-md focus:ring-2 focus:ring-nutrisse-sage focus:outline-none"
              placeholder="tu@correo.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-nutrisse-charcoal mb-1">Contraseña</label>
            <input 
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 border border-stone-200 rounded-md focus:ring-2 focus:ring-nutrisse-sage focus:outline-none"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex justify-end">
            <button 
              type="button"
              onClick={handlePasswordReset}
              className="text-sm text-nutrisse-sage hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-nutrisse-charcoal text-white py-3 px-4 rounded-md hover:bg-nutrisse-charcoal/90 transition font-medium"
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <span className="text-stone-500">¿No tienes cuenta? </span>
          <Link href={`/registro${redirectParams ? '?redirect='+redirectParams : ''}`} className="text-nutrisse-terracotta font-medium hover:underline">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
}
