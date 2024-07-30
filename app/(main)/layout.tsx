import React from 'react';
import Image from 'next/image';
import logo from '@/public/static/images/logo.svg';

export default function MainLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (<>
        <header className='w-full p-6 flex items-center justify-center'>
            <Image
                className='w-[10rem]'
                priority
                src={logo}
                alt='Logo'
            />
        </header>
        <main className='relative w-full flex flex-col grow items-center overflow-y-auto p-6'>
            {children}
        </main>
        <footer className='w-full p-6 flex items-center justify-center'>
        </footer>
    </>);
}