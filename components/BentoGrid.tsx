import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { ArrowUpRight, Github } from 'lucide-react';

interface BentoGridProps {
  projects: Project[];
}

const BentoCard = ({ project }: { project: Project }) => {
  // Determine span classes based on project "size" attribute
  const spanClasses = {
    normal: "col-span-1 row-span-1",
    wide: "col-span-1 md:col-span-2 row-span-1",
    tall: "col-span-1 row-span-2",
    large: "col-span-1 md:col-span-2 row-span-2",
  };

  const size = project.size || 'normal';

  return (
    <motion.div
      className={`group relative bg-white border border-zinc-200 overflow-hidden hover:border-zinc-900 transition-all duration-300 ${spanClasses[size]}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="h-full flex flex-col">
        {/* Image/Preview Area */}
        <div className={`relative overflow-hidden bg-zinc-50 ${size === 'tall' ? 'h-3/5' : 'h-52'} border-b border-zinc-100`}>
           {project.image ? (
             <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
           ) : (
             <div className="w-full h-full flex items-center justify-center text-zinc-300">
                <div className="w-12 h-12 bg-zinc-100" />
             </div>
           )}
           
           {/* Overlay Actions */}
           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-end justify-end p-4 opacity-0 group-hover:opacity-100">
             <div className="flex gap-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="p-2 bg-white shadow-sm hover:scale-110 transition-transform text-zinc-900 hover:text-black border border-zinc-200">
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" className="p-2 bg-zinc-900 shadow-sm hover:scale-110 transition-transform text-white hover:bg-black">
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
             </div>
           </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col justify-between bg-white">
          <div>
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-zinc-900 group-hover:text-zinc-700 transition-colors font-serif">
                {project.title}
                </h3>
                {project.featured && (
                    <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-zinc-900 text-white">Featured</span>
                )}
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>
          
          <div className="mt-5 pt-4 border-t border-zinc-50 flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="text-[10px] uppercase tracking-wider font-medium text-zinc-500 bg-zinc-50 px-2 py-1 border border-zinc-100">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const BentoGrid: React.FC<BentoGridProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[minmax(300px,auto)] grid-flow-dense">
      {projects.map((project) => (
        <BentoCard key={project.id} project={project} />
      ))}
    </div>
  );
};