import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const { data } = await api.get('/dashboard/admin');
        setStats(data.stats);
        setPendingBlogs(data.pending_blogs || []);
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const handleApprove = async (blogId) => {
    try {
      await api.post(`/blogs/${blogId}/approve`);
      alert('Blog approved');
      window.location.reload();
    } catch (error) {
      alert('Error approving blog');
    }
  };

  const handleReject = async (blogId) => {
    const reason = prompt('Rejection reason:');
    if (reason) {
      try {
        await api.post(`/blogs/${blogId}/reject`, { reason });
        alert('Blog rejected');
        window.location.reload();
      } catch (error) {
        alert('Error rejecting blog');
      }
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
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Users</h3>
            <p className="text-3xl font-bold">{stats.total_users}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Blogs</h3>
            <p className="text-3xl font-bold">{stats.total_blogs}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending_blogs}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Published</h3>
            <p className="text-3xl font-bold text-green-600">{stats.published_blogs}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Comments</h3>
            <p className="text-3xl font-bold">{stats.total_comments}</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Pending Blog Approvals</h2>
        {pendingBlogs.length === 0 ? (
          <p className="text-gray-500">No pending blogs.</p>
        ) : (
          <div className="space-y-4">
            {pendingBlogs.map((blog) => (
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
                    <span>Author: {blog.author?.name}</span>
                    <span>Category: {blog.category?.name || 'None'}</span>
                    <span>Submitted: {new Date(blog.created_at).toLocaleDateString()}</span>
                  </div>
                  {blog.excerpt && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">{blog.excerpt}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleApprove(blog.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(blog.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
