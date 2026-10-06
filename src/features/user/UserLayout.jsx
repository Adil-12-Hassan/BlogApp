import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from '../../components/ui/ThemeToggle';
import { useUserAuth } from './UserAuthContext';
import UserSidebar from './UserSidebar';

const pageTitles = {
    '/dashboard': ['Your dashboard', 'A little space to keep your reading in order.'],
    '/dashboard/saved': ['Saved articles', 'The stories you want to come back to.'],
    '/dashboard/reactions': ['My reactions', 'Articles you have responded to.'],
    '/dashboard/history': ['Reading history', 'Pick up with articles you have visited.'],
    '/dashboard/comments': ['My comments', 'Your contributions across the blog.'],
    '/dashboard/profile': ['Your profile', 'Manage the details associated with your account.'],
    '/dashboard/settings': ['Account settings', 'Manage your account preferences.'],
};

export default function UserLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useUserAuth();
    const [title, subtitle] = pageTitles[location.pathname] || pageTitles['/dashboard'];

    function signOut() {
        logout();
        navigate('/login', { replace: true });
    }

    return (
        <div className="min-h-screen bg-surface-soft dark:bg-surface-dark">
            <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-surface px-5 py-7 dark:border-border-dark dark:bg-surface-dark lg:flex">
                <Link to="/" className="mb-12 px-3 text-lg font-extrabold tracking-tight text-ink dark:text-ink-dark">HASSAN<span className="text-accent dark:text-accent-dark">.</span></Link>
                <UserSidebar />
            </aside>
            <div className="min-h-screen lg:pl-64">
                <header className="sticky top-0 z-20 border-b border-border bg-surface/90 backdrop-blur-md dark:border-border-dark dark:bg-surface-dark/90">
                    <div className="container-page flex items-center justify-between py-3 md:py-4">
                        <Link to="/" className="text-base font-extrabold tracking-tight text-ink dark:text-ink-dark lg:hidden">HASSAN<span className="text-accent dark:text-accent-dark">.</span></Link>
                        <div className="hidden lg:block"><p className="text-xs text-ink-muted dark:text-ink-dark-muted">Reader dashboard</p><p className="text-sm font-semibold text-ink dark:text-ink-dark">{user?.name ? `Hello, ${user.name.split(' ')[0]}` : 'Welcome back'}</p></div>
                        <div className="flex items-center gap-2"><Link to="/blogs" className="hidden rounded-full px-4 py-2 text-xs font-semibold text-ink-soft hover:bg-surface-soft dark:text-ink-dark-soft dark:hover:bg-surface-dark-soft sm:inline-flex"><i className="fa-solid fa-arrow-up-right-from-square mr-2" />Browse blog</Link><ThemeToggle /><button onClick={signOut} className="grid h-10 w-10 place-items-center rounded-full text-ink-soft hover:bg-surface-soft hover:text-red-500 dark:text-ink-dark-soft dark:hover:bg-surface-dark-soft" aria-label="Sign out"><i className="fa-solid fa-arrow-right-from-bracket" /></button></div>
                    </div>
                    <div className="overflow-x-auto border-t border-border px-4 py-2 dark:border-border-dark lg:hidden"><UserSidebar mobile /></div>
                </header>
                <main className="container-page py-8 md:py-11">
                    <div className="mb-8"><p className="section-eyebrow">Reader account</p><h1 className="text-3xl font-extrabold tracking-tight text-ink dark:text-ink-dark">{title}</h1><p className="mt-2 text-sm text-ink-muted dark:text-ink-dark-muted">{subtitle}</p></div>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
