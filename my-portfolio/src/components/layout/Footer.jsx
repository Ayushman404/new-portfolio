import React, { useState, useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { 
  FiArrowUp, FiGithub, FiTwitter, FiLinkedin, FiMail, FiArrowUpRight 
} from "react-icons/fi";
import clsx from "clsx";

/* ================= UTILS ================= */
const LINKS = [
  { 
    title: "Sitemap", 
    items: [
        { label: "Home", href: "#" },
        { label: "About", href: "#about" },
        { label: "Skills", href: "#skills" },
        { label: "Projects", href: "#projects" },
        { label: "Contact", href: "#contact" }
    ] 
  },
  { 
    title: "Connect", 
    items: [
        { label: "LinkedIn", href: "https://www.linkedin.com/in/ayushman-kumar-116aa7328" },
        { label: "GitHub", href: "https://github.com/Ayushman404" },
        { label: "Email", href: "mailto:ayushmankumar790333@gmail.com" }
    ] 
  },
];

/* ================= MAGNETIC BUTTON ================= */
const MagneticButton = () => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.35);
    y.set((clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      ref={ref}
      onClick={scrollToTop}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="group relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full 
                 bg-slate-900 dark:bg-white 
                 text-white dark:text-slate-900 
                 shadow-xl hover:scale-110 transition-transform duration-500 z-20"
    >
      <FiArrowUp className="text-3xl group-hover:-translate-y-1 transition-transform duration-300" />
    </motion.button>
  );
};

/* ================= LIVE CLOCK (Real Utility) ================= */
const LocalTime = () => {
    const [time, setTime] = useState("");
    useEffect(() => {
        const t = setInterval(() => {
            setTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZoneName: "short" }));
        }, 1000);
        return () => clearInterval(t);
    }, []);
    return <span className="tabular-nums font-medium">{time}</span>;
};

/* ================= FOOTER COMPONENT ================= */
const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden bg-[var(--color-light-bg)] dark:bg-[var(--color-dark-bg)] pt-24 pb-8 px-6 transition-colors duration-500 font-sans border-t border-slate-900/15 dark:border-white/20">
      
      {/* 1. Subtle Texture (No sci-fi grid) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="relative max-w-7xl mx-auto z-10 flex flex-col h-full">
        
        {/* === TOP ROW: CALL TO ACTION === */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
            <div className="max-w-2xl">
                <h2 className="text-6xl md:text-8xl font-black text-[var(--color-light-text)] dark:text-white tracking-tighter mb-6 leading-[0.9]">
                    Have an idea?
                </h2>
                <a 
                    href="#contact" 
                    className="group inline-flex items-center gap-3 text-2xl md:text-3xl font-medium text-[var(--color-light-muted)] dark:text-slate-400 hover:text-[var(--color-primary)] transition-colors"
                >
                    <span className="border-b-2 border-current pb-1">Let's build it together</span>
                    <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </a>
            </div>
            
            {/* Magnetic Interaction */}
            <div className="hidden md:block">
                <MagneticButton />
            </div>
        </div>

        {/* === MIDDLE ROW: GRID LINKS === */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 pb-20 border-b border-slate-900/10 dark:border-white/10">
            
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-4 flex flex-col justify-between h-full">
                <div>
                    <div className="font-bold text-xl text-[var(--color-light-text)] dark:text-white mb-4">
                        Portfolio<span className="text-[var(--color-primary)]">.</span>
                    </div>
                    <p className="text-sm text-[var(--color-light-muted)] dark:text-slate-400 max-w-xs leading-relaxed">
                        Full-stack engineering with a focus on scalable systems and intuitive interfaces.
                    </p>
                </div>
            </div>

            {/* Links Columns */}
            {LINKS.map((section, idx) => (
                <div key={idx} className="col-span-1 md:col-span-2">
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-light-muted)] dark:text-slate-500 mb-6 opacity-80">
                        {section.title}
                    </h4>
                    <ul className="space-y-4">
                        {section.items.map((item) => (
                            <li key={item.label}>
                                <a 
                                    href={item.href} 
                                    className="group flex items-center gap-2 text-sm font-semibold text-[var(--color-light-text)] dark:text-slate-300 hover:text-[var(--color-primary)] transition-colors"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            {/* Time / Location Column */}
            <div className="col-span-2 md:col-span-4 flex flex-col md:items-end justify-start">
                 <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-light-muted)] dark:text-slate-500 mb-6 opacity-80">
                    Local Time
                </h4>
                <div className="text-3xl md:text-4xl font-light text-[var(--color-light-text)] dark:text-white tracking-tight">
                    <LocalTime />
                </div>
            </div>
        </div>

        {/* === BOTTOM ROW: METADATA === */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 text-xs font-medium text-[var(--color-light-muted)] dark:text-slate-500 uppercase tracking-wide">
            
            <div className="flex items-center gap-1">
                <span>© 2025 Ayushman Kumar.</span>
                <span className="hidden md:inline text-slate-300 dark:text-slate-700 mx-2">|</span>
                <span className="hidden md:inline">All Rights Reserved.</span>
            </div>

            <div className="flex items-center gap-6">
                {/* <a href="#" className="hover:text-[var(--color-light-text)] dark:hover:text-white transition-colors">Privacy</a> */}
                <a href="/Ayushman_Resume.pdf" target="_blank" className="hover:text-[var(--color-light-text)] dark:hover:text-white transition-colors">Resume</a>
                
            </div>
        </div>
      </div>

      {/* === GIANT WATERMARK (The Aesthetic Anchor) === */}
      {/* Kept this because it fills the space elegantly without being "cringe" */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
        <h1 
            className="text-[15vw] font-black leading-none text-center select-none translate-y-[35%]"
            style={{ 
                color: 'var(--color-light-text)', 
                opacity: 0.03 // Very subtle in light mode
            }}
        >
            DEVELOPER
        </h1>
      </div>

    </footer>
  );
};

export default Footer;