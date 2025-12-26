import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import {
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiTailwindcss,
  SiPytorch,
  SiTensorflow,
  SiLangchain,
  SiHuggingface,
  SiRust,
} from "react-icons/si";
import { FiActivity, FiCpu, FiLayers, FiRadio, FiCode } from "react-icons/fi";
import clsx from "clsx";

import { FiTerminal, FiTarget } from "react-icons/fi";

/* ================= DATA ================= */
const overallIds = [
  "cpp",
  "python",
  "js",
  "react",
  "node",
  "postgres",
  "pytorch",
  "rag",
  "hf",
  "docker",
  "git",
];

const allSkills = [
  // ===== OVERALL / CORE =====
  {
    id: "cpp",
    name: "C++",
    icon: <SiCplusplus />,
    category: "core",
    color: "#00599C",
  },
  {
    id: "python",
    name: "Python",
    icon: <SiPython />,
    category: "core",
    color: "#3776AB",
  },

  // ===== DEV STACK =====
  {
    id: "js",
    name: "JavaScript",
    icon: <SiJavascript />,
    category: "web",
    color: "#F7DF1E",
  },
  {
    id: "react",
    name: "React",
    icon: <SiReact />,
    category: "web",
    color: "#61DAFB",
  },
  {
    id: "next",
    name: "Next.js",
    icon: <SiNextdotjs />,
    category: "web",
    color: "#000000",
  },
  {
    id: "node",
    name: "Node.js",
    icon: <SiNodedotjs />,
    category: "web",
    color: "#339933",
  },
  {
    id: "express",
    name: "Express",
    icon: <SiExpress />,
    category: "web",
    color: "#000000",
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    icon: <SiPostgresql />,
    category: "web",
    color: "#4169E1",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    icon: <SiTailwindcss />,
    category: "web",
    color: "#06B6D4",
  },

  // ===== AI / GENAI =====
  {
    id: "pytorch",
    name: "PyTorch",
    icon: <SiPytorch />,
    category: "ai",
    color: "#EE4C2C",
  },
  {
    id: "rag",
    name: "LangChain (RAG)",
    icon: <SiLangchain />,
    category: "ai",
    color: "#1C3C3C",
  },
  {
    id: "hf",
    name: "Hugging Face",
    icon: <SiHuggingface />,
    category: "ai",
    color: "#FFD21E",
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    icon: <SiTensorflow />,
    category: "ai",
    color: "#FF6F00",
  },

  // ===== TOOLS (SHARED) =====
  {
    id: "docker",
    name: "Docker",
    icon: <SiDocker />,
    category: "core",
    color: "#2496ED",
  },
  {
    id: "git",
    name: "Git",
    icon: <SiGit />,
    category: "core",
    color: "#F05032",
  },
];


/* ================= 3D CARD (With Entrance Animation) ================= */
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
};

const SentientCard = ({ name, icon, color, globalMouseX, globalMouseY }) => {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 150, damping: 20 });
  const sy = useSpring(ry, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const unsubscribeX = globalMouseX.on("change", (x) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      ry.set((x - (r.left + r.width / 2)) / 40);
    });
    const unsubscribeY = globalMouseY.on("change", (y) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      rx.set(-(y - (r.top + r.height / 2)) / 40);
    });
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      layout
      variants={cardVariants} // Micro-animation: Staggered entrance
      initial="hidden"
      animate="visible"
      exit="exit"
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
      whileHover={{ scale: 1.05, zIndex: 100, cursor: "grab" }}
      whileDrag={{ cursor: "grabbing", scale: 1.1, zIndex: 100 }}
      style={{ rotateX: sx, rotateY: sy, transformStyle: "preserve-3d" }}
      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl
        bg-[var(--color-light-card)] dark:bg-[var(--color-dark-card)]
        border border-[var(--color-light-border)] dark:border-slate-700
        shadow-lg flex flex-col items-center justify-center gap-2 relative 
        transition-colors duration-300 group touch-none"
    >
      <div
        className="text-3xl sm:text-4xl z-10 transition-colors duration-300 pointer-events-none"
        style={{
          color: color === "#000000" ? "currentColor" : color,
          transform: "translateZ(30px)",
        }}
      >
        <span
          className="dark:text-white text-slate-800 transition-colors duration-300"
          style={color !== "#000000" ? { color } : {}}
        >
          {icon}
        </span>
      </div>
      <span
        style={{ transform: "translateZ(20px)" }}
        className="text-[10px] font-bold font-mono uppercase tracking-wider text-[var(--color-light-muted)] dark:text-slate-400 z-10 transition-colors duration-300 pointer-events-none"
      >
        {name}
      </span>
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl mix-blend-overlay" />
    </motion.div>
  );
};

