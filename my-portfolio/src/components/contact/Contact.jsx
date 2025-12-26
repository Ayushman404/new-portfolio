import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  useMotionTemplate,
} from "framer-motion";
import {
  FiArrowUpRight,
  FiArrowRight,
  FiCheck,
  FiLoader,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiMapPin,
  FiBriefcase,
  FiUser,
  FiSmile,
} from "react-icons/fi";

import clsx from "clsx";

/* ================= UTILS ================= */
const SOCIALS = [
  { id: "github", icon: <FiGithub />, label: "GitHub", href: "https://github.com/Ayushman404" },
  { id: "linkedin", icon: <FiLinkedin />, label: "LinkedIn", href: "https://www.linkedin.com/in/ayushman-kumar-116aa7328" },
  // { id: "twitter", icon: <FiTwitter />, label: "Twitter", href: "" },
  {
    id: "email",
    icon: <FiMail />,
    label: "Email",
    href: "mailto:ayushmankumar790333@gmail.com",
  },
];

/* ================= 1. MAGNETIC SOCIAL DOCK ================= */
const MagneticSocial = ({ icon, href }) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(Infinity);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-100, 0, 100], [40, 60, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ width, height: width }}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="relative flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-[var(--color-light-text)] dark:text-white hover:bg-[var(--color-primary)] hover:text-white transition-colors"
    >
      <div className="text-xl">{icon}</div>
    </motion.a>
  );
};

