"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

import type { Role } from "@/lib/types";

interface AuthContextType {
  currentUser: User | null;
  userRole: Role | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userRole: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<Role | null>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('userRole') as Role) || null;
    }
    return null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          const role = userDoc.exists() 
            ? userDoc.data().role as Role 
            : 'client';
          setUserRole(role);
          localStorage.setItem('userRole', role);
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserRole(null);
          localStorage.removeItem('userRole');
        }
      } else {
        setUserRole(null);
        localStorage.removeItem('userRole');
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, userRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
