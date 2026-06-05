import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './footer';
import Navbar from './navbar';

export default function ComingSoon() {
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
            <div className="comming-soon-page">
                <div className="coming-soon-card">
                    <div className="coming-soon-title">Coming SOON, Keep Connected.</div>
                    <h1 className="coming-soon-heading">The page you are looking for is coming soon.</h1>
                    <p className="coming-soon-description">
                        Hold tight! You will be automatically redirected to the home page in 3 seconds.
                    </p>
                    <div className="coming-soon-actions">
                        <Link to="/" className="coming-soon-home">
                            To Main Page
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}