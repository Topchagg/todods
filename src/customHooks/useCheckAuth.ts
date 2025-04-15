'use client';

import { authApp } from '@/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';

import { useAuthStore } from '@/store/userStore';

const useCheckAuth = () => {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authApp, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
};

export default useCheckAuth;
