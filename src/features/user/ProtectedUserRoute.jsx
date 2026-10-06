import { Navigate, useLocation } from 'react-router-dom';
import { useUserAuth } from './UserAuthContext';

export default function ProtectedUserRoute({ children }) {
    const { user, loading } = useUserAuth();
    const location = useLocation();

    if (loading) {
        return <div className="grid min-h-screen place-items-center text-sm text-ink-muted dark:text-ink-dark-muted">Checking your account…</div>;
    }
    if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
    return children;
}
