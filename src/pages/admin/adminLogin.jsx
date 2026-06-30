import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import SEOHead from '../../components/SEOHead';
import API_BASE_URL from '../../config';

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
        onLoginSuccess(); // App.jsx wala callback
      } else {
        navigate('/admin/dashboard'); // Fallback
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
      <div className="admin-login-page">
        <div className="admin-login-card">
          <span className="admin-logo-text">CodeWithHassan</span>
          <h1>Admin Login</h1>
          <p>Sign in to manage your website content</p>

          {error && <div className="admin-error-msg">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="admin-form-group admin-password-group">
              <label>Password</label>
              <div className="admin-password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="admin-password-toggle"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <i className={showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'}></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="admin-btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '14px',
                marginBottom: '15px'
              }}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.9rem', color: '#666' }}>
              Only Admin can Access. If you are not please visit{' '}
              <Link to="/" style={{ color: '#007bff', textDecoration: 'underline' }}>
                Public Page
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

