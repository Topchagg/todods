'use client';
import { useParams } from 'next/navigation';
import AddTaskForm from './form/AddTask';

import taskMockData from '@/entities/task/mockData';
import Task from '@/entities/task/task';
import { useState } from 'react';

const TaskSection = () => {
  const { id } = useParams();

  const [isAddUser, setIsAddUser] = useState<boolean>(false);
  const [isRemoveUser, setIsRemoveUser] = useState<boolean>(false);
  const [isAddTask, setIsAddTask] = useState<boolean>(false);

  if (isAddTask && id) {
    return <AddTaskForm deskId={id} setFunction={setIsAddTask} />;
  }

  return (
    <section>
      <div className="text-center text-[60px]">
        <h1>Tasks</h1>
      </div>
      <div className="mt-10">
        {taskMockData.map((item, index) => (
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
};

export default TaskSection;
