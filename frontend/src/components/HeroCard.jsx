import { Link } from 'react-router-dom';

export default function HeroCard({ post }) {
  if (!post) return null;

  return (
    <div className="mb-8 rounded-lg overflow-hidden shadow-lg bg-white">
      <Link to={`/blogs/${post.slug}`}>
        <div className="relative h-96">
          <img
            src={post.featured_image || '/placeholder-image.jpg'}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/800x400';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="mb-2">
              {post.category && (
                <span className="inline-block px-3 py-1 bg-blue-600 rounded-full text-xs font-semibold">
                  {post.category.name}
                </span>
              )}
            </div>
            <h2 className="text-3xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-200 mb-4 line-clamp-2">{post.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-800 font-semibold text-sm">
                  {post.author?.name?.charAt(0).toUpperCase() || 'A'}
                </div>
                <span className="text-sm">{post.author?.name || 'Anonymous'}</span>
                <span className="text-sm text-gray-300">
                  • {new Date(post.published_at || post.created_at).toLocaleDateString()}
                </span>
              </div>
              <span className="px-4 py-2 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Read More →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
