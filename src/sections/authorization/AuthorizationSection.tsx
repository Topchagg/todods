'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/userStore';
import LoginForm from './form/LoginForm';
import routes from '@/constants/routes';

const AuthorizationSection = () => {
  const isAuth = useAuthStore((state) => state.user?.uid);

  if (!isAuth) {
    return (
      <section className="w-[90%]">
        <h1 className="pt-15 text-center text-[60px]">Authorization</h1>
        <div className="pt-5 w-1/2 m-0 m-auto">
          <LoginForm />
        </div>
        <Link href={routes.registration}>
          <div className="mt-10 underline text-center cursor-pointer  hover:text-gray-500 transition-all duration-300">
            {`Don't you have an account? Register!`}
          </div>
        </Link>
      </section>
    );
  }
  return (
    <div className="text-center">
      <h1 className="mt-15 text-[60px]">You have entered into your acc!</h1>
      <Link href={routes.desks}>
        <h2 className="mt-5 text-[40px] underline hover:text-gray-500 transition-all duration-300 cursor-pointer">
          Go to TODOlists
        </h2>
      </Link>
    </div>
  );
};

export default AuthorizationSection;
