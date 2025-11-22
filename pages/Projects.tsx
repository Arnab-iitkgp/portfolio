import React from 'react';
import { Project } from '../types';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

const projects: Project[] = [
  {
    id: '1',
    title: 'EmailPro: GenAI Multi-Agent Email Assistant',
    description: 'Enhanced email workflows using Gemini 2.5-Flash AI, reducing manual effort by 30%. Integrated Pinecone RAG for vector search and context-based summarization. Features automated deadline parsing with WhatsApp/Telegram alerts.',
    tags: ['Node.js', 'React.js', 'Gemini API', 'Pinecone', 'MongoDB'],
    // link: 'https://github.com/Arnab-iitkgp',
    github: 'https://github.com/Arnab-iitkgp/Email-Assistant',
    image: '/projects/emailPro.png',
    size: 'large',
    featured: true
  },
  {
    id: '2',
    title: 'CargoRoute: VRP Optimizer',
    description: 'Backend using Genetic Algorithm for multi-stop delivery routes. Handles 50 nodes in under 5 seconds. Interactive Frontend with Leaflet.js and OpenRouteService integration, boosting accuracy by 80%.',
    tags: ['Node.js', 'React', 'Leaflet.js', 'OpenRouteService', 'Genetic Algorithm'],
    link: 'https://cargoroute-frontend.vercel.app/',
    github: 'https://github.com/Arnab-iitkgp/CargoRoute',
    image: '/projects/cargoroute.png',
    size: 'normal'
  },
  {
    id: '3',
    title: 'Queuemate: Real-Time Queue Management',
    description: 'Real-time token updates via Socket.IO with <100ms latency. Secure JWT authentication and role-specific checks. Responsive dashboard for Admin, Receptionist & Patients.',
    tags: ['React', 'Node.js', 'Socket.IO', 'Redux', 'MongoDB'],
    link:'https://queuemate.vercel.app/',
    github: 'https://github.com/Arnab-iitkgp/queuemate',
    image: '/projects/queuemate.png',
    size: 'tall'
  },
  {
    id: '4',
    title: 'Text Compression Tool',
    description: 'C++ implementation of Huffman Algorithm with dynamic tree building. Engineered a system achieving 65% data size reduction on repetitive inputs through optimized encoding logic.',
    tags: ['C++', 'Algorithms', 'Huffman Coding'],
    github: 'https://github.com/Arnab-iitkgp',
    size: 'normal',
    image: '/projects/huffman.png'
  }
];

const ProjectRow = ({ project, index }: { project: Project; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    viewport={{ once: true }}
    className="group flex flex-col md:flex-row gap-6 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-zinc-100 transition-all duration-300 rounded-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgb(255,255,255,0.04)] md:items-center"
  >
    {/* Project Thumbnail */}
    <div className="w-full md:w-80 h-56 bg-zinc-100 dark:bg-zinc-800 shrink-0 overflow-hidden rounded-sm relative">
        <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
    </div>

    {/* Project Details */}
    <div className="flex-1 flex flex-col">
      <div className="flex justify-between items-start">
         <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors">
            {project.title}
         </h3>
         <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
            {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 rounded-full transition-colors">
                    <Github className="w-5 h-5" />
                </a>
            )}
            {project.link && (
                <a href={project.link} target="_blank" rel="noreferrer" className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 rounded-full transition-colors">
                    <ExternalLink className="w-5 h-5" />
                </a>
            )}
         </div>
      </div>
      
      <p className="mt-3 text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm md:text-base">
        {project.description}
      </p>

      <div className="mt-auto pt-6 flex flex-wrap items-center justify-between gap-4">
         {/* Tech Stack Badges */}
         <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 rounded-sm bg-zinc-50 dark:bg-zinc-900/50">
                    {tag}
                </span>
            ))}
         </div>

         {/* View Link */}
         <a href={project.github || "#"} className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1 group/link border-b border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-zinc-100 pb-0.5 transition-colors">
            View Details <ArrowUpRight className="w-3 h-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
         </a>
      </div>
    </div>
  </motion.div>
);

export const Projects = () => {
  return (
    <div>
      <div className="mb-16 pt-8">
        <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 font-serif mb-4"
        >
            Selected Work
        </motion.h1>
        <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 dark:text-zinc-400 max-w-xl text-lg leading-relaxed"
        >
            A curated list of projects focusing on full-stack development, algorithmic optimization, and generative AI.
        </motion.p>
      </div>
      
      <div className="flex flex-col gap-8">
        {projects.map((project, index) => (
            <ProjectRow project={project} index={index} />
        ))}
      </div>
      
      <div className="mt-20 text-center border-t border-zinc-100 dark:border-zinc-800 pt-12">
        <p className="text-zinc-400 text-sm">More projects available on <a href="https://github.com/Arnab-iitkgp" className="text-zinc-900 dark:text-zinc-100 font-medium hover:underline underline-offset-4">GitHub</a></p>
      </div>
    </div>
  );
};