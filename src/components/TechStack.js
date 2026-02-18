import React from "react";
import { motion } from "framer-motion";

const techs = [
  { name: "Python", icon: "python", color: "hover:border-blue-400/40" },
  { name: "Django", icon: "django", color: "hover:border-green-400/40" },
  { name: "React", icon: "react", color: "hover:border-cyan-400/40" },
  { name: "JavaScript", icon: "js", color: "hover:border-yellow-400/40" },
  { name: "HTML", icon: "html", color: "hover:border-orange-400/40" },
  { name: "CSS", icon: "css", color: "hover:border-blue-500/40" },
  { name: "MySQL", icon: "mysql", color: "hover:border-blue-400/40" },
  { name: "Git", icon: "git", color: "hover:border-orange-600/40" },
  { name: "C#", icon: "csharp", color: "hover:border-purple-500/40" },
  { name: ".NET", icon: "dotnet", color: "hover:border-blue-600/40" },
  { name: "TensorFlow", icon: "tensorflow", color: "hover:border-orange-500/40" },
  { name: "Java", icon: "java", color: "hover:border-red-500/40" },
];

const TechStack = () => (
  <section className="flex flex-col gap-12">
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black tracking-tight uppercase">Technical Arsenal</h2>
        <div className="w-20 h-1.5 bg-rose-500 rounded-full" />
      </div>
      <p className="text-slate-400 max-w-2xl leading-relaxed font-medium">
        Showcasing a curated ecosystem of technologies optimized for <span className="text-white">enterprise-grade performance</span> and <span className="text-white">seamless user experiences</span>.
      </p>
    </div>

    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5 sm:gap-8">
      {techs.map((tech, i) => (
        <motion.div
          key={tech.icon}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.5 }}
          whileHover={{ y: -8, scale: 1.05 }}
          className={`group relative flex flex-col items-center justify-center p-8 glass-card border-white/5 rounded-3xl transition-all duration-500 ${tech.color}`}
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
    </div>
  </section>
);

export default TechStack;