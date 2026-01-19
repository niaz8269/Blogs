import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import BlogCard from './BlogCard';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

export default function InfiniteScrollFeed({ filters = {} }) {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const loadBlogs = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const params = { page, ...filters };
      const { data } = await api.get('/blogs', { params });
      
      const newBlogs = data.data || data;
      
      if (page === 1) {
        setBlogs(newBlogs);
      } else {
        setBlogs((prev) => [...prev, ...newBlogs]);
      }

      setHasMore(!!data.next_page_url || (newBlogs.length > 0 && newBlogs.length >= 15));
      setCurrentPage(page);
    } catch (error) {
      console.error('Error loading blogs:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadBlogs(1);
  }, [loadBlogs]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadBlogs(currentPage + 1);
    }
  }, [loadBlogs, currentPage, loading, hasMore]);

  const { sentinelRef } = useInfiniteScroll(loadMore, hasMore);

  if (loading && blogs.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No blogs found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} post={blog} />
      ))}
      <div ref={sentinelRef} className="h-10 flex justify-center items-center">
        {loading && hasMore && (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        )}
        {!hasMore && blogs.length > 0 && (
          <p className="text-gray-500 text-sm">No more blogs to load</p>
        )}
      </div>
    </div>
  );
}
