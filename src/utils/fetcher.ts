'use server';
import { ENV } from '@/constants/tasks';
import { TaskIT } from '@/types/task';
import { revalidatePath } from 'next/cache';

export const getTasks = async (): Promise<TaskIT[]> => {
  const req = await fetch(`${ENV}/api/tasks`);
  const { tasks } = await req.json();

  return tasks;
};

export const getTask = async (id: string): Promise<TaskIT> => {
  const req = await fetch(`${ENV}/api/tasks/${id}`);
  const { task } = await req.json();

  return task as TaskIT;
};

export const newTask = async ({ title, details }: Record<string, string>) => {
  await fetch(`${ENV}/api/tasks`, {
    method: 'POST',
    body: JSON.stringify({ title, details }),
  });

  return {
    ok: true,
  };
};

export const removeTask = async (id: string) => {
  await fetch(`${ENV}/api/tasks`, {
    method: 'DELETE',
    body: JSON.stringify(id),
  });

  revalidatePath('/');

  return {
    ok: true,
  };
};

export const updateTask = async ({
  id,
  title,
  details,
  completed,
}: Record<string, string | boolean>) => {
  await fetch(`${ENV}/api/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, details, completed }),
  });

  return {
    ok: true,
  };
};
