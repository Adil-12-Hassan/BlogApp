import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './footer';
import Navbar from './navbar';

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Set a timer to redirect to the main page after 3000ms (3 seconds)
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    // 2. Clean up the timer if the user clicks the link or leaves early
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="not-found-page">
        <div className="not-found-card">
          <div className="not-found-title">404</div>
          <h1 className="not-found-heading">Page Not Found</h1>
          <p className="not-found-description">
            The page you’re looking for doesn’t exist or may have been moved.
          </p>
          <div className="not-found-actions">
            <Link to="/" className="not-found-home">
              To Main Page
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}