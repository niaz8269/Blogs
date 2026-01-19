import { Link } from 'react-router-dom';

export default function FeaturedStrip({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Featured Stories</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {items.map((item) => {
          const blog = item.blog || item;
          return (
            <Link
              key={item.id}
              to={`/blogs/${blog.slug}`}
              className="flex-shrink-0 w-24 text-center group"
            >
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500 p-1 group-hover:border-blue-600 transition-colors">
                  <img
                    src={blog.featured_image || '/placeholder-image.jpg'}
                    alt={blog.title}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                </div>
              </div>
              <p className="mt-2 text-xs font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
                {blog.title}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