/* ================= 2. 3D "GLASSOLITH" INFO CARD ================= */
const InfoCard = () => {
  const [time, setTime] = useState("");
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 20,
  });

  useEffect(() => {
    const t = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="w-full p-8 rounded-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/50 dark:border-slate-700 shadow-2xl relative overflow-hidden group"
    >
      <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

      <div style={{ transform: "translateZ(20px)" }}>
        <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--color-light-muted)] dark:text-slate-500 mb-6">
          Details
        </h3>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[var(--color-light-bg)] dark:bg-slate-800 flex items-center justify-center text-[var(--color-primary)]">
              <FiMapPin />
            </div>
            <div>
              <p className="text-xs text-[var(--color-light-muted)] dark:text-slate-400 font-medium">
                Based in
              </p>
              <p className="text-lg font-bold text-[var(--color-light-text)] dark:text-white">
                Patna, India
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[var(--color-light-bg)] dark:bg-slate-800 flex items-center justify-center text-[var(--color-primary)]">
              <FiArrowUpRight />
            </div>
            <div>
              <p className="text-xs text-[var(--color-light-muted)] dark:text-slate-400 font-medium">
                Local Time
              </p>
              <p className="text-lg font-bold text-[var(--color-light-text)] dark:text-white tabular-nums">
                {time}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs text-[var(--color-light-muted)] dark:text-slate-400 mb-4 font-medium">
              Social Connections
            </p>
            <div className="flex gap-2 h-16 items-center">
              {SOCIALS.map((s) => (
                <MagneticSocial key={s.id} {...s} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ================= 3. THE FORCEFIELD FORM ================= */
const TOPICS = [
  { id: "project", label: "Project Inquiry", icon: <FiBriefcase /> },
  { id: "hiring", label: "Hiring", icon: <FiUser /> },
  { id: "hi", label: "Just saying hi", icon: <FiSmile /> },
];

const ContactForm = () => {
  const [activeField, setActiveField] = useState(null);
  const [topic, setTopic] = useState("project");
  const [status, setStatus] = useState("idle");
  
  const formRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { left, top } = formRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("sending");

    const formData = new FormData(e.target);

    const res = await fetch("https://formspree.io/f/mbdjjpky", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (res.ok) {
      setStatus("success");
      e.target.reset();
    } else {
      setStatus("idle");
    }
  };


  return (
    <div className="relative group h-full">
      <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary)] to-cyan-400 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-tilt" />
      <div className="absolute -inset-[1px] rounded-[2.5rem] overflow-hidden">
        <div className="absolute inset-[-50%] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#5046e5_50%,#E2E8F0_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#ffffff_50%,#00000000_100%)] animate-[spin_4s_linear_infinite]" />
      </div>

      <motion.div
        ref={formRef}
        onMouseMove={handleMouseMove}
        className="relative w-full h-full p-8 md:p-10 rounded-[2.5rem] bg-white/90 dark:bg-[#020617]/90 backdrop-blur-3xl shadow-2xl overflow-hidden flex flex-col justify-between"
      >
        <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
            background: useMotionTemplate`
                radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(var(--color-primary-rgb), 0.08),
                transparent 80%
                )
            `,
            }}
        />

        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent skew-x-[-25deg] animate-[shimmer_8s_infinite]" />
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-8 h-full">
            <div>
                <h3 className="text-3xl font-black text-[var(--color-light-text)] dark:text-white mb-2 tracking-tight">
                    Initialize Link
                </h3>
                <p className="text-sm font-medium text-[var(--color-light-muted)] dark:text-slate-400">
                    Choose a frequency and transmit your signal.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-light-muted)] dark:text-slate-500 ml-1">
                    Frequency
                </span>
                <div className="relative flex p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                    {TOPICS.map((t) => {
                        const isActive = topic === t.id;
                        return (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => setTopic(t.id)}
                                className={clsx(
                                    "relative flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-xl transition-all duration-300 z-10",
                                    isActive ? "text-white dark:text-slate-900" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="topicPill"
                                        className="absolute inset-0 bg-[var(--color-primary)] dark:bg-white shadow-lg shadow-indigo-500/30 rounded-xl"
                                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                    />
                                )}
                                <span className="relative z-10 text-lg">{t.icon}</span>
                                <span className="relative z-10 hidden sm:inline">{t.label}</span>
                            </button>
                        )
                    })}
                </div>
            </div>

            <input type="hidden" name="topic" value={topic} />
            <input type="text" name="_gotcha" style={{ display: "none" }} />

            <div className="space-y-5 flex-grow">
                <div className="grid md:grid-cols-2 gap-5">
                    <InputGroup 
                        id="name" 
                        label="Name" 
                        placeholder="John Doe" 
                        activeField={activeField} 
                        setActiveField={setActiveField} 
                    />
                    <InputGroup 
                        id="email" 
                        label="Email" 
                        type="email" 
                        placeholder="john@example.com" 
                        activeField={activeField} 
                        setActiveField={setActiveField} 
                    />
                </div>
                <InputGroup 
                    id="message" 
                    label="Message" 
                    textarea 
                    placeholder="Tell me about your project..." 
                    activeField={activeField} 
                    setActiveField={setActiveField} 
                />
            </div>

            <div className="pt-2">
                <button
                    disabled={status !== "idle"}
                    className="group/btn relative w-full h-16 rounded-2xl overflow-hidden transition-all active:scale-[0.98] shadow-lg hover:shadow-[var(--color-primary)]/25"
                >
                    <div className={clsx(
                        "absolute inset-0 transition-colors duration-500",
                        status === "success" 
                            ? "bg-emerald-500" 
                            : "bg-slate-900 dark:bg-white"
                    )} />
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out" />

                    <div className="relative z-10 flex items-center justify-center gap-3 w-full h-full font-bold tracking-widest uppercase text-sm text-white dark:text-slate-900">
                        <AnimatePresence mode="wait">
                            {status === "idle" && (
                                <motion.span 
                                    key="idle" 
                                    initial={{ y: 20, opacity: 0 }} 
                                    animate={{ y: 0, opacity: 1 }} 
                                    exit={{ y: -20, opacity: 0 }}
                                    className="flex items-center gap-2"
                                >
                                    Send Transmission <FiArrowRight className="text-lg group-hover/btn:translate-x-1 transition-transform" />
                                </motion.span>
                            )}
                            {status === "sending" && (
                                <motion.span 
                                    key="sending" 
                                    initial={{ y: 20, opacity: 0 }} 
                                    animate={{ y: 0, opacity: 1 }} 
                                    exit={{ y: -20, opacity: 0 }}
                                    className="flex items-center gap-2"
                                >
                                    <FiLoader className="animate-spin text-lg" /> Processing...
                                </motion.span>
                            )}
                            {status === "success" && (
                                <motion.span 
                                    key="success" 
                                    initial={{ scale: 0.5, opacity: 0 }} 
                                    animate={{ scale: 1, opacity: 1 }} 
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    className="flex items-center gap-2 text-white"
                                >
                                    <FiCheck className="text-xl" /> Received
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </button>
            </div>
        </form>
      </motion.div>
      
      <style jsx>{`
        @keyframes shimmer {
            0% { transform: translateX(-150%) skewX(-25deg); }
            100% { transform: translateX(150%) skewX(-25deg); }
        }
      `}</style>
    </div>
  );
};

