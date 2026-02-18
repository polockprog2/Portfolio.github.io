import React from "react";
import { motion } from "framer-motion";
import ProfileCard from "./ProfileCard";

const Sidebar = () => (
  <motion.aside
    initial={{ x: -50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="w-full lg:w-[400px] lg:sticky lg:top-28 lg:h-fit flex flex-col items-center p-4 lg:p-0"
  >
    <div className="w-full flex flex-col gap-6 relative">
      {/* Decorative Glow */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col items-center gap-8">
        <ProfileCard />

        {/* Secondary Info / Typing SVG */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="ultra-glass rounded-2xl px-6 py-4 border border-white/5 flex items-center justify-center w-full max-w-[340px]"
        >
          <img
            src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=14&duration=3000&pause=1000&color=94A3B8&center=true&vCenter=true&width=280&lines=Frontend+Development...;QA+Automation+%26+Testing...;Building+impactful+software!"
            alt="typing"
            className="opacity-70"
          />
        </motion.div>
      </div>
    </div>
  </motion.aside>
);

export default Sidebar;
