import React from "react";
import { motion } from "framer-motion";

const GithubStats = () => (
  <section className="flex flex-col gap-10">
    <div className="flex flex-col gap-2">
      <h2 className="text-3xl font-black tracking-tight">GITHUB ANALYTICS</h2>
      <div className="w-20 h-1.5 bg-cyan-400 rounded-full" />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div
        whileHover={{ y: -5 }}
        className="glass-card rounded-2xl p-6 border-white/5 overflow-hidden"
      >
        <img
          src="https://github-readme-stats.vercel.app/api?username=polockprog2&show_icons=true&theme=tokyonight&hide_border=true&include_all_commits=true&count_private=true"
          alt="GitHub Stats"
          className="w-full h-full object-contain filter brightness-110 contrast-110"
        />
      </motion.div>
      <motion.div
        whileHover={{ y: -5 }}
        className="glass-card rounded-2xl p-6 border-white/5 overflow-hidden"
      >
        <img
          src="https://github-readme-stats.vercel.app/api/top-langs/?username=polockprog2&layout=compact&theme=tokyonight&hide_border=true"
          alt="Top Languages"
          className="w-full h-full object-contain filter brightness-110 contrast-110"
        />
      </motion.div>
      <motion.div
        whileHover={{ y: -5 }}
        className="md:col-span-2 glass-card rounded-2xl p-6 border-white/5 overflow-hidden"
      >
        <img
          src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=polockprog2&theme=tokyonight"
          alt="Profile Details"
          className="w-full h-full object-contain filter brightness-110 contrast-110"
        />
      </motion.div>
    </div>

    <div className="flex justify-center">
      <motion.a
        href="https://github.com/polockprog2"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-10 py-4 glass-card border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all duration-300"
      >
        Visit GitHub Profile
      </motion.a>
    </div>
  </section>
);

export default GithubStats;
