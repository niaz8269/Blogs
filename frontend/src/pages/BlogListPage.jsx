import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InfiniteScrollFeed from '../components/InfiniteScrollFeed';
import api from '../services/api';

export default function BlogListPage() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({});
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const newFilters = {};
    const q = searchParams.get('q');
    const categorySlug = searchParams.get('category');
    const tagSlug = searchParams.get('tag');

    if (q) newFilters.q = q;
    if (categorySlug) newFilters.category = categorySlug;
    if (tagSlug) newFilters.tag = tagSlug;

    setFilters(newFilters);

    if (categorySlug) {
      api.get(`/categories`, { params: { slug: categorySlug } })
        .then(({ data }) => setCategory(data.data || data))
        .catch(console.error);
    }
  }, [searchParams]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {category ? category.name : searchParams.get('q') ? `Search: ${searchParams.get('q')}` : 'All Blog Posts'}
        </h1>
        {category && <p className="text-gray-600">{category.description}</p>}
      </div>
      <InfiniteScrollFeed filters={filters} />
    </div>
  );
}
