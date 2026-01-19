import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { useState } from 'react';

export default function BlogCard({ post }) {
  const { isAuthenticated } = useAuth();
  const [isLiked, setIsLiked] = useState(post.is_liked || false);
  const [isBookmarked, setIsBookmarked] = useState(post.is_bookmarked || false);
  const [likesCount, setLikesCount] = useState(post.likes_count || post.likes?.length || 0);

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return;

    try {
      if (isLiked) {
        await api.delete(`/blogs/${post.id}/like`);
        setIsLiked(false);
        setLikesCount((prev) => prev - 1);
      } else {
        await api.post(`/blogs/${post.id}/like`);
        setIsLiked(true);
        setLikesCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Like error:', error);
    }
  };

  const handleBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return;

    try {
      if (isBookmarked) {
        await api.delete(`/blogs/${post.id}/bookmark`);
        setIsBookmarked(false);
      } else {
        await api.post(`/blogs/${post.id}/bookmark`);
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error('Bookmark error:', error);
    }
  };

  return (
    <Link to={`/blogs/${post.slug}`} className="block">
      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={post.featured_image || '/placeholder-image.jpg'}
              alt={post.title}
              className="w-full h-48 md:h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300';
              }}
            />
          </div>
          <div className="md:w-2/3 p-6">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                {post.category && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                    {post.category.name}
                  </span>
                )}
                {post.tags?.slice(0, 2).map((tag) => (
                  <span
                    key={tag.id}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
            <h2 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">
              {post.title}
            </h2>
            <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold">
                    {post.author?.name?.charAt(0).toUpperCase() || 'A'}
                  </div>
                  <span>{post.author?.name || 'Anonymous'}</span>
                </div>
                <span>
                  {new Date(post.published_at || post.created_at).toLocaleDateString()}
                </span>
                <span>{post.read_time || 5} min read</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleLike}
                  className={`p-2 rounded-full transition-colors ${
                    isLiked ? 'text-red-600' : 'text-gray-400 hover:text-red-600'
                  }`}
                  title="Like"
                >
                  <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <span className="text-sm text-gray-500">{likesCount}</span>
                <button
                  onClick={handleBookmark}
                  className={`p-2 rounded-full transition-colors ${
                    isBookmarked ? 'text-yellow-600' : 'text-gray-400 hover:text-yellow-600'
                  }`}
                  title="Bookmark"
                >
                  <svg className="w-5 h-5" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
