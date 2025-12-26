import { useEffect, useRef } from "react";
import useTheme from "../../hooks/useTheme";

const NeuralBackground = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  
  // 1. Theme Ref: Allows the loop to read the CURRENT theme without restarting
  const themeRef = useRef(theme);
  
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let pulses = [];

    const config = {
      particleCount: window.innerWidth < 768 ? 40 : 80,
      connectionDistance: 140,
      mouseDistance: 200,
      pulseSpeed: 0.05
    };

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (particles.length === 0) initParticles();
    };

    // --- COLOR LOGIC ---
    const getColors = () => {
      const isDark = themeRef.current === 'dark';
      return {
        // LIGHT MODE: Slate-600 (#475569) -> Visible dark grey
        // DARK MODE: Slate-400 (#94a3b8) -> Visible light grey
        particle: isDark ? "rgba(148, 163, 184, 0.6)" : "rgba(71, 85, 105, 0.8)", 
        
        // Lines
        line: isDark ? "rgba(178, 183, 184," : "rgba(71, 85, 105,", 
        
        // Pulse: Indigo-500 (#6366f1) - Good on both
        pulse: "#6366f1", 
      };
    };

    class Pulse {
      constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.progress = 0;
        this.dead = false;
      }
      update() {
        this.progress += config.pulseSpeed;
        if (this.progress >= 1) this.dead = true;
        
        const dx = this.p1.x - this.p2.x;
        const dy = this.p1.y - this.p2.y;
        if (Math.sqrt(dx * dx + dy * dy) > config.connectionDistance) this.dead = true;
      }
      draw(colors) {
        if (this.dead) return;
        const curX = this.p1.x + (this.p2.x - this.p1.x) * this.progress;
        const curY = this.p1.y + (this.p2.y - this.p1.y) * this.progress;

        ctx.shadowBlur = 4;
        ctx.shadowColor = colors.pulse;
        ctx.fillStyle = colors.pulse;
        ctx.beginPath();
        ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2 + 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        if (mouse.x != -1000) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < config.mouseDistance) {
                const force = (config.mouseDistance - distance) / config.mouseDistance;
                this.x -= (dx / distance) * force * 2;
                this.y -= (dy / distance) * force * 2;
            }
        }
      }
      draw(colors) {
        ctx.fillStyle = colors.particle;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < config.particleCount; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const colors = getColors(); // Read colors dynamically based on current theme ref
      
      particles.forEach(p => { p.update(); p.draw(colors); });

      // Connect
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < config.connectionDistance) {
                let opacity = 1 - dist / config.connectionDistance;
                // Dark mode needs less opacity, Light mode needs MORE (0.3) to be visible
                let opacityMult = themeRef.current === 'dark' ? 0.15 : 0.3;
                ctx.strokeStyle = `${colors.line}${opacity * opacityMult})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
      }
      
      pulses.forEach(p => { p.update(); p.draw(colors); });
      pulses = pulses.filter(p => !p.dead);

      if (Math.random() < 0.02) { 
        const p1 = particles[Math.floor(Math.random() * particles.length)];
        for (let p2 of particles) {
            if (p1 !== p2 && Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)) < config.connectionDistance) {
                pulses.push(new Pulse(p1, p2));
                break;
            }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    initParticles();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Run once. The 'themeRef' handles color updates.

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
       <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-20 dark:opacity-5 transition-colors duration-500"></div>
       <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default NeuralBackground;