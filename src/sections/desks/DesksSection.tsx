'use client';
import { useEffect, useState } from 'react';

import Desk from '@/entities/desk/desk';
import useGetFireStoreData from '@/customHooks/useGetFirestore';

import DeskForm from './form/deskForm';
import { where } from 'firebase/firestore';
import { deskProps } from '@/entities/desk/interface';
import useCheckAuth from '@/customHooks/useCheckAuth';
import Link from 'next/link';

const DeskSection = () => {
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const user = useCheckAuth();
  const [uid, setUid] = useState<string | null>(null);

  const result = useGetFireStoreData<deskProps>(
    'desks',
    uid ? [where('userId', '==', uid)] : []
  );

  useEffect(() => {
    if (user?.uid) {
      setUid(user.uid);
    }
  }, [user?.uid]);

  if (!isCreate && result['data']) {
    return (
      <div className="text-center pt-10 w-[80%] m-0 m-auto">
        <div>
          <h1 className="text-[60px]">Your desks</h1>
        </div>
        <div className="grid grid-cols-3 gap-10 mt-20">
          {result['data'].map((item, index) => (
            <div key={index}>
              <Link href={`/desks/${item.id}`}>
                <Desk {...item} />
              </Link>
            </div>
          ))}
        </div>
        <div
          className="border border-blue-500 text-[40px] mt-10 cursor-pointer hover:scale-[0.9] hover:text-gray-500 transition-all duration-300 mb-20"
          onClick={() => setIsCreate(true)}
        >
          Create new desk
        </div>
      </div>
    );
  }
  return (
    <div className="text-center pt-10 w-[80%] m-0 m-auto">
      <div>
        <h1 className="text-[60px]">Creation of desk</h1>
      </div>
      <div className="mt-5">
        <DeskForm />
      </div>
      <div
        className="border border-blue-500 text-[40px] mt-10 cursor-pointer hover:scale-[0.9] hover:text-gray-500 transition-all duration-300"
        onClick={() => setIsCreate(false)}
      >
        Cancel creation of desk
      </div>
    </div>
  );
};

export default DeskSection;
