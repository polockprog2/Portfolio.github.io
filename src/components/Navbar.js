import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FiHome, FiFolder, FiEdit2, FiMail } from "react-icons/fi";
import Magnetic from "./Magnetic";

const navItems = [
  { icon: <FiHome />, label: "Home", target: "home" },
  { icon: <FiFolder />, label: "Portfolio", target: "portfolio" },
  { icon: <FiEdit2 />, label: "Blog", target: "blog" },
  { icon: <FiMail />, label: "Contact", target: "contact" },
];

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const Navbar = () => {
  const [active, setActive] = useState("home");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const sectionIds = navItems.map((n) => n.target);
    const observers = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        { root: null, threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-pink-500 origin-left z-50 shadow-glow-cyan"
        style={{ scaleX }}
      />

      <nav className="flex items-center justify-center gap-2 ultra-glass rounded-full px-2 py-2 mt-8 mx-auto w-fit shadow-glass backdrop-blur-2xl border-white/5">
        {navItems.map((item, idx) => {
          const isActive = active === item.target;
          return (
            <Magnetic key={idx} strength={0.3}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex items-center gap-3 px-5 py-2.5 rounded-full transition-all duration-500 focus:outline-none ${isActive ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                onClick={() => scrollToId(item.target)}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white/10 rounded-full border border-white/10 shadow-inner"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
                  />
                )}
                <span className={`text-xl relative z-10 transition-colors duration-500 ${isActive ? "text-cyan-400" : ""}`}>
                  {item.icon}
                </span>
                <span className="text-xs font-black uppercase tracking-[0.2em] relative z-10 hidden md:block">
                  {item.label}
                </span>
              </motion.button>
            </Magnetic>
          );
        })}
      </nav>
    </div>
  );
};

export default Navbar;
