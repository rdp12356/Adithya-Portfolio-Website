import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AudioLines, Volume2, VolumeX, Sparkles, MessageSquareCode } from "lucide-react";

export default function NeuralBridge() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState("");
  const synth = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    synth.current = window.speechSynthesis;
  }, []);

  const speak = (text: string) => {
    if (!synth.current || isMuted) return;
    
    // Stop any current speech
    synth.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to find a cool futuristic voice
    const voices = synth.current.getVoices();
    const googleVoice = voices.find(v => v.name.includes("Google") && v.lang.includes("en"));
    if (googleVoice) utterance.voice = googleVoice;

    utterance.pitch = 0.8;
    utterance.rate = 1.1;
    utterance.volume = 0.5;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setTranscript(text);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setTimeout(() => setTranscript(""), 3000);
    };

    synth.current.speak(utterance);
  };

  const handleInteraction = () => {
    const messages = [
      "Welcome to the Neural Network of Adithya Shyam. I am the Bridge, your guide through this digital dimension.",
      "Neural link established. Accessing repository data. Adithya is currently specializing in AI and Robotics.",
      "Data stream active. All projects are now synchronized with your local node.",
      "System status: Optimal. Design language: Cyber-Futuristic 2.0.",
      "Scanning professional trajectory. High performance detected in full-stack development and automation."
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    speak(randomMsg);
  };

  return (
    <div className="fixed left-6 bottom-10 z-[100] flex flex-col items-start gap-4">
      <AnimatePresence>
        {transcript && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="glass px-6 py-3 rounded-2xl max-w-[250px] border-primary/20 relative"
          >
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 glass rotate-45 border-l border-b border-primary/20" />
            <p className="text-[10px] font-mono text-primary font-bold uppercase mb-1 flex items-center gap-2">
               <MessageSquareCode size={12} /> AI Assistant
            </p>
            <p className="text-xs text-white/70 leading-relaxed italic">"{transcript}"</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <motion.button
          onClick={handleInteraction}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 glass rounded-full flex items-center justify-center text-primary shadow-2xl relative overflow-hidden group"
        >
          {/* Animated Glow Core */}
          <motion.div 
            animate={{ 
              scale: isSpeaking ? [1, 1.5, 1] : [1, 1.1, 1],
              opacity: isSpeaking ? [0.2, 0.5, 0.2] : [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-primary rounded-full blur-xl"
          />
          
          <div className="relative z-10">
            {isSpeaking ? <AudioLines size={28} className="animate-pulse" /> : <Sparkles size={28} />}
          </div>
          
          {/* Rotating Ring */}
          <div className="absolute inset-1 border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
        </motion.button>

        <motion.button
          onClick={() => {
            setIsMuted(!isMuted);
            if (!isMuted && synth.current) synth.current.cancel();
          }}
          className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/30 hover:text-white transition-colors"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </motion.button>
      </div>
    </div>
  );
}
