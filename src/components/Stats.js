import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "05", label: "Years Experience", accent: "from-cyan-400 to-blue-500" },
  { value: "24", label: "Projects Completed", accent: "from-fuchsia-500 to-rose-500" },
  { value: "18", label: "Expert Tools", accent: "from-yellow-400 to-orange-500" },
];

const Stats = () => (
  <div className="flex flex-wrap gap-6 md:gap-10">
    {stats.map((stat, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: idx * 0.1, duration: 0.8 }}
        className="group relative flex flex-col gap-3 min-w-[160px]"
      >
        <div className="flex flex-col gap-0.5">
          <span className={`text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br ${stat.accent} tracking-tighter transition-all duration-700 group-hover:scale-110 origin-left`}>
            {stat.value}
            <span className="text-2xl text-white ml-0.5 opacity-20">+</span>
          </span>
          <div className="w-12 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ delay: 0.5 + idx * 0.2, duration: 1 }}
              className={`h-full bg-gradient-to-r ${stat.accent}`}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-black text-slate-500 tracking-[0.3em] uppercase group-hover:text-white transition-colors">
            {stat.label}
          </span>
        </div>
      </motion.div>
    ))}
  </div>
);

export default Stats;
