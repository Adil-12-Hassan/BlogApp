import { NavLink, useNavigate } from 'react-router-dom'

export default function AdminSidebar({ onClose }) {
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.removeItem('cwh_token')
        navigate('/admin')
        if (onClose) onClose() // ✅ Logout pe bhi band
    }

    return (
        <aside className="admin-sidebar">
            <div className="admin-sidebar-logo">
                <h2>CodeWithHassan</h2>
                <span>Admin Panel</span>
            </div>

            <nav className="admin-sidebar-nav">
                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                        isActive ? 'admin-nav-link active' : 'admin-nav-link'
                    }
                    onClick={() => onClose && onClose()} // ✅
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                    </svg>
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin/blog/new"
                    className={({ isActive }) =>
                        isActive ? 'admin-nav-link active' : 'admin-nav-link'
                    }
                    onClick={() => onClose && onClose()} // ✅
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" />
                    </svg>
                    New Blog
                </NavLink>

                <NavLink
                    to="/admin/blogs"
                    className={({ isActive }) =>
                        isActive ? 'admin-nav-link active' : 'admin-nav-link'
                    }
                    onClick={() => onClose && onClose()} // ✅
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    All Blogs
                </NavLink>
            </nav>

            <div className="admin-sidebar-footer">
                <button className="admin-logout-btn" onClick={handleLogout}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                </button>
            </div>
        </aside>
    )
}