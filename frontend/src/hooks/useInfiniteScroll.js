import { useEffect, useRef, useState } from 'react';

export const useInfiniteScroll = (callback, hasMore) => {
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (isLoading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setIsLoading(true);
          callback().finally(() => setIsLoading(false));
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [callback, hasMore, isLoading]);

  return { sentinelRef, isLoading };
};
