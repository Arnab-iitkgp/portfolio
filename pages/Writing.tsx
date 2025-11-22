import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '../content';

export const Writing = () => {
  return (
    <div className="max-w-2xl">
        <div className="mb-16 pt-8">
            <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 font-serif mb-4"
            >
                Writing
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed"
            >
                Thoughts on software development, design, and building products.
            </motion.p>
        </div>

        <div className="flex flex-col">
            {blogPosts.map((post, i) => (
                <React.Fragment key={post.id}>
                    {i > 0 && (
                        <motion.div 
                            initial={{ opacity: 0, scaleX: 0 }}
                            whileInView={{ opacity: 1, scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="my-10 w-full h-px border-t border-dashed border-zinc-200 dark:border-zinc-800 origin-left"
                        />
                    )}
                    <motion.article 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ x: 4 }}
                        className="group cursor-pointer block"
                    >
                        <Link to={`/writing/${post.slug}`} className="block">
                            <div className="flex items-center gap-3 text-xs font-medium text-zinc-400 dark:text-zinc-500 mb-3 font-mono uppercase tracking-wide">
                                <time>{post.date}</time>
                                <span>•</span>
                                <span>{post.readTime}</span>
                            </div>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors mb-3">
                                {post.title}
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed mb-4">
                                {post.excerpt}
                            </p>
                            <div className="inline-flex items-center text-sm font-bold text-zinc-900 dark:text-zinc-200 hover:text-zinc-700 dark:hover:text-white transition-colors">
                                Read Article <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                            </div>
                        </Link>
                    </motion.article>
                </React.Fragment>
            ))}
        </div>
    </div>
  );
};