const Projects = () => {
    const projectList = [
        {
            id: 1,
            title: "Hassan Portfolio",
            desc: "A modern developer portfolio built with React and optimized for performance.",
            link: "https://hassan-porfolio-web.vercel.app/",
            category: "Portfolio"
        },
        {
            id: 2,
            title: "Frontend Web Project",
            desc: "A clean and responsive frontend design showcasing modern UI/UX principles.",
            link: "https://my-frontend-web.vercel.app/",
            category: "Frontend"
        },
        {
            id: 3,
            title: "Professional Portfolio",
            desc: "A professional portfolio website featuring smooth animations and custom layouts.",
            link: "https://portfolio-frontend-orcin-rho.vercel.app/",
            category: "Portfolio"
        },
        {
            id: 4,
            title: "Muhammad Ali Website",
            desc: "A dedicated website built with a focus on branding and user engagement.",
            link: "https://muhammad-ali-website.vercel.app/",
            category: "Website"
        },
        {
            id: 5,
            title: "FRETWORK Guitar Studio",
            desc: "A modern guitar studio website with a focus on showcasing instruments and services.",
            link: "https://guitar-studio-beta.vercel.app/",
            category: "Studio"
        },
        {
            id: 6,
            title: "ΣTYLOPHONE Studio",
            desc: "A modern music studio website with a focus on showcasing instruments and services.",
            link: "https://stylophone-studio.vercel.app/",
            category: "Studio"
        },
        {
            id: 7,
            title: "Vocal Voids",
            desc: "A live voice changer website built with Pure HTML, CSS and JavaScript allowing users to modify their voice in real-time.",
            link: "https://vocal-void.vercel.app/",
            category: "Studio"
        },
        {
            id: 8,
            title: "LearnForgeLMS",
            desc: "Exciting projects are on the way! Stay tuned for updates and new additions to my portfolio.",
            link: "#projects",
            category: "Coming Soon"
        }
    ];

    return (
        <section className="projects" id="projects">
            <div className="section-title">
                <h2>My <span>Projects</span></h2>
                <div className="title-line"></div>
            </div>

            <div className="projects-grid">
                {projectList.map((project) => (
                    <div className="project-card" key={project.id}>
                        <div className="project-content">
                            <span className="project-category">{project.category}</span>
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-desc">{project.desc}</p>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-link"
                            >
                                View Live <i className="fa-solid fa-arrow-up-right-from-square"></i>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
export default Projects;
