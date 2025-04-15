'use client';

import { useForm } from 'react-hook-form';
import usePutFireStore from '@/customHooks/usePutFirestore';
import { Dispatch, SetStateAction } from 'react';
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
  setFunction,
  users,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserData>();
  const { updateData, loading, error } = usePutFireStore();

  const onSubmit = async (data: AddUserData) => {
    const { email, role } = data;

    const newUser = { email, role };

    await updateData('desks', deskId, {
      [role]: [...users[role], newUser],
    });

    if (!error) {
      window.location.reload();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-black text-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add user</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email of user
          </label>
          <input
            id="email"
            type="email"
            {...register('email', { required: 'Email обязателен' })}
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
            className="block text-sm font-medium text-gray-700"
          >
            Role of user
          </label>
          <select
            id="role"
            {...register('role', { required: 'Choice role of user' })}
            className="border p-2 w-full mt-1 rounded bg-black"
          >
            <option value="viewers">Viewer</option>
            <option value="admins">Admin</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add user'}
        </button>
        <button
          type="button"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition mt-5"
          disabled={loading}
          onClick={() => setFunction((prev) => !prev)}
        >
          Cancel
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default AddUserForm;
