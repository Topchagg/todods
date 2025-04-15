'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { deskProps } from './interface';
import useDeleteFirestore from '@/customHooks/useDeleteFireStore';
import EditDeskForm from './forms/updateForm';

const Desk: FC<deskProps> = ({ name, id }) => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsShowMenu((prev) => !prev);
  };

  const { deleteDocument, success } = useDeleteFirestore();

  useEffect(() => {
    if (success) {
      window.location.reload();
    }
  }, [success]);

  return (
    <div className="relative group">
      <Link href={`/desks/${id}`} className="block">
        <div
          onContextMenu={handleContextMenu}
          className="w-[300px] h-[300px] bg-gray-800 border border-gray-600 rounded-2xl text-white text-2xl font-semibold flex justify-center items-center hover:bg-gray-700 transition-all duration-300 cursor-pointer shadow-md"
        >
          {name}
        </div>
      </Link>

      {isUpdate && <EditDeskForm desk={{ name, id }} />}

      {isShowMenu && (
        <div className="absolute top-2 left-2 z-10 bg-white text-sm rounded shadow-lg w-[140px]">
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
            onClick={() => {
              setIsShowMenu(false);
              setIsUpdate(true);
            }}
          >
            Update
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100 transition text-red-600"
            onClick={() => {
              deleteDocument('desks', id);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Desk;
