'use client';
import { store } from '@/store/loader';
import { TaskIT } from '@/types/task';
import { updateTask } from '@/utils/fetcher';
import { useRouter } from 'next/navigation';
import React, { Dispatch, FC, useEffect, useState } from 'react';

interface TaskProps {
  task: TaskIT;
}

const Task: FC<TaskProps> = ({ task }) => {
  const [newTask, setNewTask] = useState({
    title: '',
    details: '',
    completed: false,
  });
  const router = useRouter();
  const {setLoading} = store()

  useEffect(() => {
    setNewTask({
      title: task.title,
      details: task.details,
      completed: task.completed,
    });
  }, []);

  const handleChange =
    (setter: Dispatch<React.SetStateAction<typeof newTask>>, target: string) =>
    (event: { target: { value: string } }) => {
      setter({
        ...newTask,
        [target]: event.target.value,
      });
    };

  const handleUpdateTask = async () => {
    setLoading(true)
    await updateTask({
      id: task.id,
      title: newTask.title,
      details: newTask.details,
      completed: newTask.completed,
    });

    setLoading(false)
    router.push('/');
  };

  return (
    <div className='mb-8'>
      <div className='mb-8'>
        <p>Task {task.title}</p>
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
            onChange={handleChange(setNewTask, 'title')}
            placeholder='Enter task title'
            required
            value={newTask.title}
          />
        </div>
        <div>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700'
          >
            Status: {newTask.completed ? 'Completed' : 'Not Completed'}
          </label>
          <label className='inline-flex items-center cursor-pointer mt-2'>
            <input
              type='checkbox'
              value=''
              className='sr-only peer'
              onChange={event => {
                setNewTask({ ...newTask, completed: event.target.checked });
              }}
              checked={newTask.completed}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600" />
          </label>
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
            value={newTask.details}
            onChange={handleChange(setNewTask, 'details')}
            placeholder='Enter task details'
            rows={3}
            required
          />
        </div>
        <button
          className='flex items-center border px-10 py-5 rounded-full bg-black text-white disabled:opacity-75'
          onClick={handleUpdateTask}
          disabled={!newTask.title || !newTask.details}
        >
          Modify Task
        </button>
      </div>
    </div>
  );
};

export default Task;
