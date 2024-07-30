import Link from 'next/link';
import React from 'react';

export default function HomePage() {
    return (<>
        <Link href={'/fortune-wheel'} className='m-auto'>
            <button className='bg-[#0c88f8] p-4 text-xl font-bold rounded'>
                Play Fortune Wheel!
            </button>
        </Link>
    </>);
}