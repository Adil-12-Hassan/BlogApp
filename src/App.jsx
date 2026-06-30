import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/home';
import AdminLogin from './pages/admin/adminLogin';
import AdminDashboard from './pages/admin/adminDashboard';
import AdminBlogEditor from './pages/admin/adminBlogEditor';
import BlogDetail from './pages/blogDetail';
import NotFound from './components/notFound';
import ProtectedRoute from './components/ProtectedRoute';
function AppRoutes() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog/:slug" element={<BlogDetail />} />
      <Route path="/admin" element={<AdminLogin onLoginSuccess={() => navigate('/admin/dashboard')} />} />
      
      {/* Protected Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard navigateToEditor={() => navigate('/admin/blog/new')} />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/admin/blog/new" 
        element={
          <ProtectedRoute>
            <AdminBlogEditor onCancel={() => navigate('/admin/dashboard')} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/blog/edit/:id" 
        element={
          <ProtectedRoute>
            <AdminBlogEditor onCancel={() => navigate('/admin/dashboard')} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/blogs" 
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
