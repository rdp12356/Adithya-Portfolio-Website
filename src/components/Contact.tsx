import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Code, Globe, Send, CheckCircle2, Instagram, Terminal, MapPin } from "lucide-react";
import { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import Magnetic from "./Magnetic";

export default function Contact() {
  const { contact, name } = portfolioData;
  const [formState, setFormState] = useState<"idle" | "sending" | "success">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
    if (!accessKey || accessKey === "YOUR_ACCESS_KEY_HERE") {
      alert("Contact form not configured. Please set VITE_WEB3FORMS_KEY in your .env file.");
      return;
    }
    
    setFormState("sending");
    
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        from_name: "Portfolio Enquiry",
      }),
    });

    const result = await response.json();
    if (result.success) {
      setFormState("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setFormState("idle"), 5000);
    } else {
      console.error(result);
      setFormState("idle");
      alert("Transmission failed. Please try again or use direct email.");
    }
  };

  return (
    <section id="contact" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 glass rounded-full mb-8 border-white/5">
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.3em]">Get in Touch</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 leading-[0.9]">
              Let's <br />
              <span className="text-gradient">Connect</span>
            </h2>
            
            <p className="text-lg text-foreground/50 font-light max-w-md mb-12 leading-relaxed">
              Available for collaborations, technical inquiries, or discussing the next breakthrough in AI and Robotics.
            </p>

            <div className="space-y-4">
              <Magnetic>
                <a href={`mailto:${contact.email}`} className="glass p-8 rounded-[2rem] flex items-center gap-6 group hover:border-primary/20 transition-all">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest mb-1">Direct Email</p>
                    <p className="text-xl font-bold text-white">{contact.email}</p>
                  </div>
                </a>
              </Magnetic>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Magnetic>
                  <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="glass p-6 rounded-2xl flex items-center gap-4 group hover:border-secondary/20 transition-all">
                    <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-[8px] text-foreground/40 font-bold uppercase tracking-[0.2em]">Phone Number</p>
                      <p className="text-sm font-bold text-white">{contact.phone}</p>
                    </div>
                  </a>
                </Magnetic>
                
                <div className="glass p-6 rounded-2xl flex items-center gap-4 group border-white/5">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-foreground/40 group-hover:text-primary transition-colors">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[8px] text-foreground/40 font-bold uppercase tracking-[0.2em]">Current Location</p>
                    <p className="text-sm font-bold text-white">Kerala, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              {[
                { icon: <Code size={20} />, href: contact.github, label: "GITHUB" },
                { icon: <Instagram size={20} />, href: contact.instagram, label: "INSTA" },
              ].map((social, i) => (
                <Magnetic key={i}>
                  <a
                    href={social.href}
                    target="_blank"
                    className="flex items-center gap-3 px-6 py-3 glass rounded-xl text-white hover:text-primary hover:bg-white/5 transition-all group border-white/5"
                  >
                    {social.icon}
                    <span className="text-[10px] font-bold font-mono tracking-[0.2em]">{social.label}</span>
                  </a>
                </Magnetic>
              ))}
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card rounded-[3rem] p-8 md:p-16 relative overflow-hidden border-white/5">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />
              
              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-20 text-center relative z-20"
                  >
                    <div className="w-24 h-24 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(189,157,255,0.3)]">
                      <CheckCircle2 size={48} />
                    </div>
                    <h4 className="text-3xl font-bold text-white mb-4">Message Sent</h4>
                    <p className="text-foreground/50 font-light max-w-xs">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-8 relative z-10"
                  >
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] ml-1">Your Name</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full glass bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-all font-light" 
                          placeholder="What's your name?" 
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] ml-1">Email Address</label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full glass bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-all font-light" 
                          placeholder="How can I reach you?" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] ml-1">Subject</label>
                      <input 
                        type="text" 
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full glass bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-all font-light" 
                        placeholder="What is this regarding?" 
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em] ml-1">Your Message</label>
                      <textarea 
                        rows={5} 
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full glass bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-all resize-none font-light" 
                        placeholder="Tell me more about your project..."
                      ></textarea>
                    </div>
                    
                    <Magnetic>
                      <button 
                        disabled={formState === "sending"}
                        className="btn-premium w-full py-5 flex items-center justify-center gap-3 disabled:opacity-50 shadow-2xl shadow-primary/20"
                      >
                        {formState === "sending" ? (
                          <span className="flex items-center gap-3">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            SENDING...
                          </span>
                        ) : (
                          <span className="flex items-center gap-3 text-sm font-black tracking-widest">
                            SEND MESSAGE <Send size={18} />
                          </span>
                        )}
                      </button>
                    </Magnetic>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
            
            {/* Background scan element */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-primary/10 rounded-full animate-pulse pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
