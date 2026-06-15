import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Laptop,
  ExternalLink,
  X,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Github } from "../components/icons/BrandIcons.jsx";
import { projects, profile } from "../data/content.js";

const githubHref = (project) =>
  !project.code || project.code === "#" ? profile.socials.github : project.code;
const demoHref = (project) =>
  !project.demo || project.demo === "#" ? profile.socials.github : project.demo;

export default function Projects() {
  const [active, setActive] = useState(null);

  return (
    <div className="space-y-10 sm:space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-3"
      >
        <span className="pill">
          <Laptop className="h-3.5 w-3.5" />
          Garage
        </span>
        <h2 className="font-display text-[clamp(28px,8vw,48px)] sm:text-5xl font-extrabold tracking-tight text-ink-900 leading-[1.05]">
          Things I&apos;ve <span className="gradient-text">built</span>
        </h2>
        <p className="room-intro text-ink-600 max-w-2xl text-[15px] sm:text-base">
          A selection of projects where I shaped the frontend — from idea to
          deployed UI. Click any card for the full story.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.title}
            project={p}
            index={i}
            onOpen={() => setActive(p)}
          />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <ProjectModal project={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectCard({ project, index, onOpen }) {
  const tiltRef = useRef(null);
  const isFinePointer =
    typeof window !== "undefined" &&
    window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;

  const handleMove = (e) => {
    if (!isFinePointer) return;
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${y * -6}deg) rotateY(${x * 8}deg) translateY(-4px)`;
  };
  const handleLeave = () => {
    if (!isFinePointer) return;
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      ref={tiltRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group glass rounded-2xl sm:rounded-3xl overflow-hidden tilt-card relative flex flex-col"
      style={{ transition: "transform 0.25s ease, box-shadow 0.25s ease" }}
    >
      <div
        className={`pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br ${project.color} opacity-20 blur-3xl`}
        aria-hidden="true"
      />

      {/* Preview header — full-bleed inside the card */}
      <button
        type="button"
        onClick={onOpen}
        data-cursor="hover"
        aria-label={`Open ${project.title} case study`}
        className={`relative w-full h-28 sm:h-36 bg-gradient-to-br ${project.color} text-white text-left overflow-hidden`}
      >
        <div className="absolute inset-0 bg-noise opacity-10" aria-hidden="true" />
        <div className="absolute top-2.5 left-3 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/70" />
          <span className="h-2 w-2 rounded-full bg-white/50" />
          <span className="h-2 w-2 rounded-full bg-white/30" />
        </div>
        <div className="absolute inset-x-4 bottom-3.5 sm:bottom-4 flex items-end justify-between gap-2">
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-[0.22em] opacity-80">
              Project {String(index + 1).padStart(2, "0")}
            </div>
            <div className="font-display text-lg sm:text-xl font-bold leading-tight truncate">
              {project.title}
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 shrink-0">
            Preview
          </span>
        </div>
      </button>

      {/* Body */}
      <div className="relative flex-1 flex flex-col gap-3 sm:gap-4 p-4 sm:p-5">
        <p className="text-[13.5px] sm:text-sm text-ink-600 leading-relaxed">
          {project.short}
        </p>

        <ul className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li
              key={t}
              className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-ink-900/5 text-ink-700"
            >
              {t}
            </li>
          ))}
        </ul>

        {/* Live demo row — sits inside the card so the block stays cohesive */}
        {project.demo && project.demo !== "#" && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="mt-auto group/url flex items-center gap-1.5 min-w-0 px-3 py-2 rounded-xl bg-cream-50/80 border border-ink-200/60 text-[11px] font-mono text-ink-700 hover:text-ink-900 hover:bg-cream-50 transition"
          >
            <ExternalLink className="h-3 w-3 shrink-0 text-ink-500 group-hover/url:text-ink-900" />
            <span className="truncate min-w-0 flex-1">
              {project.demo.replace(/^https?:\/\//, "")}
            </span>
            <span className="text-ink-400 group-hover/url:text-ink-900 shrink-0">↗</span>
          </a>
        )}

        <div className="flex items-center justify-between gap-3 pt-1 border-t border-ink-100/70">
          <button
            type="button"
            onClick={onOpen}
            data-cursor="hover"
            className="text-[13px] sm:text-sm font-semibold text-ink-900 inline-flex items-center gap-1 hover:gap-1.5 transition-all pt-3"
          >
            View case study
            <span aria-hidden>→</span>
          </button>
          <div className="flex items-center gap-1 pt-3">
            <a
              href={demoHref(project)}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title} live demo`}
              data-cursor="hover"
              onClick={(e) => e.stopPropagation()}
              className="h-8 w-8 inline-flex items-center justify-center rounded-lg text-ink-500 hover:bg-ink-900/10 hover:text-ink-900 transition"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={githubHref(project)}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title} on GitHub`}
              data-cursor="hover"
              onClick={(e) => e.stopPropagation()}
              className="h-8 w-8 inline-flex items-center justify-center rounded-lg text-ink-500 hover:bg-ink-900/10 hover:text-ink-900 transition"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-ink-900/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-3xl glass-strong rounded-3xl overflow-hidden max-h-[85vh] flex flex-col"
      >
        <div
          className={`relative h-44 bg-gradient-to-br ${project.color} text-white flex items-end p-6`}
        >
          <div className="absolute inset-0 bg-noise opacity-10" />
          <button
            onClick={onClose}
            data-cursor="hover"
            className="absolute top-4 right-4 h-9 w-9 inline-flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md transition"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="relative">
            <div className="text-[11px] uppercase tracking-widest opacity-80">
              Case Study
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mt-1">
              {project.title}
            </h3>
          </div>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto">
          <p className="text-ink-700 leading-relaxed">{project.description}</p>

          <div className="mt-6">
            <div className="text-xs uppercase tracking-widest text-ink-400 mb-3 inline-flex items-center gap-1.5">
              <Sparkles className="h-3 w-3" /> Features
            </div>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {project.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-sm text-ink-700"
                >
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-500 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <div className="text-xs uppercase tracking-widest text-ink-400 mb-3">
              Built with
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-ink-900/5 text-ink-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={demoHref(project)}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="btn-primary"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
            <a
              href={githubHref(project)}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="btn-ghost"
            >
              <Github className="h-4 w-4" />
              Source Code
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
