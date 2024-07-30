'use client';

import {useAnimate, useMotionValue, useMotionValueEvent} from 'framer-motion';
import {useState} from 'react';
import Modal from '@/components/Modal';
import FortuneWheel from '@/components/FortuneWheel';

export default function FortuneWheelPage() {
    const [currentPrize, setCurrentPrize] = useState<string | null>('?');
    const [spinResult, setSpinResult] = useState<string | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scope, animate] = useAnimate();
    const rotation = useMotionValue(0);

    const labels = ['1 FS', '5 CL', '3 FS', '10 CL', '5 FS', '30 CL', '3 FS', '10 CL', '1 FS', '5 CL'];
    const colors = ['#34adef', '#67c1f3'];
    const numberOfSegments = labels.length;
    const anglePerSegment = 360 / numberOfSegments;

    const calculatePrize = (angle: number) => {
        const normalizedAngle = (angle + anglePerSegment / 2) % 360;
        const prizeId = Math.floor(normalizedAngle / anglePerSegment);
        return labels[prizeId];
    };

    const updateCurrentPrize = () => {
        const currentRotation = rotation.get() % 360;
        const prize = calculatePrize(currentRotation);
        setCurrentPrize(prize);
    };

    useMotionValueEvent(rotation, 'change', updateCurrentPrize);

    const handleSpin = async () => {
        if (isSpinning) return;

        setIsSpinning(true);
        const resultId = Math.floor(Math.random() * numberOfSegments);
        const resultAngle = resultId * anglePerSegment - (anglePerSegment / 2) + Math.random() * anglePerSegment;
        const fullSpins = 15;
        const totalRotation = fullSpins * 360 + resultAngle;

        const resultPrize = labels[resultId];
        setSpinResult(resultPrize);

        await animate(scope.current, {rotate: totalRotation}, {
            duration: 10, ease: [0.0, 0.0, 0.25, 1], type: 'tween'
        });

        const closestSegmentId = Math.round(totalRotation / anglePerSegment);
        const nearestSegmentCenterAngle = (closestSegmentId * anglePerSegment);

        await animate(scope.current, {rotate: nearestSegmentCenterAngle}, {
            duration: 0.5, ease: [0.25, 0.1, 0.25, 1], type: 'tween'
        });

        setIsSpinning(false);
        setIsModalOpen(true);

        rotation.set(0);
        setCurrentPrize('?');
    };

    return (<>
        <div
            className='flex items-center justify-center w-[9rem] h-[9rem] rounded-full bg-[#1f3f5b] text-4xl font-bold'>
            {currentPrize}
        </div>
        <FortuneWheel
            className='absolute w-[125%] max-w-screen-xl bottom-0 translate-y-[35%]'
            scope={scope}
            rotation={rotation}
            labels={labels}
            colors={colors}
            isSpinning={isSpinning}
            handleSpin={handleSpin}
        />
        {isModalOpen && (<Modal onClose={() => setIsModalOpen(false)}>
            <p>Your spin result is: {spinResult}</p>
        </Modal>)}
    </>);
}