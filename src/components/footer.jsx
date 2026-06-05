import { Link, useLocation } from 'react-router-dom';

const FooterLink = ({ href, children, isHomePage }) => {
    if (isHomePage && href.startsWith('#')) {
        return <a href={href}>{children}</a>;
    }
    // If not home page, prepend / to hash links
    const to = href.startsWith('#') ? `/${href}` : href;
    return <Link to={to}>{children}</Link>;
};

const Footer = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-brand">
                    <Link to="/" className="footer-logo">SYED<span>.</span></Link>
                    <p className="footer-tagline">
                        MERN Stack Developer crafting fast, scalable,<br />
                        and beautifully designed web applications.
                    </p>
                    <div className="footer-socials">
                        <a href="https://github.com/adil-12-hassan/" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/adil-12-hassan/" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                        <a href="https://www.youtube.com/channel/UCzT4olXB1mfr2Dk6qhy0WEA" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
                        <a href="https://www.instagram.com/adilhassan107/" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                        <a href="https://twitter.com/adilhassan107" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="Twitter/X"><i className="fa-brands fa-x-twitter"></i></a>
                    </div>
                </div>

                <div className="footer-col">
                    <h4 className="footer-col-title">Quick Links</h4>
                    <ul className="footer-links">
                        <li><FooterLink href="#home" isHomePage={isHomePage}><i className="fa-solid fa-chevron-right"></i> Home</FooterLink></li>
                        <li><FooterLink href="#about" isHomePage={isHomePage}><i className="fa-solid fa-chevron-right"></i> About</FooterLink></li>
                        <li><FooterLink href="#services" isHomePage={isHomePage}><i className="fa-solid fa-chevron-right"></i> Services</FooterLink></li>
                        <li><a href="https://hassan-porfolio-web.vercel.app/" target="_blank" rel="noopener noreferrer" className="footer-link"><i className="fa-solid fa-chevron-right"></i> Portfolio</a></li>
                        <li><FooterLink href="#contact" isHomePage={isHomePage}><i className="fa-solid fa-chevron-right"></i> Contact</FooterLink></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4 className="footer-col-title">Services</h4>
                    <ul className="footer-links">
                        <li><FooterLink href="#services" isHomePage={isHomePage}><i className="fa-solid fa-chevron-right"></i> Frontend Dev</FooterLink></li>
                        <li><FooterLink href="#services" isHomePage={isHomePage}><i className="fa-solid fa-chevron-right"></i> Backend Dev</FooterLink></li>
                        <li><FooterLink href="#services" isHomePage={isHomePage}><i className="fa-solid fa-chevron-right"></i> REST API Design</FooterLink></li>
                        <li><FooterLink href="#services" isHomePage={isHomePage}><i className="fa-solid fa-chevron-right"></i> Database Design</FooterLink></li>
                        <li><FooterLink href="#services" isHomePage={isHomePage}><i className="fa-solid fa-chevron-right"></i> UI/UX Design</FooterLink></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4 className="footer-col-title">Contact</h4>
                    <ul className="footer-contact-list">
                        <li><i className="fa-solid fa-envelope"></i><span>syedadilhassan06@gmail.com</span></li>
                        <li><i className="fa-solid fa-phone"></i><span>+92 328 151 1293</span></li>
                        <li><i className="fa-solid fa-location-dot"></i><span>Faisalabad, Punjab Pakistan</span></li>
                        <li>
                            <i className="fa-solid fa-circle status-dot"></i>
                            <span className="available-text">Available for Work</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-divider"></div>

            <div className="footer-bottom">
                <p>&copy; 2025 <span><Link to="/">Syed Hassan</Link></span>. All Rights Reserved.</p>
                <p>Built with <i className="fa-solid fa-heart"></i> using Hassan's Stack</p>
            </div>
        </footer>
    );
};
export default Footer;