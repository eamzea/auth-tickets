'use client';
import { TaskIT } from '@/types/task';
import { removeTask } from '@/utils/fetcher';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import React, { FC } from 'react';

interface TaskListProps {
  tasks: TaskIT[];
}

const TaskList: FC<TaskListProps> = ({ tasks }) => {
  const handleDelete = async (id: string) => {
    await removeTask(id);
  };

  return (
    <ul className='space-y-4'>
      {tasks.map(task => (
        <li
          key={task.id}
          className='flex items-center justify-between p-3 bg-gray-50 rounded-md'
        >
          <Link href={`/task/${task.id}`} className='w-2/3'>
            <div className='flex items-center space-x-3'>
              <p
                className={`text-sm font-medium leading-none hover:cursor-pointer ${
                  task.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {task.title}
              </p>
            </div>
          </Link>
          <button
            className='h-8 w-8 p-0'
            onClick={() => handleDelete(task.id)}
          >
            <Trash2 className='h-4 w-4' />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
