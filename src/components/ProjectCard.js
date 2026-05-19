import React from "react";
import { motion } from "framer-motion";
import { FiGithub } from "react-icons/fi";

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col h-full rounded-[2.5rem] ultra-glass border border-white/5 overflow-hidden transition-all duration-500 hover:border-cyan-400/20"
    >
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-cyan-500/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

      {/* Image container */}
      <div className="relative w-full h-[220px] overflow-hidden rounded-t-[2.5rem]">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 opacity-60" />
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Shine highlight */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine-premium z-10" />
      </div>

      {/* Content container */}
      <div className="flex flex-col flex-grow p-8 gap-5 relative z-20">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-black font-space tracking-widest uppercase px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/5 text-slate-500 group-hover:text-cyan-400 group-hover:bg-cyan-400/5 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title and Description */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors duration-300 uppercase tracking-tight">
            {project.name}
          </h3>
          <p className="text-slate-400 text-xs font-semibold leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Action Link */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-white transition-colors">
            View Source Code
          </span>
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-cyan-400 hover:text-slate-950 flex items-center justify-center border border-white/5 hover:border-cyan-400 text-white transition-colors duration-300"
          >
            <FiGithub className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
