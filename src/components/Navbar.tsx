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
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // ScrollSpy logic
      const sections = navLinks.map(link => {
        const id = link.href.replace("#", "");
        if (!id) return { name: "Home", offset: 0 };
        const element = document.getElementById(id);
        return { name: link.name, offset: element ? element.offsetTop - 100 : 0 };
      });

      const scrollPosition = window.scrollY;
      const current = sections.reduce((acc, section) => {
        return scrollPosition >= section.offset ? section : acc;
      }, sections[0]);

      setActiveSection(current.name);
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
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/30 transition-all shadow-2xl relative">
            <span className="text-xs font-bold tracking-tighter text-white">AS</span>
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-bold tracking-tight text-lg text-white group-hover:text-primary/90 transition-colors">
            Adithya <span className="font-medium opacity-70">Shyam</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-[12px] font-bold tracking-[0.2em] transition-all relative group uppercase ${
                activeSection === link.name ? "text-white" : "text-white/40 hover:text-white/80"
              }`}
            >
              {link.name}
              {activeSection === link.name && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_10px_var(--primary)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Socials / Action */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Magnetic>
              <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="p-2 text-white/30 hover:text-primary transition-colors">
                <Github size={18} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={portfolioData.contact.instagram} target="_blank" rel="noopener noreferrer" className="p-2 text-white/30 hover:text-primary transition-colors">
                <Instagram size={18} />
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-white/70 hover:text-white transition-colors">
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
