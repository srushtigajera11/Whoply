'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Scroll-reveal that never ships hidden content.
 *
 * The server render and first paint are fully visible — nothing is `opacity: 0`
 * in the SSR HTML, so the page still reads with JS disabled or hydration failed.
 * Only elements that are genuinely below the fold at mount get armed for the
 * fade-up; anything already on screen is marked shown and never animates.
 */
export function Reveal({
    children,
    delay = 0,
    className,
}: {
    children: ReactNode;
    delay?: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [armed, setArmed] = useState(false);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Already visible at hydration → leave it alone, no flash.
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
            setShown(true);
            return;
        }

        setArmed(true);
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShown(true);
                    io.disconnect();
                }
            },
            { threshold: 0.12 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const hidden = armed && !shown;

    return (
        <div
            ref={ref}
            className={cn(
                'transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none',
                hidden ? 'translate-y-3 opacity-0' : 'translate-y-0 opacity-100',
                className
            )}
            style={hidden ? undefined : { transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}
