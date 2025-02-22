'use client'
import React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Github, User } from 'lucide-react';
import { store } from '@/store/loader';

const LogIn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const { setLoading } = store();

  const handleOAuth = async (provider: string) => {
    setLoading(true)
    await signIn(provider, {
      callbackUrl: provider === 'github' ? callbackUrl : '/',
    });

    router.replace('/');
  };
  return (
    <div className='my-10 flex items-center justify-around'>
      <button
        data-testid="github-login"
        className='flex items-center border px-10 py-5 rounded-full bg-black text-white'
        onClick={() => handleOAuth('github')}
      >
        <Github className='mr-2 h-4 w-4' /> GitHub
      </button>
      <button
        data-testid="custom-login"
        className='flex items-center border px-10 py-5 rounded-full bg-black text-white'
        onClick={() => handleOAuth('credentials')}
      >
        <User className='mr-2 h-4 w-4' /> Custom
      </button>
    </div>
  );
};

export default LogIn;
