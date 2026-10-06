import { useEffect, useState } from 'react';
import { useUserAuth } from './UserAuthContext';

export default function UserProfile() {
    const { user, updateProfile } = useUserAuth();
    const [name, setName] = useState(user?.name || '');
    const [status, setStatus] = useState({ message: '', error: false });
    const [saving, setSaving] = useState(false);

    useEffect(() => { setName(user?.name || ''); }, [user?.name]);

    async function handleSubmit(event) {
        event.preventDefault();
        setSaving(true);
        setStatus({ message: '', error: false });
        try {
            await updateProfile({ name: name.trim() });
            setStatus({ message: 'Your profile was updated.', error: false });
        } catch (error) {
            setStatus({ message: error.message || 'Could not update your profile.', error: true });
        } finally {
            setSaving(false);
        }
    }

    return (
        <section className="card max-w-2xl p-6 md:p-8">
            <div className="mb-7 flex items-center gap-4"><div className="grid h-16 w-16 place-items-center rounded-2xl bg-accent-soft text-2xl font-extrabold text-accent dark:bg-accent-dark-soft dark:text-accent-dark">{(user?.name || user?.email || 'R').slice(0, 1).toUpperCase()}</div><div><h2 className="font-bold text-ink dark:text-ink-dark">Profile details</h2><p className="text-sm text-ink-muted dark:text-ink-dark-muted">Update how your name appears in discussions.</p></div></div>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div><label htmlFor="profile-name" className="field-label">Display name</label><input id="profile-name" className="field-input" value={name} onChange={(event) => setName(event.target.value)} minLength={2} maxLength={80} required /></div>
                <div><label htmlFor="profile-email" className="field-label">Email address</label><input id="profile-email" className="field-input opacity-70" value={user?.email || ''} readOnly /><p className="mt-1.5 text-xs text-ink-muted dark:text-ink-dark-muted">Contact support to change the email on your account.</p></div>
                {status.message && <p role={status.error ? 'alert' : 'status'} className={`rounded-xl px-4 py-3 text-sm ${status.error ? 'bg-red-500/10 text-red-600 dark:text-red-400' : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'}`}>{status.message}</p>}
                <button className="btn-primary" type="submit" disabled={saving || !name.trim()}>{saving ? 'Saving…' : 'Save profile'}</button>
            </form>
        </section>
    );
}