/* ================= UPGRADED FOCUS WIDGET ================= */
const FocusWidget = () => {
  const [logs, setLogs] = useState([
    "Designing retrieval pipeline...",
    "Evaluating chunking strategy...",
    "Testing prompt chains...",
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLogs = [
        "Integrating LangChain tools...",
        "Refining RAG context selection...",
        "Profiling response latency...",
        "Improving prompt consistency...",
        "Experimenting with retrievers...",
        "Cleaning embedding workflows...",
      ];
      const randomLog = newLogs[Math.floor(Math.random() * newLogs.length)];
      setLogs((prev) => [randomLog, ...prev].slice(0, 3));
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="group relative w-full bg-[var(--color-light-card)]/90 dark:bg-[var(--color-dark-card)]/80 backdrop-blur-xl border border-[var(--color-light-border)] dark:border-slate-700 rounded-2xl p-6 overflow-hidden hover:shadow-2xl hover:border-[var(--color-primary)]/40 transition-all duration-500">
      
      {/* Subtle scanline background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.15) 50%)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col">
          <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-[var(--color-light-muted)] dark:text-slate-500 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Current Focus
          </h3>
          <span className="text-[10px] font-mono text-[var(--color-primary)] mt-1 opacity-80">
            In Progress
          </span>
        </div>
        <FiCpu className="text-xl text-[var(--color-light-text)] dark:text-slate-400 opacity-40" />
      </div>

      {/* Focus Areas */}
      <div className="space-y-5 relative z-10">
        {[
          {
            label: "RAG Systems (LangChain)",
            progress: 75,
            color: "bg-[var(--color-primary)]",
          },
          {
            label: "PyTorch Fundamentals",
            progress: 60,
            color: "bg-emerald-500",
          },
        ].map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-sm font-bold text-[var(--color-light-text)] dark:text-white mb-2">
              <span className="flex items-center gap-2">
                <FiTerminal className="w-3 h-3 opacity-50" />
                {item.label}
              </span>
              <span className="font-mono text-xs opacity-70">
                {item.progress}%
              </span>
            </div>

            <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-sm overflow-hidden flex gap-[2px]">
              {Array.from({ length: 20 }).map((_, idx) => {
                const active = (idx / 20) * 100 < item.progress;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: active ? 1 : 0.15 }}
                    transition={{ delay: idx * 0.015, duration: 0.4 }}
                    className={`flex-1 ${
                      active ? item.color : "bg-slate-400 dark:bg-slate-600"
                    } rounded-[1px]`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Activity Log */}
      <div className="mt-6 pt-4 border-t border-[var(--color-light-border)] dark:border-slate-700/50">
        <div className="font-mono text-[10px] text-[var(--color-light-muted)] dark:text-slate-400 space-y-1 h-12 overflow-hidden relative">
          <div className="absolute top-0 left-0 bottom-0 w-[2px] bg-[var(--color-primary)] opacity-60" />
          <div className="pl-3">
            <AnimatePresence mode="popLayout">
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1 - i * 0.3, x: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="truncate"
                >
                  <span className="text-emerald-500 mr-2">➜</span>
                  {log}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};


/* ================= UPGRADED RADAR WIDGET ================= */
const ExploringWidget = () => {
  return (
    <div className="relative w-full bg-[var(--color-light-card)]/90 dark:bg-[var(--color-dark-card)]/80 backdrop-blur-xl border border-[var(--color-light-border)] dark:border-slate-700 rounded-2xl p-6 overflow-hidden hover:shadow-2xl hover:border-[var(--color-primary)]/40 transition-all duration-500">
      {/* 1. Sonar Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, transparent 30%, var(--color-light-border) 30%, var(--color-light-border) 31%, transparent 31%, transparent 50%, var(--color-light-border) 50%, var(--color-light-border) 51%, transparent 51%, transparent 70%, var(--color-light-border) 70%, var(--color-light-border) 71%, transparent 71%)`,
            backgroundSize: "100% 100%",
          }}
        />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[var(--color-light-border)]" />
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-[var(--color-light-border)]" />
      </div>

      {/* 2. Rotating Radar Sweep */}
      <div className="absolute inset-[-50%] pointer-events-none opacity-10 dark:opacity-5">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_260deg,var(--color-primary)_360deg)] rounded-full"
        />
      </div>

      {/* 3. Header */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-[var(--color-light-muted)] dark:text-slate-500 mb-1 flex items-center gap-2">
            <FiTarget className="text-[var(--color-primary)]" />
            Areas of Exploration
          </h3>
          <span className="text-[10px] text-[var(--color-light-muted)] opacity-60">
            Focus Horizon
          </span>
        </div>

        {/* Subtle Activity Indicator */}
        <div className="flex items-end gap-[2px] h-4">
          {[1, 2, 3].map((bar) => (
            <motion.div
              key={bar}
              animate={{ height: [6, 14, 8] }}
              transition={{
                duration: 0.6 + bar * 0.15,
                repeat: Infinity,
                repeatType: "mirror",
              }}
              className="w-1 bg-[var(--color-primary)] rounded-sm opacity-50"
            />
          ))}
        </div>
      </div>

      {/* 4. Exploration Items */}
      <div className="flex flex-col gap-3 relative z-10">
        {[
          {
            name: "System Design & Scalability",
            stage: "Foundational → Intermediate",
          },
          {
            name: "Agentic LLM Systems",
            stage: "Active Exploration",
          },
          {
            name: "Backend Architecture & APIs",
            stage: "Strengthening",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ x: 4 }}
            className="group flex items-center justify-between p-2 rounded-lg border border-transparent hover:border-[var(--color-light-border)] dark:hover:border-slate-700 transition-all cursor-default"
          >
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-light-muted)] group-hover:bg-[var(--color-primary)] transition-colors" />
              <span className="text-xs font-bold text-[var(--color-light-text)] dark:text-slate-200 group-hover:text-[var(--color-primary)]">
                {item.name}
              </span>
            </div>
            <span className="font-mono text-[9px] text-[var(--color-light-muted)] opacity-0 group-hover:opacity-60 transition-opacity">
              {item.stage}
            </span>
          </motion.div>
        ))}
      </div>

      {/* 5. Decorative Corners */}
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[var(--color-light-muted)] opacity-30" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[var(--color-light-muted)] opacity-30" />
    </div>
  );
};

