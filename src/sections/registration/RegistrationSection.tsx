'use client';

import routes from '@/constants/routes';
import RegistrationForm from './form/RegistrationForm';
import { useAuthStore } from '@/store/userStore';
import Link from 'next/link';

const RegistrationSection = () => {
  const user = useAuthStore((state) => state.user);

  if (user) {
    return (
      <div className="mt-30 text-center">
        <h1 className="text-[60px]">You are already logged!</h1>
      </div>
    );
  }

  return (
    <section className="w-[90%]">
      <div className="pt-15 text-center">
        <h1 className="text-[60px]">Registration</h1>
      </div>
      <div className="pt-5 w-1/2 m-0 m-auto">
        <RegistrationForm />
      </div>
      <Link href={routes.authorization}>
        <div className="text-center underline cursor-pointer mt-5 hover:text-gray-500 transition-all duration-300">
          Already have an account? Sign in!
        </div>
      </Link>
    </section>
  );
};

export default RegistrationSection;
