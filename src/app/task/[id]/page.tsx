import React from 'react';
import { getTask } from '@/utils/fetcher';
import Task from '@/components/Task';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function generateStaticParams() {
  const tasks = await prisma.task.findMany()

  return tasks.map(task => ({
    id: task.id,
  }));
}

const TaskId = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const task = await getTask(id);

  return (
    <section className='container mx-auto min-h-screen py-10'>
      <div className='max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold mb-6'>Task Manager</h1>
        <Task task={task} />
      </div>
    </section>
  );
};

export default TaskId;
