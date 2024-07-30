import React from 'react';
import Image from 'next/image';
import logo from '@/public/static/images/logo.svg';
import Link from 'next/link';
import {MdArrowBackIosNew} from 'react-icons/md';

export default function SideLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (<>
        <header className='w-full p-6 flex items-center justify-center'>
            <Link href={'/'} className='absolute left-6'>
                <MdArrowBackIosNew className='size-6'/>
            </Link>
            <Image
                className='w-[10rem]'
                priority
                src={logo}
                alt='Logo'
            />
        </header>
        <main className='relative w-full flex flex-col grow items-center overflow-hidden p-6'>
            {children}
        </main>
    </>);
}