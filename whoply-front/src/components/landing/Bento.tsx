'use client';

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
    BarChart3,
    BellRing,
    Bike,
    Boxes,
    CheckCheck,
    Crown,
    EyeOff,
    Lock,
    Receipt,
    ShoppingCart,
    Truck,
    Users,
    Wallet,
    Warehouse,
    type LucideIcon,
} from 'lucide-react';
import { getCopy, type Lang } from '@/i18n/landing';
import { cn } from '@/lib/cn';
import { useReveal } from './Reveal';
import { CountUp } from './Motion';

/* Entrance: tiles rise and settle one after another. The 'hidden' step is
   instant (duration 0) — it only happens while the grid is still off-screen. */
const grid: Variants = { hidden: {}, shown: { transition: { staggerChildren: 0.09 } } };
const tile: Variants = {
    hidden: { opacity: 0, y: 80, scale: 0.92, transition: { duration: 0 } },
    shown: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 110, damping: 18 } },
};

/** A bento tile with a cursor-following glow. */
function Tile({ children, className, dark = false }: { children: ReactNode; className?: string; dark?: boolean }) {
    const onMove = (e: PointerEvent<HTMLDivElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    return (
        <motion.div
            variants={tile}
            onPointerMove={onMove}
            className={cn(
                'spotlight relative flex flex-col overflow-hidden rounded-3xl border p-7 transition-shadow duration-300',
                dark
                    ? 'spotlight-dark border-white/10 bg-navy text-white hover:shadow-[0_30px_60px_-28px_rgb(15,43,70,0.7)]'
                    : 'border-border bg-surface hover:shadow-[0_30px_60px_-30px_rgb(15,43,70,0.35)]',
                className
            )}
        >
            {children}
        </motion.div>
    );
}

function Head({ Icon, title, body, dark = false }: { Icon: LucideIcon; title: string; body: string; dark?: boolean }) {
    return (
        <div className="relative">
            <div
                className={cn(
                    'grid h-11 w-11 place-items-center rounded-xl',
                    dark ? 'bg-white/10 text-sand' : 'bg-accent-tint text-accent-strong'
                )}
            >
                <Icon size={20} aria-hidden="true" />
            </div>
            <h3 className={cn('mt-5 font-display text-xl font-bold', dark ? 'text-white' : 'text-navy')}>{title}</h3>
            <p className={cn('mt-2 text-[0.95rem] leading-relaxed', dark ? 'text-white/70' : 'text-muted')}>{body}</p>
        </div>
    );
}

const d = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

export function Bento({ lang }: { lang: Lang }) {
    const t = getCopy(lang);
    const [c0, c1, c2, c3, c4, c5] = t.features.cards;
    const m = t.hero.mock;
    const [ref, state] = useReveal<HTMLDivElement>(0.1);

    // Loops pause while the grid is off-screen — no work for animations nobody sees.
    const [onScreen, setOnScreen] = useState(true);
    const box = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting));
        if (box.current) io.observe(box.current);
        return () => io.disconnect();
    }, []);

    const stock: [string, number, number][] = [
        [m.rows[0][0], 0.2, 5200],
        [m.rows[1][0], 0.5, 7400],
        [m.rows[2][0], 0.92, 6100],
        ['Amul Butter 100g', 0.64, 8300],
        ['Maggi 70g', 0.36, 9100],
    ];
    const udhar: [string, number][] = [
        ['₹12,400', 3],
        ['₹8,250', 2],
        ['₹3,100', 1],
    ];
    const bars = [0.35, 0.5, 0.42, 0.66, 0.58, 0.8, 0.95];

    return (
        <div ref={box} className={cn('bento', !onScreen && 'bento-paused')}>
            <motion.div
                ref={ref}
                variants={grid}
                initial={false}
                animate={state === 'hidden' ? 'hidden' : 'shown'}
                className="mt-14 grid grid-flow-dense gap-5 md:grid-cols-2 lg:grid-cols-3"
            >
                {/* ── Billing — the lead tile ───────────────── */}
                <Tile dark className="md:col-span-2">
                    <div className="grid h-full gap-8 sm:grid-cols-[1fr_15rem] sm:items-center">
                        <Head dark Icon={Receipt} title={c0.title} body={c0.body} />
                        <div className="relative mx-auto w-full max-w-[15rem] -rotate-2 rounded-2xl bg-white p-4 text-text shadow-[0_24px_50px_-20px_rgb(0,0,0,0.5)]">
                            <p className="flex items-center gap-2 text-xs font-bold text-navy">
                                <Receipt size={14} aria-hidden="true" /> {m.retailAction}
                            </p>
                            <ul className="mt-3 space-y-2 border-t border-dashed border-border pt-3 text-xs">
                                {m.bill.retailItems.map(([name, qty, amt], i) => (
                                    <li key={name} className="bento-line flex justify-between gap-2" style={d(300 + i * 450)}>
                                        <span className="truncate">
                                            {name} <span className="text-muted">{qty}</span>
                                        </span>
                                        <span className="tabular">₹{amt}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="bento-line mt-3 flex items-center justify-between border-t border-border pt-2" style={d(1700)}>
                                <span className="text-xs text-muted">{m.bill.total}</span>
                                <span className="tabular font-display text-lg font-extrabold text-navy">
                                    ₹{m.bill.retailItems.reduce((s, [, , a]) => s + a, 0)}
                                </span>
                            </div>
                            <span
                                className="bento-stamp absolute -top-3 -right-3 rounded-lg border-2 border-success bg-success-tint px-2 py-1 text-xs font-extrabold text-success"
                                style={d(2100)}
                            >
                                GST ✓
                            </span>
                        </div>
                    </div>
                </Tile>

                {/* ── Stock — tall tile, levels draining and refilling ── */}
                <Tile className="lg:row-span-2">
                    <Head Icon={Boxes} title={c1.title} body={c1.body} />
                    <ul className="mt-8 space-y-4">
                        {stock.map(([name, level, ms], k) => (
                            <li key={name}>
                                <p className="text-xs font-medium text-text">{name}</p>
                                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-2">
                                    <div
                                        className="bento-drain h-full origin-left rounded-full bg-success"
                                        // Negative delay starts each bar mid-cycle so they never move in lockstep.
                                        style={{
                                            width: `${level * 100}%`,
                                            animationDuration: `${ms}ms`,
                                            animationDelay: `-${(k * ms) / stock.length}ms`,
                                        }}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-auto pt-8">
                        <div className="flex items-center gap-3 rounded-2xl bg-danger-tint px-4 py-3 text-danger">
                            <BellRing size={18} className="bento-ring shrink-0" aria-hidden="true" />
                            <p className="text-sm font-semibold">
                                {m.rows[0][0]} · {m.rows[0][1]}
                            </p>
                        </div>
                    </div>
                </Tile>

                {/* ── Udhar ─────────────────────────────────── */}
                <Tile>
                    <Head Icon={Wallet} title={c2.title} body={c2.body} />
                    <div className="mt-6 rounded-2xl bg-surface-2 p-4">
                        <p className="text-xs text-muted">{m.retailTiles[3][0]}</p>
                        <p className="tabular font-display text-2xl font-extrabold text-danger">
                            <CountUp value={m.retailTiles[3][1]} onView />
                        </p>
                        <ul className="mt-3 space-y-2">
                            {udhar.map(([amt, age], i) => (
                                <li key={amt} className="flex items-center gap-3 text-sm">
                                    <span className="grid h-7 w-7 place-items-center rounded-full bg-navy-tint text-navy">
                                        <Users size={13} aria-hidden="true" />
                                    </span>
                                    <span className="flex gap-1" aria-hidden="true">
                                        {[0, 1, 2].map((k) => (
                                            <span
                                                key={k}
                                                className={cn('h-1.5 w-1.5 rounded-full', k < age ? 'bg-danger' : 'bg-border')}
                                            />
                                        ))}
                                    </span>
                                    <span className="tabular ml-auto font-semibold text-navy">{amt}</span>
                                    <span
                                        className="bento-sent grid h-6 w-6 place-items-center rounded-full bg-[#25D366] text-white"
                                        style={d(600 + i * 500)}
                                    >
                                        <CheckCheck size={12} aria-hidden="true" />
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Tile>

                {/* ── Dispatch — a truck running the route ───── */}
                <Tile>
                    <Head Icon={Truck} title={c3.title} body={c3.body} />
                    <div className="mt-auto pt-8">
                        <div className="relative h-8">
                            <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-surface-2" />
                            <div className="bento-progress absolute inset-x-0 top-1/2 h-1 origin-left -translate-y-1/2 rounded-full bg-accent-bright" />
                            <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between">
                                {[0, 1, 2, 3].map((k) => (
                                    <span key={k} className="h-3 w-3 rounded-full border-2 border-accent-bright bg-surface" />
                                ))}
                            </div>
                            <div className="bento-rail absolute inset-0">
                                <span className="absolute top-1/2 left-0 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-navy text-white shadow-md">
                                    <Truck size={14} aria-hidden="true" />
                                </span>
                            </div>
                        </div>
                        <div className="mt-2 grid grid-cols-4 gap-1 text-[11px] leading-tight text-muted">
                            {t.wholesalers.timeline.slice(0, 4).map(([label], k) => (
                                <span key={label} className={k === 0 ? 'text-left' : k === 3 ? 'text-right' : 'text-center'}>
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>
                </Tile>

                {/* ── Reports — chart drawing itself ─────────── */}
                <Tile className="md:col-span-2">
                    <div className="grid h-full gap-8 sm:grid-cols-[1fr_1.1fr] sm:items-center">
                        <div>
                            <Head Icon={BarChart3} title={c4.title} body={c4.body} />
                            <div className="mt-6 flex gap-8">
                                {[m.retailTiles[0], m.retailTiles[2]].map(([label, value]) => (
                                    <div key={label}>
                                        <p className="text-xs text-muted">{label}</p>
                                        <p className="tabular font-display text-2xl font-extrabold text-navy">
                                            <CountUp value={value} onView />
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative h-44 rounded-2xl bg-surface-2 p-4">
                            <div className="absolute inset-x-4 bottom-4 flex h-[70%] items-end gap-2">
                                {bars.map((h, k) => (
                                    <span
                                        key={k}
                                        className="bento-grow flex-1 origin-bottom rounded-t-md bg-navy/10"
                                        style={{ height: `${h * 100}%`, ...d(k * 120) }}
                                    />
                                ))}
                            </div>
                            <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)]" aria-hidden="true">
                                <path
                                    className="bento-draw"
                                    pathLength={1}
                                    d="M0 100 L45 84 L90 90 L135 62 L180 70 L225 40 L270 46 L300 16"
                                    fill="none"
                                    stroke="var(--color-accent-bright)"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    vectorEffect="non-scaling-stroke"
                                />
                            </svg>
                        </div>
                    </div>
                </Tile>

                {/* ── Staff — roles, and a profit they can't see ── */}
                <Tile>
                    <Head Icon={Users} title={c5.title} body={c5.body} />
                    <div className="mt-auto pt-8">
                        <div className="flex -space-x-2">
                            {[Crown, ShoppingCart, Warehouse, Bike].map((Icon, k) => (
                                <span
                                    key={k}
                                    className={cn(
                                        'bento-pop grid h-11 w-11 place-items-center rounded-full border-2 border-surface',
                                        k === 0 ? 'bg-accent text-white' : 'bg-navy-tint text-navy'
                                    )}
                                    style={d(k * 350)}
                                >
                                    <Icon size={17} aria-hidden="true" />
                                </span>
                            ))}
                        </div>
                        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-surface-2 px-4 py-3">
                            <Lock size={16} className="bento-ring shrink-0 text-navy" aria-hidden="true" />
                            <span className="text-xs text-muted">{m.retailTiles[2][0]}</span>
                            <span className="tabular ml-auto font-display font-extrabold text-navy blur-[5px] select-none" aria-hidden="true">
                                {m.retailTiles[2][1]}
                            </span>
                            <EyeOff size={15} className="shrink-0 text-muted" aria-hidden="true" />
                        </div>
                    </div>
                </Tile>
            </motion.div>
        </div>
    );
}
