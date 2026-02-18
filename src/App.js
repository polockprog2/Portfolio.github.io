import React from "react";
import { motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RecentProjects from "./components/RecentProjects";
import PremiumTools from "./components/PremiumTools";
import BlogSection from "./components/BlogSection";
import ContactForm from "./components/ContactForm";
import GithubStats from "./components/GithubStats";
import Footer from "./components/Footer";
import TechStack from "./components/TechStack";

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

          <Hero />

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

          <section id="github" className="ultra-glass rounded-[2rem] p-10 overflow-hidden border border-white/5 hover:border-cyan-400/20 transition-all duration-500 shadow-2xl">
            <GithubStats />
          </section>

          <section id="blog">
            <BlogSection />
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
