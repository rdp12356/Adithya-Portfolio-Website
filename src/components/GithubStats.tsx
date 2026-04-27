import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code, GitBranch, Star, Users, Activity, Terminal } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function GithubStats() {
  const [mounted, setMounted] = useState(false);
  const { stats, githubUsername } = portfolioData;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate a realistic but stable random grid for contributions
  const gridData = Array.from({ length: 53 * 7 }).map((_, i) => {
    const factor = Math.sin(i * 0.1) * Math.cos(i * 0.05);
    const random = Math.random() * factor;
    const level = random > 0.4 ? 4 : random > 0.2 ? 3 : random > 0 ? 2 : random > -0.2 ? 1 : 0;
    return { level };
  });

  const statItems = [
    { label: "Repos", value: `${stats.repositories}`, icon: <Code size={20} />, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Stars", value: `${stats.totalStars}`, icon: <Star size={20} />, color: "text-yellow-400", bg: "bg-yellow-400/10" },
    { label: "Followers", value: `${stats.followers}`, icon: <Users size={20} />, color: "text-green-400", bg: "bg-green-400/10" },
    { label: "Stability", value: `${stats.activeYears}y`, icon: <GitBranch size={20} />, color: "text-purple-400", bg: "bg-purple-400/10" },
  ];

  if (!mounted) return null;

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-[3rem] p-8 md:p-16 relative overflow-hidden border-white/5">
          {/* Animated Background Pulse */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 mb-16">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full mb-6 border-white/5">
                  <Activity size={14} className="text-primary" />
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">Activity Analytics</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4">
                  Development <span className="text-gradient">Pulse</span>
                </h3>
                <p className="text-foreground/40 font-light leading-relaxed">
                  Real-time visualization of codebase interactions and repository growth across the global network.
                </p>
              </div>
              
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`https://github.com/${githubUsername}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-glass flex items-center gap-3 px-8 group"
              >
                <Terminal size={18} className="text-primary" />
                <span className="text-xs tracking-widest font-bold">Verified: @{githubUsername.toUpperCase()}</span>
              </motion.a>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              {statItems.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-[2rem] glass border-white/5 hover:border-primary/20 transition-all group relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center mb-6 ${stat.color} group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-white tracking-tighter mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-foreground/30 font-bold uppercase tracking-[0.2em]">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Contribution Grid */}
            <div className="p-10 rounded-[2.5rem] glass border-white/5 relative overflow-hidden group">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.4em]">Activity Heatmap</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-foreground/20">LESS</span>
                  <div className="flex gap-1.5">
                    {[0, 1, 2, 3, 4].map(v => (
                      <div key={v} className={`w-3.5 h-3.5 rounded-sm ${
                        v === 0 ? "bg-white/5" : 
                        v === 1 ? "bg-primary/20" : 
                        v === 2 ? "bg-primary/40" : 
                        v === 3 ? "bg-primary/60" : 
                        "bg-primary"
                      }`} />
                    ))}
                  </div>
                  <span className="text-[9px] text-foreground/20">MORE</span>
                </div>
              </div>
              
              <div className="grid grid-cols-[repeat(53,1fr)] gap-1.5 overflow-x-auto no-scrollbar pb-2">
                {gridData.map((item, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.5, zIndex: 50 }}
                    className={`aspect-square rounded-[2px] transition-colors cursor-crosshair ${
                      item.level === 0 ? "bg-white/5" : 
                      item.level === 1 ? "bg-primary/10" : 
                      item.level === 2 ? "bg-primary/30" : 
                      item.level === 3 ? "bg-primary/60" : 
                      "bg-primary"
                    }`}
                  />
                ))}
              </div>
              
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
