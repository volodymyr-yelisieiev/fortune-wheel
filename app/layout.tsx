import {Rubik} from 'next/font/google';
import '@/public/styles/globals.css';
import React from 'react';

const rubik = Rubik({subsets: ['latin']});

export const metadata = {
    title: 'Clayton', description: 'Your favourite crypto-pet',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (<html lang='en' className='flex flex-col items-center w-full h-full'>
    <body
        className={`${rubik.className} relative flex flex-col items-center w-full max-w-screen-lg h-full bg-[#0a2f4d] text-white overflow-hidden`}>
    {children}
    </body>
    </html>);
}