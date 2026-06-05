import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('cwh_token');
    
    if (!token) {
        // Redirect to login if no token is found
        return <Navigate to="/admin" replace />;
    }

    return children;
};

export default ProtectedRoute;
