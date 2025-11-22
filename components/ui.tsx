import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-zinc-100 text-zinc-800 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-200 dark:border-zinc-800 ${className}`}>
    {children}
  </span>
);

export const SectionHeading = ({ title, icon: Icon }: { title: string; icon?: any }) => (
  <div className="flex items-center gap-2 mb-8 mt-16">
    {Icon && <Icon className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />}
    <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 font-serif">{title}</h2>
    <div className="h-px bg-zinc-200 dark:bg-zinc-800 flex-1 ml-4" />
  </div>
);

export const Card = ({ children, className = "", hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) => (
  <motion.div
    whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : undefined}
    className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm ${className}`}
  >
    {children}
  </motion.div>
);

export const ExternalLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors group border-b border-transparent hover:border-zinc-300 dark:hover:border-zinc-600 pb-0.5"
  >
    {children}
    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
  </a>
);

export const Button = ({ children, onClick, variant = 'primary', className = '' }: { children: React.ReactNode, onClick?: () => void, variant?: 'primary' | 'secondary' | 'ghost', className?: string }) => {
  const variants = {
    primary: "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 border border-transparent",
    secondary: "bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800",
    ghost: "bg-transparent text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};