import React, { useRef, useEffect, useMemo } from "react";
import useTheme from "../../hooks/useTheme";

const InteractiveGrid = ({
  squareSize = 40,
  gridGap = 2,
  hoverRadius = 300, // Range of the glow
  color = "rgb(99, 102, 241)", // Indigo
  className,
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const { theme } = useTheme();

  // Mouse/Touch State
  const mouse = useRef({ x: -1000, y: -1000 });
  const autoWander = useRef({ x: 0, y: 0, vx: 2, vy: 1.5 }); // For Mobile

  // Colors
  const gridColor = useMemo(() => {
    return theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
  }, [theme]);

  const activeColorRGB = useMemo(() => {
     return theme === "dark" ? "99, 102, 241" : "79, 70, 229"; // Indigo-500 vs 600
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let gridParams;

    // --- MOUSE TRACKING ---
    const handleMouseMove = (e) => {
        // Only track real mouse on desktop
        if (window.matchMedia("(min-width: 768px)").matches) {
            const rect = container.getBoundingClientRect();
            mouse.current.x = e.clientX - rect.left;
            mouse.current.y = e.clientY - rect.top;
        }
    };
    
    // Reset mouse when leaving
    const handleMouseLeave = () => {
        if (window.matchMedia("(min-width: 768px)").matches) {
            mouse.current.x = -1000;
            mouse.current.y = -1000;
        }
    };

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    const resizeObserver = new ResizeObserver(() => {
        const { width, height } = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);
        
        const cols = Math.floor(width / (squareSize + gridGap));
        const rows = Math.floor(height / (squareSize + gridGap));
        
        gridParams = { width, height, cols, rows };
        
        // Init mobile wanderer to center
        autoWander.current.x = width / 2;
        autoWander.current.y = height / 2;
    });

    resizeObserver.observe(container);

    const draw = () => {
        if (!gridParams) return;
        const { width, height, cols, rows } = gridParams;

        // 1. Update Mobile "Auto Wander" (Ghost Cursor)
        // If screen is small, we move the 'mouse' variable automatically
        if (window.matchMedia("(max-width: 767px)").matches) {
            autoWander.current.x += autoWander.current.vx;
            autoWander.current.y += autoWander.current.vy;

            // Bounce off walls
            if (autoWander.current.x < 0 || autoWander.current.x > width) autoWander.current.vx *= -1;
            if (autoWander.current.y < 0 || autoWander.current.y > height) autoWander.current.vy *= -1;

            mouse.current.x = autoWander.current.x;
            mouse.current.y = autoWander.current.y;
        }

        ctx.clearRect(0, 0, width, height);

        // 2. Draw Static Grid Lines
        ctx.fillStyle = gridColor;
        for (let i = 0; i <= cols; i++) {
            ctx.fillRect(i * (squareSize + gridGap), 0, gridGap, height);
        }
        for (let i = 0; i <= rows; i++) {
            ctx.fillRect(0, i * (squareSize + gridGap), width, gridGap);
        }

        // 3. Draw Active Squares (Hover Effect)
        // Optimization: Only loop through area AROUND the mouse, not the whole grid
        // Calculate grid range near mouse
        const startCol = Math.max(0, Math.floor((mouse.current.x - hoverRadius) / (squareSize + gridGap)));
        const endCol = Math.min(cols, Math.ceil((mouse.current.x + hoverRadius) / (squareSize + gridGap)));
        const startRow = Math.max(0, Math.floor((mouse.current.y - hoverRadius) / (squareSize + gridGap)));
        const endRow = Math.min(rows, Math.ceil((mouse.current.y + hoverRadius) / (squareSize + gridGap)));

        for (let c = startCol; c < endCol; c++) {
            for (let r = startRow; r < endRow; r++) {
                const x = c * (squareSize + gridGap) + gridGap;
                const y = r * (squareSize + gridGap) + gridGap;
                
                // Calculate distance to center of this square
                const centerX = x + squareSize / 2;
                const centerY = y + squareSize / 2;
                
                const dist = Math.sqrt(
                    Math.pow(centerX - mouse.current.x, 2) + 
                    Math.pow(centerY - mouse.current.y, 2)
                );

                if (dist < hoverRadius) {
                    // Opacity is stronger when closer (0.0 to 0.4)
                    const opacity = (1 - dist / hoverRadius) * 0.6;
                    ctx.fillStyle = `rgba(${activeColorRGB}, ${opacity})`;
                    ctx.fillRect(x, y, squareSize, squareSize);
                }
            }
        }
    };

    const loop = () => {
        draw();
        animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
        resizeObserver.disconnect();
        cancelAnimationFrame(animationFrameId);
    };
  }, [theme, gridColor, activeColorRGB]);

  return (
    <div ref={containerRef} className={`absolute inset-0 z-0 size-full pointer-events-none ${className}`}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default InteractiveGrid;