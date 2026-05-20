import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
  Moon,
  Sun,
  Terminal,
  Home,
  User,
  Cpu,
  Code2,
  Mail,
} from "lucide-react";
import clsx from "clsx";
import useTheme from "../../hooks/useTheme";

const navLinks = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Cpu },
  { name: "Projects", href: "#projects", icon: Code2 },
  { name: "Contact", href: "#contact", icon: Mail },
];

/* ================= MAGNETIC ITEM ================= */
const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.25);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.25);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: sx, y: sy }}
      className="relative"
    >
      {children}
    </motion.div>
  );
};

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 30);
      let current = "Home";
      navLinks.forEach((l) => {
        const s = document.querySelector(l.href);
        if (!s) return;
        const r = s.getBoundingClientRect();
        if (r.top <= window.innerHeight * 0.4 && r.bottom >= window.innerHeight * 0.4) {
          current = l.name;
        }
      });
      setActiveTab(current);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <div className="hidden md:flex fixed top-6 inset-x-0 z-50 justify-center px-4 pointer-events-none">
        <motion.nav
          animate={{
            backdropFilter: isScrolled ? "blur(20px)" : "blur(12px)",
            boxShadow: isScrolled
              ? "0 20px 50px rgba(0,0,0,0.25)"
              : "0 10px 25px rgba(0,0,0,0.15)",
            scale: isScrolled ? 0.98 : 1,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={clsx(
            "pointer-events-auto flex items-center gap-2 p-1.5 rounded-full border",
            "bg-white/80 dark:bg-slate-900/80",
            "border-slate-200 dark:border-slate-800"
          )}
        >
          {/* LOGO */}
          <Magnetic>
            <motion.a
              href="#home"
              onClick={(e) => handleClick(e, "#home")}
              whileHover={{ scale: 1.05 }}
              className="pl-4 pr-3 flex items-center gap-2 font-mono text-sm text-slate-900 dark:text-white"
            >
              <Terminal size={16} className="text-indigo-500" />
              DEV.
            </motion.a>
          </Magnetic>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1" />

          {/* LINKS */}
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Magnetic>
                  <motion.a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={clsx(
                      "relative px-4 py-2 text-sm rounded-full font-medium",
                      activeTab === link.name
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-slate-600 dark:text-slate-400"
                    )}
                    whileHover={{ scale: 1.08 }}
                  >
                    {activeTab === link.name && (
                      <>
                        <motion.span
                          layoutId="activeTab"
                          className="absolute inset-0 rounded-full bg-indigo-100 dark:bg-indigo-900/30"
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          style={{ zIndex: -1 }}
                        />
                        <motion.span
                          className="absolute -bottom-1 left-1/2 h-[2px] w-4 bg-indigo-500 rounded-full"
                          initial={{ scaleX: 0, x: "-50%" }}
                          animate={{ scaleX: 1 }}
                        />
                      </>
                    )}
                    {link.name}
                  </motion.a>
                </Magnetic>
              </li>
            ))}
          </ul>

          {/* <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-2" /> */}

          {/* THEME
          <Magnetic>
            <motion.button
              onClick={toggleTheme}
              whileHover={{ rotate: 20, scale: 1.1 }}
              className="p-2 rounded-full text-slate-600 dark:text-slate-400"
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div
                    key="moon"
                    initial={{ scale: 0.5, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0.5, rotate: 30 }}
                  >
                    <Moon size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ scale: 0.5, rotate: 30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0.5, rotate: -30 }}
                  >
                    <Sun size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </Magnetic> */}
        </motion.nav>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav
          animate={{
            backdropFilter: isScrolled ? "blur(18px)" : "blur(10px)",
            boxShadow: isScrolled
              ? "0 15px 35px rgba(0,0,0,0.3)"
              : "0 8px 20px rgba(0,0,0,0.2)",
          }}
          className="pointer-events-auto flex items-center justify-between gap-2 px-3 py-2 rounded-full border bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 w-full max-w-sm"
        >
          <Terminal size={18} className="text-indigo-500" />

          <ul className="flex flex-1 justify-evenly">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                whileTap={{ scale: 0.85 }}
                className={clsx(
                  "relative p-2 rounded-full",
                  activeTab === link.name
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-400"
                )}
              >
                {activeTab === link.name && (
                  <motion.span
                    layoutId="activeMobile"
                    className="absolute inset-0 rounded-full bg-indigo-100 dark:bg-indigo-900/30"
                    transition={{ type: "spring", stiffness: 250, damping: 18 }}
                  />
                )}
                <link.icon size={20} />
              </motion.a>
            ))}
          </ul>

          {/* <motion.button onClick={toggleTheme} whileTap={{ scale: 0.9 }}>
            {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
          </motion.button> */}
        </motion.nav>
      </div>
    </>
  );
};

export default Navbar;
