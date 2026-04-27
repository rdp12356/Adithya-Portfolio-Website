import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fingerprint, Eye, ShieldCheck, Lock, Unlock, Zap, Terminal } from "lucide-react";

export default function IdentityVerification({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<"idle" | "scanning" | "authenticating" | "granted">("idle");
  const [progress, setProgress] = useState(0);

  const startScan = () => {
    setStep("scanning");
    const interval = setInterval(() => {
      setProgress((v) => {
        if (v >= 100) {
          clearInterval(interval);
          setStep("authenticating");
          return 100;
        }
        return v + 2;
      });
    }, 30);
  };

  useEffect(() => {
    if (step === "authenticating") {
      setTimeout(() => {
        setStep("granted");
        setTimeout(onComplete, 1500);
      }, 2000);
    }
  }, [step, onComplete]);

  return (
    <div className="fixed inset-0 z-[1000] bg-[#020202] flex items-center justify-center overflow-hidden font-mono">
      {/* Background Matrix/Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(189,157,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(189,157,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <AnimatePresence mode="wait">
        {step === "idle" && (
          <motion.div 
            key="idle"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center relative z-10"
          >
            <div className="mb-8 relative inline-block">
               <motion.div 
                 animate={{ opacity: [0.2, 1, 0.2] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl"
               />
               <div className="w-24 h-24 glass rounded-3xl flex items-center justify-center text-primary relative">
                 <Lock size={40} />
               </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 tracking-[0.2em]">RESTRICTED_ACCESS</h2>
            <p className="text-white/30 text-[10px] mb-12 tracking-[0.3em]">NEURAL_INTERFACE_REQUIRES_UPLINK</p>
            
            <button 
              onClick={startScan}
              className="px-12 py-4 glass rounded-xl text-primary font-bold tracking-widest hover:bg-primary/10 transition-all border-primary/20 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                 INITIALIZE_HANDSHAKE <Zap size={18} className="animate-pulse" />
              </span>
              <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </motion.div>
        )}

        {step === "scanning" && (
          <motion.div 
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-md px-10 text-center relative z-10"
          >
            <div className="relative w-48 h-48 mx-auto mb-12">
              {/* Laser Line */}
              <motion.div 
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_15px_var(--primary)] z-20"
              />
              <div className="absolute inset-0 border border-primary/20 rounded-2xl overflow-hidden glass">
                 <div className="w-full h-full flex items-center justify-center text-primary/40">
                   <Fingerprint size={120} className="opacity-50" />
                 </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] text-primary font-bold tracking-widest">
                <span>SCANNING_IDENTITY...</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-[8px] text-white/20 text-left space-y-1">
                <p>{">"} FETCHING_BIOMETRICS_HASH</p>
                <p>{">"} COMPARING_NEURAL_SIGNATURE</p>
                <p>{">"} PKI_ENCRYPTION_LAYER_ACTIVE</p>
              </div>
            </div>
          </motion.div>
        )}

        {step === "authenticating" && (
          <motion.div 
            key="authenticating"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center relative z-10"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 border-4 border-t-primary border-r-transparent border-b-secondary border-l-transparent rounded-full mx-auto mb-8 shadow-[0_0_30px_rgba(189,157,255,0.2)]"
            />
            <h3 className="text-xl font-bold text-white tracking-[0.3em]">AUTHENTICATING...</h3>
            <p className="text-primary/50 text-[10px] mt-2 font-bold">CROSS_REFERENCING_GLOBAL_DATABASE</p>
          </motion.div>
        )}

        {step === "granted" && (
          <motion.div 
            key="granted"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center relative z-10"
          >
            <div className="relative w-32 h-32 mx-auto mb-8">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-full h-full rounded-full overflow-hidden border-2 border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
              >
                <img src="/profile.jpg" alt="Profile" className="w-full h-full object-cover" />
              </motion.div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 text-black rounded-full p-1.5 shadow-lg">
                <ShieldCheck size={20} />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white tracking-[0.5em] mb-4 uppercase">User_Identified</h3>
            <div className="flex items-center justify-center gap-4 text-green-400/50 text-[10px] font-bold">
              <span className="flex items-center gap-2 uppercase tracking-widest"><Unlock size={14} /> SESSION_OPEN</span>
              <span className="w-1 h-1 bg-green-400/50 rounded-full" />
              <span className="uppercase tracking-widest">ID: AD-99X-ALPHA</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Terminal Text */}
      <div className="absolute bottom-10 left-10 text-[8px] text-white/10 uppercase tracking-widest leading-loose hidden lg:block">
        <p>SYSTEM_VERSION: 4.0.2-STABLE</p>
        <p>KERNEL_UPTIME: 1024_MS</p>
        <p>CONNECTION: ENCRYPTED_SSL_V3</p>
      </div>

      <div className="absolute top-10 right-10 flex items-center gap-3 text-white/10">
        <Terminal size={14} />
        <span className="text-[10px] font-bold tracking-[0.2em]">SECURE_NODE</span>
      </div>
    </div>
  );
}
