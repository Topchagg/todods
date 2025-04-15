import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

const useGetDocById = <T>(collection: string, id: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoc = async () => {
      if (!id) return;
      const ref = doc(db, collection, id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setData({ id: snap.id, ...snap.data() } as T);
      }
      setLoading(false);
    };

    fetchDoc();
  }, [collection, id]);

  return { data, loading };
};

export default useGetDocById;
