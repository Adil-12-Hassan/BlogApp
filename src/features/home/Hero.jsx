import personImg from '../../assets/person.png';

const stats = [
    { number: '2+', label: 'Experience' },
    { number: '20+', label: 'Projects Done' },
    { number: '80+', label: 'Satisfied Clients' },
];

const socials = [
    { href: 'https://www.instagram.com/adilhassan107/', icon: 'fa-brands fa-instagram', label: 'Instagram' },
    { href: 'https://www.linkedin.com/in/adil-12-hassan/', icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn' },
    { href: 'https://github.com/adil-12-hassan/', icon: 'fa-brands fa-github', label: 'GitHub' },
    { href: 'https://www.youtube.com/channel/UCzT4olXB1mfr2Dk6qhy0WEA', icon: 'fa-brands fa-youtube', label: 'YouTube' },
];

const Hero = () => {
    return (
        <section id="home" className="section !pb-16 md:!pt-24">
            <div className="container-page grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* LEFT */}
                <div className="animate-fadeUp order-2 md:order-1 text-center md:text-left">
                    <p className="text-accent dark:text-accent-dark font-semibold mb-2">Hi, I am</p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink dark:text-ink-dark">
                        Adil Hassan
                    </h1>
                    <p className="mt-1 text-sm font-semibold tracking-wide text-accent dark:text-accent-dark">
                        @adil12hassan (adil-12-hassan)
                    </p>
                    <h2 className="mt-3 text-xl sm:text-2xl font-semibold text-ink-soft dark:text-ink-dark-soft">
                        MERN Stack Developer
                    </h2>

                    <div className="flex items-center justify-center md:justify-start gap-3 mt-6">
                        {socials.map((s) => (
                            <a key={s.label} href={s.href} aria-label={s.label} className="btn-ghost-icon">
                                <i className={s.icon}></i>
                            </a>
                        ))}
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
                        <a href="#contact" className="btn-primary">Hire Me</a>
                        <a href="/AdilCV.pdf" download="Syed_Adil_Hassan_CV.pdf" className="btn-outline">Download CV</a>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start gap-8 mt-12 pt-8 border-t border-border dark:border-border-dark">
                        {stats.map((s) => (
                            <div key={s.label}>
                                <span className="block text-2xl font-extrabold text-ink dark:text-ink-dark">{s.number}</span>
                                <span className="block text-xs text-ink-muted dark:text-ink-dark-muted mt-1">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT */}
                <div className="order-1 md:order-2 relative flex justify-center">
                    <div className="absolute inset-0 m-auto h-64 w-64 md:h-80 md:w-80 rounded-full bg-accent/10 dark:bg-accent-dark/10 blur-2xl" />
                    <div className="relative rounded-full border-4 border-surface-soft dark:border-surface-dark-soft shadow-card dark:shadow-card-dark overflow-hidden h-64 w-64 md:h-80 md:w-80">
                        <img
                            src={personImg}
                            alt="Adil Hassan - adil12hassan - MERN Stack Developer"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
