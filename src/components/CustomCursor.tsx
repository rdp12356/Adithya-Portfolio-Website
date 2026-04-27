import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const onMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setIsVisible(true);
    
    const target = e.target as HTMLElement;
    setIsPointer(window.getComputedStyle(target).cursor === "pointer");
  }, []);

  const onMouseDown = useCallback(() => setIsClicking(true), []);
  const onMouseUp = useCallback(() => setIsClicking(false), []);
  const onMouseLeave = useCallback(() => setIsVisible(false), []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.body.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.body.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [onMouseMove, onMouseDown, onMouseUp, onMouseLeave]);

  return (
    <div 
      className={`fixed top-0 left-0 z-[9999] pointer-events-none transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {/* Outer Ring */}
      <motion.div
        animate={{
          scale: isPointer ? 1.5 : 1,
          width: isPointer ? 60 : 40,
          height: isPointer ? 60 : 40,
          borderWidth: isClicking ? 1 : 1.5,
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50 mix-blend-difference flex items-center justify-center"
      >
        {/* Inner Dot */}
        <motion.div 
          animate={{
            scale: isClicking ? 0.5 : 1,
            opacity: isPointer ? 1 : 0.5,
          }}
          className="w-1 h-1 bg-primary rounded-full shadow-[0_0_10px_var(--primary)]" 
        />
        
        {/* HUD Data Lines */}
        {isPointer && (
          <motion.div 
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-primary/40" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-primary/40" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-primary/40" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-primary/40" />
          </motion.div>
        )}
      </motion.div>

      {/* Trailing Aura */}
      <motion.div 
        animate={{
            x: position.x,
            y: position.y,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
        className="fixed top-0 left-0 w-8 h-8 bg-primary/10 blur-xl rounded-full -translate-x-1/2 -translate-y-1/2 -z-10"
      />
    </div>
  );
}
