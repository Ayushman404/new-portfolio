import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { Github, ExternalLink, X, ArrowRight, MousePointer2, Layers, AlertTriangle, Hash, Calendar } from 'lucide-react';
import HackerText from '../ui/HackerText';

// --- DATA ---
const PROJECTS = [
  {
    id: 1,
    title: "SecureVote",
    category: "Systems & Security",
    year: "2025",
    image: "/dashboardProject/secureVoteHome.png",
    description:
      "A secure e-voting platform implementing Linkable Ring Signatures to guarantee voter anonymity and verifiable election integrity.",
    stack: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Linkable Ring Signatures",
      "JWT",
      "Google OAuth",
    ],
    challenges:
      "Designing cryptographic vote validation while preserving anonymity across the entire system.",
    features: [
      "Anonymous yet linkable voting using LRS",
      "Admin-controlled election creation and management",
      "Tamper-resistant result computation",
      "Secure authentication and role-based access",
    ],
    links: {
      github: "https://github.com/Ayushman404/secureVote",
      demo: "https://secure-vote-frontend.onrender.com",
    },
    colorClass: "from-transparent to-purple-700",
  },

  {
    id: 2,
    title: "AnimeMate",
    category: "Applied Generative AI",
    year: "2025",
    image: "/dashboardProject/animeMateChatHome.png",
    description:
      "An AI-powered chatbot enabling in-character, mood-controlled conversations with anime characters using modern LLM APIs.",
    stack: [
      "React",
      "TailwindCSS",
      "OpenAI / Gemini API",
      "Prompt Engineering",
      "Session Storage",
    ],
    challenges:
      "Maintaining consistent character personalities and moods across dynamic user conversations.",
    features: [
      "Multiple character personas with strict in-character responses",
      "Mood-based response modulation",
      "Session-only memory for anonymity",
      "Optimized prompt structure for consistency",
    ],
    links: {
      github: "https://github.com/Ayushman404/chibi-talk",
      demo: "https://anime-mate.vercel.app/",
    },
    colorClass: "from-pink-600 via-rose-600 to-red-600",
  },

  {
    id: 3,
    title: "QuickEats",
    category: "Full-Stack Development",
    year: "2025",
    image: "/dashboardProject/quickEatsHome.png",
    description:
      "A full-stack food delivery platform with real-time ordering, admin controls, and secure Stripe-based payments.",
    stack: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Stripe API",
      "JWT",
      "TailwindCSS",
    ],
    challenges:
      "Designing a secure and responsive checkout flow while managing real-time admin updates.",
    features: [
      "Customer ordering interface",
      "Admin dashboard for menu and order management",
      "Secure Stripe payment integration",
      "Responsive UI across devices",
    ],
    links: {
      github: "https://github.com/Ayushman404/food-del",
      demo: "https://quickeats-food.vercel.app",
    },
    colorClass: "from-emerald-600 via-teal-600 to-cyan-600",
  },

  {
    id: 4,
    title: "Student Productivity Dashboard",
    category: "Frontend & Fundamentals",
    year: "2025",
    image: "/dashboardProject/Courses.png",
    description:
      "A student-focused dashboard for managing tasks, courses, CPI calculation, and academic resources.",
    stack: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    challenges:
      "Building scalable state management and computation logic using vanilla JavaScript.",
    features: [
      "Task and deadline tracking",
      "Dynamic CPI calculation",
      "Course and credit management",
      "Persistent state using LocalStorage",
    ],
    links: {
      github:
        "https://github.com/Ayushman404/WebDev/tree/main/student_dashboard",
      demo: "https://student-dashboard-4673.vercel.app",
    },
    colorClass: "from-slate-600 via-gray-700 to-zinc-800",
  },
];


/* ================= BACKGROUNDS & FILLERS ================= */

const ActiveGradientBackground = ({ scrollYProgress }) => {
    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            {PROJECTS.map((project, index) => {
                const step = 1 / PROJECTS.length;
                const start = step * (index - 0.5);
                const peak = step * index;
                const end = step * (index + 0.5);

                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(scrollYProgress, [start, peak, end], [0, 0.6, 0]);
                
                return (
                    <motion.div 
                        key={project.id}
                        style={{ opacity }}
                        className={`absolute inset-0 bg-gradient-to-br ${project.colorClass} blur-[150px] mix-blend-screen dark:mix-blend-soft-light opacity-30`}
                    />
                );
            })}
        </div>
    )
}

const EditorialNumber = ({ activeIndex }) => {
    return (
        <div className="absolute top-[20%] right-[5%] md:right-[10%] z-0 pointer-events-none hidden md:block">
             <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 0.04, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-[20rem] font-black leading-none text-slate-900 dark:text-white"
             >
                {activeIndex < PROJECTS.length ? `0${activeIndex + 1}` : 'END'}
             </motion.div>
        </div>
    )
}

