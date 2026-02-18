import React from "react";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center py-20 px-6 overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 blur-[160px] rounded-full animate-pulse-radial pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-5xl w-full">
        {/* Entrance Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="px-5 py-2 ultra-glass border border-white/10 rounded-full flex items-center gap-3 shadow-2xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[10px] font-black tracking-[0.4em] text-cyan-400 uppercase">Available for Innovation</span>
          </div>
        </motion.div>

        {/* High-Impact Headline */}
        <div className="flex flex-col items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-black text-center text-white tracking-tighter leading-[0.9] uppercase"
          >
            Building <br />
            <span className="bg-gradient-to-r from-cyan-400 via-white to-fuchsia-500 bg-clip-text text-transparent italic">Digital Excellence</span>
          </motion.h1>
        </div>

        {/* Executive Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-slate-400 text-center max-w-2xl mb-12 leading-relaxed font-medium"
        >
          Specialized in engineering <span className="text-white">high-performance frontend architectures</span> and robust <span className="text-white">quality automation frameworks</span> for modern enterprises.
        </motion.p>

        {/* Dynamic Typing Layer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-14"
        >
          <img
            src="https://readme-typing-svg.herokuapp.com?font=Inter&weight=800&size=20&duration=3000&pause=1000&color=38BDF8&center=true&vCenter=true&width=600&lines=ARCHITECTING+PIXEL-PERFECT+SYSTEMS;AUTOMATING+COMPLEX+WORKFLOWS;ENGINEERING+SCALABLE+SOLUTIONS"
            alt="Architecting Systems"
            className="opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>

        {/* Primary Actions */}
        <div className="flex flex-wrap items-center justify-center gap-8">
          <Magnetic strength={0.3}>
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-5 bg-white text-slate-950 font-black rounded-2xl shadow-2xl hover:bg-cyan-400 transition-all duration-700 uppercase tracking-widest text-xs"
            >
              View Portfolio
            </motion.button>
          </Magnetic>

          <Magnetic strength={0.2}>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-5 ultra-glass text-white font-black rounded-2xl border-white/10 hover:border-white/20 transition-all duration-700 uppercase tracking-widest text-xs"
            >
              Get in Touch
            </motion.button>
          </Magnetic>
        </div>
      </div>

      {/* Modern Visual Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
};

export default Hero;
