import Image from 'next/image';
import {
    ArrowRight,
    BadgeCheck,
    BarChart3,
    Check,
    ClipboardList,
    Lock,
    Moon,
    Package,
    Receipt,
    RotateCcw,
    Smartphone,
    Sunrise,
    Wallet,
} from 'lucide-react';
import { Nav } from '@/components/Nav';
import { Logo } from '@/components/Logo';
import { Hero } from '@/components/landing/Hero';
import { Marquee } from '@/components/landing/Marquee';
import { Faq } from '@/components/landing/Faq';
import { Reveal, RevealLine, RevealWords } from '@/components/landing/Reveal';
import { Backdrop, type BackdropVariant } from '@/components/landing/Backdrop';
import { FeatureCard } from '@/components/landing/FeatureCard';
import { cn } from '@/lib/cn';
import { getCopy, HREF_LANG, type Lang } from '@/i18n/landing';
import { MEDIA } from '@/lib/media';
import { appEntry } from '@/lib/links';
import { StickyCta } from '@/components/landing/StickyCta';
import { Bento } from '@/components/landing/Bento';
import { Timeline } from '@/components/landing/Timeline';
import { CountUp, Parallax, ParallaxFrame, Tilt } from '@/components/landing/Motion';
import { CounterKit } from '@/components/landing/CounterKit';
import { DashboardShowcase } from '@/components/landing/DashboardShowcase';
import { FinalCta } from '@/components/landing/FinalCta';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7000/api';

interface Plan {
    key: string;
    name: string;
    price: number;
    period: string;
    features: string[];
    highlight: boolean;
}

/** Mirrors the seeded plans — used when the API is unreachable at render time. */
const FALLBACK_PLANS: Plan[] = [
    {
        key: 'free',
        name: 'Free',
        price: 0,
        period: 'month',
        highlight: false,
        features: ['1 shop', 'Unlimited billing', 'Basic inventory', 'Udhar tracking'],
    },
    {
        key: 'pro',
        name: 'Pro',
        price: 299,
        period: 'month',
        highlight: true,
        features: [
            'Everything in Free',
            'GST reports & e-invoice',
            'Barcode scanning',
            '3 staff logins',
            'Reminder lists',
        ],
    },
    {
        key: 'business',
        name: 'Business',
        price: 799,
        period: 'month',
        highlight: false,
        features: [
            'Everything in Pro',
            'Full wholesale suite',
            'Dealers & price lists',
            'Dispatch & sales team',
            'Reorder suggestions',
        ],
    },
];

async function getPlans(): Promise<Plan[]> {
    try {
        const res = await fetch(`${API_URL}/public/plans`, { next: { revalidate: 300 } });
        if (!res.ok) return FALLBACK_PLANS;
        const json = await res.json();
        return json?.success && json.data?.length ? (json.data as Plan[]) : FALLBACK_PLANS;
    } catch {
        return FALLBACK_PLANS;
    }
}

const inr = (n: number) => (n === 0 ? '₹0' : `₹${n.toLocaleString('en-IN')}`);

/* ── Layout helpers ──────────────────────────────────────── */

function Section({
    id,
    children,
    className,
    bg,
}: {
    id?: string;
    children: React.ReactNode;
    className?: string;
    bg?: BackdropVariant;
}) {
    return (
        <section
            id={id}
            className={cn('relative', bg && 'overflow-hidden', bg === 'navy' && 'bg-navy', bg === 'tint' && 'bg-navy-tint', className)}
        >
            {bg && <Backdrop variant={bg} />}
            <div className="wrap relative py-20 md:py-28">{children}</div>
        </section>
    );
}

function SectionHead({
    eyebrow,
    title,
    sub,
    onNavy = false,
    align = 'center',
}: {
    eyebrow: string;
    title: string;
    sub?: string;
    onNavy?: boolean;
    align?: 'center' | 'left';
}) {
    return (
        <Reveal className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
            <span className={`eyebrow ${onNavy ? 'eyebrow-on-navy' : ''}`}>{eyebrow}</span>
            <RevealWords
                as="h2"
                text={title}
                className={`mt-3 font-display text-3xl font-extrabold sm:text-[2.5rem] sm:leading-[1.15] ${
                    onNavy ? 'text-white' : 'text-navy'
                }`}
            />
            {sub && <p className={`mt-4 text-lg leading-relaxed ${onNavy ? 'text-white/70' : 'text-muted'}`}>{sub}</p>}
        </Reveal>
    );
}

