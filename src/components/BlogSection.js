import React from "react";
import { motion } from "framer-motion";

const BlogSection = () => (
  <section className="flex flex-col gap-10">
    <div className="flex flex-col gap-2">
      <h2 className="text-3xl font-black tracking-tight">LATEST THOUGHTS</h2>
      <div className="w-20 h-1.5 bg-rose-500 rounded-full" />
    </div>

    <div className="ultra-glass rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center gap-4 border border-white/5">
      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center">
        <span className="text-2xl">✍️</span>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-black text-white uppercase tracking-tight">Coming Soon</h3>
        <p className="text-slate-400 max-w-xs mx-auto">
          Insights on Frontend Architecture, QA Automation, and Research Systems are on the way.
        </p>
      </div>
    </div>
  </section>
);

export default BlogSection;
