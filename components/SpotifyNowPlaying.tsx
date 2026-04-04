import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';

interface SpotifyData {
  song: string;
  artist: string;
  albumImage: string;
  isPlaying: boolean;
  songUrl: string;
}

const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const Equalizer = () => (
  <div className="flex items-end gap-[2px] h-3">
    {[1, 2, 3, 4].map((bar) => (
      <motion.div
        key={bar}
        className="w-[2.5px] bg-[#1DB954] rounded-[1px]"
        animate={{
          height: ['3px', '12px', '5px', '10px', '3px'],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          delay: bar * 0.12,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

export const SpotifyNowPlaying = () => {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchSpotify = async () => {
    try {
      const res = await fetch('/api/spotify');
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setData(json.song ? json : null);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpotify();
    const interval = setInterval(fetchSpotify, 15000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center gap-3 animate-pulse">
          <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 w-28 bg-zinc-100 dark:bg-zinc-800" />
            <div className="h-2.5 w-16 bg-zinc-100 dark:bg-zinc-800" />
          </div>
        </div>
      );
    }

    if (error || !data) {
      return (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-zinc-50 dark:bg-zinc-800/60 flex items-center justify-center">
            <Music className="w-4 h-4 text-zinc-300 dark:text-zinc-600" />
          </div>
          <span className="text-[13px] text-zinc-400 dark:text-zinc-500">
            Not playing — check back later
          </span>
        </div>
      );
    }

    return (
      <motion.a
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 group/link py-1 -mx-1 px-1"
        whileHover={{ x: 2 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Album Art with hover glow */}
        <div className="relative shrink-0">
          <motion.img
            src={data.albumImage}
            alt={data.song}
            className="w-10 h-10 object-cover shadow-sm"
            whileHover={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 400 }}
          />
          {data.isPlaying && (
            <motion.div
              className="absolute inset-0 bg-[#1DB954]/20"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </div>

        {/* Track Details */}
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-200 truncate leading-tight">
            <span className="group-hover/link:text-[#1DB954] transition-colors duration-200">
              {data.song}
            </span>
          </p>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate leading-tight mt-0.5">
            {data.artist}
          </p>
        </div>

        {/* Status */}
        <div className="shrink-0 flex items-center gap-2">
          {data.isPlaying ? (
            <Equalizer />
          ) : (
            <span className="text-[10px] text-zinc-300 dark:text-zinc-600 tracking-wider font-medium">
              Last played
            </span>
          )}
        </div>
      </motion.a>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="w-full"
    >
      {/* Label */}
      <div className="flex items-center gap-2 mb-2">
        <motion.div
          initial={{ rotate: -20, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
        >
          <SpotifyIcon className="w-3.5 h-3.5 text-[#1DB954]" />
        </motion.div>
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
          {loading ? 'Spotify' : data?.isPlaying ? 'Now Playing' : 'Last Played'}
        </span>
      </div>

      {/* Content */}
      <div className="transition-all duration-300">
        {renderContent()}
      </div>
    </motion.div>
  );
};

