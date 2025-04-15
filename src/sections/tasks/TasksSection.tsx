'use client';
import { useParams } from 'next/navigation';
import AddTaskForm from './form/AddTask';

import Task from '@/entities/task/task';
import { useState } from 'react';
import { where } from 'firebase/firestore';
import useGetFireStoreData from '@/customHooks/useGetFirestore';
import { taskProps } from '@/entities/task/interface';

const TaskSection = () => {
  const { id } = useParams();

  const [isAddUser, setIsAddUser] = useState<boolean>(false);
  const [isRemoveUser, setIsRemoveUser] = useState<boolean>(false);
  const [isAddTask, setIsAddTask] = useState<boolean>(false);

  const result = useGetFireStoreData<taskProps>(
    'tasks',
    id ? [where('deskId', '==', id)] : []
  );

  if (isAddTask && id) {
    return <AddTaskForm deskId={id} setFunction={setIsAddTask} />;
  }

  if (result['data']) {
    return (
      <section>
        <div className="text-center text-[60px]">
          <h1>Tasks</h1>
        </div>
        <div className="mt-10">
          {result['data'].map((item, index) => (
            <div key={index}>
              <Task {...item} />
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-around pb-30">
          <div
            onClick={() => setIsAddUser(true)}
            className="text-[40px] active:scale-[0.90] hover:bg-gray-500 transition-all duration-300 cursor-pointer rounded-3xl p-3"
          >
            Add user
          </div>
          <div
            onClick={() => setIsRemoveUser(true)}
            className="text-[40px] active:scale-[0.90] hover:bg-gray-500 transition-all duration-300 cursor-pointer rounded-3xl p-3"
          >
            Remove user
          </div>
          <div
            onClick={() => setIsAddTask(true)}
            className="text-[40px] active:scale-[0.90] hover:bg-gray-500 transition-all duration-300 cursor-pointer rounded-3xl p-3"
          >
            Add task
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="text-[60px] pt-30">
      <h2>Looks like u dont have any task</h2>
    </div>
  );
};

export default TaskSection;
