import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Terminal, Cpu, Database, Network, Gauge, Activity, Zap } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import Magnetic from "./Magnetic";
import { useAuraStore } from "../store/useAuraStore";
import { Canvas } from "@react-three/fiber";
import FloatingCore from "./FloatingCore";

function ScrambleText({ text, delay = 0 }: { text: string, delay?: number }) {
  const [displayText, setDisplayText] = useState(text);
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

  useEffect(() => {
    let iteration = 0;
    let interval: ReturnType<typeof setInterval>;

    const startScramble = () => {
      interval = setInterval(() => {
        setDisplayText(prev => 
          prev.split("").map((_, index) => {
            if (index < iteration) return text[index];
            return characters[Math.floor(Math.random() * characters.length)];
          }).join("")
        );

        if (iteration >= text.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 30);
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
  const { roles, bio } = portfolioData;
  const { frequency } = useAuraStore();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        setTypedText(currentRole.substring(0, typedText.length - 1));
        setTypingSpeed(50 / (frequency || 1));
      } else {
        setTypedText(currentRole.substring(0, typedText.length + 1));
        setTypingSpeed(150 / (frequency || 1));
      }

      if (!isDeleting && typedText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex, roles, typingSpeed, frequency]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center pt-24 px-6 overflow-hidden bg-[#010101]">
      {/* Refined Low-Brightness Nebulas */}
      <div className="absolute inset-0 z-0 opacity-40">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 45, 0],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[5%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[200px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1],
            rotate: [0, -45, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[5%] w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[180px]" 
        />
      </div>

      {/* Subtle Digital Grain Overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div style={{ y, opacity }} className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass mb-12 border-white/5 group cursor-default"
            >
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </div>
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-[0.4em] font-mono group-hover:text-primary transition-colors">
                System_Node // Alpha_Build
              </span>
            </motion.div>
            
            <div className="mb-8 relative">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] text-white">
                <span className="relative inline-block">
                   <ScrambleText text="Creative" />
                   <motion.div 
                    animate={{ width: ["0%", "100%", "0%"] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="absolute bottom-0 left-0 h-[2px] bg-primary/50 rounded-full blur-[1px]"
                   />
                </span>
                <br />
                <span className="text-gradient brightness-90">
                  <ScrambleText text="Developer" delay={0.5} />
                </span>
              </h1>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-6 mb-10"
            >
              <div className="w-16 h-[2px] bg-gradient-to-r from-primary to-transparent" />
              <span className="text-2xl md:text-3xl text-white/90 font-mono font-medium tracking-tight">
                {typedText}
                <motion.span 
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="text-primary ml-1"
                >_</motion.span>
              </span>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-xl text-white/50 max-w-xl mb-12 leading-relaxed font-light"
            >
              {bio.hero}
            </motion.p>
            
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              <Magnetic>
                <a href="#projects" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-xl font-bold text-sm tracking-[0.2em] overflow-hidden transition-all hover:scale-105 neon-primary active:scale-95 shadow-xl">
                  <span className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center gap-2">
                    EXPLORE_ARCHIVE <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </Magnetic>
              
              <Magnetic>
                <a href="#contact" className="btn-glass px-8 py-4 group text-sm font-bold tracking-[0.1em] border border-white/10 hover:border-primary/30 transition-all active:scale-95 shadow-lg">
                  <Terminal size={18} className="text-primary group-hover:rotate-12 transition-transform" />
                  ESTABLISH_UPLINK
                </a>
              </Magnetic>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="relative hidden lg:flex h-[700px] items-center justify-center"
          >
            {/* Energy Aura behind 3D Scene */}
            <div className="absolute w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse" />
            
            {/* 3D Scene Container */}
            <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
              <React.Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <ambientLight intensity={1.5} />
                  <pointLight position={[10, 10, 10]} intensity={3} color="#bd9dff" />
                  <pointLight position={[-10, -10, -10]} intensity={2} color="#6a9cff" />
                  <FloatingCore />
                </Canvas>
              </React.Suspense>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-[2px] border-white/[0.05] rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-20 border-[1px] border-primary/20 rounded-full border-dashed"
              />
              
              {/* Dynamic HUD Nodes */}
              <div className="absolute top-1/4 -right-10 flex flex-col gap-6">
                  {[Cpu, Database, Network].map((Icon, i) => (
                    <motion.div 
                      key={i}
                      animate={{ 
                        x: [0, 15, 0],
                        opacity: [0.4, 0.8, 0.4],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 4 + i, repeat: Infinity, delay: i }}
                      className="p-5 glass rounded-[1.5rem] border-white/10 text-primary neon-primary"
                    >
                      <Icon size={24} />
                    </motion.div>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Scroll Prompt */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.6em] font-mono animate-pulse">Scroll_To_Enter_Hyperdrive</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[2px] h-20 bg-gradient-to-b from-primary via-secondary to-transparent" 
        />
      </motion.div>
    </section>
  );
}