import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, Hexagon, ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-32">
          {/* Experience */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-5 mb-16"
            >
              <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-primary shadow-lg shadow-primary/10">
                <Briefcase size={28} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white tracking-tight">Experience</h3>
                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Career Timeline</p>
              </div>
            </motion.div>

            <div className="space-y-12 border-l-2 border-white/5 ml-7 pl-12 relative">
              {portfolioData.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[61px] top-0 p-1 bg-background">
                    <div className="w-4 h-4 rounded-full bg-primary animate-pulse shadow-[0_0_15px_var(--primary)]" />
                  </div>
                  
                  <div className="flex items-center gap-3 text-primary text-[10px] font-bold uppercase tracking-widest mb-3">
                    <Calendar size={14} /> {exp.period}
                  </div>
                  
                  <div className="glass-card p-8 group-hover:border-primary/20 transition-all duration-500 relative">
                    <div className="absolute top-4 right-4 text-white/5 group-hover:text-primary/10 transition-colors">
                      <Hexagon size={40} />
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{exp.role}</h4>
                    <p className="text-white/40 text-sm tracking-tighter mb-4 flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-primary/40" /> {exp.company}
                    </p>
                    <p className="text-foreground/50 leading-relaxed font-light italic">
                      {exp.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-5 mb-16"
            >
              <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-secondary shadow-lg shadow-secondary/10">
                <GraduationCap size={28} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white tracking-tight">Education</h3>
                <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em]">Academic Foundation</p>
              </div>
            </motion.div>

            <div className="space-y-12 border-l-2 border-white/5 ml-7 pl-12 relative">
              {portfolioData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[61px] top-0 p-1 bg-background">
                    <div className="w-4 h-4 rounded-full bg-secondary animate-pulse shadow-[0_0_15px_var(--secondary)]" />
                  </div>

                  <div className="flex items-center gap-3 text-secondary text-[10px] font-bold uppercase tracking-widest mb-3">
                    <Calendar size={14} /> {edu.period}
                  </div>
                  
                  <div className="glass-card p-8 group-hover:border-secondary/20 transition-all duration-500">
                    <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-secondary transition-colors">{edu.degree}</h4>
                    <p className="text-white/40 text-sm tracking-tighter mb-4 flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-secondary/40" /> {edu.school}
                    </p>
                    <p className="text-foreground/50 leading-relaxed font-light italic">
                      {edu.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
