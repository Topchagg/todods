'use client';

import Link from 'next/link';
import routes from '@/constants/routes';

import { useAuthStore } from '@/store/userStore';

const Header = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="w-[80%] m-0 m-auto text-white text-[20px] pt-30 items-center">
      {(user && (
        <nav className="flex justify-around ">
          <div className="hover:text-gray-600">
            <Link href={routes.desks}>Desks</Link>
          </div>
          <div className="hover:text-gray-600">
            <Link href={routes.logout}>Logout</Link>
          </div>
        </nav>
      )) || (
        <nav>
          <div className="hover:text-gray-600">
            <Link href={routes.authorization}>Authorization</Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
