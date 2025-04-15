'use client';
import { useEffect, useState } from 'react';

import Desk from '@/entities/desk/desk';
import useGetFireStoreData from '@/customHooks/useGetFirestore';

import DeskForm from './DeskCreationForm';
import { where } from 'firebase/firestore';
import { deskProps } from '@/entities/desk/interface';
import { useAuthStore } from '@/store/userStore';
import LoadingItem from '@/shared/LoadingItem';

const DeskSection = () => {
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
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

  if (result.loading) {
    return <LoadingItem />;
  }
  if (!isCreate && result['data']) {
    return (
      <div className="text-center pt-10 w-[80%] m-0 m-auto">
        <div>
          <h1 className="text-[60px]">Your desks</h1>
        </div>
        <div className="grid grid-cols-3 gap-10 mt-20">
          {result['data'].map((item, index) => (
            <div key={index}>
              <Desk {...item} />
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
  if (isCreate) {
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
  }
};

export default DeskSection;
