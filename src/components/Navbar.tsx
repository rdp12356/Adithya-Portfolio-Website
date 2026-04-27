import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Cpu, Github, Instagram } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import Magnetic from "./Magnetic";

const navLinks = [
  { name: "Start", href: "#" },
  { name: "System", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Archive", href: "#projects" },
  { name: "Terminal", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-8 flex justify-center">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`flex items-center justify-between w-full max-w-5xl px-6 py-3 transition-all duration-500 ${
          scrolled ? "glass rounded-full shadow-2xl py-2" : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30 group cursor-pointer hover:bg-primary transition-colors">
            <Cpu size={20} className="text-primary group-hover:text-white transition-colors" />
          </div>
          <span className="font-mono font-bold tracking-tighter text-lg hidden sm:block">
            AS<span className="text-primary">.</span>SYS
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-mono font-bold uppercase tracking-widest text-foreground/60 hover:text-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Socials / Action */}
        <div className="hidden md:flex items-center gap-4">
          <Magnetic>
            <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="p-2 hover:text-primary transition-colors">
              <Github size={18} />
            </a>
          </Magnetic>
          <Magnetic>
            <a href={portfolioData.contact.instagram} target="_blank" rel="noopener noreferrer" className="p-2 hover:text-primary transition-colors">
              <Instagram size={18} />
            </a>
          </Magnetic>
          <div className="h-4 w-[1px] bg-white/10 mx-2" />
          <Magnetic>
            <a href="#contact" className="px-4 py-2 glass rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
              Establish_
            </a>
          </Magnetic>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-foreground">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 bg-background/95 backdrop-blur-2xl z-[110] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button onClick={() => setIsOpen(false)} className="absolute top-10 right-10 p-2 text-foreground">
              <X size={32} />
            </button>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-bold tracking-tighter hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
