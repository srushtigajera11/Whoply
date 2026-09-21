'use client';

import { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { getCopy, pathFor, LANGS, LANG_LABEL, HREF_LANG, type Lang } from '@/i18n/landing';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:7200';

/** EN · हिं · ગુ — each is a real link to that locale's own page. */
function LangSwitch({ lang, full = false }: { lang: Lang; full?: boolean }) {
    return (
        <div
            className={`flex items-center gap-1 rounded-full border border-white/25 p-1 ${full ? 'w-full justify-center' : ''}`}
        >
            {LANGS.map((l) => (
                <a
                    key={l}
                    href={pathFor(l)}
                    hrefLang={HREF_LANG[l]}
                    lang={HREF_LANG[l]}
                    title={LANG_LABEL[l].full}
                    aria-current={l === lang ? 'page' : undefined}
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
                        l === lang ? 'bg-white text-navy' : 'text-[#E5E7EB] hover:bg-white/10 hover:text-white'
                    }`}
                >
                    {full ? LANG_LABEL[l].full : LANG_LABEL[l].short}
                </a>
            ))}
        </div>
    );
}

export function Nav({ lang }: { lang: Lang }) {
    const [open, setOpen] = useState(false);
    const t = getCopy(lang);

    return (
        <>
            {/* Announcement bar — scrolls away, so only the 64px nav stays sticky. */}
            <div className="hidden bg-navy-dark px-5 py-2 text-center text-xs text-white/75 sm:block">
                {t.nav.announcement}
            </div>

            <header className="sticky top-0 z-50 bg-navy">
                <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5">
                    <a href={pathFor(lang)} aria-label={t.nav.home}>
                        <Logo size={30} onNavy />
                    </a>

                    {/* gap-5 until xl — Hindi/Gujarati labels are longer than English
                        and would otherwise crowd the CTA cluster at 1024px. */}
                    <nav aria-label={t.nav.primaryNav} className="hidden items-center gap-5 lg:flex xl:gap-7">
                        {t.nav.links.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                className="text-sm font-medium text-[#E5E7EB] transition-colors hover:text-white"
                            >
                                {l.label}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden items-center gap-4 lg:flex">
                        <LangSwitch lang={lang} />
                        <a href={`${APP_URL}/login`} className="text-sm font-semibold text-white">
                            {t.nav.login}
                        </a>
                        <a href={`${APP_URL}/login`} className="btn btn-primary !px-5 !py-2.5 text-sm">
                            {t.nav.start} <ArrowRight size={16} aria-hidden="true" />
                        </a>
                    </div>

                    <button
                        type="button"
                        className="text-white lg:hidden"
                        aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
                    </button>
                </div>

                {open && (
                    <div id="mobile-menu" className="border-t border-white/10 bg-navy px-5 pb-5 lg:hidden">
                        <nav aria-label={t.nav.mobileNav} className="flex flex-col py-2">
                            {t.nav.links.map((l) => (
                                <a
                                    key={l.href}
                                    href={l.href}
                                    onClick={() => setOpen(false)}
                                    className="border-b border-white/10 py-3 text-sm font-medium text-[#E5E7EB]"
                                >
                                    {l.label}
                                </a>
                            ))}
                        </nav>
                        <div className="mt-4 flex flex-col gap-3">
                            <LangSwitch lang={lang} full />
                            <a
                                href={`${APP_URL}/login`}
                                className="btn btn-ghost-navy w-full"
                                onClick={() => setOpen(false)}
                            >
                                {t.nav.login}
                            </a>
                            <a
                                href={`${APP_URL}/login`}
                                className="btn btn-primary w-full"
                                onClick={() => setOpen(false)}
                            >
                                {t.nav.start} <ArrowRight size={16} aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}
