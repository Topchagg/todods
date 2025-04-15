'use client';
import { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  QuerySnapshot,
  DocumentData,
  query,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '@/firebase/firebase';

const useGetFireStoreData = <T>(
  collectionName: string,
  queryConstraints: QueryConstraint[] = []
) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const collectionRef = collection(db, collectionName);
        const finalQuery = query(collectionRef, ...queryConstraints);

        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
          finalQuery
        );
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(documents as T[]);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName, JSON.stringify(queryConstraints)]);

  return { data, loading, error };
};

export default useGetFireStoreData;
