'use client';

import { ReactNode, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { authApp } from '@/firebase/firebase';
import { useAuthStore } from '@/store/userStore';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authApp, (user) => {
      setUser(user ?? null);
    });

    return () => unsubscribe();
  }, []);

  return <>{children}</>;
}
