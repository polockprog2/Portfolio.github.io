import React from "react";
import { motion } from "framer-motion";

const Footer = () => (
  <footer className="mt-12 flex flex-col gap-8">
    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

    <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-12">
      <div className="flex flex-col gap-2 items-center md:items-start">
        <span className="text-xl font-black tracking-tighter text-white">SAMIR ISLAM</span>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Frontend Developer & QA</span>
      </div>

      <p className="text-slate-500 text-xs font-bold tracking-widest uppercase">
        &copy; {new Date().getFullYear()} All rights reserved.
      </p>

      <div className="flex gap-6">
        {["Home", "Portfolio", "Blog", "Contact"].map((item) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            whileHover={{ y: -2, color: "#fff" }}
            className="text-[10px] font-black uppercase tracking-widest text-slate-600 transition-colors"
          >
            {item}
          </motion.a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
