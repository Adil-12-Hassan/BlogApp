import { Link } from 'react-router-dom';
import ThemeToggle from '../../components/ui/ThemeToggle';

export default function UserAuthLayout({
    eyebrow,
    title,
    description,
    panelEyebrow = 'Your reading space',
    panelTitle = <>Good ideas deserve a place to <span className="text-accent dark:text-accent-dark">stay.</span></>,
    panelDescription = 'Save useful articles, keep your reading history close, and join the conversation around the things you are learning.',
    panelFooter = 'Reader account',
    children,
}) {
    return (
        <main className="grid min-h-screen bg-surface dark:bg-surface-dark lg:grid-cols-[1fr_0.9fr]">
            <section className="relative flex min-h-[38vh] flex-col justify-between overflow-hidden bg-gradient-to-br from-surface-soft via-accent-soft to-surface-soft px-6 py-7 text-ink dark:from-surface-dark dark:via-surface-dark-soft dark:to-surface-dark md:min-h-screen md:px-12 md:py-10">
                <div className="pointer-events-none absolute -right-28 top-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl dark:bg-accent-dark/20" />
                <div className="pointer-events-none absolute -bottom-36 -left-16 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-400/10" />
                <Link to="/" className="relative z-10 w-fit text-lg font-extrabold tracking-tight text-ink dark:text-ink-dark">HASSAN<span className="text-accent dark:text-accent-dark">.</span></Link>
                <div className="relative z-10 my-16 max-w-xl">
                    <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent dark:border-accent-dark/20 dark:bg-white/5 dark:text-accent-dark"><i className="fa-solid fa-sparkles" /> {panelEyebrow}</span>
                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-ink dark:text-ink-dark md:text-6xl">{panelTitle}</h1>
                    <p className="mt-5 max-w-lg leading-relaxed text-ink-soft dark:text-ink-dark-soft">{panelDescription}</p>
                </div>
                <p className="relative z-10 text-xs text-ink-muted dark:text-ink-dark-muted">© {new Date().getFullYear()} CodeWithHassan · {panelFooter}</p>
            </section>
            <section className="relative flex min-h-[62vh] items-center justify-center bg-surface px-5 py-16 dark:bg-surface-dark md:min-h-screen md:px-10 md:py-12">
                <div className="absolute right-5 top-5"><ThemeToggle /></div>
                <div className="w-full max-w-md">
                    <p className="section-eyebrow">{eyebrow}</p>
                    <h2 className="text-3xl font-extrabold tracking-tight text-ink dark:text-ink-dark md:text-4xl">{title}</h2>
                    <p className="mb-8 mt-3 text-sm leading-relaxed text-ink-muted dark:text-ink-dark-muted">{description}</p>
                    {children}
                </div>
            </section>
        </main>
    );
}
