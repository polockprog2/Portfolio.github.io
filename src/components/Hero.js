import React from "react";
import { motion } from "framer-motion";
import Stats from "./Stats";

const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col gap-8"
    >
      <div className="flex flex-col gap-4">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-cyan-400 font-black uppercase tracking-[0.4em] text-[10px] bg-cyan-400/5 w-fit px-4 py-1 rounded-full border border-cyan-400/20 shadow-glow"
        >
          Available for Projects
        </motion.span>
        <h1 className="text-5xl sm:text-8xl font-black tracking-tighter leading-[0.85]">
          CRAFTING <br />
          <span className="bg-gradient-to-r from-white via-slate-400 to-slate-600 bg-clip-text text-transparent">DIGITAL</span> <br />
          <span className="text-glow text-cyan-400 shadow-glow-cyan text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-500">EXCELLENCE</span>
        </h1>
      </div>

      <p className="max-w-xl text-lg text-slate-400 leading-relaxed font-medium">
        I bridge the gap between complex engineering and intuitive design, delivering high-performance web applications with a focus on quality and precision.
      </p>

      <div className="flex flex-wrap gap-4 mt-2">
        <motion.a
          href="#portfolio"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-5 bg-white text-slate-950 font-black rounded-2xl hover:bg-cyan-400 transition-colors duration-300 shadow-2xl shadow-white/5 uppercase tracking-widest text-xs"
        >
          Explore Work
        </motion.a>
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-5 border-2 border-white/5 rounded-2xl font-black backdrop-blur-md transition-all duration-300 uppercase tracking-widest text-xs"
        >
          Let's Talk
        </motion.a>
      </div>

      <div className="mt-8">
        <Stats />
      </div>
    </motion.section>
  );
};

export default Hero;
