import { Link, useLocation } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEOHead from '../../components/seo/SEOHead';
import services from '../home/serviceCatalog';

export default function ServicesPage() {
    const location = useLocation();
    const requestedService = new URLSearchParams(location.search).get('service');

    return (
        <>
            <SEOHead title="Web Development Services | CodeWithHassan" description="Explore web development, UI/UX, API, and full stack services from CodeWithHassan. Request a custom project quote." url="/services" />
            <Navbar />
            <main>
                <section className="bg-surface-soft py-16 dark:bg-surface-dark-soft md:py-24">
                    <div className="container-page max-w-4xl text-center">
                        <p className="section-eyebrow">Work with me</p>
                        <h1 className="text-4xl font-extrabold tracking-tight text-ink dark:text-ink-dark md:text-6xl">Let's build something <span className="text-accent dark:text-accent-dark">useful.</span></h1>
                        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-soft dark:text-ink-dark-soft md:text-lg">Choose the kind of help you need. Every project is scoped around your goals, so pricing is provided as a custom quote after we discuss the details.</p>
                        <a href="#service-list" className="btn-primary mt-8">Explore services <i className="fa-solid fa-arrow-down text-xs" /></a>
                    </div>
                </section>
                <section id="service-list" className="section scroll-mt-24">
                    <div className="container-page">
                        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="section-eyebrow">What I can help with</p><h2 className="text-3xl font-extrabold text-ink dark:text-ink-dark">Services</h2></div><p className="max-w-md text-sm leading-relaxed text-ink-muted dark:text-ink-dark-muted">Tell me what you are trying to make and I will reply with a clear scope and estimate.</p></div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {services.map((service) => (
                                <article key={service.number} className={`card relative flex flex-col overflow-hidden p-7 transition-transform duration-300 hover:-translate-y-1 ${requestedService === service.title ? 'border-accent ring-2 ring-accent/20 dark:border-accent-dark dark:ring-accent-dark/20' : ''}`}>
                                    <span className="absolute right-5 top-4 select-none text-4xl font-extrabold text-border dark:text-border-dark">{service.number}</span>
                                    <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-xl text-accent dark:bg-accent-dark-soft dark:text-accent-dark"><i className={service.icon} /></div>
                                    <h2 className="mb-2 text-lg font-bold text-ink dark:text-ink-dark">{service.title}</h2>
                                    <p className="flex-1 text-sm leading-relaxed text-ink-soft dark:text-ink-dark-soft">{service.desc}</p>
                                    <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-5 dark:border-border-dark"><div><span className="block text-xs text-ink-muted dark:text-ink-dark-muted">Pricing</span><span className="text-sm font-semibold text-ink dark:text-ink-dark">Custom quote</span></div><Link to="/#contact" state={{ service: service.title }} className="btn-primary !px-4 !py-2.5 text-xs">Request quote</Link></div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
                <section id="inquiry" className="scroll-mt-24 bg-surface-soft py-16 dark:bg-surface-dark-soft md:py-20">
                    <div className="container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                        <div><p className="section-eyebrow">Have a project in mind?</p><h2 className="text-2xl font-extrabold text-ink dark:text-ink-dark md:text-3xl">Let's talk through the details.</h2><p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted dark:text-ink-dark-muted">Share a little about your goals and timeline. I will get back to you with the next steps.</p></div>
                        <Link to="/#contact" state={{ service: requestedService || '' }} className="btn-primary shrink-0">Start an inquiry <i className="fa-solid fa-arrow-right text-xs" /></Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
