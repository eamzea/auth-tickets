import { NextRequest, NextResponse } from 'next/server';
import { validateUser } from '@/utils/validateUser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const taskId = (await params).id;
  const id = req.headers.get('id');

  const result = await validateUser(id);

  if (!result.ok) {
    return NextResponse.json({
      ok: false,
      ...result.response,
    });
  }

  return NextResponse.json({
    task: result.user.tasks.filter(task => task.id === taskId)[0],
  });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = req.headers.get('id');

  const result = await validateUser(userId);

  if (!result.ok) {
    return NextResponse.json({
      ok: false,
      ...result.response,
    });
  }
  const id = (await params).id;
  const { title, details, completed } = await req.json();

  await prisma.task.update({
    where: { id },
    data: {
      title,
      details,
      completed,
    },
  });

  return NextResponse.json({
    ok: true,
  });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userId = req.headers.get('id');

  const result = await validateUser(userId);

  if (!result.ok) {
    return NextResponse.json({
      ok: false,
      ...result.response,
    });
  }
  const id = (await params).id;

  await prisma.task.delete({
    where: { id },
  });

  return NextResponse.json({
    ok: true,
  });
}
