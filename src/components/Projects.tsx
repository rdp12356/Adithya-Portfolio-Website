import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, ExternalLink, Cpu, Globe, Rocket, ArrowUpRight, ArrowRight, Zap, Database, LayoutGrid, Box } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import Magnetic from "./Magnetic";
import HologramProjects from "./HologramProjects";

const projects = portfolioData.projects;

export default function Projects() {
  const [displayMode, setDisplayMode] = useState<"bento" | "hologram">("bento");
  const getIcon = (title: string) => {
    switch (title) {
      case "AuraTune": return <Cpu size={32} />;
      case "Web Development Projects": return <Globe size={32} />;
      case "React + TypeScript App": return <Zap size={32} />;
      case "Robotics Teaching": return <Rocket size={32} />;
      default: return <Database size={32} />;
    }
  };

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
        >
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.4em] mb-4 font-mono">Archive.v2</h2>
            <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9]">
              Selected <br />
              <span className="text-gradient">Creations</span>
            </h3>
            
            <div className="flex gap-2 mt-8">
              <button 
                onClick={() => setDisplayMode("bento")}
                className={`px-4 py-2 rounded-lg text-[10px] font-bold transition-all flex items-center gap-2 tracking-widest ${displayMode === "bento" ? "bg-primary text-black shadow-[0_0_20px_var(--primary)]" : "glass text-white/40"}`}
              >
                <LayoutGrid size={14} /> BENTO_VIEW
              </button>
              <button 
                onClick={() => setDisplayMode("hologram")}
                className={`px-4 py-2 rounded-lg text-[10px] font-bold transition-all flex items-center gap-2 tracking-widest ${displayMode === "hologram" ? "bg-primary text-black shadow-[0_0_20px_var(--primary)]" : "glass text-white/40"}`}
              >
                <Box size={14} /> HOLOGRAM_3D
              </button>
            </div>
          </div>
          <p className="text-foreground/40 max-w-sm leading-relaxed font-light">
            A deep dive into my technical experiments, ranging from low-level automation to high-level reactive interfaces.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {displayMode === "bento" ? (
            <motion.div 
              key="bento"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[240px]"
            >
              {projects.map((project, index) => {
                const isLarge = index === 0 || index === 3;
                const spanClass = isLarge ? "md:col-span-3 md:row-span-2" : "md:col-span-3 md:row-span-1";
                
                return (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`${spanClass} group relative perspective-1000`}
                  >
                    <div className="relative h-full glass-card p-8 md:p-10 overflow-hidden flex flex-col group-hover:border-primary/30 transition-all duration-500">
                      <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 group-hover:scale-110 group-hover:text-primary">
                        {getIcon(project.title)}
                      </div>

                      <div className="flex justify-between items-start mb-6">
                        <div className="flex flex-wrap gap-2">
                          {project.tech.slice(0, 3).map((t) => (
                            <span key={t} className="px-3 py-1 glass rounded-full text-[9px] font-bold text-white/40 tracking-widest uppercase">
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                          {getIcon(project.title)}
                        </div>
                      </div>

                      <div className="mt-auto">
                        <h4 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-primary transition-colors flex items-center gap-3">
                          {project.title}
                          <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </h4>
                        
                        <p className={`text-foreground/50 leading-relaxed font-light ${isLarge ? 'text-lg line-clamp-3' : 'text-sm line-clamp-2'} mb-8`}>
                          {project.description}
                        </p>

                        <div className="flex gap-4">
                          <Magnetic>
                            <a
                              href={project.github}
                              target="_blank"
                              className="flex-1 py-3 px-6 glass rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all text-sm border border-white/5"
                            >
                              Source <Code size={16} />
                            </a>
                          </Magnetic>
                          {project.live && (
                            <Magnetic>
                              <a
                                href={project.live}
                                target="_blank"
                                className="flex-1 py-3 px-6 bg-gradient-premium rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm shadow-lg shadow-primary/20"
                              >
                                Execute <Rocket size={16} />
                              </a>
                            </Magnetic>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="hologram"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <HologramProjects />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex justify-center"
        >
          <a 
            href={portfolioData.contact.github} 
            target="_blank" 
            className="group flex items-center gap-4 px-8 py-4 glass rounded-full hover:bg-white/5 transition-all"
          >
            <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.4em] font-mono group-hover:text-white transition-colors">
              Access_Full_Github_Archives
            </span>
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
