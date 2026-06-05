const API_BASE_URL = import.meta.env.VITE_API_URL || 
    (import.meta.env.MODE === 'development' ? 'http://localhost:5000/api' : 'https://codewithhassan-backend.vercel.app/api');
export default API_BASE_URL;