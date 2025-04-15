'use client';

import { FC, useEffect, useState } from 'react';
import { taskProps } from './interface';
import UpdateTaskForm from './forms/updateForm';
import useDeleteFirestore from '@/customHooks/useDeleteFireStore';

const Task: FC<taskProps> = ({ id, name, description, status }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const { deleteDocument, success } = useDeleteFirestore();

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickOutside = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (success) {
      window.location.reload();
    }
  }, [success]);

  if (isUpdate) {
    return (
      <UpdateTaskForm
        setFunction={setIsUpdate}
        task={{ name, description, status, id }}
      />
    );
  }

  return (
    <div
      className="relative"
      onContextMenu={handleContextMenu}
      onClick={handleClickOutside}
    >
      <div className="border p-4 rounded-lg shadow-md bg-white mb-4 cursor-pointer">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <span
          className={`inline-block mt-3 px-3 py-1 text-xs font-medium rounded-full ${
            status === 'done'
              ? 'bg-green-100 text-green-700'
              : status === 'waiting'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {status}
        </span>
      </div>

      {isMenuOpen && (
        <ul className="absolute z-50 bg-black border border-gray-300 rounded shadow-md w-32">
          <li
            className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
            onClick={() => {
              setIsMenuOpen(false);
              setIsUpdate(true);
            }}
          >
            Update
          </li>
          <li
            className="px-4 py-2 hover:bg-gray-800 cursor-pointer text-red-600"
            onClick={() => {
              setIsMenuOpen(false);
              deleteDocument('tasks', id);
            }}
          >
            Delete
          </li>
        </ul>
      )}
    </div>
  );
};

export default Task;
