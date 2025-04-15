'use client';
import { useParams } from 'next/navigation';

import { taskProps } from '@/entities/task/interface';
import taskMockData from '@/entities/task/mockData';
import Task from '@/entities/task/task';

const DeskPage = () => {
  const { id } = useParams();

  return (
    <div className="w-[80%] m-0 m-auto pt-20">
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
        <div className="text-[40px] active:scale-[0.90] hover:bg-gray-500 transition-all duration-300 cursor-pointer rounded-3xl p-3">
          Add user
        </div>
        <div className="text-[40px] active:scale-[0.90] hover:bg-gray-500 transition-all duration-300 cursor-pointer rounded-3xl p-3">
          Remove user
        </div>
        <div className="text-[40px] active:scale-[0.90] hover:bg-gray-500 transition-all duration-300 cursor-pointer rounded-3xl p-3">
          Add task
        </div>
      </div>
    </div>
  );
};

export default DeskPage;
