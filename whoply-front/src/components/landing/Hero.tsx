'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowRight, Store, Factory, ShieldCheck, Smartphone, Languages, Receipt } from 'lucide-react';
import { getCopy, type Lang } from '@/i18n/landing';
import { MEDIA } from '@/lib/media';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:7200';

type Role = 'retail' | 'wholesale';

const TRUST_ICONS = [ShieldCheck, Languages, Smartphone];
const ROW_TONES = ['danger', 'warning', 'success'] as const;

export function Hero({ lang }: { lang: Lang }) {
    const [role, setRole] = useState<Role>('retail');
    const t = getCopy(lang);
    const c = t.hero[role];

    return (
        <section id="top" className="hero-wash relative overflow-hidden">
            <div className="mx-auto max-w-[1200px] px-5 pt-16 pb-20 md:pt-24 md:pb-28">
                {/* Role switch */}
                <div
                    role="tablist"
                    aria-label={t.hero.switchLabel}
                    className="mx-auto mb-8 flex w-fit items-center gap-1 rounded-full border border-border bg-surface/80 p-1 backdrop-blur"
                >
                    {(
                        [
                            ['retail', Store],
                            ['wholesale', Factory],
                        ] as const
                    ).map(([key, Icon]) => (
                        <button
                            key={key}
                            type="button"
                            role="tab"
                            aria-selected={role === key}
                            onClick={() => setRole(key)}
                            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                                role === key ? 'bg-navy text-white' : 'text-muted hover:text-text'
                            }`}
                        >
                            <Icon size={16} aria-hidden="true" />
                            {t.hero[key].tab}
                        </button>
                    ))}
                </div>

                <div className="mx-auto max-w-3xl text-center">
                    <span className="eyebrow">{c.eyebrow}</span>
                    <h1 className="mt-4 font-display text-[2.5rem] leading-[1.06] font-extrabold text-navy sm:text-6xl lg:text-[4.25rem]">
                        {c.h1}
                        <br />
                        <span className="text-accent-strong">{c.h1Accent}</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">{c.sub}</p>

                    <div className="mt-9 flex flex-wrap justify-center gap-3">
                        <a href={`${APP_URL}/login`} className="btn btn-primary">
                            {t.hero.ctaPrimary} <ArrowRight size={17} aria-hidden="true" />
                        </a>
                        <a href="#tour" className="btn btn-secondary">
                            {t.hero.ctaSecondary}
                        </a>
                    </div>

                    <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
                        {c.trust.map((label, i) => {
                            const Icon = TRUST_ICONS[i];
                            return (
                                <li key={label} className="flex items-center gap-1.5">
                                    <Icon size={15} className="text-navy" aria-hidden="true" />
                                    {label}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <AppMock lang={lang} role={role} />
            </div>
        </section>
    );
}

/** Product visual — built in markup, mirrors the real seeded dashboard. */
function AppMock({ lang, role }: { lang: Lang; role: Role }) {
    const t = getCopy(lang);
    const m = t.hero.mock;
    const tiles = role === 'retail' ? m.retailTiles : m.wholesaleTiles;
    const business = role === 'retail' ? 'Sharma General Store' : 'Gupta Distributors';

    return (
        <div className="relative mx-auto mt-16 max-w-5xl">
            {/* Photograph carries the context; the live card carries the product. */}
            <div className="relative overflow-hidden rounded-3xl border border-border shadow-[0_30px_80px_-30px_rgb(15,43,70,0.45)]">
                <Image
                    src={MEDIA.heroShopkeeper.src}
                    alt={MEDIA.heroShopkeeper.alt[lang]}
                    width={MEDIA.heroShopkeeper.width}
                    height={MEDIA.heroShopkeeper.height}
                    priority
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="h-[300px] w-full object-cover object-center sm:h-[420px] lg:h-[480px]"
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent"
                />
            </div>

            <div className="relative z-10 mx-auto -mt-24 max-w-2xl px-4 sm:-mt-32 lg:-mt-40">
            <div className="card overflow-hidden shadow-[0_24px_60px_-24px_rgb(15,43,70,0.35)]">
                {/* Window chrome */}
                <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-warm-gray" />
                    <span className="h-2.5 w-2.5 rounded-full bg-warm-gray" />
                    <span className="h-2.5 w-2.5 rounded-full bg-warm-gray" />
                    <p className="ml-2 text-xs font-medium text-muted">
                        {business} · {m.today}
                    </p>
                    <span className="chip ml-auto bg-success-tint text-success">{m.live}</span>
                </div>

                <div className="p-5">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {tiles.map(([label, value]) => (
                            <div key={label} className="rounded-xl bg-surface-2 p-3.5">
                                <p className="text-xs text-muted">{label}</p>
                                <p className="tabular mt-1 font-display text-lg font-extrabold text-navy">{value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Reorder urgency rows — the real `days of cover` output */}
                    <div className="mt-4 space-y-2">
                        {m.rows.map(([name, cover], i) => (
                            <div
                                key={name}
                                className="flex items-center justify-between rounded-xl border border-border px-3.5 py-2.5"
                            >
                                <span className="text-sm font-medium text-text">{name}</span>
                                <span
                                    className={`chip ${
                                        ROW_TONES[i] === 'danger'
                                            ? 'bg-danger-tint text-danger'
                                            : ROW_TONES[i] === 'warning'
                                              ? 'bg-warning-tint text-warning'
                                              : 'bg-success-tint text-success'
                                    }`}
                                >
                                    {cover}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between rounded-xl bg-navy px-4 py-3 text-white">
                        <span className="flex items-center gap-2 text-sm font-semibold">
                            <Receipt size={16} aria-hidden="true" />
                            {role === 'retail' ? m.retailAction : m.wholesaleAction}
                        </span>
                        <ArrowRight size={16} aria-hidden="true" />
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}
