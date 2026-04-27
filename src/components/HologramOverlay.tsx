"use client";

import { useAuraStore } from "../store/useAuraStore";

export default function HologramOverlay() {
  const { complexity } = useAuraStore();
  
  if (complexity < 0.1) return null;

  return (
    <div 
      className="fixed inset-0 z-[99] pointer-events-none opacity-[0.03] mix-blend-screen overflow-hidden"
      style={{ opacity: complexity * 0.08 }}
    >
      {/* Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      {/* Glitch Noise */}
      <div className="absolute inset-0 animate-pulse bg-white/5 mix-blend-overlay" />
      
      {/* Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
    </div>
  );
}
