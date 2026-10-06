import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from './UserAuthContext';

export default function UserSettings() {
    const { logout } = useUserAuth();
    const navigate = useNavigate();

    function signOut() {
        logout();
        navigate('/login', { replace: true });
    }

    return (
        <div className="grid max-w-3xl gap-5">
            <section className="card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent dark:bg-accent-dark-soft dark:text-accent-dark"><i className="fa-solid fa-user-pen" /></span><div><h2 className="font-bold text-ink dark:text-ink-dark">Profile information</h2><p className="mt-1 text-sm text-ink-muted dark:text-ink-dark-muted">Change the display name shown with your comments.</p></div></div><Link to="/dashboard/profile" className="btn-outline !px-4 !py-2.5 text-xs">Edit profile</Link></section>
            <section className="card flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface-soft text-ink dark:bg-surface-dark-soft dark:text-ink-dark"><i className="fa-solid fa-shield-halved" /></span><div><h2 className="font-bold text-ink dark:text-ink-dark">Sign-in security</h2><p className="mt-1 max-w-lg text-sm leading-relaxed text-ink-muted dark:text-ink-dark-muted">Your account session is stored in this browser. Password recovery and session management can be added with the reader authentication API.</p></div></div><button onClick={signOut} className="btn-outline !px-4 !py-2.5 text-xs">Sign out</button></section>
        </div>
    );
}
