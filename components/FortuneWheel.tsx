import {motion} from 'framer-motion';
import Image from 'next/image';
import frame from '@/public/static/images/frame.svg';
import SegmentedCircle from '@/components/SegmentedCircle';
import Arrow from '@/components/Arrow';
import {MdAutorenew} from 'react-icons/md';
import React from 'react';

interface FortuneWheelProps {
    scope: React.RefObject<HTMLDivElement>;
    rotation: any;
    labels: string[];
    colors: string[];
    isSpinning: boolean;
    handleSpin: () => void;
    className?: string;
}

export default function FortuneWheel({
                                         scope, rotation, labels, colors, isSpinning, handleSpin, className = ''
                                     }: FortuneWheelProps) {
    return (<div
        className={`${className} flex items-center justify-center aspect-square`}
    >
        <motion.div
            ref={scope}
            className='absolute w-full h-full origin-center'
            style={{rotate: rotation}}
        >
            <SegmentedCircle labels={labels} colors={colors}/>
        </motion.div>
        <Image
            className='absolute w-full h-full'
            priority
            src={frame}
            alt='Frame'
        />
        <div className='absolute w-[20%]'>
            <Arrow/>
        </div>
        <button
            className={`absolute w-[15%] aspect-square rounded-full flex items-center justify-center bg-[#0198eb] transition-transform duration-500 ${isSpinning ? 'cursor-not-allowed opacity-50' : 'hover:bg-[#0189d4] active:bg-[#017abc] ease-in-out hover:rotate-180'}`}
            onClick={isSpinning ? undefined : handleSpin}
            disabled={isSpinning}
        >
            <MdAutorenew className='w-[75%] h-[75%]'/>
        </button>
    </div>);
}