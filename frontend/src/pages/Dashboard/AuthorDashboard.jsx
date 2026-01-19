import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function AuthorDashboard() {
  const [stats, setStats] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const { data } = await api.get('/dashboard/author');
        setStats(data.stats);
        setRecentBlogs(data.recent_blogs || []);
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const handleSubmitForApproval = async (blogId) => {
    try {
      await api.post(`/blogs/${blogId}/submit`);
      alert('Blog submitted for approval');
      window.location.reload();
    } catch (error) {
      alert('Error submitting blog');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Author Dashboard</h1>
        <button
          onClick={() => navigate('/blogs/new')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create New Blog
        </button>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Drafts</h3>
            <p className="text-3xl font-bold">{stats.drafts}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Pending</h3>
            <p className="text-3xl font-bold">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Published</h3>
            <p className="text-3xl font-bold">{stats.published}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Views</h3>
            <p className="text-3xl font-bold">{stats.total_views}</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Blogs</h2>
        {recentBlogs.length === 0 ? (
          <p className="text-gray-500">No blogs yet. Create your first blog!</p>
        ) : (
          <div className="space-y-4">
            {recentBlogs.map((blog) => (
              <div
                key={blog.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex-1">
                  <Link
                    to={`/blogs/${blog.slug}`}
                    className="font-semibold hover:text-blue-600 transition-colors"
                  >
                    {blog.title}
                  </Link>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>Status: {blog.status}</span>
                    <span>Views: {blog.views}</span>
                    <span>Created: {new Date(blog.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {blog.status === 'draft' && (
                    <button
                      onClick={() => handleSubmitForApproval(blog.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      Submit for Approval
                    </button>
                  )}
                  <Link
                    to={`/blogs/${blog.id}/edit`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
