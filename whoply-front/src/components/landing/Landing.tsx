import Image from 'next/image';
import {
    ArrowRight,
    BadgeCheck,
    BarChart3,
    Boxes,
    CalendarClock,
    Check,
    ClipboardList,
    FileSpreadsheet,
    FileText,
    Lock,
    Moon,
    Package,
    Receipt,
    RotateCcw,
    ScrollText,
    Smartphone,
    Sunrise,
    Truck,
    Users,
    Wallet,
} from 'lucide-react';
import { Nav } from '@/components/Nav';
import { Logo } from '@/components/Logo';
import { Hero } from '@/components/landing/Hero';
import { Marquee } from '@/components/landing/Marquee';
import { Faq } from '@/components/landing/Faq';
import { Reveal } from '@/components/landing/Reveal';
import { getCopy, HREF_LANG, type Lang } from '@/i18n/landing';
import { MEDIA } from '@/lib/media';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:7200';
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

function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
    return (
        <section id={id} className={className}>
            <div className="mx-auto max-w-[1200px] px-5 py-20 md:py-28">{children}</div>
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
        <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
            <span className={`eyebrow ${onNavy ? 'eyebrow-on-navy' : ''}`}>{eyebrow}</span>
            <h2
                className={`mt-3 font-display text-3xl font-extrabold sm:text-[2.5rem] sm:leading-[1.15] ${
                    onNavy ? 'text-white' : 'text-navy'
                }`}
            >
                {title}
            </h2>
            {sub && <p className={`mt-4 text-lg leading-relaxed ${onNavy ? 'text-white/70' : 'text-muted'}`}>{sub}</p>}
        </div>
    );
}

