import React, { useEffect, useRef } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Navbar from "./components/Navbar";
import ProfileCard from "./components/ProfileCard";
import Hero from "./components/Hero";
import RecentProjects from "./components/RecentProjects";
import TechStack from "./components/TechStack";
import PremiumTools from "./components/PremiumTools";
import GithubStats from "./components/GithubStats";
import BlogSection from "./components/BlogSection";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

function App() {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
        spotlightRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Grid Layers */}
      <div className="grid-stack">
        <div className="grid-stack grid-layer-1" />
        <div className="grid-stack grid-layer-2" />
      </div>

      {/* Creative Noise Overlay */}
      <div className="noise-overlay" />

      {/* Cursor spotlight lens tracking */}
      <div ref={spotlightRef} className="spotlight-lens" />

      {/* Sticky Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-[#020617] via-[#020617]/80 to-transparent pb-6">
        <Navbar />
      </div>

      {/* Main Container */}
      <main id="home" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-36 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Profile Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-36 flex justify-center lg:justify-start">
            <ProfileCard />
          </div>

          {/* Right Column: Scrollable Sections */}
          <div className="lg:col-span-8 flex flex-col gap-24 md:gap-32 mt-6 lg:mt-0">
            <Hero />
            
            <div id="portfolio" className="scroll-mt-36">
              <RecentProjects />
            </div>

            <TechStack />

            <PremiumTools />

            <GithubStats />

            <div id="blog" className="scroll-mt-36">
              <BlogSection />
            </div>

            <div id="contact" className="scroll-mt-36 font-semibold">
              <ContactForm />
            </div>

            <Footer />
          </div>
        </div>
      </main>

      {/* Vercel Analytics & Speed Insights */}
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;
