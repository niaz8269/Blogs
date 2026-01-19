import { useEffect, useState } from 'react';
import api from '../services/api';
import FeaturedStrip from '../components/FeaturedStrip';
import HeroCard from '../components/HeroCard';
import InfiniteScrollFeed from '../components/InfiniteScrollFeed';
import Newsletter from '../components/Newsletter';

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [featuredRes, blogsRes] = await Promise.all([
          api.get('/featured-posts').catch(() => ({ data: { data: [] } })),
          api.get('/blogs', { params: { page: 1 } }).catch(() => ({ data: { data: [] } })),
        ]);

        setFeatured(featuredRes.data.data || featuredRes.data || []);
        const blogs = blogsRes.data.data || blogsRes.data || [];
        setHero(blogs.length > 0 ? blogs[0] : null);
      } catch (error) {
        console.error('Error loading home page data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <FeaturedStrip items={featured} />
      {hero && <HeroCard post={hero} />}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Latest Blog Posts</h2>
        <InfiniteScrollFeed />
      </div>
      <Newsletter />
      <footer className="mt-12 py-8 border-t border-gray-200">
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          <a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
            About
          </a>
          <a href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
            Contact
          </a>
          <a href="/blogs" className="text-gray-600 hover:text-blue-600 transition-colors">
            All Blogs
          </a>
        </div>
        <div className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Blogify. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