const InputGroup = ({ id, label, type = "text", textarea, placeholder, activeField, setActiveField }) => {
    const isActive = activeField === id;
    const isInactive = activeField && activeField !== id;

    return (
        <div 
            className={clsx(
                "relative group transition-all duration-500",
                isInactive ? "opacity-40 blur-[1px] scale-[0.99]" : "opacity-100 scale-100"
            )}
        >
            <label 
                htmlFor={id} 
                className={clsx(
                    "block text-xs font-bold uppercase tracking-widest mb-2 transition-colors duration-300",
                    isActive ? "text-[var(--color-primary)]" : "text-[var(--color-light-muted)] dark:text-slate-500"
                )}
            >
                {label}
            </label>
            
            <div className="relative">
                {textarea ? (
                    <textarea
                        id={id}
                        name={id}
                        rows={4}
                        placeholder={placeholder}
                        onFocus={() => setActiveField(id)}
                        onBlur={() => setActiveField(null)}
                        required
                        className={clsx(
                            "w-full bg-slate-50 dark:bg-slate-900/50 rounded-2xl px-5 py-4 text-[var(--color-light-text)] dark:text-white placeholder:text-slate-400 outline-none transition-all duration-300 border resize-none",
                            isActive 
                                ? "border-[var(--color-primary)] shadow-[0_0_20px_rgba(79,70,229,0.15)]" 
                                : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                        )}
                    />
                ) : (
                    <input
                        id={id}
                        name={id}
                        type={type}
                        placeholder={placeholder}
                        onFocus={() => setActiveField(id)}
                        onBlur={() => setActiveField(null)}
                        required
                        className={clsx(
                            "w-full bg-slate-50 dark:bg-slate-900/50 rounded-2xl px-5 py-4 text-[var(--color-light-text)] dark:text-white placeholder:text-slate-400 outline-none transition-all duration-300 border",
                            isActive 
                                ? "border-[var(--color-primary)] shadow-[0_0_20px_rgba(79,70,229,0.15)]" 
                                : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                        )}
                    />
                )}
            </div>
        </div>
    )
}

/* ================= 4. INTERACTIVE GRAVITY GRID ================= */
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
      <div className="relative w-full h-full max-w-4xl max-h-4xl grid grid-cols-12 grid-rows-12 gap-10 p-20">
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

/* ================= MAIN COMPONENT ================= */
const Contact = () => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  return (
    <section
      id="contact"
      onMouseMove={(e) => {
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
      className="relative min-h-screen w-full px-6 py-20 lg:py-0 flex items-center justify-center overflow-hidden 
                 bg-[var(--color-light-bg)] dark:bg-[var(--color-dark-bg)] 
                 transition-colors duration-500 ease-in-out font-sans"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <GravityGrid mouseX={mx} mouseY={my} />
      </div>

      <div className="relative w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:gap-x-24 gap-y-12 lg:gap-y-12 items-start z-10">
        
        {/* 1. HEADER (Order 1 on Mobile, Col 1-5 Row 1 on Desktop) */}
        <div className="lg:col-span-5 order-1 lg:order-1">
          <h2 className="text-6xl md:text-8xl font-black text-[var(--color-light-text)] dark:text-white tracking-tighter mb-8">
            Let's talk <br />
            <span className="text-[var(--color-primary)]">code.</span>
          </h2>
          <p className="text-xl text-[var(--color-light-muted)] dark:text-slate-400 leading-relaxed font-medium">
            I'm currently available for freelance projects and open to
            full-time opportunities.
          </p>
        </div>

        {/* 2. FORM (Order 2 on Mobile, Col 7-12 Row 1+2 on Desktop) */}
        <div className="lg:col-span-7 order-2 lg:order-2 lg:row-span-2">
          <ContactForm />
        </div>

        {/* 3. INFO CARD (Order 3 on Mobile, Col 1-5 Row 2 on Desktop) */}
        <div className="lg:col-span-5 order-3 lg:order-3">
          <InfoCard />
        </div>

      </div>
    </section>
  );
};

export default Contact;