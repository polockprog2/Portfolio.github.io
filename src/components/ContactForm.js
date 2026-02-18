import React from "react";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

const ContactForm = () => {
  return (
    <section className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-black tracking-tight uppercase">Let's Connect</h2>
          <div className="w-20 h-1.5 bg-cyan-400 rounded-full" />
        </div>
        <p className="text-slate-400 max-w-2xl leading-relaxed">
          I'm currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="ultra-glass rounded-[3rem] p-10 md:p-16 border-white/5 shadow-2xl relative overflow-hidden group"
      >
        {/* Animated Internal Glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse-slow pointer-events-none" />

        <form className="relative z-10 flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-3 group/input">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1 transition-colors group-focus-within/input:text-cyan-400">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Ex. John Doe"
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-8 py-5 text-white placeholder-slate-700 focus:outline-none focus:border-cyan-400/30 focus:bg-white/[0.07] transition-all duration-500 font-medium"
              />
            </div>
            <div className="flex flex-col gap-3 group/input">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1 transition-colors group-focus-within/input:text-cyan-400">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full bg-white/5 border border-white/5 rounded-2xl px-8 py-5 text-white placeholder-slate-700 focus:outline-none focus:border-cyan-400/30 focus:bg-white/[0.07] transition-all duration-500 font-medium"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 group/input">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1 transition-colors group-focus-within/input:text-cyan-400">
              Your Message
            </label>
            <textarea
              placeholder="Tell me about your project..."
              rows="6"
              className="w-full bg-white/5 border border-white/5 rounded-3xl px-8 py-6 text-white placeholder-slate-700 focus:outline-none focus:border-cyan-400/30 focus:bg-white/[0.07] transition-all duration-500 resize-none font-medium"
            />
          </div>

          <div className="mt-4">
            <Magnetic strength={0.2}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="group relative px-14 py-6 bg-white text-slate-950 font-black rounded-2xl shadow-xl shadow-white/5 hover:bg-cyan-400 hover:text-slate-950 transition-all duration-700 uppercase tracking-[0.3em] text-xs overflow-hidden"
              >
                <span className="relative z-10">Initiate Conversation</span>
                <div className="absolute inset-0 bg-white group-hover:bg-cyan-400 transition-colors" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine-premium" />
              </motion.button>
            </Magnetic>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default ContactForm;
