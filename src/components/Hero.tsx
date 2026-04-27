import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import Magnetic from "./Magnetic";
import { useAuraStore } from "../store/useAuraStore";

function ScrambleText({ text, delay = 0 }: { text: string, delay?: number }) {
  const [displayText, setDisplayText] = useState(text);
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

  useEffect(() => {
    let iteration = 0;
    let interval: ReturnType<typeof setInterval>;

    const startScramble = () => {
      interval = setInterval(() => {
        setDisplayText(prev => 
          prev.split("").map((char, index) => {
            if (index < iteration) return text[index];
            return characters[Math.floor(Math.random() * characters.length)];
          }).join("")
        );

        if (iteration >= text.length) {
          setDisplayText(text); // Ensure it ends perfectly
          clearInterval(interval);
        }
        iteration += 0.2; // Slower, more deliberate reveal
      }, 40);
    };

    const timeout = setTimeout(startScramble, delay * 1000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text, delay]);

  return <span>{displayText}</span>;
}

export default function Hero() {
  const { roles, bio, name } = portfolioData;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center pt-32 pb-20 px-6 overflow-hidden bg-[#010101]">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[250px] -translate-y-1/2 translate-x-1/4 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[200px] translate-y-1/4 -translate-x-1/4" />
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: Math.random() * 1000 }}
          animate={{ 
            opacity: [0, 0.5, 0],
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0]
          }}
          transition={{ 
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          className="absolute w-1 h-1 bg-white/20 rounded-full blur-[1px] pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}

      {/* Digital Texture */}
      <div className="absolute inset-0 z-[1] opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div style={{ y, opacity }} className="flex flex-col items-start text-left max-w-4xl will-change-transform">
          
          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-6 leading-[0.9]"
          >
            {name}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-white/90 font-medium mb-8 flex items-center gap-4"
          >
            Student <span className="text-white/20">|</span> Developer <span className="text-white/20">|</span> Builder
          </motion.p>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-white/50 max-w-2xl mb-14 leading-relaxed font-light"
          >
            Architecting high-fidelity digital solutions through the lens of AI, robotics, and full-stack engineering. Transforming complex system logic into elegant, user-centric realities.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-6"
          >
            <Magnetic>
              <a 
                href="#projects" 
                className="px-10 py-5 bg-white text-black rounded-full font-bold text-sm tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
              >
                View Projects
              </a>
            </Magnetic>
            
            <Magnetic>
              <a 
                href="#contact" 
                className="px-10 py-5 glass border border-white/10 rounded-full font-bold text-sm tracking-widest text-white transition-all hover:bg-white/5 hover:border-white/20 active:scale-95"
              >
                Contact Me
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-medium">Scroll</span>
        <div className="w-[20px] h-[35px] rounded-full border border-white/20 flex justify-center p-1.5">
          <motion.div 
            animate={{ 
              y: [0, 12, 0],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-1 h-1 rounded-full bg-primary"
          />
        </div>
      </motion.div>

      {/* Side Decorative Text */}
      <div className="absolute right-10 bottom-20 hidden lg:block overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.05, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-[12rem] font-bold text-white whitespace-nowrap rotate-90 origin-bottom-right"
        >
          {portfolioData.shortName}
        </motion.div>
      </div>
    </section>
  );
}