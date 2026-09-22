'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * 'static' — on screen at hydration (or no JS): render normally, never animate.
 * 'hidden' — below the fold at mount: armed, waiting to scroll into view.
 * 'shown'  — scrolled into view: play the entrance.
 *
 * The server render is always 'static', so nothing ships hidden in the HTML and
 * the page still reads with JS disabled or hydration failed.
 */
export type RevealState = 'static' | 'hidden' | 'shown';

export function useReveal<T extends Element>(threshold = 0.15) {
    const ref = useRef<T>(null);
    const [state, setState] = useState<RevealState>('static');

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

        setState('hidden');
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setState('shown');
                    io.disconnect();
                }
            },
            { threshold, rootMargin: '0px 0px -8% 0px' }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [threshold]);

    return [ref, state] as const;
}

type Variant = 'up' | 'left' | 'right' | 'zoom' | 'wipe';

const HIDDEN: Record<Variant, string> = {
    up: 'translate-y-12 opacity-0',
    left: '-translate-x-14 opacity-0',
    right: 'translate-x-14 opacity-0',
    zoom: 'scale-[0.88] opacity-0',
    // Curtain from the bottom edge — for photos.
    wipe: '[clip-path:inset(100%_0_0_0_round_16px)]',
};

const SHOWN: Record<Variant, string> = {
    up: 'translate-y-0 opacity-100',
    left: 'translate-x-0 opacity-100',
    right: 'translate-x-0 opacity-100',
    zoom: 'scale-100 opacity-100',
    wipe: '[clip-path:inset(0_0_0_0_round_16px)]',
};

export function Reveal({
    children,
    delay = 0,
    variant = 'up',
    className,
}: {
    children: ReactNode;
    delay?: number;
    variant?: Variant;
    className?: string;
}) {
    const [ref, state] = useReveal<HTMLDivElement>();

    const motionClass = cn(
        // Transition only on the way in — arming (static → hidden) must be instant.
        state === 'shown' &&
            'transition-[opacity,transform,clip-path] duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
        state === 'static' ? '' : state === 'hidden' ? HIDDEN[variant] : SHOWN[variant]
    );
    const style = state === 'shown' ? { transitionDelay: `${delay}ms` } : undefined;

    // A fully clip-pathed element counts as not intersecting, so the observer
    // would never fire — watch an unclipped wrapper and clip the inner layer.
    if (variant === 'wipe') {
        return (
            <div ref={ref} className={className}>
                <div className={motionClass} style={style}>
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div ref={ref} className={cn(motionClass, className)} style={style}>
            {children}
        </div>
    );
}
