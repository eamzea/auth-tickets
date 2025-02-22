"use client"
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import Loader from '@/components/Loader';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang='en'>
        <head>
          <title>Next App</title>
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Loader />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
