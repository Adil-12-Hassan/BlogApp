import { NavLink, useNavigate } from 'react-router-dom'

const links = [
    {
        to: '/admin/dashboard', label: 'Dashboard', icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[18px] w-[18px]">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
        )
    },
    {
        to: '/admin/blog/new', label: 'New Blog', icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[18px] w-[18px]">
                <path d="M12 5v14M5 12h14" />
            </svg>
        )
    },
    {
        to: '/admin/blogs', label: 'All Blogs', icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[18px] w-[18px]">
                <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        )
    },
]

export default function AdminSidebar({ onClose }) {
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.removeItem('cwh_token')
        navigate('/admin')
        if (onClose) onClose()
    }

    return (
        <aside className="flex flex-col h-full bg-surface-soft dark:bg-surface-dark-soft border-r border-border dark:border-border-dark p-6">
            <div className="mb-10">
                <h2 className="text-lg font-extrabold text-ink dark:text-ink-dark">CodeWithHassan</h2>
                <span className="text-xs text-ink-muted dark:text-ink-dark-muted">Admin Panel</span>
            </div>

            <nav className="flex-1 space-y-1">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        onClick={() => onClose && onClose()}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                                isActive
                                    ? 'bg-accent-soft dark:bg-accent-dark-soft text-accent dark:text-accent-dark'
                                    : 'text-ink-soft dark:text-ink-dark-soft hover:bg-surface dark:hover:bg-surface-dark'
                            }`
                        }
                    >
                        {link.icon}
                        {link.label}
                    </NavLink>
                ))}
            </nav>

            <button
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors mt-4"
                onClick={handleLogout}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
            </button>
        </aside>
    )
}
