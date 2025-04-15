'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc, where } from 'firebase/firestore';

import Desk from '@/entities/desk/desk';
import DeskForm from './DeskCreationForm';
import { deskData } from '@/entities/desk/interface';
import { useAuthStore } from '@/store/userStore';
import LoadingItem from '@/shared/LoadingItem';
import { db } from '@/firebase/firebase';
import useGetFireStoreData from '@/customHooks/useGetFirestore';

const DeskSection = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [invitedDesks, setInvitedDesks] = useState<deskData[]>([]);
  const [loadingInvited, setLoadingInvited] = useState(true);

  const user = useAuthStore((state) => state.user);

  const ownDesks = useGetFireStoreData<deskData>(
    'desks',
    user?.uid ? [where('userId', '==', user.uid)] : []
  );

  useEffect(() => {
    const fetchInvitedDesks = async () => {
      if (!user?.uid) return;

      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userDocRef);

        if (!userSnap.exists()) {
          setInvitedDesks([]);
          return;
        }

        const userData = userSnap.data();
        const deskIds: string[] = userData.desks || [];

        if (deskIds.length === 0) {
          setInvitedDesks([]);
          return;
        }

        const desksRef = collection(db, 'desks');
        const desksSnap = await getDocs(desksRef);

        const invited = desksSnap.docs
          .filter((docSnap) => deskIds.includes(docSnap.id))
          .map(
            (docSnap) => ({ id: docSnap.id, ...docSnap.data() } as deskData)
          );

        setInvitedDesks(invited);
      } catch (err) {
        console.error('Error fetching invited desks:', err);
      } finally {
        setLoadingInvited(false);
      }
    };

    fetchInvitedDesks();
  }, [user?.uid]);

  if (ownDesks.loading || loadingInvited) {
    return <LoadingItem />;
  }

  if (!isCreate) {
    return (
      <div className="text-center pt-10 w-[80%] m-0 m-auto">
        <div>
          <h1 className="text-[60px]">Your desks</h1>
        </div>

        <div className="grid grid-cols-3 gap-10 mt-20">
          {ownDesks.data.map((item, index) => (
            <Desk isOwner={true} key={`own-${index}`} {...item} />
          ))}
        </div>

        {invitedDesks.length > 0 && (
          <>
            <h2 className="text-[40px] mt-20">Invited desks</h2>
            <div className="grid grid-cols-3 gap-10 mt-10">
              {invitedDesks.map((item, index) => (
                <Desk isOwner={false} key={`invited-${index}`} {...item} />
              ))}
            </div>
          </>
        )}

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
