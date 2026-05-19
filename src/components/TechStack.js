import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { id: "all", label: "All Skills" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "qa", label: "QA & Testing" },
  { id: "tools", label: "AI & DevOps" }
];

const techs = [
  { name: "React", icon: "react", category: "frontend", color: "hover:border-cyan-400/40" },
  { name: "JavaScript", icon: "js", category: "frontend", color: "hover:border-yellow-400/40" },
  { name: "HTML5", icon: "html", category: "frontend", color: "hover:border-orange-500/40" },
  { name: "CSS3", icon: "css", category: "frontend", color: "hover:border-blue-500/40" },
  { name: "Python", icon: "python", category: "backend", color: "hover:border-blue-400/40" },
  { name: "Django", icon: "django", category: "backend", color: "hover:border-green-400/40" },
  { name: ".NET", icon: "dotnet", category: "backend", color: "hover:border-purple-600/40" },
  { name: "MySQL", icon: "mysql", category: "backend", color: "hover:border-blue-300/40" },
  { name: "Java", icon: "java", category: "backend", color: "hover:border-red-500/40" },
  { name: "Selenium", icon: "selenium", category: "qa", color: "hover:border-emerald-400/40" },
  { name: "Postman", icon: "postman", category: "qa", color: "hover:border-orange-400/40" },
  { name: "TensorFlow", icon: "tensorflow", category: "tools", color: "hover:border-orange-500/40" },
  { name: "Docker", icon: "docker", category: "tools", color: "hover:border-blue-500/40" },
  { name: "Git", icon: "git", category: "tools", color: "hover:border-orange-600/40" },
];

const TechStack = () => {
  const [selectedCat, setSelectedCat] = useState("all");

  const filteredTechs = selectedCat === "all"
    ? techs
    : techs.filter(t => t.category === selectedCat);

  return (
    <section className="flex flex-col gap-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-black tracking-tight uppercase">Technical Arsenal</h2>
            <div className="w-20 h-1.5 bg-rose-500 rounded-full" />
          </div>
          <p className="text-slate-400 max-w-xl leading-relaxed font-medium">
            Showcasing a curated ecosystem of technologies optimized for <span className="text-white">enterprise-grade performance</span> and <span className="text-white">seamless user experiences</span>.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5 w-fit">
          {categories.map(cat => {
            const isActive = selectedCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`relative px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all duration-300 ${
                  isActive ? "text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tech-pill"
                    className="absolute inset-0 bg-white/10 rounded-xl border border-white/10"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <motion.div 
        layout 
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5 sm:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredTechs.map((tech, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              key={tech.icon}
              whileHover={{ y: -8, scale: 1.05 }}
              className={`group relative flex flex-col items-center justify-center p-7 glass-card border-white/5 rounded-3xl transition-all duration-500 ${tech.color}`}
            >
              {/* Internal Glow on Hover */}
              <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />

              <img
                src={`https://skillicons.dev/icons?i=${tech.icon}`}
                alt={tech.name}
                className="w-12 h-12 transition-transform duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110 drop-shadow-2xl"
              />

              <div className="absolute -bottom-10 opacity-0 group-hover:opacity-100 group-hover:-bottom-12 transition-all duration-300 pointer-events-none z-20">
                <div className="px-4 py-2 ultra-glass border border-white/10 rounded-xl shadow-2xl">
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
                    {tech.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default TechStack;