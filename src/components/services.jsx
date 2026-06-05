const Services = () => {
    return (
        <section className="services" id="services">
            <div className="section-title">
                <h2>My <span>Services</span></h2>
                <div className="title-line"></div>
            </div>

            <div className="services-grid">
                <div className="service-card">
                    <div className="service-icon"><i className="fa-brands fa-react"></i></div>
                    <h3 className="service-title">Frontend Development</h3>
                    <p className="service-desc">
                        Pixel-perfect, responsive UIs built with React.js. From single-page apps
                        to complex dashboards - fast, accessible, and visually polished.
                    </p>
                    <div className="service-number">01</div>
                </div>

                <div className="service-card">
                    <div className="service-icon"><i className="fa-brands fa-node-js"></i></div>
                    <h3 className="service-title">Backend Development</h3>
                    <p className="service-desc">
                        Scalable REST APIs built with Node.js and Express. Authentication, middleware,
                        error handling, and production-ready server architecture.
                    </p>
                    <div className="service-number">02</div>
                </div>

                <div className="service-card">
                    <div className="service-icon"><i className="fa-solid fa-database"></i></div>
                    <h3 className="service-title">Database Design</h3>
                    <p className="service-desc">
                        Efficient MongoDB schema design, indexing, and aggregation pipelines.
                        Structured data models that scale with your application.
                    </p>
                    <div className="service-number">03</div>
                </div>

                <div className="service-card">
                    <div className="service-icon"><i className="fa-solid fa-plug"></i></div>
                    <h3 className="service-title">REST API Design</h3>
                    <p className="service-desc">
                        Clean, documented, and secure REST APIs. Third-party integrations,
                        webhook handling, and proper HTTP status code conventions.
                    </p>
                    <div className="service-number">04</div>
                </div>

                <div className="service-card">
                    <div className="service-icon"><i className="fa-solid fa-layer-group"></i></div>
                    <h3 className="service-title">Full Stack Projects</h3>
                    <p className="service-desc">
                        End-to-end application development from database to deployment.
                        Complete MERN projects delivered with clean code and documentation.
                    </p>
                    <div className="service-number">05</div>
                </div>

                <div className="service-card">
                    <div className="service-icon"><i className="fa-solid fa-pen-ruler"></i></div>
                    <h3 className="service-title">UI/UX Design</h3>
                    <p className="service-desc">
                        User-centred interface design with a developer's eye for feasibility.
                        Wireframes, prototypes, and handoff-ready designs that actually get built.
                    </p>
                    <div className="service-number">06</div>
                </div>
            </div>
        </section>
    );
};

export default Services;