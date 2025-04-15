import { FC } from 'react';
import { taskProps } from './interface';

const Task: FC<taskProps> = ({ name, description, status }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white mb-4">
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
  );
};

export default Task;
