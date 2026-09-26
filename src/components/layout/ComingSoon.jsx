import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';

export default function ComingSoon() {
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
                <div className="text-center max-w-lg">
                    <span className="section-eyebrow">Coming Soon, Keep Connected</span>
                    <h1 className="text-2xl font-bold text-ink dark:text-ink-dark mb-3">
                        The page you are looking for is coming soon.
                    </h1>
                    <p className="text-ink-soft dark:text-ink-dark-soft mb-8">
                        Hold tight! You will be automatically redirected to the home page in 3 seconds.
                    </p>
                    <Link to="/" className="btn-primary">To Main Page</Link>
                </div>
            </div>
            <Footer />
        </>
    );
}
