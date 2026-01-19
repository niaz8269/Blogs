import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { useState, useEffect } from 'react';

export default function Sidebar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    api.get('/categories')
      .then(({ data }) => setCategories(data.data || data))
      .catch(console.error);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/blogs?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="h-screen flex flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Blogify
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          <Link
            to="/"
            className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/blogs"
            className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            All Blogs
          </Link>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="mt-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blogs..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        {/* Categories */}
        <div className="mt-6">
          <h3 className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase">Categories</h3>
          <div className="space-y-1">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/blogs?category=${category.slug}`}
                className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
              >
                {category.name} ({category.blogs_count || 0})
              </Link>
            ))}
          </div>
        </div>

        {/* Auth Links */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          {isAuthenticated ? (
            <div className="space-y-2">
              <Link
                to="/dashboard"
                className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Dashboard
              </Link>
              {user?.role?.name === 'author' && (
                <Link
                  to="/dashboard/author"
                  className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Author Dashboard
                </Link>
              )}
              {user?.role?.name === 'admin' && (
                <Link
                  to="/dashboard/admin"
                  className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                to="/login"
                className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 rounded-lg bg-blue-600 text-white text-center hover:bg-blue-700 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* User Info */}
      {isAuthenticated && user && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
