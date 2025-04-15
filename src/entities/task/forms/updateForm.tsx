'use client';

import { Dispatch, FC, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { taskProps } from '@/entities/task/interface';
import usePutFireStore from '@/customHooks/usePutFirestore';

interface UpdateTaskFormProps {
  task: taskProps;
  setFunction: Dispatch<SetStateAction<boolean>>;
}

const UpdateTaskForm: FC<UpdateTaskFormProps> = ({ task, setFunction }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<taskProps, 'name' | 'description' | 'status'>>();

  const { updateData, loading, error } = usePutFireStore();

  const onSubmit = async (
    data: Pick<taskProps, 'name' | 'description' | 'status'>
  ) => {
    await updateData('tasks', task.id, data);
    if (!error) {
      window.location.reload();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-black text-white p-6 rounded-lg shadow-md max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Task</h2>

      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Task Name
        </label>
        <input
          id="name"
          {...register('name', { required: 'Name is required' })}
          className="mt-1 p-2 w-full rounded border border-gray-300"
          placeholder="Task name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          {...register('description', { required: 'Description is required' })}
          rows={3}
          className="mt-1 p-2 w-full rounded border border-gray-300"
          placeholder="Task description"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </label>
        <select
          id="status"
          {...register('status', { required: 'Status is required' })}
          className="mt-1 p-2 w-full rounded border border-gray-300 bg-black"
        >
          <option value="waiting">Waiting</option>
          <option value="done">Done</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? 'Updating...' : 'Update Task'}
      </button>

      <button
        type="button"
        onClick={() => setFunction((prev) => !prev)}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-10"
      >
        Cancel
      </button>
    </form>
  );
};

export default UpdateTaskForm;
