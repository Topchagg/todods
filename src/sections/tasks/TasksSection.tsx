'use client';
import { useParams } from 'next/navigation';
import AddTaskForm from './form/AddTask';

import Task from '@/entities/task/task';
import { useEffect, useState } from 'react';
import { where } from 'firebase/firestore';
import useGetFireStoreData from '@/customHooks/useGetFirestore';
import { taskProps } from '@/entities/task/interface';
import { deskData } from '@/entities/desk/interface';
import useGetDocById from '@/customHooks/useGetDocById';
import { useAuthStore } from '@/store/userStore';
import LoadingItem from '@/shared/LoadingItem';

const TaskSection = () => {
  const { id } = useParams<{ id: string }>();

  const [isAddTask, setIsAddTask] = useState<boolean>(false);
  const [isAbleToEdit, setIsAbleToEdit] = useState<boolean>(false);
  const [isAbleToView, setIsAbleToView] = useState<boolean>(false);

  const user = useAuthStore((state) => state.user);

  const tasks = useGetFireStoreData<taskProps>(
    'tasks',
    id ? [where('deskId', '==', id)] : []
  );

  const { data: desk } = useGetDocById<deskData>('desks', id);

  useEffect(() => {
    if (user && desk) {
      const isOwner = user.uid === desk.userId;
      const isAdmin = desk.admins?.some((admin) => admin.email === user.email);
      const isViewer = desk.viewers?.some(
        (viewer) => viewer.email === user.email
      );

      if (isOwner || isAdmin) {
        setIsAbleToEdit(true);
        console.log('s');
      } else if (isViewer) {
        setIsAbleToView(true);
      }
    }
  }, [desk, user, desk]);

  if (!user && !desk) {
    return <LoadingItem />;
  }

  if (isAddTask && id && isAbleToEdit) {
    return <AddTaskForm deskId={id} setFunction={setIsAddTask} />;
  }

  if (tasks['data'].length > 0 && (isAbleToView || isAbleToEdit)) {
    return (
      <section>
        <div className="text-center text-[60px]">
          <h1>Tasks</h1>
        </div>
        <div className="mt-10">
          {tasks['data'].map((item, index) => (
            <div key={index}>
              <Task {...item} isAbleToEdit={isAbleToEdit} />
            </div>
          ))}
        </div>
        {isAbleToEdit && (
          <div className="mt-10 flex justify-around pb-30">
            <div
              onClick={() => setIsAddTask(true)}
              className="text-[40px] active:scale-[0.90] hover:bg-gray-500 transition-all duration-300 cursor-pointer rounded-3xl p-3"
            >
              Add task
            </div>
          </div>
        )}
      </section>
    );
  }
  if (tasks['data'].length === 0 && (isAbleToView || isAbleToEdit)) {
    return (
      <div className="text-[60px] pt-30 text-center w-1/2 m-0 m-auto">
        <h2>Looks like u dont have any task</h2>
        {isAbleToEdit && (
          <div className="mt-10 flex justify-around pb-30">
            <div
              onClick={() => setIsAddTask(true)}
              className="text-[40px] active:scale-[0.90] hover:bg-gray-500 transition-all duration-300 cursor-pointer rounded-3xl p-3"
            >
              Add task
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="text-[60px] pt-30 text-center w-1/2 m-0 m-auto">
      Looks like u dont have any accesss
    </div>
  );
};

export default TaskSection;
