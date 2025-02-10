import Link from 'next/link';

import { CirclePlus } from 'lucide-react';
import { getTasks } from '@/utils/fetcher';
import TaskList from '@/components/TaskList';

const Home = async () => {
  const tasks = await getTasks();

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
        <TaskList tasks={tasks} />
      </section>
    </main>
  );
};

export default Home;
