import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import BlogListPage from './pages/BlogListPage';
import BlogDetailPage from './pages/BlogDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import UserDashboard from './pages/Dashboard/UserDashboard';
import AuthorDashboard from './pages/Dashboard/AuthorDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/blogs', element: <BlogListPage /> },
      { path: '/blogs/:slug', element: <BlogDetailPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/dashboard', element: <UserDashboard /> },
      { path: '/dashboard/author', element: <AuthorDashboard /> },
      { path: '/dashboard/admin', element: <AdminDashboard /> },
    ],
  },
]);
