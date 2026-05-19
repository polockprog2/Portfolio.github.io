import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import Magnetic from "./Magnetic";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Please enter a message";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({ name: "", email: "", message: "" });
    }, 1800);
  };

  return (
    <section className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-black tracking-tight uppercase">Let's Connect</h2>
          <div className="w-20 h-1.5 bg-cyan-400 rounded-full" />
        </div>
        <p className="text-slate-400 max-w-2xl leading-relaxed">
          I'm currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="ultra-glass rounded-[3rem] p-10 md:p-16 border border-white/5 shadow-2xl relative overflow-hidden group min-h-[500px] flex items-center"
      >
        {/* Animated Internal Glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse-slow pointer-events-none" />

        <AnimatePresence mode="wait">
          {!isSent ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit}
              className="relative z-10 flex flex-col gap-8 w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3 group/input">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1 transition-colors group-focus-within/input:text-cyan-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ex. John Doe"
                    disabled={isSubmitting}
                    className={`w-full bg-white/5 border rounded-2xl px-8 py-5 text-white placeholder-slate-500 focus:outline-none focus:bg-white/[0.08] focus:ring-4 transition-all duration-500 font-semibold ${
                      errors.name 
                        ? "border-rose-500/40 focus:border-rose-500/60 focus:ring-rose-500/10" 
                        : "border-white/5 focus:border-cyan-400/40 focus:ring-cyan-500/10"
                    }`}
                  />
                  {errors.name && (
                    <span className="text-rose-400 text-xs font-bold flex items-center gap-1.5 ml-1">
                      <FiAlertCircle className="w-4 h-4" /> {errors.name}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-3 group/input">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1 transition-colors group-focus-within/input:text-cyan-400">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                    className={`w-full bg-white/5 border rounded-2xl px-8 py-5 text-white placeholder-slate-500 focus:outline-none focus:bg-white/[0.08] focus:ring-4 transition-all duration-500 font-semibold ${
                      errors.email 
                        ? "border-rose-500/40 focus:border-rose-500/60 focus:ring-rose-500/10" 
                        : "border-white/5 focus:border-cyan-400/40 focus:ring-cyan-500/10"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-rose-400 text-xs font-bold flex items-center gap-1.5 ml-1">
                      <FiAlertCircle className="w-4 h-4" /> {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 group/input">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 ml-1 transition-colors group-focus-within/input:text-cyan-400">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows="6"
                  disabled={isSubmitting}
                  className={`w-full bg-white/5 border rounded-3xl px-8 py-6 text-white placeholder-slate-500 focus:outline-none focus:bg-white/[0.08] focus:ring-4 transition-all duration-500 resize-none font-semibold ${
                    errors.message 
                      ? "border-rose-500/40 focus:border-rose-500/60 focus:ring-rose-500/10" 
                      : "border-white/5 focus:border-cyan-400/40 focus:ring-cyan-500/10"
                  }`}
                />
                {errors.message && (
                  <span className="text-rose-400 text-xs font-bold flex items-center gap-1.5 ml-1">
                    <FiAlertCircle className="w-4 h-4" /> {errors.message}
                  </span>
                )}
              </div>

              <div className="mt-4">
                <Magnetic strength={0.2}>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative px-14 py-6 bg-white text-slate-950 font-black rounded-2xl shadow-xl shadow-cyan-400/5 hover:bg-cyan-400 hover:text-slate-950 hover:shadow-cyan-400/20 transition-all duration-700 uppercase tracking-[0.3em] text-xs overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center gap-2.5">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Transmitting...
                        </>
                      ) : (
                        "Initiate Conversation"
                      )}
                    </span>
                    <div className="absolute inset-0 bg-white group-hover:bg-cyan-400 transition-colors" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine-premium" />
                  </motion.button>
                </Magnetic>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center text-center gap-6 w-full py-10 relative z-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 150 }}
                className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center"
              >
                <FiCheckCircle className="w-10 h-10" />
              </motion.div>
              <div className="flex flex-col gap-2 max-w-md">
                <h3 className="text-3xl font-black text-white uppercase tracking-tight">Transmission Complete</h3>
                <p className="text-slate-400 leading-relaxed font-semibold">
                  Thank you! Your message was transmitted successfully. I will review it and get back to you shortly.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsSent(false)}
                className="mt-4 px-8 py-4 bg-white/5 border border-white/10 text-white font-black rounded-xl text-xs uppercase tracking-widest hover:bg-white/10 transition-all duration-300"
              >
                Send Another Message
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default ContactForm;
