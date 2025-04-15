'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { deskProps } from './interface';
import useDeleteFirestore from '@/customHooks/useDeleteFireStore';
import EditDeskForm from './forms/updateForm';
import AddUserForm from './forms/AddUserForm';
import RemoveUserForm from './forms/RemoveUserForm';
import routes from '@/constants/routes';

const Desk: FC<deskProps> = ({
  name,
  id,
  admins,
  viewers,
  isOwner,
  userId,
}) => {
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isAddUser, setIsAddUser] = useState<boolean>(false);
  const [isRemoveUser, setIsRemoveUser] = useState<boolean>(false);

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
      <Link href={routes['desks/id'](id)} className="block">
        <div
          onContextMenu={handleContextMenu}
          className="w-[300px] h-[300px] bg-gray-800 border border-gray-600 rounded-2xl text-white text-2xl font-semibold flex justify-center items-center hover:bg-gray-700 transition-all duration-300 cursor-pointer shadow-md"
        >
          {name}
        </div>
      </Link>

      {isUpdate && (
        <EditDeskForm
          desk={{ name, id, admins, viewers, userId }}
          setFunction={setIsUpdate}
        />
      )}

      {isRemoveUser && (
        <RemoveUserForm
          deskId={id}
          admins={admins}
          viewers={viewers}
          setFunction={setIsRemoveUser}
        />
      )}

      {isAddUser && (
        <AddUserForm
          deskId={id}
          setFunction={setIsAddUser}
          users={{
            admins: admins,
            viewers: viewers,
          }}
        />
      )}

      {isShowMenu && isOwner && (
        <div className="absolute top-2 left-2 z-10 bg-black text-white text-sm rounded shadow-lg w-[140px]">
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-900 transition"
            onClick={() => {
              setIsShowMenu(false);
              setIsUpdate(true);
            }}
          >
            Update
          </button>

          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-900 transition"
            onClick={() => {
              setIsShowMenu(false);
              setIsAddUser(true);
            }}
          >
            Add user
          </button>

          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-900 transition"
            onClick={() => {
              setIsRemoveUser(true);
            }}
          >
            Remove user
          </button>

          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-900 transition text-red-600"
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
