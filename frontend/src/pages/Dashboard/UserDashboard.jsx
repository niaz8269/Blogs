import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function UserDashboard() {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        // Note: You'll need to add a bookmarks endpoint to the API
        // For now, this is a placeholder
        const { data } = await api.get('/blogs', { params: { bookmarked: true } }).catch(() => ({ data: { data: [] } }));
        setBookmarks(data.data || data || []);
      } catch (error) {
        console.error('Error loading bookmarks:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBookmarks();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        <div className="space-y-2">
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role?.display_name}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Saved Blogs</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : bookmarks.length === 0 ? (
          <p className="text-gray-500">No saved blogs yet.</p>
        ) : (
          <div className="space-y-4">
            {bookmarks.map((blog) => (
              <Link
                key={blog.id}
                to={`/blogs/${blog.slug}`}
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-semibold">{blog.title}</h3>
                <p className="text-sm text-gray-500">{blog.excerpt}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
