import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/layout/Footer';
import Navbar from '../../components/layout/Navbar';
import SEOHead from '../../components/seo/SEOHead';
import API_BASE_URL from '../../lib/api';

export default function AdminLogin({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        setLoading(false);
        return;
      }
      localStorage.setItem('cwh_token', data.token);
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        navigate('/admin/dashboard');
      }
    } catch {
      setError('Server not reachable. Make sure backend is running.');
      setLoading(false);
    }
  }

  return (
    <>
      <SEOHead title="Admin Login" noindex={true} />
      <Navbar />
      <div className="section flex items-center justify-center min-h-[70vh]">
        <div className="card w-full max-w-md p-8">
          <span className="section-eyebrow">CodeWithHassan</span>
          <h1 className="text-2xl font-bold text-ink dark:text-ink-dark mb-1">Admin Login</h1>
          <p className="text-sm text-ink-soft dark:text-ink-dark-soft mb-6">Sign in to manage your website content</p>

          {error && (
            <div className="mb-5 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-medium px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="field-label">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
                className="field-input"
              />
            </div>

            <div>
              <label className="field-label">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="field-input pr-11"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-3 flex items-center text-ink-muted dark:text-ink-dark-muted hover:text-ink dark:hover:text-ink-dark"
                >
                  <i className={showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'}></i>
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <p className="text-center text-sm text-ink-muted dark:text-ink-dark-muted">
              Only Admin can access. If you are not, please visit{' '}
              <Link to="/" className="text-accent dark:text-accent-dark underline">Public Page</Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
