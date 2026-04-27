import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text, MeshDistortMaterial, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { portfolioData } from "@/data/portfolio";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  repo: string;
  live?: string;
  color: string;
}

interface ProjectHologramProps {
  project: Project;
  active: boolean;
  index: number;
  total: number;
}

function ProjectHologram({ project, active, index, total }: ProjectHologramProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const angle = (index / total) * Math.PI * 2;
  const radius = 5;
  
  useFrame((state) => {
    if (groupRef.current) {
      // Orbit around center
      const time = state.clock.getElapsedTime();
      const currentAngle = angle + time * 0.1;
      groupRef.current.position.x = Math.cos(currentAngle) * radius;
      groupRef.current.position.z = Math.sin(currentAngle) * radius;
      groupRef.current.rotation.y = -currentAngle + Math.PI / 2;
      
      // Floating effect
      groupRef.current.position.y = Math.sin(time + index) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh>
          <boxGeometry args={[3, 2, 0.1]} />
          <MeshDistortMaterial 
            color={active ? "#bd9dff" : "#444"}
            speed={2} 
            distort={0.2} 
            radius={1}
            opacity={0.8}
            transparent
          />
        </mesh>
        
        {/* Project Info on Hologram */}
        <Text
          position={[0, 0, 0.1]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
        >
          {project.title.toUpperCase()}
        </Text>
      </Float>
      
      {/* Decorative vertical line */}
      <mesh position={[0, -2.5, 0]}>
        <boxGeometry args={[0.02, 3, 0.02]} />
        <meshBasicMaterial color={active ? "#bd9dff" : "#333"} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export default function HologramProjects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const projects = portfolioData.projects;

  return (
    <div className="relative w-full h-[600px] glass rounded-[3rem] overflow-hidden group border-white/5">
      <div className="absolute top-10 left-10 z-10">
        <h3 className="text-sm font-bold text-primary uppercase tracking-[0.4em] mb-2">Interactive Portfolio</h3>
        <p className="text-[10px] text-white/30 uppercase tracking-widest italic">Rendering Interactive View</p>
      </div>

      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#bd9dff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6a9cff" />
        
        {projects.map((project, i) => (
          <ProjectHologram 
            key={project.title} 
            project={project} 
            active={i === activeIndex} 
            index={i} 
            total={projects.length}
          />
        ))}

        <ContactShadows opacity={0.4} scale={20} blur={2} far={4.5} />
        <Environment preset="city" />
      </Canvas>

      {/* Interface Overlay */}
      <div className="absolute inset-x-10 bottom-10 flex items-end justify-between z-10 pointer-events-none">
        <div className="max-w-xs pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <h4 className="text-3xl font-bold text-white tracking-tighter">{projects[activeIndex].title}</h4>
              <p className="text-xs text-white/40 leading-relaxed font-light italic">"{projects[activeIndex].description}"</p>
              <div className="flex gap-2">
                {projects[activeIndex].tech.map((tag: string) => (
                  <span key={tag} className="text-[8px] font-bold text-primary/60 border border-primary/20 px-2 py-1 rounded-md uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex gap-4 pointer-events-auto">
          <button 
            onClick={() => setActiveIndex((activeIndex - 1 + projects.length) % projects.length)}
            className="w-12 h-12 glass rounded-full flex items-center justify-center text-white/50 hover:text-primary transition-all hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => setActiveIndex((activeIndex + 1) % projects.length)}
            className="w-12 h-12 glass rounded-full flex items-center justify-center text-white/50 hover:text-primary transition-all hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary/20 to-transparent" />
      </div>
    </div>
  );
}
