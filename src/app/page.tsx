'use client';
import { CirclePlus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Learn React', completed: false },
    { id: 2, title: 'Build a task list app', completed: false },
    { id: 3, title: 'Deploy to production', completed: false },
  ]);

  return (
    <main className='container mx-auto min-h-screen py-10'>
      <p>Hello User</p>
      <section className='max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-bold'>My Tasks</h1>
          <Link href='/new-task'>
            <CirclePlus />
          </Link>
        </div>
        <ul className='space-y-4'>
          {tasks.map(task => (
            <li
              key={task.id}
              className='flex items-center justify-between p-3 bg-gray-50 rounded-md'
            >
              <Link
                href={`/task/${task.id}`}
              >
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
              <button className='h-8 w-8 p-0'>
                <Trash2 className='h-4 w-4' />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Home;
