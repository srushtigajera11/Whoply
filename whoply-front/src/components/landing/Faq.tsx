import { Plus } from 'lucide-react';
import { getCopy, type Lang } from '@/i18n/landing';

/** Native <details> — works with JS disabled, keyboard-accessible for free. */
export function Faq({ lang }: { lang: Lang }) {
    const { qa } = getCopy(lang).faq;

    return (
        <div className="mx-auto mt-12 max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
            {qa.map(([q, a]) => (
                <details key={q} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-navy [&::-webkit-details-marker]:hidden">
                        {q}
                        <Plus
                            size={18}
                            aria-hidden="true"
                            className="shrink-0 text-accent-strong transition-transform duration-200 group-open:rotate-45"
                        />
                    </summary>
                    <p className="px-6 pb-5 text-[0.95rem] leading-relaxed text-muted">{a}</p>
                </details>
            ))}
        </div>
    );
}
