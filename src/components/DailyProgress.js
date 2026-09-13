import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiGitCommit, FiGitPullRequest, FiGithub, FiRefreshCw, FiAlertCircle } from "react-icons/fi";

const GH_USER = "polockprog2";

const tagColors = [
  "text-cyan-400 bg-cyan-400/5 border-cyan-400/20",
  "text-violet-400 bg-violet-400/5 border-violet-400/20",
  "text-amber-400 bg-amber-400/5 border-amber-400/20",
  "text-emerald-400 bg-emerald-400/5 border-emerald-400/20",
  "text-rose-400 bg-rose-400/5 border-rose-400/20",
];

const dotColors = {
  PushEvent: "bg-cyan-400",
  PullRequestEvent: "bg-violet-400",
  IssuesEvent: "bg-emerald-400",
  CreateEvent: "bg-amber-400",
  ReleaseEvent: "bg-rose-400",
  ForkEvent: "bg-fuchsia-400",
  WatchEvent: "bg-yellow-400",
};

const defaultDot = "bg-slate-400";

function dayLabel(iso) {
  const d = new Date(iso);
  const today = new Date();
  const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const diffDays = Math.round((startOfDay(today) - startOfDay(d)) / 86400000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

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

function describeEvent(event) {
  const repo = event.repo ? event.repo.name.replace("polockprog2/", "") : "GitHub";
  const url = `https://github.com/${event.repo ? event.repo.name : ""}`;
  const payload = event.payload || {};

  switch (event.type) {
    case "PushEvent": {
      const count = payload.size ?? (payload.commits ? payload.commits.length : 1);
      const branch = (payload.ref || "refs/heads/main").replace("refs/heads/", "");
      const lastMsg = payload.commits && payload.commits.length
        ? payload.commits[payload.commits.length - 1].message : null;
      return {
        type: "Commit",
        dot: "PushEvent",
        title: `Pushed ${count} commit${count === 1 ? "" : "s"}`,
        description: lastMsg ? `"${lastMsg}" → ${repo}/${branch}` : `to ${repo}/${branch}`,
        tags: ["Commit", branch],
        url: `${url}/commits/${branch}`,
      };
    }
    case "PullRequestEvent": {
      const action = payload.action || "opened";
      const num = payload.pull_request ? payload.pull_request.number : null;
      const prTitle = payload.pull_request ? payload.pull_request.title : null;
      return {
        type: "PR",
        dot: "PullRequestEvent",
        title: `${action.charAt(0).toUpperCase() + action.slice(1)} PR${num ? ` #${num}` : ""}`,
        description: prTitle ? `"${prTitle}" in ${repo}` : `in ${repo}`,
        tags: ["Pull Request", repo],
        url: num ? `${url}/pull/${num}` : url,
      };
    }
    case "IssuesEvent": {
      const action = payload.action || "opened";
      const num = payload.issue ? payload.issue.number : null;
      const issueTitle = payload.issue ? payload.issue.title : null;
      return {
        type: "Issue",
        dot: "IssuesEvent",
        title: `${action.charAt(0).toUpperCase() + action.slice(1)} Issue${num ? ` #${num}` : ""}`,
        description: issueTitle ? `"${issueTitle}" in ${repo}` : `in ${repo}`,
        tags: ["Issue", repo],
        url: num ? `${url}/issues/${num}` : url,
      };
    }
    case "WatchEvent": {
      return {
        type: "Star",
        dot: "WatchEvent",
        title: "Starred a repository",
        description: `Gave a star to ${event.repo.name}`,
        tags: ["Star", repo],
        url,
      };
    }
    case "ForkEvent": {
      return {
        type: "Fork",
        dot: "ForkEvent",
        title: "Forked a repository",
        description: `Forked ${event.repo.name}`,
        tags: ["Fork", repo],
        url,
      };
    }
    case "ReleaseEvent": {
      const tag = payload.release ? payload.release.tag_name : null;
      return {
        type: "Release",
        dot: "ReleaseEvent",
        title: tag ? `Released ${tag}` : "Created a release",
        description: `Release published in ${event.repo.name}`,
        tags: ["Release", repo],
        url: `${url}/releases`,
      };
    }
    case "CreateEvent": {
      const refType = payload.ref_type || "reference";
      return {
        type: "Create",
        dot: "CreateEvent",
        title: `Created ${refType}`,
        description: refType === "repository"
          ? `Newly created ${event.repo.name}`
          : `${refType} "${payload.ref}" in ${event.repo.name}`,
        tags: ["Create", refType],
        url,
      };
    }
    default: {
      return {
        type: event.type.replace("Event", ""),
        dot: defaultDot,
        title: event.type.replace("Event", " activity"),
        description: `Activity in ${event.repo ? event.repo.name : "GitHub"}`,
        tags: [event.type.replace("Event", "")],
        url,
      };
    }
  }
}

const DailyProgress = () => {
  const [groups, setGroups] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadEvents = () => {
    setLoading(true);
    setError(null);
    fetch(`https://api.github.com/users/${GH_USER}/events/public?per_page=30`)
      .then((res) => {
        if (res.status === 403 || res.status === 429) {
          throw new Error("rate-limit");
        }
        if (!res.ok) throw new Error("bad-status");
        return res.json();
      })
      .then((events) => {
        if (!Array.isArray(events)) throw new Error("bad-data");
        const grouped = {};
        events.forEach((event) => {
          const label = dayLabel(event.created_at);
          if (!grouped[label]) grouped[label] = [];
          grouped[label].push(event);
        });
        setGroups(grouped);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message === "rate-limit"
          ? "GitHub API rate limit reached."
          : "Couldn't load GitHub activity. Check your connection.");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-black tracking-tight uppercase">Daily Progress</h2>
          <div className="w-20 h-1.5 bg-cyan-500 rounded-full" />
        </div>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-slate-400 max-w-xl leading-relaxed">
            Live feed of my recent GitHub activity — commits, pull requests, issues, and more, straight from my profile.
          </p>
          <button
            onClick={loadEvents}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors duration-300"
          >
            <FiRefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      <div className="glass-card rounded-[2.5rem] p-6 md:p-8 border-white/5 overflow-hidden">
        <div className="max-h-[560px] overflow-y-auto pr-2 flex flex-col gap-8">
          {loading && (
            <>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-28 glass-card rounded-3xl border-white/5 animate-pulse" />
              ))}
            </>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center gap-4 p-10 text-center">
              <FiAlertCircle className="w-10 h-10 text-rose-400" />
              <p className="text-slate-400 text-sm font-medium">{error}</p>
              <button
                onClick={loadEvents}
                className="px-6 py-3 glass-card border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-cyan-400 hover:text-slate-950 hover:border-cyan-400 transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && groups && (
            <>
              {Object.keys(groups).map((label) => (
                <div key={label} className="relative flex flex-col gap-4">
                  <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/40 via-white/10 to-transparent" />
                  <div className="flex items-center gap-3 pl-10">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{label}</span>
                <div className="h-px flex-1 bg-white/5" />
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
                  {groups[label].length} {groups[label].length === 1 ? "event" : "events"}
                </span>
              </div>

              {groups[label].map((event, idx) => {
                const item = describeEvent(event);
                const dotColor = dotColors[item.dot] || defaultDot;
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.06 }}
                    whileHover={{ y: -4, borderColor: "rgba(34, 211, 238, 0.3)" }}
                    className="group relative flex flex-col gap-4 pl-10"
                  >
                    <div className="absolute left-0 top-6 w-6 h-6 rounded-full ultra-glass border border-white/10 flex items-center justify-center">
                      <div className={`w-2 h-2 rounded-full ${dotColor}`} />
                    </div>

                    <div className="flex flex-col gap-4 p-6 glass-card rounded-3xl border-white/5 transition-all duration-500">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          {event.type === "PushEvent"
                            ? <FiGitCommit className="w-4 h-4 text-cyan-400" />
                            : event.type === "PullRequestEvent"
                              ? <FiGitPullRequest className="w-4 h-4 text-violet-400" />
                              : <FiGithub className="w-4 h-4 text-slate-500" />}
                          <h3 className="text-lg font-black text-white group-hover:text-cyan-400 transition-colors duration-300 leading-snug">
                            {item.title}
                          </h3>
                        </div>
                        <span className="w-fit text-[9px] font-black tracking-widest text-slate-500 uppercase flex items-center gap-1.5">
                          {timeAgo(event.created_at)}
                        </span>
                      </div>

                      <p className="text-sm text-slate-400 font-medium leading-relaxed">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/5">
                        {item.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className={`text-[9px] font-black tracking-[0.2em] uppercase px-3 py-1 rounded-lg border ${tagColors[tIdx % tagColors.length]}`}
                          >
                            {tag}
                          </span>
                        ))}

                        <div className="flex-1" />

                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] font-black uppercase tracking-widest text-white/80 hover:text-cyan-400 flex items-center gap-1.5 transition-colors duration-300"
                        >
                          View on GitHub <FiExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default DailyProgress;