function Bullets({ items }: { items: string[] }) {
    return (
        <ul className="mt-6 space-y-3">
            {items.map((t) => (
                <li key={t} className="flex gap-3">
                    <Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-success" />
                    <span className="text-[0.95rem] leading-relaxed text-muted">{t}</span>
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

    const problemIcons = [Wallet, CalendarClock, Receipt, BarChart3];
    const complianceIcons = [FileText, Truck, ScrollText, FileSpreadsheet];
    const shopStatIcons = [Receipt, Package, Wallet, BarChart3];
    const featureIcons = [Receipt, Boxes, Wallet, Truck, BarChart3, Users];
    const automationIcons = [Moon, Sunrise, ClipboardList];
    const tourImages = [MEDIA.phoneDashboard, MEDIA.phoneLedger, MEDIA.dispatchTruck, MEDIA.packedInventory];
    const installIcons = [Smartphone, BadgeCheck, RotateCcw];
    const timelineTones = ['success', 'success', 'success', 'warning', 'danger'] as const;

    return (
        <div lang={HREF_LANG[lang]}>
            <Nav lang={lang} />
            <main>
                <Hero lang={lang} />
                <Marquee lang={lang} />

                {/* ── Problem ─────────────────────────────── */}
                <Section id="problem">
                    <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
                        <Reveal>
                            {/* Photo + floating badge — the reference's "who we are" pattern. */}
                            <div className="relative">
                                <Image
                                    src={MEDIA.paperLedger.src}
                                    alt={MEDIA.paperLedger.alt[lang]}
                                    width={MEDIA.paperLedger.width}
                                    height={MEDIA.paperLedger.height}
                                    sizes="(max-width: 1024px) 100vw, 520px"
                                    className="aspect-[4/3] w-full rounded-2xl border border-border object-cover"
                                />
                                <div className="card absolute -right-3 -bottom-6 max-w-[15rem] p-4 shadow-[0_18px_40px_-18px_rgb(15,43,70,0.35)] sm:-right-6">
                                    <p className="text-xs text-muted">{t.hero.mock.retailTiles[3][0]}</p>
                                    <p className="tabular font-display text-2xl font-extrabold text-danger">
                                        {t.hero.mock.retailTiles[3][1]}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                        <SectionHead align="left" eyebrow={t.problem.eyebrow} title={t.problem.title} />
                    </div>

                    <div className="mt-20 grid gap-5 sm:grid-cols-2">
                        {t.problem.cards.map((p, i) => {
                            const Icon = problemIcons[i];
                            return (
                                <Reveal key={p.title} delay={i * 60}>
                                    <div className="card card-hover h-full p-7">
                                        <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy-tint text-navy">
                                            <Icon size={20} aria-hidden="true" />
                                        </div>
                                        <h3 className="mt-5 font-display text-lg font-bold text-navy">{p.title}</h3>
                                        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{p.body}</p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </Section>

                {/* ── Compliance ──────────────────────────── */}
                <Section id="compliance" className="bg-navy">
                    <SectionHead
                        onNavy
                        eyebrow={t.compliance.eyebrow}
                        title={t.compliance.title}
                        sub={t.compliance.sub}
                    />
                    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {t.compliance.cards.map((f, i) => {
                            const Icon = complianceIcons[i];
                            return (
                                <Reveal key={f.title} delay={i * 60}>
                                    <div className="h-full rounded-2xl border border-white/12 bg-white/[0.06] p-7">
                                        <div className="grid h-11 w-11 place-items-center rounded-xl bg-sand text-navy">
                                            <Icon size={20} aria-hidden="true" />
                                        </div>
                                        <h3 className="mt-5 font-display text-lg font-bold text-white">{f.title}</h3>
                                        <p className="mt-2 text-[0.95rem] leading-relaxed text-white/70">{f.body}</p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                    <p className="mt-12 text-center font-display text-xl font-bold text-sand">{t.compliance.quote}</p>
                </Section>

                {/* ── For shopkeepers ─────────────────────── */}
                <Section id="shopkeepers">
                    <div className="grid items-center gap-14 lg:grid-cols-2">
                        <div>
                            <SectionHead
                                align="left"
                                eyebrow={t.shopkeepers.eyebrow}
                                title={t.shopkeepers.title}
                                sub={t.shopkeepers.sub}
                            />
                            <Bullets items={t.shopkeepers.bullets} />
                            <a href={`${APP_URL}/login`} className="btn btn-primary mt-8">
                                {t.shopkeepers.cta} <ArrowRight size={17} aria-hidden="true" />
                            </a>
                        </div>
                        <Reveal>
                            <Image
                                src={MEDIA.posPrinter.src}
                                alt={MEDIA.posPrinter.alt[lang]}
                                width={MEDIA.posPrinter.width}
                                height={MEDIA.posPrinter.height}
                                sizes="(max-width: 1024px) 100vw, 560px"
                                className="aspect-[3/2] w-full rounded-2xl border border-border object-cover"
                            />
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                {t.shopkeepers.stats.map(([k, v], i) => {
                                    const Icon = shopStatIcons[i];
                                    return (
                                        <div key={k} className="card p-5">
                                            <Icon size={18} className="text-accent-strong" aria-hidden="true" />
                                            <p className="mt-3 text-xs text-muted">{k}</p>
                                            <p className="font-display text-lg font-extrabold text-navy">{v}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </Reveal>
                    </div>
                </Section>

                {/* ── For wholesalers ─────────────────────── */}
                <Section id="wholesalers" className="bg-navy-tint">
                    <div className="grid items-center gap-14 lg:grid-cols-2">
                        <Reveal className="order-2 lg:order-1">
                            <Image
                                src={MEDIA.warehouse.src}
                                alt={MEDIA.warehouse.alt[lang]}
                                width={MEDIA.warehouse.width}
                                height={MEDIA.warehouse.height}
                                sizes="(max-width: 1024px) 100vw, 560px"
                                className="aspect-[3/2] w-full rounded-2xl border border-border object-cover"
                            />
                            <div className="card -mt-10 ml-auto mr-0 w-[92%] p-6 shadow-[0_18px_40px_-18px_rgb(15,43,70,0.3)]">
                                <p className="eyebrow">{t.wholesalers.timelineLabel}</p>
                                <ol className="mt-5 space-y-4">
                                    {t.wholesalers.timeline.map(([title, sub], i) => (
                                        <li key={title} className="flex items-start gap-3">
                                            <span
                                                className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                                                    timelineTones[i] === 'success'
                                                        ? 'bg-success'
                                                        : timelineTones[i] === 'warning'
                                                          ? 'bg-warning'
                                                          : 'bg-danger'
                                                }`}
                                            />
                                            <div>
                                                <p className="text-sm font-semibold text-navy">{title}</p>
                                                <p className="tabular text-xs text-muted">{sub}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </Reveal>
                        <div className="order-1 lg:order-2">
                            <SectionHead
                                align="left"
                                eyebrow={t.wholesalers.eyebrow}
                                title={t.wholesalers.title}
                                sub={t.wholesalers.sub}
                            />
                            <Bullets items={t.wholesalers.bullets} />
                            <a href={`${APP_URL}/login`} className="btn btn-primary mt-8">
                                {t.wholesalers.cta} <ArrowRight size={17} aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                </Section>

                {/* ── Capability grid ─────────────────────── */}
                <Section id="features">
                    <SectionHead eyebrow={t.features.eyebrow} title={t.features.title} />
                    <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {t.features.cards.map((f, i) => {
                            const Icon = featureIcons[i];
                            return (
                                <Reveal key={f.title} delay={i * 50}>
                                    <div className="card card-hover h-full p-7">
                                        <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent-tint text-accent-strong">
                                            <Icon size={20} aria-hidden="true" />
                                        </div>
                                        <h3 className="mt-5 font-display text-lg font-bold text-navy">{f.title}</h3>
                                        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{f.body}</p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </Section>

                {/* ── Reorder spotlight ───────────────────── */}
                <Section className="bg-navy-tint">
                    <div className="grid items-center gap-14 lg:grid-cols-2">
                        <div>
                            <SectionHead align="left" eyebrow={t.reorder.eyebrow} title={t.reorder.title} />
                            <p className="mt-4 text-lg leading-relaxed text-muted">{t.reorder.body}</p>
                            <p className="mt-5 text-sm text-muted">{t.reorder.foot}</p>
                        </div>
                        <Reveal>
                            <div className="card divide-y divide-border overflow-hidden">
                                {t.reorder.rows.map(([name, cover, action], i) => (
                                    <div key={name} className="flex items-center justify-between gap-4 p-5">
                                        <div>
                                            <p className="font-semibold text-navy">{name}</p>
                                            <p className="tabular text-sm text-muted">{cover}</p>
                                        </div>
                                        <span className={`chip ${toneChip(TONES[i])}`}>{action}</span>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </Section>

                {/* ── Staff control + automation ──────────── */}
                <Section>
                    <div className="grid gap-5 lg:grid-cols-2">
                        <Reveal>
                            <div className="card h-full p-9">
                                <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy-tint text-navy">
                                    <Lock size={20} aria-hidden="true" />
                                </div>
                                <h3 className="mt-6 font-display text-2xl font-extrabold text-navy">{t.staff.title}</h3>
                                <p className="mt-4 leading-relaxed text-muted">{t.staff.body}</p>
                                <p className="mt-4 text-sm text-muted">{t.staff.note}</p>
                            </div>
                        </Reveal>
                        <Reveal delay={80}>
                            <div className="card h-full p-9">
                                <h3 className="font-display text-2xl font-extrabold text-navy">
                                    {t.automation.title}
                                </h3>
                                <ul className="mt-7 space-y-6">
                                    {t.automation.items.map((a, i) => {
                                        const Icon = automationIcons[i];
                                        return (
                                            <li key={a.when} className="flex gap-4">
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
                {/* TODO: replace these stylised panels with real captures from the seeded demo. */}
                <Section id="tour" className="bg-navy">
                    <SectionHead onNavy eyebrow={t.tour.eyebrow} title={t.tour.title} sub={t.tour.sub} />
                    <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {t.tour.items.map((s, i) => {
                            const img = tourImages[i];
                            return (
                                <Reveal key={s.title} delay={i * 60}>
                                    <figure className="h-full overflow-hidden rounded-2xl border border-white/12 bg-white/[0.06]">
                                        <Image
                                            src={img.src}
                                            alt={img.alt[lang]}
                                            width={img.width}
                                            height={img.height}
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                                            className="h-40 w-full object-cover"
                                        />
                                        <figcaption className="border-t border-white/12 p-5">
                                            <p className="font-display font-bold text-white">{s.title}</p>
                                            <p className="mt-1.5 text-sm leading-relaxed text-white/70">{s.cap}</p>
                                        </figcaption>
                                    </figure>
                                </Reveal>
                            );
                        })}
                    </div>
                </Section>

                {/* ── How it works ────────────────────────── */}
                <Section id="how">
                    <SectionHead eyebrow={t.how.eyebrow} title={t.how.title} />
                    <div className="mt-14 grid gap-5 md:grid-cols-3">
                        {t.how.steps.map(([title, desc], i) => (
                            <Reveal key={title} delay={i * 70}>
                                <div className="card h-full p-8">
                                    <span className="font-display text-4xl font-extrabold text-sand">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <h3 className="mt-5 font-display text-lg font-bold text-navy">{title}</h3>
                                    <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </Section>

                {/* ── Install ─────────────────────────────── */}
                <Section id="install" className="bg-navy-tint">
                    <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                        <div>
                        <SectionHead align="left" eyebrow={t.install.eyebrow} title={t.install.title} sub={t.install.sub} />
                        <div className="mt-10 flex flex-wrap gap-3">
                            {t.install.chips.map((label, i) => {
                                const Icon = installIcons[i];
                                return (
                                    <span
                                        key={label}
                                        className="chip border border-border bg-surface px-4 py-2 text-sm text-navy"
                                    >
                                        <Icon size={16} aria-hidden="true" className="text-accent-strong" />
                                        {label}
                                    </span>
                                );
                            })}
                        </div>
                        </div>
                        <Reveal>
                            <Image
                                src={MEDIA.kiranaStore.src}
                                alt={MEDIA.kiranaStore.alt[lang]}
                                width={MEDIA.kiranaStore.width}
                                height={MEDIA.kiranaStore.height}
                                sizes="(max-width: 1024px) 100vw, 460px"
                                className="aspect-[4/5] w-full rounded-2xl border border-border object-cover"
                            />
                        </Reveal>
                    </div>
                </Section>

                {/* ── Pricing ─────────────────────────────── */}
                <Section id="pricing">
                    <SectionHead eyebrow={t.pricing.eyebrow} title={t.pricing.title} sub={t.pricing.sub} />
                    <p className="mt-6 text-center text-sm font-semibold text-accent-strong">{t.pricing.anchor}</p>

                    <div className="mt-12 grid gap-5 md:grid-cols-3">
                        {plans.map((p) => (
                            <div
                                key={p.key}
                                className={`relative flex flex-col overflow-hidden rounded-2xl border bg-surface ${
                                    p.highlight ? 'border-2 border-accent-bright' : 'border-border'
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
                                            {inr(p.price)}
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
                                        href={`${APP_URL}/login`}
                                        className={`btn mt-8 w-full ${p.highlight ? 'btn-primary' : 'btn-secondary'}`}
                                    >
                                        {p.price === 0 ? t.pricing.startFree : t.pricing.choose(p.name)}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="mt-8 text-center text-sm text-muted">{t.pricing.foot}</p>
                </Section>

                {/* ── FAQ ─────────────────────────────────── */}
                <Section id="faq" className="bg-navy-tint">
                    <SectionHead eyebrow={t.faq.eyebrow} title={t.faq.title} />
                    <Faq lang={lang} />
                </Section>

                {/* ── Final CTA ───────────────────────────── */}
                <Section>
                    <div className="relative overflow-hidden rounded-3xl">
                        <Image
                            src={MEDIA.byculla.src}
                            alt=""
                            aria-hidden="true"
                            width={MEDIA.byculla.width}
                            height={MEDIA.byculla.height}
                            sizes="(max-width: 1200px) 100vw, 1200px"
                            className="absolute inset-0 h-full w-full object-cover object-center"
                        />
                        {/* Heavy navy wash — white on this measures well past AA. */}
                        <div aria-hidden="true" className="absolute inset-0 bg-navy/90" />
                        <div className="relative px-6 py-20 text-center sm:px-14">
                            <h2 className="font-display text-3xl font-extrabold text-white sm:text-[2.75rem] sm:leading-[1.12]">
                                {t.finalCta.title}
                            </h2>
                            <p className="mx-auto mt-5 max-w-lg text-lg text-white/75">{t.finalCta.sub}</p>
                            <a href={`${APP_URL}/login`} className="btn btn-primary mt-9">
                                {t.finalCta.button} <ArrowRight size={17} aria-hidden="true" />
                            </a>
                            <p className="mt-5 text-sm text-white/60">{t.finalCta.foot}</p>
                        </div>
                    </div>
                </Section>
            </main>

            {/* ── Footer ──────────────────────────────────── */}
            <footer className="bg-navy-dark">
                <div className="mx-auto max-w-[1200px] px-5 py-16">
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
                                                href={`${APP_URL}/login`}
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
        </div>
    );
}
