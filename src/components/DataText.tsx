"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface DataTextProps {
  text: string;
  metadata?: string;
}

export default function DataText({ text, metadata }: DataTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
  const [displayText, setDisplayText] = useState(text);

  const glitch = () => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iterations) return text[index];
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3;
    }, 30);
  };

  return (
    <span
      className="relative inline-block group cursor-crosshair"
      onMouseEnter={() => {
        setIsHovered(true);
        glitch();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setDisplayText(text);
      }}
    >
      <span className="relative z-10 group-hover:text-primary transition-colors font-bold tracking-tight">
        {displayText}
      </span>
      
      {metadata && isHovered && (
        <motion.span
          initial={{ opacity: 0, y: 10, x: -10 }}
          animate={{ opacity: 1, y: -20, x: 0 }}
          className="absolute left-0 top-0 whitespace-nowrap text-[8px] font-mono text-primary bg-primary/10 px-1 rounded border border-primary/20 pointer-events-none"
        >
          [ID: {metadata}]
        </motion.span>
      )}

      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
    </span>
  );
}
