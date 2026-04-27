import { motion } from "framer-motion";
import { Code, Layers, Terminal, Cpu, Box, Sparkles, CheckCircle2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const iconMap: Record<string, React.ReactNode> = {
  "Languages": <Code size={24} />,
  "Frameworks": <Layers size={24} />,
  "Tools": <Terminal size={24} />,
  "Domains": <Cpu size={24} />
};

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 shadow-[0_0_20px_rgba(189,157,255,0.2)]"
          >
            <Sparkles size={32} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.4em] text-primary font-bold mb-4 font-mono"
          >
            Capabilities_Matrix
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter text-white"
          >
            Tools of the <span className="text-gradient">Trade</span>
          </motion.h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioData.skills.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="relative glass-card p-10 h-full flex flex-col items-start border-white/5 group-hover:border-primary/20 transition-all duration-500">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 text-white/50 group-hover:bg-primary/20 group-hover:text-primary transition-all duration-500 group-hover:rotate-[10deg]">
                  {iconMap[category.category] || <Box size={24} />}
                </div>
                
                <h4 className="text-2xl font-bold mb-8 text-white tracking-tight">{category.category}</h4>
                
                <ul className="space-y-5 w-full mt-auto">
                  {category.items.map((skill) => (
                    <li key={skill} className="flex items-center gap-4 text-foreground/40 group-hover:text-foreground/80 transition-colors">
                      <div className="w-5 h-5 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <CheckCircle2 size={12} className="text-primary opacity-50 group-hover:opacity-100" />
                      </div>
                      <span className="text-sm font-mono tracking-tight font-medium">{skill}</span>
                    </li>
                  ))}
                </ul>

                {/* Decorative background number */}
                <div className="absolute top-6 right-8 text-4xl font-bold text-white/5 font-mono select-none">
                  0{index + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Continuous Learning Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass rounded-[2.5rem] p-10 md:p-12 relative overflow-hidden group border-white/5"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Cpu size={32} className="animate-pulse" />
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-2xl font-bold text-white tracking-tight mb-1">Actively Initializing...</h4>
                <p className="text-sm text-foreground/30 font-mono tracking-widest uppercase">Expanding_Knowledge_Base</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-3 max-w-xl">
              {portfolioData.currentlyLearning.map((tech) => (
                <span key={tech} className="px-5 py-2.5 glass rounded-xl text-xs font-bold text-primary border-primary/20 hover:bg-primary hover:text-white transition-all cursor-default shadow-lg shadow-primary/5">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
