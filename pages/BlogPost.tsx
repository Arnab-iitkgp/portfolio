import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from '../content';

export const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    if (!post) {
      navigate('/writing');
    }
  }, [post, navigate]);

  if (!post) return null;

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto mt-8 md:mt-12 mb-20"
    >
       <Link to="/writing" className="inline-flex items-center text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors mb-10 group">
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" /> Back to Writing
       </Link>

       {/* Header */}
       <header className="mb-12 border-b border-zinc-100 dark:border-zinc-800 pb-8">
          <div className="flex items-center gap-3 text-xs font-medium text-zinc-400 dark:text-zinc-500 mb-6 font-mono uppercase tracking-wide">
              <time>{post.date}</time>
              <span>•</span>
              <span>{post.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-50 font-serif leading-tight">
            {post.title}
          </h1>
       </header>

       {/* Body Content - using prose-invert for dark mode typography */}
       <div className="prose prose-zinc dark:prose-invert prose-lg leading-loose max-w-none">
          <p className="font-serif text-xl md:text-2xl text-zinc-800 dark:text-zinc-200 leading-relaxed mb-8 not-italic">
             {post.excerpt}
          </p>
          
          <p>
            In the rapidly evolving landscape of web development, few technologies have sparked as much conversation as React Server Components (RSC). As we look towards the future of how we build for the web, understanding the shift from client-side dominance to a more hybrid approach is crucial.
          </p>

          <h3 className="text-zinc-900 dark:text-zinc-100 font-bold mt-8 mb-4 text-xl">The Paradigm Shift</h3>
          <p>
            Traditionally, we've treated the server as a simple API provider, sending JSON to a heavy client-side application. RSC challenges this by moving the component logic itself closer to the data. This isn't just about performance; it's about simplification.
          </p>
          
          <blockquote className="pl-4 border-l-2 border-zinc-900 dark:border-zinc-100 italic text-zinc-800 dark:text-zinc-300 my-8">
            "The best code is the code you don't ship to the client."
          </blockquote>

          <p>
            By leveraging the server for rendering non-interactive parts of our UI, we significantly reduce the JavaScript bundle size. This leads to faster Time to Interactive (TTI) and a better user experience, especially on lower-end devices.
          </p>

          <h3 className="text-zinc-900 dark:text-zinc-100 font-bold mt-8 mb-4 text-xl">Why It Matters</h3>
          <ul className="list-disc pl-5 space-y-2 mb-8">
             <li><strong>Zero Bundle Size:</strong> Server components don't add to the JS bundle.</li>
             <li><strong>Direct Backend Access:</strong> Query your database directly inside your component.</li>
             <li><strong>Automatic Code Splitting:</strong> The framework handles what needs to be sent to the client.</li>
          </ul>

          <p>
            As we continue to refine these tools, the line between backend and frontend blurs, allowing developers to focus more on the product and less on the plumbing. The future is hybrid, and it is efficient.
          </p>
       </div>
       
       <div className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-800">
         <p className="text-zinc-400 dark:text-zinc-500 italic text-sm">Thanks for reading.</p>
       </div>
    </motion.article>
  );
};