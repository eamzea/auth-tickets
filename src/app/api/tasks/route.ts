import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { TaskIT } from '@/types/task';
import path from 'path';

const folder = path.join(process.cwd(), '/public/tasks.json');

export async function GET() {
  const fold = await fs.readdir(process.cwd() + '/public/');
  console.log({
    dir: fold,
    folder,
  });
  const file = await fs.readFile(folder, 'utf8');
  const { tasks } = JSON.parse(file);

  return NextResponse.json({
    tasks,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const file = await fs.readFile(folder, 'utf8');
  const { tasks } = JSON.parse(file);

  const id = crypto.randomBytes(16).toString('hex');

  tasks.push({
    id,
    title: body.title,
    details: body.details,
    completed: false,
  });

  await fs.writeFile(folder, JSON.stringify({ tasks: [...tasks] }));

  return NextResponse.json({
    ok: true,
  });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const file = await fs.readFile(folder, 'utf8');
  const { tasks } = JSON.parse(file);

  const newTasks = tasks.filter((task: TaskIT) => task.id === body.id);

  await fs.writeFile(folder, JSON.stringify({ tasks: [...newTasks] }));

  return NextResponse.json({
    ok: true,
  });
}
