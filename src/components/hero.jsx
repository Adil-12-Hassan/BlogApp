import personImg from '../assets/person.png';
const Hero = () => {
    return (
        <section className="hero" id="home">
            {/* LEFT */}
            <div className="hero-left">
                <p className="greeting">Hi I am</p>
                <h1 className="name">Syed Hassan</h1>
                <h2 className="title">MERN Stack Developer</h2>

                {/* Social Icons */}
                <div className="socials">
                    <a href="https://www.instagram.com/adilhassan107/" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                    <a href="https://www.linkedin.com/in/adil-12-hassan/" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                    <a href="https://github.com/adil-12-hassan/" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
                    <a href="https://www.youtube.com/channel/UCzT4olXB1mfr2Dk6qhy0WEA" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
                </div>

                {/* Buttons */}
                <div className="hero-buttons">
                    <a href="#contact" className="btn-hire">Hire Me</a>
                    <a href="/AdilCV.pdf" download="Syed_Adil_Hassan_CV.pdf" className="btn-outline">Download CV</a>
                </div>

                {/* Stats */}
                <div className="stats">
                    <div className="stat-item">
                        <span className="stat-number">2+</span>
                        <span className="stat-label">Experience</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">20+</span>
                        <span className="stat-label">Projects Done</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">80+</span>
                        <span className="stat-label">Satisfied Clients</span>
                    </div>
                </div>
            </div>

            {/* RIGHT */}
            <div className="hero-right">
                <div className="circle-bg"></div>
                <img src={personImg} alt="Syed Hassan" className="hero-img" />
            </div>
        </section>
    );
};

export default Hero;
