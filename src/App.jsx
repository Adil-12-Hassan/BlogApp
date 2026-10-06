import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './app/providers/ThemeProvider';
import HomePage from './features/home/HomePage';
import AdminLogin from './features/admin/AdminLogin';
import AdminDashboard from './features/admin/AdminDashboard';
import AdminBlogEditor from './features/admin/AdminBlogEditor';
import ProtectedRoute from './features/admin/ProtectedRoute';
import BlogDetail from './features/blog/BlogDetail';
import BlogList from './features/blog/BlogList';
import ServicesPage from './features/services/ServicesPage';
import UserLogin from './features/user/UserLogin';
import UserSignup from './features/user/UserSignup';
import { UserAuthProvider } from './features/user/UserAuthContext';
import ProtectedUserRoute from './features/user/ProtectedUserRoute';
import UserLayout from './features/user/UserLayout';
import UserDashboard from './features/user/UserDashboard';
import UserBookmarks from './features/user/UserBookmarks';
import UserLikes from './features/user/UserLikes';
import UserHistory from './features/user/UserHistory';
import UserComments from './features/user/UserComments';
import UserProfile from './features/user/UserProfile';
import UserSettings from './features/user/UserSettings';
import NotFound from './components/layout/NotFound';

function AppRoutes() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blogs" element={<BlogList />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/blog/:slug" element={<BlogDetail />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/dashboard" element={<ProtectedUserRoute><UserLayout /></ProtectedUserRoute>}>
        <Route index element={<UserDashboard />} />
        <Route path="saved" element={<UserBookmarks />} />
        <Route path="reactions" element={<UserLikes />} />
        <Route path="history" element={<UserHistory />} />
        <Route path="comments" element={<UserComments />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="settings" element={<UserSettings />} />
      </Route>
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
        <UserAuthProvider>
          <AppRoutes />
        </UserAuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
