import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { CirclePlus } from 'lucide-react';

import { getTasks } from '@/utils/fetcher';
import TaskList from '@/components/TaskList';
import { authOptions } from '@/utils/auth';
import LogOut from '@/components/LogOut';

const Home = async () => {
  const tasks = await getTasks();
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth'); // Redirect if not authenticated
  }

  return (
    <main className='container mx-auto min-h-screen py-10'>
      <div className='flex items-center justify-around'>
        <p>Hello {session.user?.name}</p>
      <LogOut />
      </div>
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
