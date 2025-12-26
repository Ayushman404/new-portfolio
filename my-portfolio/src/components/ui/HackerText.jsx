import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const CHARS = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const HackerText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);

  useEffect(() => {
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }
      
      // Decrypt speed
      iteration += 1 / 3; 
    }, 30);

    return () => clearInterval(intervalRef.current);
  }, [text]); // Only runs once when component mounts

  return <span className={className}>{displayText}</span>;
};

export default HackerText;