import { useRef, useState, useEffect } from "react";

const SpotlightCard = ({ children, className = "", gridMouseX, gridMouseY, ...props }) => {
  const divRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();

    setPos({
      x: gridMouseX - rect.left,
      y: gridMouseY - rect.top,
    });
  }, [gridMouseX, gridMouseY]);

  return (
    <div
      ref={divRef}
      className={`relative rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden ${className}`}
      {...props}
    >
      {/* BORDER-ONLY HIGHLIGHT (Thinned to 1.5px for elegance) */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl z-10"
        style={{
          background: `
            radial-gradient(
              250px circle at ${pos.x}px ${pos.y}px,
              rgba(99,102,241, 0.8),
              transparent 40%
            )
          `,
          WebkitMask: `
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0)
          `,
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "2.5px", // Thinner, sharper border
        }}
      />

      {/* INNER CONTENT BACKGROUND */}
      <div className="absolute inset-[1px] rounded-[23px] bg-white dark:bg-slate-950/90 z-0" />

      {/* CONTENT WRAPPER - Forces height to match parent for centering */}
      <div className="relative z-20 h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;