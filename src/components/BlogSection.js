import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiClock, FiCalendar, FiArrowRight, FiUser } from "react-icons/fi";

const blogs = [
  {
    title: "Orchestrating High-Performance React Architecture",
    topic: "Architecture",
    color: "text-cyan-400 bg-cyan-400/5 border-cyan-400/20",
    date: "May 15, 2026",
    readTime: "5 min read",
    author: "Samir Islam",
    description: "Deep dive into state management strategies, bundle optimization, and rendering patterns in modern React ecosystems.",
    content: `Building large-scale React applications requires a careful balance between developer velocity and runtime performance. As applications grow, common bottlenecks emerge: excessive re-renders, bloated bundle sizes, and unoptimized state propagation.

### 1. Code Splitting and Lazy Loading

The first line of defense against bloated bundles is code splitting. React's \`lazy\` and \`Suspense\` APIs allow us to load components only when they are needed. For example, routing-based split points ensure that users only download the code for the page they are currently visiting:

\`\`\`jsx
const AdminPanel = lazy(() => import('./AdminPanel'));
\`\`\`

### 2. Fine-Grained State Orchestration

Passing state down through deeply nested components via props (prop-drilling) creates unnecessary coupling and performance bottlenecks. Global state managers like Zustand or Redux Toolkit solve this, but using them incorrectly can still lead to global re-renders. By subscribing to specific selectors, we ensure components only re-render when their relevant state slice changes:

\`\`\`javascript
const user = useUserStore(state => state.user);
\`\`\`

### 3. Decoupling Business Logic

Components should focus on presentation. Moving complex logic, API integrations, and side effects into custom hooks makes the codebase cleaner, highly testable, and reusable across different views.`
  },
  {
    title: "Scaling E2E Test Suites: From Flaky to Flawless",
    topic: "QA Automation",
    color: "text-rose-400 bg-rose-400/5 border-rose-400/20",
    date: "May 10, 2026",
    readTime: "7 min read",
    author: "Samir Islam",
    description: "Strategies to eliminate test flakiness, optimize execution time, and build self-healing automation pipelines.",
    content: `End-to-End (E2E) testing is critical for high-assurance delivery, but unstable, "flaky" tests can destroy developer trust in continuous integration pipelines.

### 1. The Async Trap: Sleep vs. Assertion

One of the most common causes of flaky tests is hardcoded waiting times (\`cy.wait(5000)\` or \`Thread.sleep(5000)\`). Modern testing frameworks like Cypress and Playwright handle element loading out of the box using automatic retries. Relying on assertions rather than timeouts is the key to stable tests:

\`\`\`javascript
// Bad
cy.wait(3000);
cy.get('.btn-submit').click();

// Good
cy.get('.btn-submit').should('be.visible').click();
\`\`\`

### 2. Network Stubbing vs. Real APIs

While testing with real backend services guarantees system-wide integration, it introduces external dependency risks (network speed, database state). Stubbing or mocking network requests using utilities like Cypress Intercept ensures consistent, lightning-fast tests:

\`\`\`javascript
cy.intercept('GET', '/api/v1/inventory', { fixture: 'inventory.json' }).as('getInventory');
\`\`\`

### 3. Parallelization and Sharding

Running tests sequentially in a single CI runner can bottleneck deployment speed. Splitting the suite across parallel containerized executors cuts verification time from hours to minutes, ensuring high delivery throughput.`
  },
  {
    title: "The Future of Web Testing: AI Agents in CI/CD",
    topic: "AI Orchestration",
    color: "text-amber-400 bg-amber-400/5 border-amber-400/20",
    date: "Apr 28, 2026",
    readTime: "6 min read",
    author: "Samir Islam",
    description: "Exploring the role of LLM-based autonomous QA agents in generating test cases, healing selectors, and automating regressions.",
    content: `The integration of Artificial Intelligence into software quality assurance is shifting the QA paradigm from manual scripting to autonomous agent orchestration.

### 1. Self-Healing Selectors

UI changes frequently break hardcoded selectors (like CSS classes or XPath coordinates). AI-powered test runners can dynamically analyze the DOM tree when a test fails, identifying alternative attributes (ARIA labels, text content, semantic structure) to automatically repair the selector in real-time, preventing false build failures.

### 2. Autonomous Test Generation

By feeding the application's site map and user event logs into an LLM agent, the AI can discover edge cases that a human developer might overlook. It writes test scripts, executes them, and reports detailed regression analysis with zero human intervention.

### 3. Visual Regression Analysis

Static code checks cannot catch visual misalignment, overlapping text, or layout shifts. Integrating AI-based visual testing engines like Applitools in CI/CD pipelines ensures that the interface looks identical across all viewport sizes and device types.`
  }
];

