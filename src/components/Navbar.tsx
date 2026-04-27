import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Instagram } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import Magnetic from "./Magnetic";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
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
        className={`flex items-center justify-between w-full max-w-6xl px-8 py-4 transition-all duration-500 ${
          scrolled ? "glass rounded-full shadow-2xl py-3 translate-y-[-10px]" : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/30 transition-all shadow-2xl">
            <span className="text-xs font-bold tracking-tighter text-white">AS</span>
          </div>
          <span className="font-bold tracking-tight text-lg text-white group-hover:text-primary/90 transition-colors">
            Adithya <span className="font-medium opacity-70">Shyam</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[13px] font-semibold tracking-widest text-foreground/50 hover:text-white transition-all relative group uppercase"
            >
              {link.name}
              <span className="absolute -bottom-1 left-1/2 w-0 h-[1.5px] bg-primary transition-all group-hover:w-full group-hover:left-0" />
            </a>
          ))}
        </div>

        {/* Socials / Action */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Magnetic>
              <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="p-2 text-foreground/40 hover:text-primary transition-colors">
                <Github size={18} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={portfolioData.contact.instagram} target="_blank" rel="noopener noreferrer" className="p-2 text-foreground/40 hover:text-primary transition-colors">
                <Instagram size={18} />
              </a>
            </Magnetic>
          </div>
          <div className="h-6 w-[1px] bg-white/5 mx-2" />
          <Magnetic>
            <a href="#contact" className="px-8 py-3 bg-white text-black rounded-full text-xs font-black uppercase tracking-tighter hover:bg-primary hover:text-white transition-all shadow-xl active:scale-95">
              Let's Connect
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
