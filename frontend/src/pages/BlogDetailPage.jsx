import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const { isAuthenticated, user, isAdmin } = useAuth();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const { data } = await api.get(`/blogs/${slug}`);
        setBlog(data.data || data);
        setComments(data.data?.comments || data.comments || []);
        setIsLiked(data.is_liked || false);
        setIsBookmarked(data.is_bookmarked || false);
        setLikesCount(data.likes_count || 0);
      } catch (error) {
        console.error('Error loading blog:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [slug]);

  const handleLike = async () => {
    if (!isAuthenticated) return;

    try {
      if (isLiked) {
        await api.delete(`/blogs/${blog.id}/like`);
        setIsLiked(false);
        setLikesCount((prev) => prev - 1);
      } else {
        await api.post(`/blogs/${blog.id}/like`);
        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Like error:', error);
    }
  };

  const handleBookmark = async () => {
    if (!isAuthenticated) return;

    try {
      if (isBookmarked) {
        await api.delete(`/blogs/${blog.id}/bookmark`);
        setIsBookmarked(false);
      } else {
        await api.post(`/blogs/${blog.id}/bookmark`);
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error('Bookmark error:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuthenticated) return;

    try {
      const { data } = await api.post(`/blogs/${blog.id}/comments`, {
        body: newComment,
      });
      setComments([...comments, data]);
      setNewComment('');
    } catch (error) {
      console.error('Comment error:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error('Delete comment error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <p className="text-center text-gray-500">Blog not found.</p>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-8">
      <Link to="/blogs" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
        ← Back to Blogs
      </Link>

      <header className="mb-8">
        {blog.category && (
          <Link
            to={`/blogs?category=${blog.category.slug}`}
            className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4"
          >
            {blog.category.name}
          </Link>
        )}
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              {blog.author?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div>
              <p className="font-semibold">{blog.author?.name || 'Anonymous'}</p>
              <p className="text-sm text-gray-500">
                {new Date(blog.published_at || blog.created_at).toLocaleDateString()} • {blog.read_time || 5} min read
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
              }`}
            >
              <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{likesCount}</span>
            </button>
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-yellow-600'
              }`}
            >
              <svg className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {blog.featured_image && (
        <img
          src={blog.featured_image}
          alt={blog.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/800x400';
          }}
        />
      )}

      <div className="prose max-w-none mb-8">
        <p className="text-xl text-gray-600 mb-6">{blog.excerpt}</p>
        <div dangerouslySetInnerHTML={{ __html: blog.body }} />
      </div>

      {blog.tags && blog.tags.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <Link
                key={tag.id}
                to={`/blogs?tag=${tag.slug}`}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <section className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

        {isAuthenticated ? (
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Post Comment
            </button>
          </form>
        ) : (
          <p className="mb-8 text-gray-500">
            <Link to="/login" className="text-blue-600 hover:text-blue-800">
              Login
            </Link>{' '}
            to post a comment.
          </p>
        )}

        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold">
                    {comment.user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="font-semibold">{comment.user?.name || 'Anonymous'}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {(isAuthenticated && comment.user_id === user?.id) || isAdmin ? (
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                ) : null}
              </div>
              <p className="mt-3 text-gray-700">{comment.body}</p>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </section>
    </article>
  );
}
