import { getCopy, type Lang } from '@/i18n/landing';

/**
 * Capability ticker. Deliberately states what Whoply *does* rather than
 * traction numbers — see landing-content.md §22.
 */
export function Marquee({ lang }: { lang: Lang }) {
    const { items, label } = getCopy(lang).marquee;

    return (
        <div className="border-y border-border bg-navy-tint py-4">
            <div
                className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
                role="list"
                aria-label={label}
            >
                {[0, 1].map((copy) => (
                    <div
                        key={copy}
                        aria-hidden={copy === 1}
                        className="flex shrink-0 animate-marquee items-center gap-10 pr-10 motion-reduce:animate-none"
                    >
                        {items.map((item) => (
                            <span
                                key={item}
                                role={copy === 0 ? 'listitem' : undefined}
                                className="flex items-center gap-3 whitespace-nowrap text-sm font-semibold text-navy"
                            >
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-bright" />
                                {item}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
