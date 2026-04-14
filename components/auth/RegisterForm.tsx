"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const registerSchema = z.object({
  name: z.string().min(2, "Ingresa tu nombre completo"),
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParams = searchParams?.get('redirect');

  const { register, handleSubmit: hookFormSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    hookFormSubmit(onSubmit)(e);
  };

  const handleRedirect = async (uid: string) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const docSnap = await getDoc(userDocRef);
      
      if (docSnap.exists() && docSnap.data().role === 'admin') {
        window.location.href = "/dashboard";
      } else if (redirectParams) {
        window.location.href = redirectParams;
      } else {
        window.location.href = "/cuenta";
      }
    } catch (error) {
      console.error("Error checking user role:", error);
      window.location.href = redirectParams || "/cuenta";
    }
  };

  const createProfileResource = async (uid: string, email: string | null, name: string | null) => {
    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);
    if (!docSnap.exists()) {
      await setDoc(userDocRef, {
        uid,
        email,
        displayName: name || "Nuevo Usuario",
        role: "client",
        createdAt: serverTimestamp(),
      });
    }
  };

  const onSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await createProfileResource(userCredential.user.uid, data.email, data.name);
      await handleRedirect(userCredential.user.uid);
    } catch {
      setError("Error al registrar. Es posible que el correo ya esté en uso o la contraseña sea debil.");
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await createProfileResource(result.user.uid, result.user.email, result.user.displayName);
      await handleRedirect(result.user.uid);
    } catch {
      setError("Error al registrarse con Google.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-nutrisse-warmWhite flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full p-8 rounded-lg shadow-sm border border-stone-100">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-nutrisse-charcoal mb-2">Crea tu cuenta</h1>
          <p className="text-stone-500">Únete a Nutrissé</p>
        </div>

        {error && <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm mb-6">{error}</div>}

        <button 
          onClick={handleGoogleRegister}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white border border-stone-200 text-nutrisse-charcoal py-3 px-4 rounded-md hover:bg-stone-50 transition mb-6 font-medium"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.65 15.69 16.85 16.9 15.64 17.7V20.45H19.2C21.28 18.53 22.56 15.67 22.56 12.25Z" fill="#4285F4"/>
            <path d="M12 23C14.97 23 17.46 22.02 19.2 20.45L15.64 17.7C14.7 18.33 13.45 18.7 12 18.7C9.21 18.7 6.84 16.82 5.96 14.29H2.3V17.13C4.08 20.67 7.76 23 12 23Z" fill="#34A853"/>
            <path d="M5.96 14.29C5.73 13.62 5.6 12.83 5.6 12C5.6 11.17 5.73 10.38 5.96 9.71V6.87H2.3C1.56 8.36 1.14 10.12 1.14 12C1.14 13.88 1.56 15.64 2.3 17.13L5.96 14.29Z" fill="#FBBC05"/>
            <path d="M12 5.3C13.62 5.3 15.06 5.86 16.2 6.94L19.3 3.84C17.46 2.12 14.97 1.14 12 1.14C7.76 1.14 4.08 3.47 2.3 7.01L5.96 9.85C6.84 7.32 9.21 5.3 12 5.3Z" fill="#EA4335"/>
          </svg>
          Continuar con Google
        </button>

        <div className="relative flex items-center py-2 mb-6">
          <div className="flex-grow border-t border-stone-200"></div>
          <span className="flex-shrink-0 mx-4 text-stone-400 text-sm">o regístrate con correo</span>
          <div className="flex-grow border-t border-stone-200"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-nutrisse-charcoal mb-1">Nombre Completo</label>
            <input 
              {...register("name")}
              className="w-full px-4 py-2 border border-stone-200 rounded-md focus:ring-2 focus:ring-nutrisse-sage focus:outline-none"
              placeholder="Tu nombre completo"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

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

          <div>
            <label className="block text-sm font-medium text-nutrisse-charcoal mb-1">Confirmar Contraseña</label>
            <input 
              type="password"
              {...register("confirmPassword")}
              className="w-full px-4 py-2 border border-stone-200 rounded-md focus:ring-2 focus:ring-nutrisse-sage focus:outline-none"
              placeholder="••••••••"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-nutrisse-charcoal text-white py-3 px-4 rounded-md hover:bg-nutrisse-charcoal/90 transition font-medium mt-4"
          >
            {loading ? "Cargando..." : "Crear cuenta"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <span className="text-stone-500">¿Ya tienes cuenta? </span>
          <Link href={`/login${redirectParams ? '?redirect='+redirectParams : ''}`} className="text-nutrisse-sage font-medium hover:underline">
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
