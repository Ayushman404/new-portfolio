import React, { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Terminal, Cpu } from "lucide-react";
import useMouse from "@react-hook/mouse-position";
import HackerText from "../ui/HackerText";
import NeuralBackground from "../ui/NeuralBackground";

/* ================= CUSTOM SPOTLIGHT ================= */
const Spotlight = ({ mouseX, mouseY }) => {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
      style={{
        background: useMotionTemplate`
          radial-gradient(
            600px circle at ${mouseX}px ${mouseY}px,
            rgba(124, 58, 237, 0.15),
            transparent 80%
          )
        `,
      }}
    />
  );
};

/* ================= OUTLINE PARALLAX ================= */
const BackgroundParallax = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <motion.div
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
    >
      <h1
        className="text-[18vw] font-black leading-none select-none whitespace-nowrap"
        style={{
          WebkitTextStroke: "3px var(--color-light-muted)",
          color: "transparent",
          opacity: 0.08,
        }}
      >
        AYUSHMAN
      </h1>
    </motion.div>
  );
};

/* ================= MAGNETIC BUTTON ================= */
const MagneticButton = ({ children, href }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.3);
    y.set((clientY - (top + height / 2)) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative inline-flex items-center justify-center px-8 py-4 font-bold text-sm tracking-widest uppercase rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 overflow-hidden group shadow-xl hover:shadow-violet-500/20 transition-all"
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-emerald-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.a>
  );
};

/* ================= SOCIAL SIDEBAR ================= */
const SocialSidebar = () => {
  const socials = [
    { icon: <Github size={20} />, href: "https://github.com/Ayushman404", label: "Github" },
    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/ayushman-kumar-116aa7328", label: "LinkedIn" },
    {
      icon: <Mail size={20} />,
      href: "mailto:ayushmankumar790333@gmail.com",
      label: "Email",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="hidden lg:flex absolute left-6 lg:left-8 bottom-0 top-0 flex-col justify-center z-40"
    >
      <div className="flex flex-col gap-6 p-4 rounded-2xl bg-white/30 dark:bg-slate-900/30 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
        {socials.map((social, i) => (
          <a
            key={i}
            href={social.href}
            aria-label={social.label}
            className="relative group p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-white transition-colors"
          >
            <span className="absolute inset-0 rounded-xl bg-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">{social.icon}</span>
            <span className="absolute left-full ml-4 px-2 py-1 rounded bg-slate-800 text-white text-xs font-bold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
              {social.label}
            </span>
          </a>
        ))}
      </div>
    </motion.div>
  );
};

/* ================= HERO ================= */
const Hero = () => {
  const ref = useRef(null);
  const mouse = useMouse(ref);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = {
    damping: 25,
    stiffness: 150,
    mass: 0.5,
  };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (mouse.x !== null) mouseX.set(mouse.x);
    if (mouse.y !== null) mouseY.set(mouse.y);
  }, [mouse.x, mouse.y, mouseX, mouseY]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-light-bg dark:bg-dark-bg transition-colors duration-500 flex flex-col justify-center items-center pt-24 pb-16"
    >
      {/* GRID */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15] dark:opacity-[0.1]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--color-light-muted) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <Spotlight mouseX={smoothX} mouseY={smoothY} />
      <BackgroundParallax />

      <div className="absolute inset-0 z-20 opacity-50 dark:opacity-70 mix-blend-multiply dark:mix-blend-screen pointer-events-none">
        <NeuralBackground />
      </div>

      <SocialSidebar />

      <div className="relative z-30 flex flex-col items-center text-center px-4 max-w-6xl mx-auto w-full">
        {/* BADGE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
            </span>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Undergraduate • AI & Data Science @{" "}
              <span className="font-bold text-slate-900 dark:text-white">
                IIT Patna
              </span>
            </span>
          </div>
        </motion.div>

        {/* NAME */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9] mb-4 select-none"
        >
          AYUSHMAN <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-emerald-500">
            KUMAR
          </span>
        </motion.h1>

        {/* ROLE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-2 text-lg md:text-2xl font-mono text-slate-600 dark:text-slate-400 mb-5"
        >
          <Cpu className="w-5 h-5 text-violet-500" />

          <span>Building</span>

          <div className="font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
            <HackerText text="GENAI SYSTEMS" />
          </div>

          <span>&</span>

          <div className="font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
            <HackerText text="FULL-STACK PRODUCTS" />
          </div>
        </motion.div>

        {/* BIO */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-base md:text-lg text-slate-700 dark:text-slate-400 mb-7"
        >
          Full-stack engineer exploring scalable systems and applied Generative
          AI.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-5"
        >
          <MagneticButton href="#projects">View Projects</MagneticButton>

          <a
            href="#contact"
            className="group flex items-center gap-2 px-8 py-4 rounded-full border bg-slate-200 dark:bg-slate-600 border-slate-500  text-black dark:text-white dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all font-bold text-sm tracking-widest uppercase"
          >
            <Terminal className="w-4 h-4 group-hover:text-violet-500 transition-colors" />
            Let’s Talk
          </a>
        </motion.div>
      </div>

      {/* SCROLL */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-slate-400"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