function Bullets({ items }: { items: string[] }) {
    return (
        <ul className="mt-6 space-y-3">
            {items.map((t, i) => (
                <li key={t}>
                    <Reveal variant="left" delay={i * 70} className="flex gap-3">
                        <Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-success" />
                        <span className="text-[0.95rem] leading-relaxed text-muted">{t}</span>
                    </Reveal>
                </li>
            ))}
        </ul>
    );
}

const TONES = ['danger', 'warning', 'success'] as const;
const toneChip = (tone: (typeof TONES)[number]) =>
    tone === 'danger'
        ? 'bg-danger-tint text-danger'
        : tone === 'warning'
          ? 'bg-warning-tint text-warning'
          : 'bg-success-tint text-success';

/* ── Page ────────────────────────────────────────────────── */

export async function Landing({ lang }: { lang: Lang }) {
    const t = getCopy(lang);
    const plans = await getPlans();

    const problemIcons = ['wallet', 'calendarClock', 'receipt', 'barChart3'] as const;
    const complianceIcons = ['fileText', 'truck', 'scrollText', 'fileSpreadsheet'] as const;
    const shopStatIcons = [Receipt, Package, Wallet, BarChart3];
    const automationIcons = [Moon, Sunrise, ClipboardList];
    const installIcons = [Smartphone, BadgeCheck, RotateCcw];
    const howIcons = ['smartphone', 'package', 'receipt'] as const;
    const timelineTones = ['success', 'success', 'success', 'warning', 'danger'] as const;

    return (
        <div lang={HREF_LANG[lang]}>
            <Nav lang={lang} />
            <main>
                <Hero lang={lang} />
                <Marquee lang={lang} />

                {/* ── Problem ─────────────────────────────── */}
                <Section id="problem" bg="glow">
                    <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
                        <Reveal variant="left">
                            {/* Photo + floating badge — the badge drifts at its own speed for depth. */}
                            <div className="relative">
                                <ParallaxFrame className="aspect-[4/3] w-full rounded-2xl border border-border">
                                    <Image
                                        src={MEDIA.paperLedger.src}
                                        alt={MEDIA.paperLedger.alt[lang]}
                                        width={MEDIA.paperLedger.width}
                                        height={MEDIA.paperLedger.height}
                                        sizes="(max-width: 1024px) 100vw, 660px"
                                    />
                                </ParallaxFrame>
                                <Parallax amount={36} className="absolute -right-3 -bottom-6 z-10 sm:-right-6">
                                    <div className="card max-w-[15rem] p-4 shadow-[0_18px_40px_-18px_rgb(15,43,70,0.35)]">
                                        <p className="text-xs text-muted">{t.hero.mock.retailTiles[3][0]}</p>
                                        <p className="tabular font-display text-2xl font-extrabold text-danger">
                                            <CountUp value={t.hero.mock.retailTiles[3][1]} onView />
                                        </p>
                                    </div>
                                </Parallax>
                            </div>
                        </Reveal>
                        <SectionHead align="left" eyebrow={t.problem.eyebrow} title={t.problem.title} />
                    </div>

                    <div className="mt-20 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        {t.problem.cards.map((p, i) => {
                            return (
                                <Reveal key={p.title} variant={i % 2 ? 'right' : 'left'} delay={i * 90} className="h-full">
                                    <Tilt className="h-full rounded-2xl">
                                        <FeatureCard icon={problemIcons[i]} title={p.title} body={p.body} delay={i * 90} />
                                    </Tilt>
                                </Reveal>
                            );
                        })}
                    </div>
                </Section>

                {/* ── Compliance ──────────────────────────── */}
                <Section id="compliance" bg="navy">
                    <SectionHead
                        onNavy
                        eyebrow={t.compliance.eyebrow}
                        title={t.compliance.title}
                        sub={t.compliance.sub}
                    />
                    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {t.compliance.cards.map((f, i) => {
                            return (
                                <Reveal key={f.title} variant="zoom" delay={i * 110} className="h-full">
                                    <FeatureCard dark icon={complianceIcons[i]} title={f.title} body={f.body} delay={i * 110} />
                                </Reveal>
                            );
                        })}
                    </div>
                    <p className="mt-12 text-center font-display text-xl font-bold text-sand">{t.compliance.quote}</p>
                </Section>

                {/* ── For shopkeepers ─────────────────────── */}
                <Section id="shopkeepers" bg="grid">
                    <div className="grid items-center gap-14 lg:grid-cols-2">
                        <div>
                            <SectionHead
                                align="left"
                                eyebrow={t.shopkeepers.eyebrow}
                                title={t.shopkeepers.title}
                                sub={t.shopkeepers.sub}
                            />
                            <Bullets items={t.shopkeepers.bullets} />
                            <a href={appEntry(lang, 'retail')} className="btn btn-primary mt-8">
                                {t.shopkeepers.cta} <ArrowRight size={17} aria-hidden="true" />
                            </a>
                        </div>
                        <div>
                            <Reveal variant="zoom">
                                <CounterKit lang={lang} />
                            </Reveal>
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                {t.shopkeepers.stats.map(([k, v], i) => {
                                    const Icon = shopStatIcons[i];
                                    return (
                                        <Reveal key={k} variant="zoom" delay={150 + i * 100} className="h-full">
                                            <div className="card card-hover h-full p-5">
                                                <Icon size={18} className="text-accent-strong" aria-hidden="true" />
                                                <p className="mt-3 text-xs text-muted">{k}</p>
                                                <p className="font-display text-lg font-extrabold text-navy">
                                                    <CountUp value={v} onView />
                                                </p>
                                            </div>
                                        </Reveal>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </Section>

                {/* ── For wholesalers ─────────────────────── */}
                <Section id="wholesalers" bg="tint">
                    <div className="grid items-center gap-14 lg:grid-cols-2">
                        <div className="order-2 lg:order-1">
                            <Reveal variant="wipe">
                                <ParallaxFrame className="aspect-[3/2] w-full rounded-2xl border border-border">
                                    <Image
                                        src={MEDIA.warehouse.src}
                                        alt={MEDIA.warehouse.alt[lang]}
                                        width={MEDIA.warehouse.width}
                                        height={MEDIA.warehouse.height}
                                        sizes="(max-width: 1024px) 100vw, 700px"
                                    />
                                </ParallaxFrame>
                            </Reveal>
                            <Parallax amount={28} className="relative z-10">
                                <div className="card -mt-10 ml-auto mr-0 w-[92%] p-6 shadow-[0_18px_40px_-18px_rgb(15,43,70,0.3)]">
                                    <p className="eyebrow">{t.wholesalers.timelineLabel}</p>
                                    <Timeline steps={t.wholesalers.timeline} tones={timelineTones} />
                                </div>
                            </Parallax>
                        </div>
                        <div className="order-1 lg:order-2">
                            <SectionHead
                                align="left"
                                eyebrow={t.wholesalers.eyebrow}
                                title={t.wholesalers.title}
                                sub={t.wholesalers.sub}
                            />
                            <Bullets items={t.wholesalers.bullets} />
                            <a href={appEntry(lang, 'wholesale')} className="btn btn-primary mt-8">
                                {t.wholesalers.cta} <ArrowRight size={17} aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                </Section>

                {/* ── Capability grid ─────────────────────── */}
                <Section id="features" bg="glow">
                    <SectionHead eyebrow={t.features.eyebrow} title={t.features.title} />
                    <Bento lang={lang} />
                </Section>

                {/* ── Reorder spotlight ───────────────────── */}
                <Section bg="tint">
                    <div className="grid items-center gap-14 lg:grid-cols-2">
                        <div>
                            <SectionHead align="left" eyebrow={t.reorder.eyebrow} title={t.reorder.title} />
                            <p className="mt-4 text-lg leading-relaxed text-muted">{t.reorder.body}</p>
                            <p className="mt-5 text-sm text-muted">{t.reorder.foot}</p>
                        </div>
                        <Reveal variant="zoom">
                            <div className="card divide-y divide-border overflow-hidden">
                                {t.reorder.rows.map(([name, cover, action], i) => (
                                    <Reveal
                                        key={name}
                                        variant="right"
                                        delay={250 + i * 160}
                                        className="flex items-center justify-between gap-4 p-5"
                                    >
                                        <div>
                                            <p className="font-semibold text-navy">{name}</p>
                                            <p className="tabular text-sm text-muted">{cover}</p>
                                        </div>
                                        <span className={`chip ${toneChip(TONES[i])}`}>{action}</span>
                                    </Reveal>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </Section>

                {/* ── Staff control + automation ──────────── */}
                <Section bg="grid">
                    <div className="grid gap-5 lg:grid-cols-2">
                        <Reveal variant="left" className="h-full">
                            <div className="card h-full p-9">
                                <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy-tint text-navy">
                                    <Lock size={20} aria-hidden="true" />
                                </div>
                                <h3 className="mt-6 font-display text-2xl font-extrabold text-navy">{t.staff.title}</h3>
                                <p className="mt-4 leading-relaxed text-muted">{t.staff.body}</p>
                                <p className="mt-4 text-sm text-muted">{t.staff.note}</p>
                            </div>
                        </Reveal>
                        <Reveal variant="right" delay={120} className="h-full">
                            <div className="card h-full p-9">
                                <h3 className="font-display text-2xl font-extrabold text-navy">
                                    {t.automation.title}
                                </h3>
                                <ul className="mt-7 space-y-6">
                                    {t.automation.items.map((a, i) => {
                                        const Icon = automationIcons[i];
                                        return (
                                            <li key={a.when} className="flex gap-4">
                                                <RevealLine
                                                    axis="y"
                                                    delay={i * 220}
                                                    className="w-1 shrink-0 self-stretch rounded-full bg-gradient-to-b from-accent-bright via-sand to-transparent"
                                                />
                                                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-tint text-accent-strong">
                                                    <Icon size={18} aria-hidden="true" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-navy">{a.when}</p>
                                                    <p className="mt-1 text-[0.95rem] leading-relaxed text-muted">
                                                        {a.what}
                                                    </p>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </Reveal>
                    </div>
                </Section>

                {/* ── Product tour ────────────────────────── */}
                <Section id="tour" bg="navy">
                    <SectionHead onNavy eyebrow={t.tour.eyebrow} title={t.tour.title} sub={t.tour.sub} />
                    <DashboardShowcase lang={lang} />
                </Section>

                {/* ── How it works ────────────────────────── */}
                <Section id="how" bg="grid">
                    <SectionHead eyebrow={t.how.eyebrow} title={t.how.title} />
                    <RevealLine className="mx-auto mt-14 h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-accent-bright to-transparent" />
                    <div className="mt-8 grid gap-5 md:grid-cols-3">
                        {t.how.steps.map(([title, desc], i) => {
                            return (
                                <Reveal key={title} variant="zoom" delay={i * 150} className="h-full">
                                    <Tilt className="h-full rounded-2xl">
                                        <FeatureCard icon={howIcons[i]} step={i + 1} title={title} body={desc} delay={i * 150} className="p-8" />
                                    </Tilt>
                                </Reveal>
                            );
                        })}
                    </div>
                </Section>

                {/* ── Install ─────────────────────────────── */}
                <Section id="install" bg="tint">
                    <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                        <div>
                        <SectionHead align="left" eyebrow={t.install.eyebrow} title={t.install.title} sub={t.install.sub} />
                        <div className="mt-10 flex flex-wrap gap-3">
                            {t.install.chips.map((label, i) => {
                                const Icon = installIcons[i];
                                return (
                                    <Reveal key={label} variant="zoom" delay={i * 120}>
                                        <span className="chip border border-border bg-surface px-4 py-2 text-sm text-navy">
                                            <Icon size={16} aria-hidden="true" className="text-accent-strong" />
                                            {label}
                                        </span>
                                    </Reveal>
                                );
                            })}
                        </div>
                        </div>
                        <Reveal variant="wipe">
                            <ParallaxFrame className="aspect-[4/5] w-full rounded-2xl border border-border">
                                <Image
                                    src={MEDIA.kiranaStore.src}
                                    alt={MEDIA.kiranaStore.alt[lang]}
                                    width={MEDIA.kiranaStore.width}
                                    height={MEDIA.kiranaStore.height}
                                    sizes="(max-width: 1024px) 100vw, 620px"
                                />
                            </ParallaxFrame>
                        </Reveal>
                    </div>
                </Section>

                {/* ── Pricing ─────────────────────────────── */}
                <Section id="pricing" bg="glow">
                    <SectionHead eyebrow={t.pricing.eyebrow} title={t.pricing.title} sub={t.pricing.sub} />
                    <p className="mt-6 text-center text-sm font-semibold text-accent-strong">{t.pricing.anchor}</p>

                    <div className="mt-12 grid gap-5 md:grid-cols-3">
                        {plans.map((p, i) => (
                            <Reveal key={p.key} delay={i * 130} className="h-full">
                            <Tilt max={4} className={cn('h-full rounded-2xl', p.highlight && 'ring-spin p-[2px] shadow-[0_28px_60px_-28px_rgb(194,80,0,0.45)]')}>
                            <div
                                className={`relative flex h-full flex-col overflow-hidden border bg-surface transition-[transform,box-shadow] duration-300 ${
                                    p.highlight
                                        ? 'rounded-[14px] border-transparent'
                                        : 'rounded-2xl border-border hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-28px_rgb(15,43,70,0.4)]'
                                }`}
                            >
                                <div className={`px-7 py-5 ${p.highlight ? 'bg-accent-tint' : 'bg-navy'}`}>
                                    <div className="flex items-center justify-between gap-3">
                                        <h3
                                            className={`font-display text-lg font-bold ${
                                                p.highlight ? 'text-navy' : 'text-white'
                                            }`}
                                        >
                                            {p.name}
                                        </h3>
                                        {p.highlight && <span className="chip bg-accent text-white">{t.pricing.popular}</span>}
                                    </div>
                                    <p className={`mt-1 text-xs ${p.highlight ? 'text-muted' : 'text-white/60'}`}>
                                        {t.pricing.planFor[p.key] ?? ''}
                                    </p>
                                </div>

                                <div className="flex flex-1 flex-col p-7">
                                    <p>
                                        <span
                                            className={`tabular font-display text-4xl font-extrabold ${
                                                p.highlight ? 'text-accent-strong' : 'text-navy'
                                            }`}
                                        >
                                            <CountUp value={inr(p.price)} onView />
                                        </span>
                                        <span className="text-muted">/{t.pricing.per}</span>
                                    </p>

                                    <ul className="mt-6 space-y-3">
                                        {p.features.map((f) => (
                                            <li key={f} className="flex gap-2.5 text-[0.95rem] text-muted">
                                                <Check size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-success" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>

                                    <a
                                        href={appEntry(lang)}
                                        className={`btn mt-8 w-full ${p.highlight ? 'btn-primary' : 'btn-secondary'}`}
                                    >
                                        {p.price === 0 ? t.pricing.startFree : t.pricing.choose(p.name)}
                                    </a>
                                </div>
                            </div>
                            </Tilt>
                            </Reveal>
                        ))}
                    </div>

                    <p className="mt-8 text-center text-sm text-muted">{t.pricing.foot}</p>
                </Section>

                {/* ── FAQ ─────────────────────────────────── */}
                <Section id="faq" bg="tint">
                    <SectionHead eyebrow={t.faq.eyebrow} title={t.faq.title} />
                    <Faq lang={lang} />
                </Section>

                {/* ── Final CTA ───────────────────────────── */}
                <FinalCta lang={lang} />
            </main>

            {/* ── Footer ──────────────────────────────────── */}
            <footer className="bg-navy-dark">
                <div className="wrap py-16">
                    <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
                        <div>
                            <Logo size={30} onNavy />
                            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{t.footer.tagline}</p>
                        </div>
                        {t.footer.columns.map((col) => (
                            <div key={col.head}>
                                <p className="font-display text-sm font-bold text-white">{col.head}</p>
                                <ul className="mt-4 space-y-2.5">
                                    {col.links.map(([label, href]) => (
                                        <li key={label}>
                                            <a
                                                href={href}
                                                className="text-sm text-white/60 transition-colors hover:text-white"
                                            >
                                                {label}
                                            </a>
                                        </li>
                                    ))}
                                    {col.head === t.footer.columns[0].head && (
                                        <li>
                                            <a
                                                href={appEntry(lang)}
                                                className="text-sm text-white/60 transition-colors hover:text-white"
                                            >
                                                {t.nav.login}
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/50">{t.footer.legal}</div>
                </div>
            </footer>

            <StickyCta lang={lang} />
        </div>
    );
}
