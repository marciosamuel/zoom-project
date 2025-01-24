"use client";

import { auth } from "@/lib/firebase/firebase-config";
import { useAuthStore } from "@/store/auth-store";
import { onAuthStateChanged } from "firebase/auth";
import React, { type PropsWithChildren } from "react";

const AuthContext = React.createContext({});

export function AuthProvider({ children }: PropsWithChildren) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else clearUser();
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, clearUser, setLoading]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