const BlogSection = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-black tracking-tight uppercase">Latest Thoughts</h2>
          <div className="w-20 h-1.5 bg-rose-500 rounded-full" />
        </div>
        <p className="text-slate-400 max-w-xl leading-relaxed">
          Deep dives into engineering challenges, testing frameworks, and interactive web architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -6, borderColor: "rgba(255,255,255,0.12)" }}
            onClick={() => setSelectedBlog(blog)}
            className="group relative flex flex-col justify-between p-8 h-[300px] ultra-glass rounded-3xl border border-white/5 overflow-hidden transition-all duration-500 cursor-pointer"
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none opacity-50" />

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className={`text-[9px] font-black tracking-[0.2em] uppercase px-3 py-1 rounded-lg border ${blog.color}`}>
                  {blog.topic}
                </span>
                <span className="text-[9px] font-black tracking-widest text-slate-500 uppercase flex items-center gap-1.5">
                  <FiClock className="w-3 h-3" />
                  {blog.readTime}
                </span>
              </div>

              <h3 className="text-lg font-black text-white group-hover:text-cyan-400 transition-colors duration-300 leading-snug line-clamp-3">
                {blog.title}
              </h3>
            </div>

            <div className="flex flex-col gap-4 mt-auto">
              <p className="text-slate-400 text-xs font-medium leading-relaxed line-clamp-3">
                {blog.description}
              </p>

              <div className="flex justify-between items-center pt-3 border-t border-white/5 text-[9px] font-black tracking-widest text-slate-500 uppercase">
                <span className="flex items-center gap-1.5"><FiCalendar className="w-3 h-3" />{blog.date}</span>
                <span className="text-white group-hover:text-cyan-400 flex items-center gap-1 transition-colors duration-300">
                  Read Article <FiArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setSelectedBlog(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[85vh] overflow-y-auto ultra-glass border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl relative scrollbar-thin scrollbar-thumb-white/10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-6 right-6 md:top-8 md:right-8 p-3 rounded-2xl bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all duration-300"
              >
                <FiX className="w-5 h-5" />
              </button>

              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap items-center gap-4">
                  <span className={`text-[9px] font-black tracking-[0.2em] uppercase px-3 py-1 rounded-lg border ${selectedBlog.color}`}>
                    {selectedBlog.topic}
                  </span>
                  <div className="flex items-center gap-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><FiUser className="w-3.5 h-3.5 text-cyan-400" />{selectedBlog.author}</span>
                    <span className="w-1 h-1 bg-slate-800 rounded-full" />
                    <span className="flex items-center gap-1.5"><FiCalendar className="w-3.5 h-3.5 text-rose-400" />{selectedBlog.date}</span>
                    <span className="w-1 h-1 bg-slate-800 rounded-full" />
                    <span className="flex items-center gap-1.5"><FiClock className="w-3.5 h-3.5 text-yellow-400" />{selectedBlog.readTime}</span>
                  </div>
                </div>

                <h2 className="text-2xl md:text-4xl font-black text-white leading-tight">
                  {selectedBlog.title}
                </h2>

                <div className="w-full h-[1px] bg-white/5 my-2" />

                {/* Article Content Render */}
                <div className="text-slate-300 text-sm md:text-base leading-relaxed flex flex-col gap-6 font-medium">
                  {selectedBlog.content.split("\n\n").map((para, pIdx) => {
                    const trimmed = para.trim();
                    if (!trimmed) return null;
                    
                    if (trimmed.startsWith("### ")) {
                      return (
                        <h4 key={pIdx} className="text-lg md:text-xl font-black text-white uppercase tracking-tight mt-4">
                          {trimmed.replace("### ", "")}
                        </h4>
                      );
                    }
                    if (trimmed.startsWith("#### ")) {
                      return (
                        <h5 key={pIdx} className="text-base md:text-lg font-black text-white uppercase tracking-tight mt-3">
                          {trimmed.replace("#### ", "")}
                        </h5>
                      );
                    }
                    if (trimmed.startsWith("\`\`\`")) {
                      const codeLines = trimmed.split("\n").filter(line => !line.startsWith("\`\`\`"));
                      return (
                        <div key={pIdx} className="bg-slate-950/60 border border-white/5 rounded-2xl p-5 overflow-x-auto font-mono text-xs md:text-sm text-cyan-300 my-2">
                          <pre><code>{codeLines.join("\n")}</code></pre>
                        </div>
                      );
                    }
                    return (
                      <p key={pIdx} className="opacity-90">
                        {trimmed}
                      </p>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BlogSection;
