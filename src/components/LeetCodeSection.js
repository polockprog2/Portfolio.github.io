import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiRefreshCw, FiAlertCircle, FiCode } from "react-icons/fi";

const LC_USER = "polockprog2";
const API_URL = `https://leetcode-api-faisalshohag.vercel.app/${LC_USER}`;

const difficulties = [
  { key: "easy", label: "Easy", color: "bg-emerald-400", text: "text-emerald-400", border: "border-emerald-400/20", solved: 0, total: 0 },
  { key: "medium", label: "Medium", color: "bg-amber-400", text: "text-amber-400", border: "border-amber-400/20", solved: 0, total: 0 },
  { key: "hard", label: "Hard", color: "bg-rose-400", text: "text-rose-400", border: "border-rose-400/20", solved: 0, total: 0 },
];

function timeAgo(iso) {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function computeStreak(calendar) {
  if (!calendar) return 0;
  const iso = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const days = new Set(Object.keys(calendar).map((s) => iso(new Date(s * 1000))));
  let streak = 0;
  const cursor = new Date();
  if (!days.has(iso(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (days.has(iso(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

const LeetCodeSection = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStats = () => {
    setLoading(true);
    setError(null);
    fetch(API_URL)
      .then((res) => {
        if (res.status === 403 || res.status === 429) throw new Error("rate-limit");
        if (!res.ok) throw new Error("bad-status");
        return res.json();
      })
      .then((json) => {
        if (!json || typeof json.totalSolved !== "number") throw new Error("bad-data");
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          err.message === "rate-limit"
            ? "LeetCode API rate limit reached."
            : "Couldn't load LeetCode stats. The third-party API may be temporarily down."
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    loadStats();
  }, []);

  const accepted = [];
  if (data && Array.isArray(data.recentSubmissions)) {
    const seen = new Set();
    data.recentSubmissions.forEach((s) => {
      if (s.statusDisplay !== "Accepted") return;
      if (seen.has(s.titleSlug)) return;
      seen.add(s.titleSlug);
      if (accepted.length < 12) accepted.push(s);
    });
  }

  const totals = {};
  difficulties.forEach((d) => {
    d.solved = data ? data[`${d.key}Solved`] || 0 : 0;
    totals[d.key] = d.solved;
    d.total = data ? data[`total${d.key.charAt(0).toUpperCase()}${d.key.slice(1)}`] || 0 : 0;
  });
  const solvedSum = difficulties.reduce((sum, d) => sum + (data ? d.solved : 0), 0);
  const ranking = data ? new Intl.NumberFormat().format(data.ranking || 0) : "—";
  const streak = data ? computeStreak(data.submissionCalendar) : 0;

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-black tracking-tight uppercase">LeetCode Journey</h2>
          <div className="w-20 h-1.5 bg-amber-500 rounded-full" />
        </div>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-slate-400 max-w-xl leading-relaxed">
            Real-time problem-solving stats pulled from my LeetCode profile — solved counts, consistency, and recent accepted submissions.
          </p>
          <button
            onClick={loadStats}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-amber-400 transition-colors duration-300"
          >
            <FiRefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-28 glass-card rounded-[2rem] border-white/5 animate-pulse" />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-col items-center gap-4 p-10 glass-card rounded-[2.5rem] border-white/5 text-center">
          <FiAlertCircle className="w-10 h-10 text-amber-400" />
          <p className="text-slate-400 text-sm font-medium">{error}</p>
          <button
            onClick={loadStats}
            className="px-6 py-3 glass-card border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-amber-400 hover:text-slate-950 hover:border-amber-400 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && data && (
        <div className="flex flex-col gap-6">
          {/* Core Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Problems Solved", value: data.totalSolved, sub: `of ${data.totalQuestions}` },
              { label: "Global Ranking", value: `#${ranking}`, sub: "worldwide" },
              { label: "Current Streak", value: `${streak}`, sub: streak === 1 ? "day" : "days" },
              { label: "Submissions", value: data.totalSubmissions && data.totalSubmissions[0] ? data.totalSubmissions[0].submissions : "-", sub: "total attempts" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                whileHover={{ y: -5 }}
                className="glass-card rounded-[2rem] p-6 border-white/5 flex flex-col justify-between gap-4"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</span>
                <div className="flex flex-col gap-1">
                  <span className="text-3xl font-black text-white font-space">{stat.value}</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{stat.sub}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Difficulty Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="glass-card rounded-[2.5rem] p-8 border-white/5 flex flex-col gap-6"
          >
            <div className="flex items-center gap-1.5 pb-3 border-b border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 ml-2">Difficulty Breakdown</span>
            </div>

            <div className="flex flex-col gap-5">
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden flex">
                {difficulties.map((d, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${solvedSum ? (d.solved / solvedSum) * 100 : 0}%` }}
                    transition={{ delay: idx * 0.1, duration: 1, ease: "easeOut" }}
                    className={`h-full ${d.color}`}
                  />
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4">
                {difficulties.map((d, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl bg-white/5 border ${d.border} flex flex-col gap-1`}>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${d.color}`} />
                      <span className={`text-[10px] font-black uppercase tracking-wider ${d.text}`}>{d.label}</span>
                    </div>
                    <span className="text-2xl font-black text-white font-space">{d.solved}</span>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">of {new Intl.NumberFormat().format(d.total)}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Submissions Feed */}
          <div className="glass-card rounded-[2.5rem] p-6 md:p-8 border-white/5 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-6">
              <div className="flex items-center gap-2">
                <FiCode className="w-4 h-4 text-amber-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Recent Accepted Submissions</span>
              </div>
              <a
                href={`https://leetcode.com/${LC_USER}/`}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-black uppercase tracking-widest text-white/70 hover:text-amber-400 flex items-center gap-1.5 transition-colors duration-300"
              >
                Full Profile <FiExternalLink className="w-3 h-3" />
              </a>
            </div>

            {accepted.length === 0 ? (
              <p className="text-slate-400 text-sm font-medium py-6 text-center">No recent accepted submissions yet.</p>
            ) : (
              <div className="max-h-[420px] overflow-y-auto pr-2 flex flex-col gap-3">
                {accepted.map((s, idx) => (
                  <motion.div
                    key={`${s.titleSlug}-${idx}`}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.04 }}
                    whileHover={{ y: -3 }}
                    className="group flex items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 transition-all duration-300 hover:border-emerald-400/30"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-black text-white group-hover:text-amber-400 transition-colors truncate">
                          {s.title}
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                          {s.lang} · {timeAgo(s.timestamp * 1000)}
                        </span>
                      </div>
                    </div>
                    <a
                      href={`https://leetcode.com/problems/${s.titleSlug}/`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-emerald-400 flex items-center gap-1.5 transition-colors duration-300 shrink-0"
                    >
                      Solve <FiExternalLink className="w-3 h-3" />
                    </a>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default LeetCodeSection;