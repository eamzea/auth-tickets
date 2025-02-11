'use client';
import React, { Dispatch, useState } from 'react';

import { newTask } from '@/utils/fetcher';
import { useRouter } from 'next/navigation';
import { store } from '@/store/loader';

const NewTask = () => {
  const [task, setTask] = useState({
    title: '',
    details: '',
  });
  const router = useRouter();
  const { setLoading } = store();

  const handleChange =
    (setter: Dispatch<React.SetStateAction<typeof task>>, target: string) =>
    (event: { target: { value: string } }) => {
      setter({
        ...task,
        [target]: event.target.value,
      });
    };

  const handleCreateTask = async () => {
    setLoading(true);
    await newTask({ title: task.title, details: task.details });
    setLoading(false);

    router.push('/');
  };

  return (
    <section className='container mx-auto min-h-screen py-10'>
      <div className='max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold mb-6'>Task Manager</h1>

        <div className='mb-8'>
          <div className='mb-8'>
            <p>Create New Task</p>
            <span className='text-xs text-gray-500'>
              By default all new tasks are created with an uncompleted status
            </span>
          </div>
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='title'
                className='block text-sm font-medium text-gray-700'
              >
                Title
              </label>
              <input
                id='title'
                className='p-2 border rounded-md'
                onChange={handleChange(setTask, 'title')}
                placeholder='Enter task title'
                required
                value={task.title}
              />
            </div>
            <div>
              <label
                htmlFor='details'
                className='block text-sm font-medium text-gray-700'
              >
                Details
              </label>
              <textarea
                id='details'
                className='p-2 border rounded-md resize-none h-20 w-full'
                value={task.details}
                onChange={handleChange(setTask, 'details')}
                placeholder='Enter task details'
                rows={3}
                required
              />
            </div>
            <button
              className='flex items-center border px-10 py-5 rounded-full bg-black text-white disabled:opacity-75'
              onClick={handleCreateTask}
              disabled={!task.title || !task.details}
            >
              Create Task
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewTask;
