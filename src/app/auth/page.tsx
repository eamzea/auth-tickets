'use client';
import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

import LogIn from '@/components/LogIn';
import Loading from '@/components/Loading';
import { store } from '@/store/loader';

const Auth = () => {
  const { status } = useSession();
  const { setLoading } = store();

  if (status === 'authenticated') {
    setLoading(false);
    redirect('/');
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 text-black'>
      <div className='w-full max-w-md'>
        <section>
          <p className='text-center'>Welcome back!</p>
          <p className='text-center'>Log In</p>
        </section>
        <section>
          <div className='mt-4 flex items-center'>
            <div className='border-t flex-grow'></div>
            <span className='mx-4 text-sm text-gray-500'>Continue with</span>
            <div className='border-t flex-grow'></div>
          </div>
          <Suspense fallback={<Loading />}>
            <LogIn />
          </Suspense>
        </section>
      </div>
    </div>
  );
};

export default Auth;
