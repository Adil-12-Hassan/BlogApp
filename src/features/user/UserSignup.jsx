import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserAuthLayout from './UserAuthLayout';
import { useUserAuth } from './UserAuthContext';

export default function UserSignup() {
    const { register } = useUserAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        if (form.password.length < 8) return setError('Use a password with at least 8 characters.');
        if (form.password !== form.confirmPassword) return setError('The passwords do not match.');
        setSubmitting(true);
        try {
            await register({ name: form.name.trim(), email: form.email.trim(), password: form.password });
            navigate(location.state?.from || '/dashboard', { replace: true });
        } catch (registerError) {
            setError(registerError.message || 'Could not create your account. Please try again.');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <UserAuthLayout eyebrow="Join the readers" title="Create your account" description="Save articles for later and take part in the discussion.">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div><label className="field-label" htmlFor="signup-name">Your name</label><input id="signup-name" className="field-input" type="text" autoComplete="name" required minLength={2} maxLength={80} placeholder="Alex Morgan" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></div>
                <div><label className="field-label" htmlFor="signup-email">Email address</label><input id="signup-email" className="field-input" type="email" autoComplete="email" required placeholder="you@example.com" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></div>
                <div>
                    <label className="field-label" htmlFor="signup-password">Password</label>
                    <div className="relative">
                        <input id="signup-password" className="field-input pr-12" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required minLength={8} placeholder="At least 8 characters" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
                        <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} className="absolute inset-y-0 right-3 grid place-items-center px-1 text-ink-muted hover:text-ink dark:text-ink-dark-muted dark:hover:text-ink-dark"><i className={showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'} /></button>
                    </div>
                </div>
                <div>
                    <label className="field-label" htmlFor="signup-confirm">Confirm password</label>
                    <div className="relative">
                        <input id="signup-confirm" className="field-input pr-12" type={showConfirmPassword ? 'text' : 'password'} autoComplete="new-password" required placeholder="Enter the password again" value={form.confirmPassword} onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })} />
                        <button type="button" onClick={() => setShowConfirmPassword((visible) => !visible)} aria-label={showConfirmPassword ? 'Hide confirmation password' : 'Show confirmation password'} aria-pressed={showConfirmPassword} className="absolute inset-y-0 right-3 grid place-items-center px-1 text-ink-muted hover:text-ink dark:text-ink-dark-muted dark:hover:text-ink-dark"><i className={showConfirmPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'} /></button>
                    </div>
                </div>
                {error && <p role="alert" className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">{error}</p>}
                <button className="btn-primary w-full !rounded-xl" type="submit" disabled={submitting}>{submitting ? 'Creating account…' : 'Create account'}{!submitting && <i className="fa-solid fa-arrow-right text-xs" />}</button>
            </form>
            <p className="mt-6 text-center text-sm text-ink-muted dark:text-ink-dark-muted">Already have an account? <Link to="/login" state={location.state} className="font-semibold text-accent hover:underline dark:text-accent-dark">Sign in</Link></p>
        </UserAuthLayout>
    );
}
