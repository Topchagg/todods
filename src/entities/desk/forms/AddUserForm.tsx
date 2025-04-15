'use client';

import { useForm } from 'react-hook-form';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

import usePutFireStore from '@/customHooks/usePutFirestore';
import useGetFireStoreData from '@/customHooks/useGetFirestore';
import { db } from '@/firebase/firebase';
import { userInterface } from '@/interfaces/user';

interface AddUserFormProps {
  deskId: string;
  users: {
    admins: Pick<userInterface, 'email' | 'role'>[];
    viewers: Pick<userInterface, 'email' | 'role'>[];
  };
  setFunction: Dispatch<SetStateAction<boolean>>;
}

interface AddUserData {
  email: string;
  role: 'viewers' | 'admins';
}

const AddUserForm: React.FC<AddUserFormProps> = ({
  deskId,
  users,
  setFunction,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserData>();

  const {
    updateData,
    loading: updateLoading,
    error: updateError,
  } = usePutFireStore();
  const [customError, setCustomError] = useState('');
  const [emailToFind, setEmailToFind] = useState('');
  const { data: allUsers, loading: usersLoading } =
    useGetFireStoreData<userInterface>('users');

  useEffect(() => {
    if (emailToFind) {
      const exists = allUsers.find((u) => u.email === emailToFind);
      if (!exists) {
        setCustomError('User not found in Firestore');
      } else {
        setCustomError('');
      }
    }
  }, [emailToFind, allUsers]);

  const onSubmit = async (data: AddUserData) => {
    const { email, role } = data;
    setEmailToFind(email);

    const userDoc = allUsers.find((u) => u.email === email);

    if (!userDoc) {
      setCustomError('User not found in Firestore');
      return;
    }

    const newUser = { email, role };

    try {
      const userRef = doc(db, 'users', userDoc.id);
      await updateDoc(userRef, {
        desks: arrayUnion(deskId),
      });

      await updateData('desks', deskId, {
        [role]: [...users[role], newUser],
      });

      if (!updateError) {
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      setCustomError('Ошибка при обновлении данных');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-black text-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add user</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Email of user
          </label>
          <input
            id="email"
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="border p-2 w-full mt-1 rounded"
            placeholder="Enter email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-300"
          >
            Role of user
          </label>
          <select
            id="role"
            {...register('role', { required: 'Role is required' })}
            className="border p-2 w-full mt-1 rounded bg-black"
          >
            <option value="viewers">Viewer</option>
            <option value="admins">Admin</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>

        {customError && <p className="text-red-500 mt-2">{customError}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition"
          disabled={updateLoading || usersLoading}
        >
          {updateLoading ? 'Adding...' : 'Add user'}
        </button>

        <button
          type="button"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition mt-5"
          onClick={() => setFunction(false)}
          disabled={updateLoading}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