/* ================= BACKGROUND GRID & DOTS ================= */
// const TechnicalGrid = () => (
//     <div
//         className="absolute inset-0 pointer-events-none"
//         style={{
//             // Increased dot size (2px) and density (32px)
//             backgroundImage: `
//                 radial-gradient(circle at 1px 1px, var(--color-light-muted) 2px, transparent 0)
//             `,
//             backgroundSize: '32px 32px',
//             opacity: 0.25 // Increased opacity for better visibility in light mode
//         }}
//     />
// );

const GravityGrid = ({ mouseX, mouseY }) => {
  const rows = 15;
  const cols = 15;
  const points = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      points.push({ x: j, y: i });
    }
  }

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
      <div className="relative w-full h-full max-w-screen max-h-screen grid grid-cols-12 grid-rows-12 gap-10 p-20">
        {points.map((p, i) => (
          <GridPoint key={i} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </div>
    </div>
  );
};

const GridPoint = ({ mouseX, mouseY }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const unsubscribeX = mouseX.on("change", (mx) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = rect.left + rect.width / 2;
      const py = rect.top + rect.height / 2;
      const dist = Math.sqrt(
        Math.pow(mx - px, 2) + Math.pow(mouseY.get() - py, 2)
      );

      if (dist < 300) {
        const force = (300 - dist) / 10;
        const angle = Math.atan2(mouseY.get() - py, mx - px);
        x.set(-Math.cos(angle) * force);
        y.set(-Math.sin(angle) * force);
      } else {
        x.set(0);
        y.set(0);
      }
    });
    return () => unsubscribeX();
  }, []);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      className="w-1 h-1 bg-[var(--color-light-muted)] dark:bg-slate-500 rounded-full"
    />
  );
};

