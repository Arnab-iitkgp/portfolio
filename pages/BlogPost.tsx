import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { blogPosts } from '../content';
import { ContentBlock } from '../types';

// Code Block Component with copy functionality
const CodeBlock = ({ language, code, caption }: { language: string; code: string; caption?: string }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // Trigger Prism highlighting
    if ((window as any).Prism) {
      (window as any).Prism.highlightAll();
    }
  }, [code]);

  return (
    <div className="my-8 group">
      {caption && (
        <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 font-medium italic">
          {caption}
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 bg-zinc-800 dark:bg-zinc-700 hover:bg-zinc-700 dark:hover:bg-zinc-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
          title="Copy code"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
        <pre className={`language-${language}`}>
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
};

// Mermaid Diagram Component
const MermaidDiagram = ({ diagram, caption }: { diagram: string; caption?: string }) => {
  const [svg, setSvg] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const renderDiagram = async () => {
      if ((window as any).mermaid) {
        try {
          setIsLoading(true);
          // Generate a unique ID for this diagram
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

          // Render the diagram
          const { svg: renderedSvg } = await (window as any).mermaid.render(id, diagram);
          setSvg(renderedSvg);
          setIsLoading(false);
        } catch (error) {
          console.error('Mermaid rendering error:', error);
          setIsLoading(false);
        }
      }
    };

    // Wait a bit for mermaid to be fully loaded
    const timer = setTimeout(() => {
      renderDiagram();
    }, 100);

    return () => clearTimeout(timer);
  }, [diagram]);

  return (
    <div className="my-8">
      {caption && (
        <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 font-medium text-center italic">
          {caption}
        </div>
      )}
      <div className="flex justify-center bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
        {isLoading ? (
          <div className="text-zinc-400 dark:text-zinc-500">Loading diagram...</div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: svg }} />
        )}
      </div>
    </div>
  );
};

// Content Block Renderer
const ContentBlockRenderer = ({ block }: { block: ContentBlock }) => {
  switch (block.type) {
    case 'text':
      return (
        <p className="mb-8 text-zinc-800 dark:text-zinc-200 leading-[1.8] text-[1.125rem] font-serif tracking-wide">
          {block.content}
        </p>
      );
    case 'code':
      return <CodeBlock language={block.language} code={block.code} caption={block.caption} />;
    case 'mermaid':
      return <MermaidDiagram diagram={block.diagram} caption={block.caption} />;
    default:
      return null;
  }
};

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
      className="max-w-3xl mx-auto mt-8 md:mt-12 mb-20"
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
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-zinc-50 font-serif leading-tight mb-6">
          {post.title}
        </h1>
        <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-serif italic">
          {post.excerpt}
        </p>
      </header>

      {/* Body Content - Rich content blocks */}
      <div className="max-w-none">
        {post.content ? (
          post.content.map((block, idx) => (
            <ContentBlockRenderer key={idx} block={block} />
          ))
        ) : (
          <p className="text-zinc-500 dark:text-zinc-400">Content coming soon...</p>
        )}
      </div>

      <div className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-800">
        <p className="text-zinc-400 dark:text-zinc-500 italic text-sm">Thanks for reading.</p>
      </div>
    </motion.article>
  );
};