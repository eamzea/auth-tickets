'use client';
import React from 'react';
import { redirect, useRouter, useSearchParams } from 'next/navigation';

import { Github, User } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';

const Auth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const { status } = useSession()

  if (status === "authenticated") {
    redirect('/')
  }

  const handleOAuth = async (provider: string) => {
    await signIn(provider, {
      callbackUrl: provider === 'github' ? callbackUrl : '/',
    });

    router.replace('/');
  };

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
          <div className='my-10 flex items-center justify-around'>
            <button
              className='flex items-center border px-10 py-5 rounded-full bg-black text-white'
              onClick={() => handleOAuth('github')}
            >
              <Github className='mr-2 h-4 w-4' /> GitHub
            </button>
            <button
              className='flex items-center border px-10 py-5 rounded-full bg-black text-white'
              onClick={() => handleOAuth('credentials')}
            >
              <User className='mr-2 h-4 w-4' /> Custom
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Auth;
