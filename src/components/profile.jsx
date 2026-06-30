const Profiles = () => {
    const profileList = [
        {
            id: 1,
            title: "GitHub",
            desc: "Explore my open-source contributions, personal side projects, and repositories showcasing my clean coding practices.",
            link: "https://github.com/adil-12-hassan",
            category: "Profile"
        },
        {
            id: 2,
            title: "Fiverr",
            desc: "Hire me for quick gigs, custom development solutions, and specialized freelance services with top-tier support.",
            link: "https://www.fiverr.com/s/WEaqAVl",
            category: "Freelancing"
        },
        {
            id: 3,
            title: "Upwork",
            desc: "Let's collaborate on long-term projects. Check out my specialized contract history, client reviews, and professional work history.",
            link: "https://www.upwork.com/freelancers/~01147946b9c52ee855",
            category: "Freelancing"
        },
        {
            id: 4,
            title: "LinkedIn",
            desc: "Connect with me professionally, view my resume, explore my career timeline, and stay updated with my latest industry insights.",
            link: "https://linkedin.com/in/adil-12-hassan",
            category: "Profile"
        },
        {
            id: 5,
            title: "Link Tree",
            desc: "A centralized hub featuring all my essential links, social platforms, and active digital touchpoints in one convenient place.",
            link: "https://linktr.ee/adil12Hassan",
            category: "Links"
        }
    ];

    return (
        <section className="projects" id="profiles">
            <div className="section-title">
                <h2>My <span>Profiles</span></h2>
                <div className="title-line"></div>
            </div>

            <div className="projects-grid">
                {profileList.map((profile) => (
                    <div className="project-card" key={profile.id}>
                        <div className="project-content">
                            <span className="project-category">{profile.category}</span>
                            <h3 className="project-title">{profile.title}</h3>
                            <p className="project-desc">{profile.desc}</p>
                            <a
                                href={profile.link}
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
export default Profiles;