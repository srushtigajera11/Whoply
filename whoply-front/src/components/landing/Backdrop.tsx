export type BackdropVariant = 'glow' | 'grid' | 'tint' | 'navy';

/**
 * What sits behind a section: drifting colour blobs and a faint pattern, so
 * flat backgrounds have some depth. Pure CSS, decorative, never in the way of
 * content — the section's content wrapper stacks above it.
 */
export function Backdrop({ variant }: { variant: BackdropVariant }) {
    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            {variant === 'glow' && (
                <>
                    <div className="blob drift-a -top-[12%] -left-[8%] h-[60vw] w-[60vw] max-h-[560px] max-w-[560px] bg-sand/50" />
                    <div className="blob drift-b -right-[10%] -bottom-[18%] h-[55vw] w-[55vw] max-h-[520px] max-w-[520px] bg-accent-tint" />
                    <div className="hidden md:block blob drift-a top-[40%] left-[55%] h-[36vw] w-[36vw] max-h-[340px] max-w-[340px] bg-navy-tint" />
                </>
            )}
            {variant === 'grid' && (
                <>
                    <div className="bg-grid absolute inset-0" />
                    <div className="blob drift-b -top-[10%] right-[5%] h-[50vw] w-[50vw] max-h-[480px] max-w-[480px] bg-sand/40" />
                </>
            )}
            {variant === 'tint' && (
                <>
                    <div className="blob drift-a -top-[14%] left-[10%] h-[55vw] w-[55vw] max-h-[520px] max-w-[520px] bg-white" />
                    <div className="blob drift-b right-[-8%] bottom-[-10%] h-[45vw] w-[45vw] max-h-[440px] max-w-[440px] bg-sand/45" />
                </>
            )}
            {variant === 'navy' && (
                <>
                    <div className="bg-dots-navy absolute inset-0" />
                    <div className="blob drift-a -top-[20%] left-[20%] h-[60vw] w-[60vw] max-h-[600px] max-w-[600px] bg-navy-light/70" />
                    <div className="blob drift-b -right-[12%] bottom-[-15%] h-[45vw] w-[45vw] max-h-[460px] max-w-[460px] bg-accent/20" />
                    <div className="hidden md:block blob drift-a bottom-[10%] left-[-8%] h-[35vw] w-[35vw] max-h-[340px] max-w-[340px] bg-sand/15" />
                </>
            )}
        </div>
    );
}
