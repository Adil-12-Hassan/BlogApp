import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavItem = ({ href, children, isHomePage, closeMenu }) => {
    if (isHomePage && href.startsWith('#')) {
        return <li><a href={href} onClick={closeMenu}>{children}</a></li>
    }
    return <li><Link to={`/${href}`} onClick={closeMenu}>{children}</Link></li>
}

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const navRef = useRef(null)
    const location = useLocation()
    const isHomePage = location.pathname === '/'

    // Close menu when a link is clicked
    const closeMenu = () => setMenuOpen(false)

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setMenuOpen(false)
            }
        }

        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [menuOpen])

    return (
        <nav className="navbar" id="navbar" ref={navRef}>
            <Link to="/" className="logo">HASSAN<span>.</span></Link>

            <ul className={`nav-links ${menuOpen ? 'open' : ''}`} id="navLinks">
                <NavItem href="#home" isHomePage={isHomePage} closeMenu={closeMenu}>Home</NavItem>
                <NavItem href="#about" isHomePage={isHomePage} closeMenu={closeMenu}>About</NavItem>
                <NavItem href="#services" isHomePage={isHomePage} closeMenu={closeMenu}>Services</NavItem>
                <NavItem href="#projects" isHomePage={isHomePage} closeMenu={closeMenu}>Projects</NavItem>
                <NavItem href="#blog" isHomePage={isHomePage} closeMenu={closeMenu}>Blogs</NavItem>
                <li><a href="https://hassan-porfolio-web.vercel.app/" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Portfolio</a></li>
            </ul>

            {isHomePage ? (
                <a href="#contact" className="btn-hire desktop-hire">Hire for Work</a>
            ) : (
                <Link to="/#contact" className="btn-hire desktop-hire">Hire for Work</Link>
            )}

            <button
                className={`hamburger ${menuOpen ? 'open' : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle Menu"
            >
                <span></span><span></span><span></span>
            </button>
        </nav>
    )
}