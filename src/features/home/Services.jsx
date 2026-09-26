import SectionTitle from '../../components/ui/SectionTitle'

const services = [
    { icon: 'fa-brands fa-react', title: 'Frontend Development', desc: "Pixel-perfect, responsive UIs built with React.js. From single-page apps to complex dashboards - fast, accessible, and visually polished.", number: '01' },
    { icon: 'fa-brands fa-node-js', title: 'Backend Development', desc: 'Scalable REST APIs built with Node.js and Express. Authentication, middleware, error handling, and production-ready server architecture.', number: '02' },
    { icon: 'fa-solid fa-database', title: 'Database Design', desc: 'Efficient MongoDB schema design, indexing, and aggregation pipelines. Structured data models that scale with your application.', number: '03' },
    { icon: 'fa-solid fa-plug', title: 'REST API Design', desc: 'Clean, documented, and secure REST APIs. Third-party integrations, webhook handling, and proper HTTP status code conventions.', number: '04' },
    { icon: 'fa-solid fa-layer-group', title: 'Full Stack Projects', desc: 'End-to-end application development from database to deployment. Complete MERN projects delivered with clean code and documentation.', number: '05' },
    { icon: 'fa-solid fa-pen-ruler', title: 'UI/UX Design', desc: "User-centred interface design with a developer's eye for feasibility. Wireframes, prototypes, and handoff-ready designs that actually get built.", number: '06' },
]

const Services = () => {
    return (
        <section id="services" className="section">
            <div className="container-page">
                <SectionTitle heading="My" accent="Services" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((s) => (
                        <div key={s.number} className="card relative p-7 overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                            <span className="absolute top-4 right-5 text-4xl font-extrabold text-border dark:text-border-dark select-none">
                                {s.number}
                            </span>
                            <div className="h-12 w-12 rounded-xl bg-accent-soft dark:bg-accent-dark-soft text-accent dark:text-accent-dark grid place-items-center text-xl mb-5">
                                <i className={s.icon}></i>
                            </div>
                            <h3 className="text-lg font-bold text-ink dark:text-ink-dark mb-2">{s.title}</h3>
                            <p className="text-sm leading-relaxed text-ink-soft dark:text-ink-dark-soft">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
