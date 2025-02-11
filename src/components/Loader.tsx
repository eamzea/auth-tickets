'use client';

import { store } from '@/store/loader';

export default function Loader() {
  const { isLoading } = store();

  if (!isLoading) return null; // ✅ Hide loader if not loading

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-white'></div>
    </div>
  );
}
