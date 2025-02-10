import { ENV } from '@/constants/tasks';
import { TaskIT } from '@/types/task';

export const fetcher = (url: string) => fetch(url).then(r => r.json());

export const getTasks = async (): Promise<TaskIT[]> => {
  const req = await fetch(`${ENV}/api/tasks`);
  const { data } = await req.json();

  return data;
};
