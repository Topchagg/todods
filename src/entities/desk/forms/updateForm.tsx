'use client';

import { Dispatch, FC, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { deskProps } from '@/entities/desk/interface';
import usePutFireStore from '@/customHooks/usePutFirestore';

interface EditDeskFormProps {
  desk: deskProps;
  setFunction: Dispatch<SetStateAction<boolean>>;
}

const EditDeskForm: FC<EditDeskFormProps> = ({ desk, setFunction }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({
    defaultValues: {
      name: desk.name,
    },
  });

  const { updateData, loading, error } = usePutFireStore();

  const onSubmit = async (data: { name: string }) => {
    await updateData('desks', desk.id, { name: data.name });
    if (!error) {
      window.location.reload();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 border rounded shadow-md bg-black text-white w-[50%]"
    >
      <label htmlFor="name" className="block font-medium mb-1">
        New Desk Name
      </label>
      <input
        id="name"
        {...register('name', { required: 'Name is required' })}
        className="w-full p-2 border rounded mb-2"
        placeholder="Enter new name"
      />
      {errors.name && (
        <p className="text-red-500 text-sm">{errors.name.message}</p>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
      <button
        type="button"
        disabled={loading}
        onClick={() => setFunction((prev) => !prev)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mt-5"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditDeskForm;
