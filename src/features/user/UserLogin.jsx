import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserAuthLayout from './UserAuthLayout';
import { useUserAuth } from './UserAuthContext';

export default function UserLogin() {
    const { login } = useUserAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            await login(form);
            navigate(location.state?.from || '/dashboard', { replace: true });
        } catch (loginError) {
            setError(loginError.message || 'Could not sign in. Please try again.');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <UserAuthLayout eyebrow="Welcome back" title="Sign in to your account" description="Pick up where you left off and get back to your saved reading.">
            <form onSubmit={handleSubmit} className="space-y-5">
                <div><label className="field-label" htmlFor="user-email">Email address</label><input id="user-email" className="field-input" type="email" autoComplete="email" required placeholder="you@example.com" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></div>
                <div>
                    <label className="field-label" htmlFor="user-password">Password</label>
                    <div className="relative">
                        <input id="user-password" className="field-input pr-12" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required placeholder="Your password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
                        <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} className="absolute inset-y-0 right-3 grid place-items-center px-1 text-ink-muted hover:text-ink dark:text-ink-dark-muted dark:hover:text-ink-dark"><i className={showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'} /></button>
                    </div>
                </div>
                {error && <p role="alert" className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">{error}</p>}
                <button className="btn-primary w-full !rounded-xl" type="submit" disabled={submitting}>{submitting ? 'Signing in…' : 'Sign in'}{!submitting && <i className="fa-solid fa-arrow-right text-xs" />}</button>
            </form>
            <p className="mt-7 text-center text-sm text-ink-muted dark:text-ink-dark-muted">New here? <Link to="/signup" state={location.state} className="font-semibold text-accent hover:underline dark:text-accent-dark">Create an account</Link></p>
            <Link to="/" className="mt-8 inline-flex items-center gap-2 text-xs font-medium text-ink-muted hover:text-ink dark:text-ink-dark-muted dark:hover:text-ink-dark"><i className="fa-solid fa-arrow-left" /> Back to the website</Link>
        </UserAuthLayout>
    );
}