/* ================= MAIN ================= */
const Skills = () => {
  const [tab, setTab] = useState("overall");
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const skills =
    tab === "dev"
      ? allSkills.filter((s) => ["core", "web", "tools"].includes(s.category))
      : tab === "ai"
      ? allSkills.filter((s) => ["core", "ai"].includes(s.category))
      : allSkills.filter((s) => overallIds.includes(s.id));

  return (
    <section
      id="skills"
      onMouseMove={(e) => {
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
      className="relative min-h-screen w-full px-4 py-20 overflow-hidden 
                 bg-[var(--color-light-bg)] dark:bg-[var(--color-dark-bg)] 
                 transition-colors duration-500 ease-in-out font-sans flex items-center justify-center"
    >
      {/* ===== BACKGROUND LAYERS ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 1. TECHNICAL DOTS GRID (Bigger, Denser) */}
        <GravityGrid mouseX={mx} mouseY={my} />

        {/* 2. ALIVE BLOBS */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full 
                bg-white dark:bg-[#1e293b] opacity-60 dark:opacity-10 blur-[120px]
                animate-[spin_40s_linear_infinite] transition-colors duration-500"
          />
          <div
            className="absolute -bottom-[20%] -right-[20%] w-[60vw] h-[60vw] rounded-full 
                bg-[var(--color-primary)] opacity-10 dark:opacity-10 blur-[140px]
                animate-[spin_40s_linear_infinite_reverse] transition-colors duration-500"
          />
        </div>

        {/* 3. MASSIVE WATERMARK (Moved up slightly) */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0">
          <h1
            className="text-[10rem] md:text-[18rem] font-black select-none whitespace-nowrap transition-colors duration-300"
            style={{
              WebkitTextStroke: "1px var(--color-light-muted)",
              color: "transparent",
              opacity: 0.08,
            }}
          >
            EXPERTISE
          </h1>
        </div>

        {/* 4. SUBTLE MOUSE GLOW */}
        <motion.div
          className="absolute inset-0 opacity-100 mix-blend-overlay dark:mix-blend-soft-light"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                400px circle at ${mx}px ${my}px,
                rgba(255,255,255,0.4),
                transparent 80%
              )
            `,
          }}
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20">
        {/* LEFT: Cards */}
        <div className="lg:col-span-8 z-10 pl-2 md:pl-4">
          {/* Header Moved Up */}
          <div className="mb-8">
            <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-emerald-400 mb-4 tracking-tighter transition-colors duration-300">
              Tech Stack
            </h2>
            <p className="text-xl font-medium text-[var(--color-light-muted)] dark:text-slate-400 max-w-xl leading-relaxed transition-colors duration-300">
              A comprehensive breakdown of the technologies used to build
              performant, scalable applications.
            </p>
          </div>

          {/* Tabs */}
          <div className="relative inline-flex flex-wrap items-center gap-2 mb-8">
            {[
              { id: "overall", label: "Overview", icon: <FiLayers /> },
              { id: "dev", label: "Development", icon: <FiCode /> },
              { id: "ai", label: "AI / Intelligence", icon: <FiCpu /> },
            ].map((tabItem) => {
              const isActive = tab === tabItem.id;
              return (
                <button
                  key={tabItem.id}
                  onClick={() => setTab(tabItem.id)}
                  className={clsx(
                    "relative px-4 py-2 text-sm font-bold font-mono rounded-xl flex items-center gap-2 transition-all duration-300 uppercase tracking-wide",
                    isActive
                      ? "text-white scale-105"
                      : "text-[var(--color-light-muted)] dark:text-slate-400 hover:text-[var(--color-primary)] hover:scale-105"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[var(--color-primary)] rounded-xl shadow-lg shadow-indigo-500/20"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span className="relative z-10">{tabItem.icon}</span>
                  <span className="relative z-10">{tabItem.label}</span>
                </button>
              );
            })}
          </div>

          {/* Cards Grid with Staggered Entrance */}
          <motion.div
            className="flex flex-wrap gap-4 sm:gap-6 min-h-[300px] content-start"
            style={{ perspective: "1000px" }}
          >
            <AnimatePresence mode="popLayout">
              {skills.map((skill) => (
                <SentientCard
                  key={skill.id}
                  {...skill}
                  globalMouseX={mx}
                  globalMouseY={my}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* RIGHT: Widgets (Aligned nicely with the grid) */}
        <div className="lg:col-span-4 lg:pt-24 space-y-6 z-10">
          <FocusWidget />
          <ExploringWidget />
        </div>
      </div>
    </section>
  );
};

export default Skills;
