'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { MousePointerClick, Printer, QrCode, ScanBarcode, TabletSmartphone } from 'lucide-react';
import { getCopy, type Lang } from '@/i18n/landing';
import { MEDIA } from '@/lib/media';
import { cn } from '@/lib/cn';
import { SpotDot, SpotProgress, spotVars, useSpotCycle, type Spot } from './Hotspots';

/** Positions on `wigets.png`, in the order of `shopkeepers.kit.items`. */
const SPOTS: Spot[] = [
    { x: 32.5, y: 43, fx: 19, fy: 57, w: 25, h: 26 }, // billing tablet
    { x: 46.9, y: 65, fx: 46.9, fy: 56.5, w: 11.5, h: 21 }, // thermal printer
    { x: 65.6, y: 29, fx: 65.4, fy: 24.6, w: 8.5, h: 19 }, // barcode scanner
    { x: 86, y: 70, fx: 91, fy: 81, w: 10.5, h: 19.5 }, // UPI stand
];
const ICONS = [TabletSmartphone, Printer, ScanBarcode, QrCode];

/** The counter hardware Whoply works with — tap a dot, the rest of the photo steps back. */
export function CounterKit({ lang }: { lang: Lang }) {
    const kit = getCopy(lang).shopkeepers.kit;
    const { box, active, pick, cycling, interval } = useSpotCycle(SPOTS.length);
    const item = kit.items[active];

    return (
        <div ref={box} className="card overflow-hidden shadow-[0_24px_60px_-32px_rgb(15,43,70,0.4)]">
            <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5">
                <p className="eyebrow !text-navy">{kit.label}</p>
                <span className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
                    <MousePointerClick size={14} className="mr-1 text-accent-strong" />
                    {SPOTS.map((_, i) => (
                        <span
                            key={i}
                            className={cn(
                                'h-1.5 rounded-full transition-all duration-300',
                                i === active ? 'w-5 bg-accent-bright' : 'w-1.5 bg-border'
                            )}
                        />
                    ))}
                </span>
            </div>

            <div className="spot-stage relative bg-bg" style={spotVars(SPOTS[active], 0.28)}>
                <Image
                    src={MEDIA.counterKit.src}
                    alt={MEDIA.counterKit.alt[lang]}
                    width={MEDIA.counterKit.width}
                    height={MEDIA.counterKit.height}
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="spot-mask h-auto w-full"
                />
                {SPOTS.map((s, i) => (
                    <SpotDot key={i} spot={s} active={i === active} onSelect={() => pick(i)} />
                ))}
            </div>

            <div className="border-t border-border p-4 sm:p-5">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {kit.items.map((it, i) => {
                        const Icon = ICONS[i];
                        const on = i === active;
                        return (
                            <button
                                key={it.title}
                                type="button"
                                aria-pressed={on}
                                aria-controls="counter-kit-detail"
                                onClick={() => pick(i)}
                                onPointerEnter={(e) => e.pointerType === 'mouse' && pick(i)}
                                className={cn(
                                    'relative flex items-center gap-2 overflow-hidden rounded-xl border px-3 py-2.5 text-left text-[0.8rem] font-semibold transition-colors duration-200',
                                    on
                                        ? 'border-navy bg-navy text-white'
                                        : 'border-border bg-surface text-navy hover:border-navy/40'
                                )}
                            >
                                <Icon size={16} aria-hidden="true" className={on ? 'text-sand' : 'text-accent-strong'} />
                                <span className="leading-tight">{it.title}</span>
                                {on && cycling && (
                                    <SpotProgress key={active} ms={interval} className="absolute inset-x-0 bottom-0 rounded-none" />
                                )}
                            </button>
                        );
                    })}
                </div>

                <div id="counter-kit-detail" className="mt-3 min-h-[3rem]">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.p
                            key={active}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.25 }}
                            className={cn('text-[0.95rem] leading-relaxed', item ? 'text-text' : 'text-muted')}
                        >
                            {item ? item.body : kit.hint}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
