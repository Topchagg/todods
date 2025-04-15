'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import usePutFireStore from '@/customHooks/usePutFirestore';
import { userInterface } from '@/interfaces/user';

interface RemoveUserFormProps {
  deskId: string;
  admins: Pick<userInterface, 'email' | 'role'>[];
  viewers: Pick<userInterface, 'email' | 'role'>[];
  setFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormData {
  user: string;
}

const RemoveUserForm: FC<RemoveUserFormProps> = ({
  deskId,
  admins,
  viewers,
  setFunction,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { updateData, loading } = usePutFireStore();

  const users = [
    ...admins.map((admin) => ({ email: admin.email, role: 'admin' })),
    ...viewers.map((viewer) => ({ email: viewer.email, role: 'viewer' })),
  ];

  const onSubmit = async ({ user }: FormData) => {
    const userToRemove = user.split(':')[0];

    if (!userToRemove) return;

    const updatedAdmins = admins.filter(
      (admin) => admin.email !== userToRemove
    );
    const updatedViewers = viewers.filter(
      (viewer) => viewer.email !== userToRemove
    );

    await updateData('desks', deskId, {
      admins: updatedAdmins,
      viewers: updatedViewers,
    });

    window.location.reload();
  };

  return (
    <div className="p-6 rounded-lg shadow-lg w-[300px] bg-black text-white">
      <h3 className="text-xl font-semibold mb-4">Remove User from Desk</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="user" className="block text-sm font-medium  mb-1">
            Select User to Remove
          </label>
          <select
            id="user"
            {...register('user', { required: 'User selection is required' })}
            className={`border p-2 w-full rounded-lg ${
              errors.user ? 'border-red-500' : ''
            }`}
          >
            <option value="" className="bg-black">
              Select user...
            </option>
            {users.map((user, index) => (
              <option
                className="bg-black text-white"
                key={index}
                value={`${user.email}:${user.role}`}
              >
                {user.email} : {user.role}
              </option>
            ))}
          </select>
          {errors.user && (
            <p className="text-red-500 text-xs mt-1">{errors.user.message}</p>
          )}
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => setFunction(false)}
            className="px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
            disabled={loading}
          >
            {loading ? 'Removing...' : 'Remove User'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RemoveUserForm;
