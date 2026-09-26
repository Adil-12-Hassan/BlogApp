import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from '../ui/ThemeToggle'

const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#profiles', label: 'Profiles' },
    { href: '#projects', label: 'Projects' },
    { href: '#blog', label: 'Blogs' },
]

const NavItem = ({ href, children, isHomePage, closeMenu }) => {
    const className =
        'block py-2 text-sm font-medium text-ink-soft dark:text-ink-dark-soft hover:text-accent dark:hover:text-accent-dark transition-colors'
    if (isHomePage && href.startsWith('#')) {
        return (
            <li>
                <a href={href} onClick={closeMenu} className={className}>
                    {children}
                </a>
            </li>
        )
    }
    return (
        <li>
            <Link to={`/${href}`} onClick={closeMenu} className={className}>
                {children}
            </Link>
        </li>
    )
}

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const navRef = useRef(null)
    const location = useLocation()
    const isHomePage = location.pathname === '/'

    const closeMenu = () => setMenuOpen(false)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setMenuOpen(false)
            }
        }
        if (menuOpen) document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [menuOpen])

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <nav
            ref={navRef}
            className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
                scrolled
                    ? 'bg-surface/90 dark:bg-surface-dark/90 backdrop-blur-md border-border dark:border-border-dark'
                    : 'bg-surface dark:bg-surface-dark border-transparent'
            }`}
        >
            <div className="container-page flex items-center justify-between py-4">
                <Link to="/" className="text-lg font-extrabold tracking-tight text-ink dark:text-ink-dark">
                    HASSAN<span className="text-accent dark:text-accent-dark">.</span>
                </Link>

                <ul className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <NavItem key={link.href} href={link.href} isHomePage={isHomePage} closeMenu={closeMenu}>
                            {link.label}
                        </NavItem>
                    ))}
                </ul>

                <div className="hidden md:flex items-center gap-3">
                    <ThemeToggle />
                    {isHomePage ? (
                        <a href="#contact" className="btn-primary !px-5 !py-2.5 text-xs">Hire for Work</a>
                    ) : (
                        <Link to="/#contact" className="btn-primary !px-5 !py-2.5 text-xs">Hire for Work</Link>
                    )}
                </div>

                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />
                    <button
                        className="grid h-10 w-10 place-items-center"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label="Toggle Menu"
                    >
                        <div className="flex flex-col gap-1.5 w-6">
                            <span className={`h-0.5 w-full bg-ink dark:bg-ink-dark transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <span className={`h-0.5 w-full bg-ink dark:bg-ink-dark transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
                            <span className={`h-0.5 w-full bg-ink dark:bg-ink-dark transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <ul
                className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out bg-surface dark:bg-surface-dark border-t border-border dark:border-border-dark ${
                    menuOpen ? 'max-h-96' : 'max-h-0 border-t-0'
                }`}
            >
                <div className="container-page py-4 flex flex-col gap-1">
                    {navLinks.map((link) => (
                        <NavItem key={link.href} href={link.href} isHomePage={isHomePage} closeMenu={closeMenu}>
                            {link.label}
                        </NavItem>
                    ))}
                    <div className="pt-3">
                        {isHomePage ? (
                            <a href="#contact" onClick={closeMenu} className="btn-primary w-full">Hire for Work</a>
                        ) : (
                            <Link to="/#contact" onClick={closeMenu} className="btn-primary w-full">Hire for Work</Link>
                        )}
                    </div>
                </div>
            </ul>
        </nav>
    )
}
