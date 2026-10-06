import SectionTitle from '../../components/ui/SectionTitle'
import { Link } from 'react-router-dom'
import services from './serviceCatalog'

const Services = () => {
    return (
        <section id="services" className="section">
            <div className="container-page">
                <SectionTitle heading="My" accent="Services" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.slice(0, 3).map((s) => (
                        <div key={s.number} className="card relative p-7 overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                            <span className="absolute top-4 right-5 text-4xl font-extrabold text-border dark:text-border-dark select-none">
                                {s.number}
                            </span>
                            <div className="h-12 w-12 rounded-xl bg-accent-soft dark:bg-accent-dark-soft text-accent dark:text-accent-dark grid place-items-center text-xl mb-5">
                                <i className={s.icon}></i>
                            </div>
                            <h3 className="text-lg font-bold text-ink dark:text-ink-dark mb-2">{s.title}</h3>
                            <p className="text-sm leading-relaxed text-ink-soft dark:text-ink-dark-soft">{s.desc}</p>
                            <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-5 dark:border-border-dark">
                                <span className="text-sm font-semibold text-ink dark:text-ink-dark">Custom quote</span>
                                <Link to={`/services?service=${encodeURIComponent(s.title)}#inquiry`} className="text-sm font-semibold text-accent hover:underline dark:text-accent-dark">
                                    Get started <i className="fa-solid fa-arrow-right ml-1 text-xs" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-10 text-center">
                    <Link to="/services" className="btn-outline">Explore all services <i className="fa-solid fa-arrow-right text-xs" /></Link>
                </div>
            </div>
        </section>
    );
};

export default Services;
