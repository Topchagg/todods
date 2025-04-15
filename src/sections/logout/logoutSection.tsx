'use client';

import { FC } from 'react';
import { signOut } from 'firebase/auth';
import { authApp } from '@/firebase/firebase';
import { useAuthStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';

const LogoutSection: FC = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(authApp);
      setUser(null);
      router.push('/authorization');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!user) return null;

  return (
    <section className="flex flex-col items-center justify-center p-6 bg-black text-white rounded-xl shadow-md mt-10 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">You entered as</h2>
      <p className="text-lg mb-6">{user.email}</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600  font-semibold py-2 px-6 rounded-xl transition-all active:scale-95 cursor-pointer"
      >
        Leave
      </button>
    </section>
  );
};

export default LogoutSection;
