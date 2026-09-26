import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="section flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="text-7xl font-extrabold text-accent dark:text-accent-dark mb-2">404</div>
          <h1 className="text-2xl font-bold text-ink dark:text-ink-dark mb-3">Page Not Found</h1>
          <p className="text-ink-soft dark:text-ink-dark-soft mb-8">
            The page you're looking for doesn't exist or may have been moved. Redirecting you home shortly.
          </p>
          <Link to="/" className="btn-primary">To Main Page</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
