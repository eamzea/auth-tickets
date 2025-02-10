import { API } from '@/constants/tasks';
import { NextResponse } from 'next/server';

export async function GET() {
  const response = await fetch(`${API}/tasks`);
  const data = await response.json();

  return NextResponse.json({
    data,
  });
}
