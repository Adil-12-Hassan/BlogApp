import { Link, useLocation } from 'react-router-dom';

const FooterLink = ({ href, children, isHomePage }) => {
    const className = 'inline-flex items-center gap-2 text-sm text-ink-soft dark:text-ink-dark-soft hover:text-accent dark:hover:text-accent-dark transition-colors';
    if (isHomePage && href.startsWith('#')) {
        return <a href={href} className={className}>{children}</a>;
    }
    const to = href.startsWith('#') ? `/${href}` : href;
    return <Link to={to} className={className}>{children}</Link>;
};

const socialLinks = [
    { href: 'https://github.com/adil-12-hassan/', icon: 'fa-brands fa-github', label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/adil-12-hassan/', icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn' },
    { href: 'https://www.youtube.com/channel/UCzT4olXB1mfr2Dk6qhy0WEA', icon: 'fa-brands fa-youtube', label: 'YouTube' },
    { href: 'https://www.instagram.com/adilhassan107/', icon: 'fa-brands fa-instagram', label: 'Instagram' },
    { href: 'https://twitter.com/adilhassan107', icon: 'fa-brands fa-x-twitter', label: 'Twitter/X' },
];

const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: 'https://hassan-porfolio-web.vercel.app/', label: 'Portfolio', external: true },
    { href: '#contact', label: 'Contact' },
];

const serviceLinks = [
    'Frontend Dev', 'Backend Dev', 'REST API Design', 'Database Design', 'UI/UX Design',
];

export default function Footer() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <footer className="bg-surface-soft dark:bg-surface-dark-soft border-t border-border dark:border-border-dark">
            <div className="container-page py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                <div>
                    <Link to="/" className="text-lg font-extrabold tracking-tight text-ink dark:text-ink-dark">
                        HASSAN<span className="text-accent dark:text-accent-dark">.</span>
                    </Link>
                    <p className="mt-4 text-sm leading-relaxed text-ink-soft dark:text-ink-dark-soft max-w-xs">
                        MERN Stack Developer crafting fast, scalable, and beautifully designed web applications.
                    </p>
                    <div className="flex items-center gap-2 mt-5">
                        {socialLinks.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.label}
                                className="btn-ghost-icon h-9 w-9"
                            >
                                <i className={s.icon}></i>
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-ink dark:text-ink-dark mb-4">Quick Links</h4>
                    <ul className="space-y-3">
                        {quickLinks.map((l) =>
                            l.external ? (
                                <li key={l.label}>
                                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-ink-soft dark:text-ink-dark-soft hover:text-accent dark:hover:text-accent-dark transition-colors">
                                        <i className="fa-solid fa-chevron-right text-[10px]"></i> {l.label}
                                    </a>
                                </li>
                            ) : (
                                <li key={l.label}>
                                    <FooterLink href={l.href} isHomePage={isHomePage}>
                                        <i className="fa-solid fa-chevron-right text-[10px]"></i> {l.label}
                                    </FooterLink>
                                </li>
                            )
                        )}
                    </ul>
                </div>

                <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-ink dark:text-ink-dark mb-4">Services</h4>
                    <ul className="space-y-3">
                        {serviceLinks.map((s) => (
                            <li key={s}>
                                <FooterLink href="#services" isHomePage={isHomePage}>
                                    <i className="fa-solid fa-chevron-right text-[10px]"></i> {s}
                                </FooterLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-ink dark:text-ink-dark mb-4">Contact</h4>
                    <ul className="space-y-3 text-sm text-ink-soft dark:text-ink-dark-soft">
                        <li className="flex items-center gap-2"><i className="fa-solid fa-envelope w-4"></i><span>syedadilhassan06@gmail.com</span></li>
                        <li className="flex items-center gap-2"><i className="fa-solid fa-phone w-4"></i><span>+92 328 151 1293</span></li>
                        <li className="flex items-center gap-2"><i className="fa-solid fa-location-dot w-4"></i><span>Faisalabad, Punjab Pakistan</span></li>
                        <li className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block"></span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-medium">Available for Work</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-border dark:border-border-dark">
                <div className="container-page py-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-ink-muted dark:text-ink-dark-muted">
                    <p>&copy; 2026 <Link to="/" className="hover:text-accent dark:hover:text-accent-dark">Adil Hassan (adil12hassan)</Link>. All Rights Reserved.</p>
                    <p>Built with <i className="fa-solid fa-heart text-accent dark:text-accent-dark"></i> using Hassan's Stack</p>
                </div>
            </div>
        </footer>
    );
}
