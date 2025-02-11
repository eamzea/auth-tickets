'use server';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { authOptions } from './auth';

export const getTasks = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      tasks: [],
      ok: false,
      message: 'User is not authenticated',
    };
  }

  try {
    const req = await fetch(`${process.env.HOST}/api/tasks`, {
      headers: {
        id: session.user.id,
      },
    });
    const { tasks } = await req.json();

    return tasks;
  } catch {
    return [];
  }
};

export const getTask = async (id: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      ok: false,
      message: 'User is not authenticated',
    };
  }

  try {
    const req = await fetch(`${process.env.HOST}/api/tasks/${id}`, {
      headers: {
        id: session.user.id,
      },
    });
    const { task } = await req.json();

    return task;
  } catch {
    return {
      ok: false,
      message: 'Invalid task ID',
    };
  }
};

export const newTask = async ({ title, details }: Record<string, string>) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      tasks: [],
      ok: false,
      message: 'User is not authenticated',
    };
  }

  try {
    await fetch(`${process.env.HOST}/api/tasks`, {
      method: 'POST',
      body: JSON.stringify({ title, details }),
      headers: {
        id: session.user.id,
      },
    });

    return {
      ok: true,
    };
  } catch {
    return {
      ok: false,
      message: 'Failed to create a new task',
    };
  }
};

export const removeTask = async (id: string) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return {
        tasks: [],
        ok: false,
        message: 'User is not authenticated',
      };
    }

    await fetch(`${process.env.HOST}/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        id: session.user.id,
      },
    });

    revalidatePath('/');

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async ({
  id,
  title,
  details,
  completed,
}: Record<string, string | boolean>) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      tasks: [],
      ok: false,
      message: 'User is not authenticated',
    };
  }

  await fetch(`${process.env.HOST}/api/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, details, completed }),
    headers: {
      id: session.user.id,
    },
  });

  return {
    ok: true,
  };
};
