"use client";

import { useEffect, useRef } from "react";

interface BackgroundBeamsProps extends React.HTMLProps<HTMLDivElement> {}

export function BackgroundBeams({ className = "", ...props }: BackgroundBeamsProps) {
    const beamsRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = beamsRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        let animationFrameId: number;
        let time = 0;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            context.scale(dpr, dpr);
        };

        const draw = () => {
            const { width, height } = canvas;
            context.clearRect(0, 0, width, height);

            const gradient = context.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, "rgba(59, 130, 246, 0.2)"); // blue
            gradient.addColorStop(0.5, "rgba(16, 185, 129, 0.2)"); // green
            gradient.addColorStop(1, "rgba(236, 72, 153, 0.2)"); // pink

            context.fillStyle = gradient;
            context.fillRect(0, 0, width, height);

            // Draw animated beams
            const numBeams = 8;
            for (let i = 0; i < numBeams; i++) {
                const x = width * (i / numBeams);
                const y = height * 0.5;
                const angle = (time + i * Math.PI * 2) / numBeams;
                
                context.save();
                context.translate(x, y);
                context.rotate(angle);
                
                const gradient = context.createLinearGradient(0, -height, 0, height);
                gradient.addColorStop(0, "rgba(59, 130, 246, 0)");
                gradient.addColorStop(0.5, "rgba(16, 185, 129, 0.1)");
                gradient.addColorStop(1, "rgba(236, 72, 153, 0)");
                
                context.fillStyle = gradient;
                context.fillRect(-10, -height, 20, height * 2);
                context.restore();
            }

            time += 0.005;
            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener("resize", resize);
        resize();
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className={`fixed inset-0 z-0 ${className}`} {...props}>
            <canvas
                ref={beamsRef}
                className="h-full w-full"
                style={{ mixBlendMode: "plus-lighter" }}
            />
        </div>
    );
} 