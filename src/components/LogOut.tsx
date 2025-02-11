'use client';
import { signOut } from 'next-auth/react';
import React from 'react';

const LogOut = () => {
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/signin' });
  };

  return (
    <button
      data-testid='logout'
      onClick={handleLogout}
      className='mt-4 px-4 py-2 bg-red-500 text-white rounded'
    >
      Logout
    </button>
  );
};

export default LogOut;
