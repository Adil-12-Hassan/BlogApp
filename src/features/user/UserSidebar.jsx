import { NavLink, useNavigate } from 'react-router-dom';
import { useUserAuth } from './UserAuthContext';

const links = [
    { to: '/dashboard', label: 'Overview', icon: 'fa-solid fa-grid-2', end: true },
    { to: '/dashboard/saved', label: 'Saved articles', icon: 'fa-regular fa-bookmark' },
    { to: '/dashboard/reactions', label: 'My reactions', icon: 'fa-regular fa-thumbs-up' },
    { to: '/dashboard/history', label: 'Reading history', icon: 'fa-solid fa-clock-rotate-left' },
    { to: '/dashboard/comments', label: 'My comments', icon: 'fa-regular fa-comments' },
];

export default function UserSidebar({ mobile = false, onNavigate }) {
    const { user, logout } = useUserAuth();
    const navigate = useNavigate();
    const itemClass = ({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-accent-soft text-accent dark:bg-accent-dark-soft dark:text-accent-dark' : 'text-ink-soft hover:bg-surface-soft hover:text-ink dark:text-ink-dark-soft dark:hover:bg-surface-dark-soft dark:hover:text-ink-dark'}`;

    function handleLogout() {
        logout();
        navigate('/login', { replace: true });
        onNavigate?.();
    }

    return (
        <div className={mobile ? 'flex min-w-max items-center gap-1' : 'flex h-full flex-col'}>
            {!mobile && <div className="mb-8"><p className="px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-muted dark:text-ink-dark-muted">Your space</p></div>}
            <nav aria-label="Account navigation" className={mobile ? 'flex items-center gap-1' : 'space-y-1'}>
                {links.map((item) => <NavLink key={item.to} to={item.to} end={item.end} onClick={onNavigate} className={itemClass}><i className={`${item.icon} w-5 text-center`} /><span>{item.label}</span></NavLink>)}
            </nav>
            {!mobile && <div className="my-6 border-t border-border dark:border-border-dark" />}
            <nav aria-label="Account settings" className={mobile ? 'flex items-center gap-1' : 'space-y-1'}>
                <NavLink to="/dashboard/profile" onClick={onNavigate} className={itemClass}><i className="fa-regular fa-user w-5 text-center" /><span>Profile</span></NavLink>
                <NavLink to="/dashboard/settings" onClick={onNavigate} className={itemClass}><i className="fa-solid fa-gear w-5 text-center" /><span>Settings</span></NavLink>
            </nav>
            {!mobile && <div className="mt-auto border-t border-border pt-5 dark:border-border-dark"><div className="mb-4 flex items-center gap-3 px-2"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-soft font-bold text-accent dark:bg-accent-dark-soft dark:text-accent-dark">{(user?.name || user?.email || 'R').slice(0, 1).toUpperCase()}</div><div className="min-w-0"><p className="truncate text-sm font-semibold text-ink dark:text-ink-dark">{user?.name || 'Reader account'}</p><p className="truncate text-xs text-ink-muted dark:text-ink-dark-muted">{user?.email || ''}</p></div></div><button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-red-500/10 hover:text-red-500 dark:text-ink-dark-soft"><i className="fa-solid fa-arrow-right-from-bracket w-5 text-center" />Sign out</button></div>}
        </div>
    );
}
