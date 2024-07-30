import React from 'react';

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({onClose, children}: ModalProps) {
    return (<div className='fixed inset-0 flex items-center justify-center z-50'>
        <div
            className='absolute inset-0 backdrop-blur-lg'
            onClick={onClose}
        ></div>

        <div className='bg-[#0a2f4d] p-6 rounded-lg shadow-xl z-10 max-w-md w-full mx-4'>
            <div className='mb-4'>
                {children}
            </div>
            <button
                onClick={onClose}
                className='bg-[#0c88f8] p-4 w-full text-xl font-bold rounded'
            >
                Close
            </button>
        </div>
    </div>);
};