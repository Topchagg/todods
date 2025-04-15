'use client'

import { authApp } from "@/firebase/firebase";
import { onAuthStateChanged,User } from "firebase/auth";
import { useEffect, useState } from "react";



const useCheckAuth = () => {
    const [user, setUser] = useState<User|null>(null);

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

    return user
}

export default useCheckAuth