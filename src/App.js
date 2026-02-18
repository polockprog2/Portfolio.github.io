import React from "react";
import { motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import RecentProjects from "./components/RecentProjects";
import PremiumTools from "./components/PremiumTools";
import BlogSection from "./components/BlogSection";
import ContactForm from "./components/ContactForm";
import GithubStats from "./components/GithubStats";
import Footer from "./components/Footer";
import TechStack from "./components/TechStack";
import Stats from "./components/Stats";

function App() {
  return (
    <div className="min-h-screen w-full relative bg-slate-950 text-slate-200 overflow-x-hidden">
      {/* Universal Depth Layers */}
      <div className="noise-overlay" />
      <div className="grid-stack">
        <div className="grid-layer-1 absolute inset-0" />
        <div className="grid-layer-2 absolute inset-0" />
      </div>

      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-500/10 blur-[120px] rounded-full animate-pulse-slow" />
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 px-4">
        <Navbar />
      </header>

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto pt-24 pb-20 relative z-10" id="home">
        {/* Sidebar */}
        <div className="w-full lg:w-[400px] flex-shrink-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-8 lg:px-12 flex flex-col gap-24 mt-12 lg:mt-0">
          {/* Hero Section Re-envisioned */}
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
                <span className="text-glow text-cyan-400 shadow-glow-cyan">EXCELLENCE</span>
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

          {/* New Tech Stack Section */}
          <section id="stack">
            <TechStack />
          </section>

          {/* Projects Section */}
          <section id="portfolio">
            <RecentProjects />
          </section>

          <section id="tools">
            <PremiumTools />
          </section>

          <section id="github" className="ultra-glass rounded-[2rem] p-10 overflow-hidden border border-white/5 hover:border-cyan-400/20 transition-all duration-500">
            <GithubStats />
          </section>

          <section id="contact">
            <ContactForm />
          </section>

          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;
