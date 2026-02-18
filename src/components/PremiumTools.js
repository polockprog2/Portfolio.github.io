import React from "react";
import { motion } from "framer-motion";

const tools = [
  {
    name: "VS Code",
    description: "A high-performance IDE utilized for scalable development and system orchestration.",
    icon: "https://skillicons.dev/icons?i=vscode"
  },
  {
    name: "Figma",
    description: "Collaborative design platform used to engineer high-fidelity user experiences and prototypes.",
    icon: "https://skillicons.dev/icons?i=figma"
  },
  {
    name: "Postman",
    description: "Industry-standard API testing laboratory for validating integration reliability and performance.",
    icon: "https://skillicons.dev/icons?i=postman"
  },
  {
    name: "Docker",
    description: "Containerization infrastructure for ensuring environment consistency and deployment agility.",
    icon: "https://skillicons.dev/icons?i=docker"
  },
  {
    name: "AWS",
    description: "Cloud-native infrastructure for architecting resilient and highly-available global services.",
    icon: "https://skillicons.dev/icons?i=aws"
  },
  {
    name: "Linux",
    description: "A robust kernel-based operating system used for low-level system performance and stability.",
    icon: "https://skillicons.dev/icons?i=linux"
  }
];

const PremiumTools = () => {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black tracking-tight">FAVORITE TOOLS</h2>
        <div className="w-20 h-1.5 bg-yellow-400 rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -5, borderColor: "rgba(250, 204, 21, 0.3)" }}
            className="group flex flex-col gap-4 p-6 glass-card rounded-3xl border-white/5 transition-all duration-500"
          >
            <div className="w-12 h-12 ultra-glass rounded-2xl flex items-center justify-center border-white/10 group-hover:border-yellow-400/50 transition-colors">
              <img src={tool.icon} alt={tool.name} className="w-7 h-7" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-lg font-black text-white group-hover:text-yellow-400 transition-colors">{tool.name}</div>
              <div className="text-xs text-slate-500 font-medium leading-relaxed">{tool.description}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PremiumTools;
