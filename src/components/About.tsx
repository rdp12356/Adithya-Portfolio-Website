import { motion } from "framer-motion";
import { User, Target, Cpu, Sparkles, Binary, Zap } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function About() {
  const stats = [
    { icon: <User size={20} />, label: "Identity", value: "17-year-old Dev", color: "text-purple-400" },
    { icon: <Target size={20} />, label: "Focus", value: "AI & Robotics", color: "text-blue-400" },
    { icon: <Cpu size={20} />, label: "Logic", value: "Python / JS", color: "text-cyan-400" },
    { icon: <Sparkles size={20} />, label: "Academy", value: "12th Grade", color: "text-emerald-400" },
  ];

  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden">
      {/* Parallax Background Text */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center overflow-hidden select-none">
        <motion.div 
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="text-[20vw] font-bold whitespace-nowrap font-mono"
        >
          ADITHYA_SHYAM ADITHYA_SHYAM ADITHYA_SHYAM ADITHYA_SHYAM
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full mb-6 border-white/5">
              <Binary size={14} className="text-primary" />
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] font-mono">System_Profile_v1.0</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-[0.9]">
              Building the <span className="text-gradient">Future</span> <br />
              One Line at a Time.
            </h2>
            
            <div className="space-y-6 text-lg text-foreground/50 leading-relaxed font-light mb-12">
              <p>
                I am <span className="text-white font-medium">Adithya Shyam</span>, a student developer focused on bridging the gap between digital logic and physical hardware. 
              </p>
              <p>
                Specializing in <span className="text-primary font-mono bg-primary/5 px-2 py-0.5 rounded">Python automation</span> and <span className="text-secondary font-mono bg-secondary/5 px-2 py-0.5 rounded">Robotics</span>, I spend my time building systems that learn, move, and solve real problems.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.05)" }}
                  className="glass p-6 rounded-2xl border-white/5 hover:border-primary/20 transition-all group flex items-center gap-4"
                >
                  <div className={`p-3 bg-white/5 rounded-xl ${stat.color} group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-[10px] text-foreground/30 uppercase tracking-[0.2em] font-mono mb-0.5">{stat.label}</div>
                    <div className="text-white font-bold tracking-tight">{stat.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square glass rounded-[3rem] p-4 relative overflow-hidden group shadow-2xl border border-white/5">
              {/* Profile Image with Holographic overlays */}
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
                <img 
                  src="/profile.jpg" 
                  alt="Adithya Shyam" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                
                {/* Scanning Effect */}
                <motion.div 
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] bg-primary/50 shadow-[0_0_15px_var(--primary)] z-20 pointer-events-none"
                />

                {/* Digital Noise / Grid overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                     style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '10px 10px' }} />
              </div>

              <div className="absolute bottom-10 left-10 right-10 z-30">
                <h4 className="text-3xl font-bold text-white mb-2 tracking-tight">Iterative Innovation</h4>
                <p className="text-sm text-foreground/60 leading-relaxed font-light italic">
                  "I focus on building practical, usable projects rather than just theoretical ideas—learning through experimentation."
                </p>
              </div>
              
              {/* Animated decorative lines */}
              <div className="absolute top-10 right-10 z-30">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ height: [10, 30, 10] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1 bg-primary/40 rounded-full shadow-[0_0_10px_rgba(189,157,255,0.5)]" 
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Tag */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 glass px-6 py-4 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-3xl"
            >
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-primary uppercase tracking-[0.3em] font-mono mb-1">Status_Report</span>
                <span className="text-sm font-bold text-white tracking-widest">READY_FOR_DEPLOYMENT</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
