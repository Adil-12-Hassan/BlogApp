import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import API_BASE_URL from '../../lib/api';
import UserAuthLayout from '../user/UserAuthLayout';

export default function AdminLogin({ onLoginSuccess }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((previous) => ({ ...previous, [name]: value }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Login failed.');
            localStorage.setItem('cwh_token', data.token);
            if (onLoginSuccess) onLoginSuccess();
            else navigate('/admin/dashboard');
        } catch (loginError) {
            setError(loginError.message || 'Server not reachable. Make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <SEOHead title="Admin Login" noindex />
            <UserAuthLayout
                eyebrow="Admin access"
                title="Sign in to manage your website"
                description="Use your administrator credentials to continue to the content dashboard."
                panelEyebrow="Content control room"
                panelTitle={<>A clear view of everything you <span className="text-accent dark:text-accent-dark">publish.</span></>}
                panelDescription="Manage articles and keep your website up to date from one focused workspace."
                panelFooter="Administrator access"
            >
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="admin-username" className="field-label">Username</label>
                        <input id="admin-username" type="text" name="username" autoComplete="username" placeholder="Enter your username" value={formData.username} onChange={handleChange} required className="field-input" />
                    </div>
                    <div>
                        <label htmlFor="admin-password" className="field-label">Password</label>
                        <div className="relative">
                            <input id="admin-password" type={showPassword ? 'text' : 'password'} name="password" autoComplete="current-password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required className="field-input pr-12" />
                            <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute inset-y-0 right-3 grid place-items-center px-1 text-ink-muted hover:text-ink dark:text-ink-dark-muted dark:hover:text-ink-dark"><i className={showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'} /></button>
                        </div>
                    </div>
                    {error && <div role="alert" className="rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400">{error}</div>}
                    <button type="submit" className="btn-primary w-full !rounded-xl" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}{!loading && <i className="fa-solid fa-arrow-right text-xs" />}</button>
                    <p className="text-center text-sm text-ink-muted dark:text-ink-dark-muted">Administrator access only. <Link to="/" className="font-semibold text-accent underline dark:text-accent-dark">Return to the public site</Link></p>
                </form>
            </UserAuthLayout>
        </>
    );
}
