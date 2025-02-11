import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import { TaskIT } from '@/types/task';
import path from 'path';

const folder = path.join(process.cwd(), '/public/tasks.json');

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const file = await fs.readFile(folder, 'utf8');
  const { tasks } = JSON.parse(file);

  const task = tasks.filter((task: TaskIT) => task.id === id)[0];

  return NextResponse.json({
    task,
  });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const {title, details, completed} = await request.json();
  const file = await fs.readFile(folder, 'utf8');
  const { tasks } = JSON.parse(file);

  const newTasks = tasks.map((task: TaskIT) => {
    if (task.id === id) {
      task.title = title
      task.details = details
      task.completed = completed
    }

    return task
  });

  await fs.writeFile(folder, JSON.stringify({ tasks: [...newTasks] }));

  return NextResponse.json({
    ok: true,
  });
}
