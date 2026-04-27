import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Terminal, Cpu, Database, Network, Gauge, Activity, Zap } from "lucide-react";
import { useEffect, useState, useRef } from "react";
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

function StatBox({ icon, label, value, color = "text-white/40" }: { icon: React.ReactNode, label: string, value: string, color?: string }) {
  return (
    <div className="glass px-3 py-2 rounded-xl border-white/5 flex flex-col items-start min-w-[90px] backdrop-blur-3xl shadow-2xl">
      <div className={`flex items-center gap-1.5 text-[7px] font-bold uppercase tracking-widest ${color}`}>
        {icon} {label}
      </div>
      <div className="text-[10px] font-bold text-white mt-0.5 font-mono">{value}</div>
    </div>
  );
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
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Telemetry State
  const [mouseSpeed, setMouseSpeed] = useState(0);
  const [scrollMomentum, setScrollMomentum] = useState(0);
  const [cpuLoad, setCpuLoad] = useState(24);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = now - lastTime.current;
      if (dt > 0) {
        const dx = e.clientX - lastMousePos.current.x;
        const dy = e.clientY - lastMousePos.current.y;
        const speed = Math.sqrt(dx * dx + dy * dy) / dt;
        setMouseSpeed(Math.min(Math.round(speed * 100), 999));
      }
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      lastTime.current = now;
    };

    const handleScroll = () => {
      setScrollMomentum(Math.min(Math.round(Math.abs(window.scrollY - (lastScrollY.current || 0))), 99));
      lastScrollY.current = window.scrollY;
    };

    const cpuInterval = setInterval(() => {
      setCpuLoad(Math.floor(Math.random() * 15) + 20);
    }, 2000);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      clearInterval(cpuInterval);
    };
  }, []);

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
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden bg-black">
      {/* Cinematic Grid Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(189,157,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      {/* Background Glows */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ y, opacity }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div style={{ y, opacity, scale }} className="flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass mb-8 border-white/10 group cursor-default"
          >
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary shadow-[0_0_10px_var(--primary)]"></span>
            </div>
            <span className="text-[10px] font-bold text-white/70 uppercase tracking-[0.3em] font-mono group-hover:text-primary transition-colors">
              Session_Initialized
            </span>
          </motion.div>
          
          <div className="mb-6 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -top-16 -left-4 hidden md:block"
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary shadow-[0_0_20px_rgba(189,157,255,0.4)]">
                  <img src="/profile.jpg" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-1 border border-primary/30 rounded-full border-dashed"
                />
              </div>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-white">
              <ScrambleText text="Creative" /> <br />
              <span className="text-gradient"><ScrambleText text="Developer" delay={0.5} /></span>
            </h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[1px] bg-primary/40" />
            <span className="text-xl md:text-2xl text-foreground/60 font-mono font-light italic">
              {typedText}
              <span className="text-primary animate-pulse ml-1">_</span>
            </span>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-lg text-foreground/40 max-w-lg mb-12 leading-relaxed font-light"
          >
            {bio.hero}
          </motion.p>
          
          <div className="flex flex-wrap gap-6">
            <Magnetic>
              <a href="#projects" className="btn-premium group py-4 px-8">
                Access_Projects <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnetic>
            
            <Magnetic>
              <a href="#contact" className="btn-glass group py-4 px-8">
                <Terminal size={18} className="text-primary group-hover:rotate-12 transition-transform" />
                Establish_Uplink
              </a>
            </Magnetic>
          </div>

          {/* Pilot Identification Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 }}
            className="mt-12 flex items-center gap-5 p-4 glass rounded-2xl border-white/5 backdrop-blur-2xl"
          >
            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-primary/30">
              <img src="/profile.jpg" alt="Profile" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
              <motion.div 
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[1px] bg-primary/50"
              />
            </div>
            <div>
              <div className="text-[8px] font-bold text-primary uppercase tracking-[0.3em] font-mono mb-1">Pilot_Identification</div>
              <div className="text-sm font-bold text-white tracking-widest uppercase">{portfolioData.name}</div>
              <div className="text-[8px] text-white/30 font-mono mt-1">ID: AD-99X-ALPHA // STATUS: ACTIVE</div>
            </div>
          </motion.div>

          {/* Embedded Telemetry Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-16 grid grid-cols-2 gap-3"
          >
            <StatBox icon={<Gauge size={12} />} label="VELOCITY" value={`${mouseSpeed}px/s`} />
            <StatBox icon={<Activity size={12} />} label="MOMENTUM" value={`${scrollMomentum}Δ`} />
            <StatBox icon={<Cpu size={12} />} label="NEURAL_LOAD" value={`${cpuLoad}%`} color="text-secondary" />
            <StatBox icon={<Zap size={12} />} label="CORE_TEMP" value="34°C" color="text-primary" />
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative hidden lg:flex h-[600px] items-center justify-center"
        >
          {/* 3D Scene Container */}
          <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#bd9dff" />
              <FloatingCore />
            </Canvas>
          </div>

          {/* Decorative HUD Elements around the core */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-white/[0.03] rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-10 border border-primary/[0.05] rounded-full border-dashed"
            />
            
            {/* Floating Data Nodes */}
            <div className="absolute top-1/4 -right-10 flex flex-col gap-2">
                {[Cpu, Database, Network].map((Icon, i) => (
                  <motion.div 
                    key={i}
                    animate={{ x: [0, 10, 0], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3 + i, repeat: Infinity, delay: i }}
                    className="p-3 glass rounded-xl border-white/5 text-primary"
                  >
                    <Icon size={20} />
                  </motion.div>
                ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[9px] font-bold text-foreground/30 uppercase tracking-[0.5em] font-mono">Scroll_To_Explore</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-primary/40 to-transparent" />
      </motion.div>
    </section>
  );
}
