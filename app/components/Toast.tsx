'use client'

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
    message: string;
    duration?: number;
    onClose: () => void;
}

export function Toast({ message, duration = 3000, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for fade out animation
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div
            className={`fixed bottom-4 right-4 flex items-center gap-2 bg-neutral-800 text-neutral-200 px-4 py-3 rounded-lg shadow-lg transition-opacity duration-300 ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <Check className="w-5 h-5 text-green-500" />
            <span>{message}</span>
        </div>
    );
} 