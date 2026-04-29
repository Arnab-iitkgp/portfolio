import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';

export const VisitorCounter = () => {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await fetch('/api/views');
        if (response.ok) {
          const data = await response.json();
          setCount(data.count);
        }
      } catch (error) {
        console.error('Failed to fetch visitor count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchViews();
  }, []);

  if (loading) return <div className="h-4 w-12 bg-zinc-100 dark:bg-zinc-800 animate-pulse rounded" />;
  if (count === null) return null;

  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
      <Users className="w-3 h-3" />
      <span>{count.toLocaleString()} UNIQUE VISITORS</span>
    </div>
  );
};
