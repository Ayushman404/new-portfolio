import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SpotlightCard from "../ui/SpotlightCard";
import InteractiveGrid from "../ui/InteractiveGrid";
import {
  Code2,
  Cpu,
  Globe,
  Zap,
  Database,
  Terminal,
  GraduationCap,
  Linkedin,
  Github,
  Mail,
  Users,
  FileText,
} from "lucide-react";

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

// --- SUB COMPONENTS ---

const TechPill = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 dark:bg-slate-800/50 rounded-md border border-slate-200 dark:border-slate-700/50 text-[9px] font-bold text-slate-600 dark:text-slate-300 transition-all duration-300 hover:scale-105 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-200 cursor-default">
    <Icon size={10} className="text-indigo-500" />
    {label}
  </div>
);

const PositionItem = ({ role, org }) => (
  <div className="flex items-center justify-between mb-2 last:mb-0 w-full group">
    <div className="flex items-center gap-1.5">
      <div className="w-1 h-1 rounded-full bg-indigo-500 shrink-0 group-hover:scale-150 transition-transform duration-300" />
      <span className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate max-w-[150px]">
        {role}
      </span>
    </div>
    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 text-right shrink-0">
      {org}
    </span>
  </div>
);

const About = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState("");

  const handleMouseMove = (e) => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="about"
      onMouseMove={handleMouseMove}
      className="relative w-full flex flex-col justify-center py-20 px-4 md:px-12 min-h-screen overflow-hidden bg-slate-50/50 dark:bg-[#0a0a0a]"
    >
      {/* --- BACKGROUND LAYER (Refined) --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <InteractiveGrid
          squareSize={40}
          gridGap={2}
          hoverRadius={600} // Increased from 350 to 600 for wider glow
          className="absolute inset-0 opacity-60 dark:opacity-30 text-indigo-500" // Increased opacity for visibility
        />

        {/* Vignette: Radial fade instead of linear. Keeps center clear, softens edges without killing interaction. */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(255,255,255,0.8)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_40%,rgba(10,10,10,0.9)_100%)] opacity-70" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto w-full">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="pb-10 pl-2 md:pl-0 shrink-0"
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            ABOUT{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-emerald-400">
              ME.
            </span>
          </h2>
        </motion.div>

        {/* --- GRID LAYOUT --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 md:grid-rows-3 gap-3 md:gap-4 h-full"
        >
          {/* 1. MAIN STORY */}
          <motion.div
            variants={cardVariants}
            className="col-span-2 md:col-span-1 md:row-span-2 h-full"
          >
            <SpotlightCard
              gridMouseX={mousePos.x}
              gridMouseY={mousePos.y}
              className="h-full p-6 md:p-8 flex flex-col justify-center"
            >
              <h3 className="text-xl md:text-2xl font-bold leading-tight text-slate-800 dark:text-slate-100 mb-4">
                Second-Year{" "}
                <span className="text-indigo-500">AI&DS Undergraduate</span> at
                IIT Patna
              </h3>

              <div className="space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                <p>
                  I’m a Artificial Intelligence and Data Science undergraduate focused on{" "}
                  <strong className="text-slate-900 dark:text-white">
                    full-stack engineering
                  </strong>{" "}
                  and{" "}
                  <strong className="text-slate-900 dark:text-white">
                    applied Generative AI
                  </strong>
                  .
                </p>

                <p>
                  I enjoy building clean, production-oriented systems from
                  modern web applications to{" "}
                  <strong className="text-slate-900 dark:text-white">
                    LLM-powered features
                  </strong>{" "}
                  like RAG pipelines and backend APIs.
                </p>

                <p>
                  I value clarity, correctness, and understanding the trade-offs
                  behind every engineering decision.
                </p>

                <div className="pt-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-full text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Open to Internship Opportunities
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* 2. PORTRAIT */}
          <motion.div
            variants={cardVariants}
            className="col-span-1 row-span-2 md:col-span-1 md:row-span-2 h-full"
          >
            <SpotlightCard
              gridMouseX={mousePos.x}
              gridMouseY={mousePos.y}
              className="h-full relative group overflow-hidden"
            >
              <img
                src="/Ayushman_portrait.jpg"
                alt="Portrait"
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-90"></div>

              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white z-10">
                <p className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-indigo-400 mb-1">
                  Developer
                </p>
                <h4 className="text-lg md:text-2xl font-bold leading-none">
                  Ayushman Kumar
                </h4>
                <p className="text-slate-300 text-[10px] md:text-xs font-mono mt-1">
                  IIT Patna
                </p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* 3. LEADERSHIP (Centered) */}
          <motion.div
            variants={cardVariants}
            className="col-span-1 md:col-span-1 h-full"
          >
            <SpotlightCard
              gridMouseX={mousePos.x}
              gridMouseY={mousePos.y}
              className="h-full p-5"
            >
              <div className="flex items-center gap-2 text-slate-400">
                <Users size={14} />
                <span className="font-mono text-[10px] uppercase tracking-widest">
                  Leadership
                </span>
              </div>
              <div className="h-full flex flex-col justify-center">
                <div className="w-full space-y-2">
                  <PositionItem role="Dev Lead" org="GDG IITP" />
                  <PositionItem role="Sub-Coordinator" org="Celesta" />
                  <PositionItem role="Sub-Coordinator" org="Infinito" />
                  <PositionItem role="Core Member" org="NJACK" />
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* 4. ARSENAL (Centered) */}
          <motion.div
            variants={cardVariants}
            className="col-span-1 md:col-span-1 h-full"
          >
            <SpotlightCard
              gridMouseX={mousePos.x}
              gridMouseY={mousePos.y}
              className="h-full p-4 md:p-5"
            >
              <div className="flex items-center gap-2 text-slate-400">
                <Terminal size={14} />
                <span className="font-mono text-[10px] uppercase tracking-widest">
                  Stack
                </span>
              </div>
              <div className="h-full flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 content-center">
                  <TechPill icon={Code2} label="React" />
                  <TechPill icon={Cpu} label="Next.js" />
                  <TechPill icon={Zap} label="FastAPI" />
                  <TechPill icon={Globe} label="RAG" />
                  <TechPill icon={Database} label="Postgres" />
                  <TechPill icon={Code2} label="Docker" />
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* 5. INSTITUTE */}
          <motion.div
            variants={cardVariants}
            className="col-span-2 md:col-span-1 h-full"
          >
            <SpotlightCard
              gridMouseX={mousePos.x}
              gridMouseY={mousePos.y}
              className="h-full p-4 md:p-5 flex flex-col justify-between"
            >
              <div className="h-full flex flex-col justify-center">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/50 rounded-lg flex items-center justify-center">
                    <GraduationCap
                      className="text-indigo-600 dark:text-indigo-400"
                      size={18}
                    />
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-wide">
                      Local Time
                    </p>
                    <p className="font-mono font-bold text-slate-800 dark:text-slate-200 text-xs tabular-nums">
                      {time}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm md:text-base font-bold text-slate-900 dark:text-white truncate">
                    Indian Institute of Technology, Patna
                  </h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Patna, India
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <div className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-[10px] font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                      2024-28
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded text-[10px] font-bold border border-indigo-100 dark:border-indigo-900/30">
                      CPI : 8.96
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* 6. CURRENT FOCUS */}
          <motion.div
            variants={cardVariants}
            className="col-span-1 md:col-span-1 h-full"
          >
            <SpotlightCard
              gridMouseX={mousePos.x}
              gridMouseY={mousePos.y}
              className="h-full p-4 md:p-5"
            >
              <div className="flex items-center gap-2 text-slate-400">
                <Zap size={14} />
                <span className="font-mono text-[10px] uppercase tracking-widest">
                  Current Focus
                </span>
              </div>
              <div className="h-full flex flex-col justify-center">
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1 h-1 rounded-full bg-indigo-500 shrink-0" />
                    Designing RAG pipelines with tighter context control
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1 h-1 rounded-full bg-indigo-500 shrink-0" />
                    Backend APIs for GenAI-powered features
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 w-1 h-1 rounded-full bg-indigo-500 shrink-0" />
                    Strengthening DSA & system design fundamentals
                  </li>
                </ul>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* 7. CONNECT */}
          <motion.div
            variants={cardVariants}
            className="col-span-1 md:col-span-1 h-full"
          >
            <SpotlightCard
              gridMouseX={mousePos.x}
              gridMouseY={mousePos.y}
              className="h-full p-4 md:p-5"
            >
              <div className="h-full flex flex-col justify-between">
                <div className="flex flex-col justify-center flex-1 w-full">
                  <a
                    href="/Ayushman_Resume.pdf"
                    target="_blank"
                    className="relative overflow-hidden flex flex-col items-center justify-center gap-1.5 w-full py-3 bg-slate-100 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/50 rounded-lg transition-all group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <FileText
                      size={16}
                      className="text-slate-600 dark:text-slate-300 group-hover:text-indigo-500 transition-colors"
                    />
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 group-hover:text-indigo-500 uppercase tracking-wide">
                      Resume
                    </span>
                  </a>
                </div>

                <div className="flex justify-between px-2 pt-3 mt-1 border-t border-slate-100 dark:border-slate-800/50 w-full">
                  <a
                    href="https://github.com/Ayushman404"
                    className="text-slate-400 hover:text-slate-900 dark:hover:text-white hover:scale-110 transition-all"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ayushman-kumar-116aa7328"
                    className="text-slate-400 hover:text-blue-600 hover:scale-110 transition-all"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href="mailto:ayushmankumar790333@gmail.com"
                    className="text-slate-400 hover:text-red-500 hover:scale-110 transition-all"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