const MetadataIndicator = ({ activeIndex }) => {
    const activeProject = PROJECTS[activeIndex];
    if (!activeProject) return null;

    return (
        <div className="absolute bottom-10 left-6 md:left-20 z-20 hidden md:flex flex-col gap-6 pointer-events-none">
            <div className="flex items-center gap-4">
                <div className="w-10 h-[1px] bg-slate-400/50" />
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1 flex items-center gap-2">
                        <Hash size={10} /> Index
                    </span>
                    <span className="text-xl font-mono text-slate-700 dark:text-slate-200">
                        0{activeProject.id}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="w-10 h-[1px] bg-slate-400/50" />
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1 flex items-center gap-2">
                         <Calendar size={10} /> Year
                    </span>
                    <span className="text-xl font-mono text-slate-700 dark:text-slate-200">
                        {activeProject.year}
                    </span>
                </div>
            </div>
        </div>
    )
}

/* ================= CARDS ================= */

const GalleryCard = ({ project, setExpandedId, isActive }) => {
    return (
        <motion.div 
            className="flex-shrink-0 w-[85vw] md:w-[600px] h-[55vh] md:h-[65vh] p-4 snap-center perspective-1000"
            onClick={() => setExpandedId(project.id)}
            animate={{ 
                scale: isActive ? 1.05 : 1,
                y: isActive ? -10 : 0
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <div className={`group relative w-full h-full rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl transition-all duration-500 border border-white/60 dark:border-slate-700/50 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md ${isActive ? 'shadow-2xl ring-1 ring-white/20' : ''}`}>
                
                {/* Image */}
                <div className="absolute inset-0 overflow-hidden">
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        className={`w-full h-full object-cover transition-all duration-700 ease-in-out scale-105 group-hover:scale-110 ${isActive ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-60 group-hover:opacity-50 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between text-white z-10">
                    <div className="flex justify-between items-start">
                        <span className="px-4 py-1.5 rounded-full border border-white/20 bg-black/20 backdrop-blur-xl text-[10px] font-bold font-mono tracking-widest uppercase">
                            {project.category}
                        </span>
                        <div className={`w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                            <ArrowRight size={18} className={`transition-transform duration-500 ${isActive ? 'rotate-0' : '-rotate-45 group-hover:rotate-0'}`} />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 leading-[0.95] text-white">
                            {project.title}
                        </h3>
                        {/* Auto-reveal description if active */}
                        <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'h-auto opacity-100' : 'h-0 opacity-0 group-hover:h-auto group-hover:opacity-100'}`}>
                            <p className="text-sm md:text-base text-slate-200 max-w-md line-clamp-2 mb-4 font-medium leading-relaxed delay-100">
                                {project.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

const CTACard = ({ isActive }) => (
    <motion.div 
        className="flex-shrink-0 w-[85vw] md:w-[400px] h-[55vh] md:h-[65vh] p-4 snap-center perspective-1000"
        animate={{ scale: isActive ? 1.05 : 1 }}
        transition={{ duration: 0.5 }}
    >
        <a href="#" className="group relative w-full h-full rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 border border-[var(--color-primary)]/20 bg-[var(--color-light-card)] dark:bg-slate-900/40 backdrop-blur-md flex flex-col items-center justify-center text-center">
            <div className={`absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
            <div className="relative z-10 p-8">
                <div className={`w-20 h-20 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mx-auto mb-6 transition-all duration-500 shadow-lg ${isActive ? 'bg-[var(--color-primary)] text-white' : 'group-hover:bg-[var(--color-primary)] group-hover:text-white'}`}>
                    <Github size={32} />
                </div>
                <h3 className="text-3xl font-black text-slate-700 dark:text-white mb-2 leading-tight">
                    More on <br/> GitHub
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-2">
                    Explore experimental repos <br/> and open source contributions.
                </p>
            </div>
        </a>
    </motion.div>
)

const ProjectModal = ({ project, onClose }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} 
            className="absolute inset-0 bg-[var(--color-light-bg)]/80 dark:bg-slate-950/90 backdrop-blur-xl"
        />
        <motion.div 
            layoutId={`card-${project.id}`}
            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
            className="relative w-full max-w-6xl h-[85vh] bg-white dark:bg-[#0b1121] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-slate-200 dark:border-slate-800"
        >
            <button onClick={onClose} className="absolute top-6 right-6 z-30 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full transition-all text-white"><X size={20} /></button>
            
            <div className="w-full md:w-5/12 h-64 md:h-full relative overflow-hidden bg-slate-900">
                <img src={project.image} className="w-full h-full object-cover opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${project.colorClass}`} />
            </div>

            <div className="w-full md:w-7/12 p-10 md:p-16 overflow-y-auto bg-white/80 dark:bg-[#0b1121] backdrop-blur-sm">
                <div className="mb-8">
                    <span className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full bg-gradient-to-r ${project.colorClass} text-white mb-4 tracking-widest uppercase`}>
                        {project.category}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-[0.95] tracking-tight">
                        {project.title}
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        {project.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-slate-200 dark:border-slate-800 pt-8">
                    <div>
                        <h4 className="flex items-center gap-2 text-xs font-black text-slate-400 mb-4 font-mono uppercase tracking-widest">
                            <AlertTriangle size={14} /> The Challenge
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{project.challenges}</p>
                    </div>
                    <div>
                        <h4 className="flex items-center gap-2 text-xs font-black text-slate-400 mb-4 font-mono uppercase tracking-widest">
                            <Layers size={14} /> Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {project.stack.map(t => (
                                <span key={t} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-[11px] font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 uppercase tracking-wide">{t}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-10 flex gap-4">
                    <a href={project.links.github} className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:scale-[1.02] transition-transform">
                        <Github size={18} /> Source Code
                    </a>
                    <a href={project.links.demo} className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-white">
                        <ExternalLink size={18} /> Live Demo
                    </a>
                </div>
            </div>
        </motion.div>
    </div>
)

// --- MAIN LAYOUT ---
const Projects = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [expandedId, setExpandedId] = useState(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0); // Added for polish
  
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Logic to calculate active index for "Focus" effect
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const totalItems = PROJECTS.length + 1;
    const step = 1 / (totalItems - 1);
    const newIndex = Math.min(Math.round(latest / step), totalItems - 1);
    if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
    }
  });

  useEffect(() => {
    if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        setScrollRange(trackWidth - viewportWidth);
    }
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <>
      <section 
        ref={containerRef} 
        id="projects"
        className="relative h-[300vh] bg-light-bg dark:bg-dark-bg" 
        /* CRITICAL FIX: Removed overflow-hidden from here so sticky works */
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
          
          {/* Background Layers */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
             <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
             <ActiveGradientBackground scrollYProgress={scrollYProgress} />
          </div>

          {/* New Filler: Giant Editorial Number */}
          <EditorialNumber activeIndex={activeIndex} />

          {/* Header */}
          <div className="absolute top-8 left-6 md:top-12 md:left-20 z-20 pointer-events-none mix-blend-difference dark:mix-blend-normal">
             <div className="flex items-center gap-3 mb-4">
                <div className="h-[1px] w-12 bg-[var(--color-primary)]" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-primary)]">Selected Works</span>
             </div>
             <HackerText 
                text="Innovation Archive" 
                className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.9]"
             />
          </div>

          {/* New Filler: Metadata Indicator (Bottom Left) */}
          <MetadataIndicator activeIndex={activeIndex} />

          {/* Track */}
          <div className="w-full h-full flex items-center pt-24 md:pt-36">
              <motion.div 
                ref={trackRef}
                style={{ x }} 
                className="flex gap-8 items-center pl-4 pr-4 md:pl-0 md:pr-0"
              >
                 <div className="flex-shrink-0 w-[calc(50vw-45vw)] md:w-[calc(50vw-300px)]" />

                 {PROJECTS.map((project, index) => (
                    <GalleryCard 
                        key={project.id} 
                        project={project} 
                        setExpandedId={setExpandedId}
                        isActive={activeIndex === index} // Passing active state
                    />
                 ))}
                 
                 <CTACard isActive={activeIndex === PROJECTS.length} />

                 <div className="flex-shrink-0 w-[calc(50vw-45vw)] md:w-[calc(50vw-200px)]" /> 
              </motion.div>
          </div>

          {/* Footer Bar */}
          <div className="absolute bottom-0 left-0 w-full z-20">
             <motion.div 
                style={{ scaleX: scrollYProgress }} 
                className="h-1 bg-[var(--color-primary)] origin-left"
             />
             <div className="absolute bottom-6 right-6 md:right-20 flex items-center gap-3 text-xs font-mono text-slate-400">
                <span className="hidden md:inline">SCROLL TO EXPLORE</span>
                <MousePointer2 size={14} className="animate-bounce" />
             </div>
          </div>

        </div>
      </section>

      <AnimatePresence>
        {expandedId && <ProjectModal project={PROJECTS.find(p => p.id === expandedId)} onClose={() => setExpandedId(null)} />}
      </AnimatePresence>
    </>
  );
};

export default Projects;