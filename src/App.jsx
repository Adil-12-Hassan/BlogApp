import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './app/providers/ThemeProvider';
import HomePage from './features/home/HomePage';
import AdminLogin from './features/admin/AdminLogin';
import AdminDashboard from './features/admin/AdminDashboard';
import AdminBlogEditor from './features/admin/AdminBlogEditor';
import ProtectedRoute from './features/admin/ProtectedRoute';
import BlogDetail from './features/blog/BlogDetail';
import NotFound from './components/layout/NotFound';

function AppRoutes() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
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
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
