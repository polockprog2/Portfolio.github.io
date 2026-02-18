import React, { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import profileImg from "../assets/pink.jpg";
import { FiLinkedin, FiMail, FiGithub, FiMapPin, FiBriefcase, FiCode } from "react-icons/fi";

const socials = [
  {
    href: "https://www.linkedin.com/in/samir-islam-polock-5a304a238",
    icon: <FiLinkedin className="w-5 h-5" />,
    label: "LinkedIn",
    color: "group-hover:text-cyan-400",
    bg: "group-hover:bg-cyan-400/10"
  },
  {
    href: "https://github.com/polockprog2",
    icon: <FiGithub className="w-5 h-5" />,
    label: "GitHub",
    color: "group-hover:text-white",
    bg: "group-hover:bg-white/10"
  },
  {
    href: "mailto:samirislampolock18@gmail.com",
    icon: <FiMail className="w-5 h-5" />,
    label: "Email",
    color: "group-hover:text-rose-400",
    bg: "group-hover:bg-rose-400/10"
  }
];

const ProfileCard = () => {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 100, damping: 30 });
  const y = useSpring(0, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="w-full max-w-[360px] relative group"
    >
      {/* High-End Glow Backlight */}
      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-cyan-500/10 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

      <div className="relative ultra-glass rounded-[3rem] p-10 flex flex-col items-center border border-white/5 shadow-2xl overflow-hidden backdrop-blur-3xl group-hover:border-cyan-400/20 transition-colors duration-500">

        {/* Glossy Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none opacity-50" />

        {/* Profile Image with 3D Orbital Layer */}
        <div
          style={{ transform: "translateZ(40px)" }}
          className="relative w-48 h-48 mb-12"
        >
          <div className="absolute inset-[-15px] border-[0.5px] border-dashed border-cyan-500/20 rounded-full animate-[spin_30s_linear_infinite]" />
          <div className="absolute inset-[-15px] border-t-[1.5px] border-cyan-400/30 rounded-full animate-[spin_4s_linear_infinite]" />

          <div className="w-full h-full rounded-full overflow-hidden border-[4px] border-white/5 p-1.5 bg-slate-950 group-hover:border-white/10 transition-all duration-700">
            <img
              src={profileImg}
              alt="Samir Islam Polock"
              className="object-cover w-full h-full rounded-full transition-transform duration-1000 group-hover:scale-110"
            />
          </div>

          <div className="absolute bottom-3 right-3 ultra-glass border border-white/10 px-3.5 py-1.5 rounded-full flex items-center gap-2 shadow-2xl">
            <div className="w-2 hs-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            <span className="text-[10px] font-black tracking-[0.2em] text-white uppercase">Active</span>
          </div>
        </div>

        {/* Profile Content with Depth */}
        <div
          style={{ transform: "translateZ(20px)" }}
          className="flex flex-col items-center text-center gap-8 w-full"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-black tracking-tight text-white leading-none uppercase">
              SAMIR <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent italic">ISLAM</span>
            </h2>
            <div className="flex items-center justify-center gap-4 text-[11px] font-black tracking-[0.4em] uppercase text-slate-500">
              <span className="flex items-center gap-2"><FiBriefcase className="w-4 h-4 text-cyan-400" />Frontend</span>
              <span className="w-1 h-1 bg-slate-800 rounded-full" />
              <span className="flex items-center gap-2"><FiCode className="w-4 h-4 text-rose-400" />QA</span>
            </div>
          </div>

          <p className="text-slate-400 text-sm font-medium leading-relaxed px-4 opacity-80 group-hover:opacity-100 transition-opacity">
            Specializing in building <span className="text-white">pixel-perfect interfaces</span> and ensuring software reliability through <span className="text-white font-bold">QA automation</span>.
          </p>

          <div className="flex flex-wrap justify-center gap-2.5">
            {["React", "Django", "AI", "QA"].map(tag => (
              <span key={tag} className="text-[10px] font-black tracking-widest uppercase px-4 py-1.5 rounded-xl bg-white/5 border border-white/5 text-slate-500 group-hover:text-cyan-400 group-hover:bg-cyan-400/5 transition-all duration-300">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-5 mt-2">
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-4.5 rounded-2xl glass-card border-white/5 group-hover:border-white/10 transition-all duration-300 ${s.color} ${s.bg}`}
                aria-label={s.label}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
