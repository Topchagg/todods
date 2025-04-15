import { useState } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

const useDeleteFirestore = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const deleteDocument = async (collectionName: string, docId: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
      setSuccess(true);
    } catch (err) {
      setError((err as Error).message);
      console.error('Error', err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteDocument, loading, error, success };
};

export default useDeleteFirestore;
