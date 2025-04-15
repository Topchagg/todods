'use client';

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { useState } from 'react';

const usePutFireStore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateData = async (
    collectionName: string,
    docId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
  ) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { updateData, loading, error };
};

export default usePutFireStore;
