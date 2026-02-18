import React, { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const x = useSpring(0, { stiffness: 100, damping: 30 });
  const y = useSpring(0, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(y, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex flex-col ultra-glass rounded-[2.5rem] overflow-hidden border-white/5 hover:border-cyan-400/30 transition-colors duration-700"
    >
      {/* 3D Depth Elements */}
      <div
        style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
        className="relative h-64 overflow-hidden"
      >
        <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/0 z-10 transition-colors duration-700" />
        <motion.img
          src={project.image}
          alt={project.name}
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full h-full object-cover"
        />

        {/* GitHub Link Overlay */}
        <div
          style={{ transform: "translateZ(20px)" }}
          className="absolute top-6 right-6 z-20"
        >
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="p-3.5 bg-slate-950/80 backdrop-blur-xl rounded-2xl text-white hover:text-cyan-400 border border-white/10 shadow-2xl transition-colors"
          >
            <FiGithub className="w-6 h-6" />
          </motion.a>
        </div>
      </div>

      {/* Content */}
      <div
        style={{ transform: "translateZ(30px)" }}
        className="flex flex-col gap-5 p-10 relative"
      >
        <div className="flex flex-wrap gap-2">
          {project.tags?.map(tag => (
            <span key={tag} className="text-[9px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-500 group-hover:text-cyan-400 group-hover:bg-cyan-400/5 transition-all duration-300">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-3xl font-black text-white group-hover:text-cyan-400 transition-colors duration-300 tracking-tight leading-none uppercase">
          {project.name}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-500 font-medium">
          {project.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[2px] bg-cyan-400/50 rounded-full group-hover:w-16 transition-all duration-700" />
            <span className="text-[9px] font-black tracking-[0.3em] uppercase text-slate-600 group-hover:text-cyan-400/80 transition-colors">Case Study</span>
          </div>
          <motion.div
            animate={{ x: hovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FiExternalLink className="w-6 h-6 text-slate-700 group-hover:text-cyan-400 transition-colors duration-300" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
