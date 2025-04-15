'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import usePostFirestore from '@/customHooks/usePostFirestore';
import useCheckAuth from '@/customHooks/useCheckAuth';
import { deskPostRequest } from '@/entities/desk/interface';

interface DeskFormData {
  name: string;
}

const DeskForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeskFormData>();
  const { postData, loading, error, success } =
    usePostFirestore<deskPostRequest>();
  const user = useCheckAuth();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUserId(user.uid);
    }
  }, [user]);

  const onSubmit = async (data: DeskFormData) => {
    if (!userId) {
      console.error('User isnt authenticated');
      return;
    }

    const deskData: deskPostRequest = {
      name: data.name,
      userId: userId,
      viewers: [],
      admins: [],
    };

    await postData('desks', deskData);
  };

  useEffect(() => {
    if (success) {
      window.location.reload();
    }
  }, [success]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name of desk
        </label>
        <input
          id="name"
          type="text"
          {...register('name', { required: 'Name is Required' })}
          className="border p-2 w-full mt-2 rounded"
          placeholder="Enter name of new desk"
        />
        {errors.name && (
          <p className="text-red-500 mt-1">{errors.name.message}</p>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white mt-4 p-2 rounded w-full hover:bg-blue-600 transition"
          disabled={loading || !userId}
        >
          {loading ? 'Creating desk...' : 'Create desk'}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && (
          <p className="text-green-500 mt-4">Desk created successfully!</p>
        )}
      </form>
    </div>
  );
};

export default DeskForm;
