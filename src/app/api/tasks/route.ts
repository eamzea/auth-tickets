import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { validateUser } from '@/utils/validateUser';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const id = req.headers.get('id');

  const result = await validateUser(id);

  if (!result.ok) {
    return NextResponse.json({
      ok: false,
      ...result.response,
    });
  }

  return NextResponse.json({
    tasks: result.user.tasks,
  });
}

export async function POST(req: NextRequest) {
  const id = req.headers.get('id');

  try {
    const result = await validateUser(id);

    if (!result.ok) {
      return NextResponse.json({
        ok: false,
        ...result.response,
      });
    }

    const { title, details } = await req.json();

    await prisma.task.create({
      data: {
        title,
        details,
        completed: false,
        userId: result.user.id,
      },
    });

    return NextResponse.json({
      ok: true,
    });
  } catch {
    return NextResponse.json({
      ok: false,
      message: 'Server Error',
    });
  }
}
