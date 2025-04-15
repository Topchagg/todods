'use client';

import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { taskFormData, taskPostRequest } from '@/entities/task/interface';
import usePostFirestore from '@/customHooks/usePostFirestore';
import useCheckAuth from '@/customHooks/useCheckAuth';

interface AddTaskFormProps {
  deskId: string;
  setFunction: Dispatch<SetStateAction<boolean>>;
}

const AddTaskForm: FC<AddTaskFormProps> = ({ deskId, setFunction }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<taskFormData>();

  const { postData, loading, error, success } =
    usePostFirestore<taskPostRequest>();
  const user = useCheckAuth();

  const onSubmit = async (data: taskFormData) => {
    if (!user) {
      console.log('User is not authenticated');
      return;
    }

    const taskData: taskPostRequest = {
      deskId,
      name: data.name,
      description: data.description,
    };

    await postData('tasks', taskData);
  };

  useEffect(() => {
    if (success) {
      reset();
      window.location.reload();
    }
  }, [success, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-6 p-4 bg-gray-800 rounded-xl shadow-md"
    >
      <h2 className="text-xl font-semibold text-white mb-4">Add New Task</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-white">
          Task Name
        </label>
        <input
          id="name"
          {...register('name', { required: 'Task name is required' })}
          placeholder="Enter task name"
          className="mt-1 p-2 w-full rounded border border-gray-600 bg-gray-700 text-white"
        />
        {errors.name && (
          <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-white"
        >
          Description
        </label>
        <textarea
          id="description"
          {...register('description', { required: 'Description is required' })}
          placeholder="Enter description"
          className="mt-1 p-2 w-full rounded border border-gray-600 bg-gray-700 text-white"
          rows={4}
        />
        {errors.description && (
          <p className="text-red-400 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full transition-all"
      >
        {loading ? 'Adding...' : 'Add Task'}
      </button>
      <button
        type="button"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full transition-all mt-5"
        onClick={() => setFunction((prev) => !prev)}
      >
        Cancel
      </button>
    </form>
  );
};

export default AddTaskForm;
