import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Environment } from "@react-three/drei";
import * as random from "maath/random";
import { useRef, useMemo, useState, useEffect } from "react";
import { useAuraStore } from "../store/useAuraStore";
import * as THREE from "three";

function StarField() {
  const ref = useRef<THREE.Points>(null!);
  const { frequency } = useAuraStore();
  const [velocity, setVelocity] = useState(0);
  
  const sphere = useMemo(() => {
    // Generate more points for a denser "warp" effect
    const positions = random.inSphere(new Float32Array(8000 * 3), { radius: 2.5 });
    return positions as Float32Array;
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = Math.abs(currentY - lastY);
      setVelocity(diff * 0.1); // Normalize velocity
      lastY = currentY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      const speed = frequency || 1;
      const baseRotation = delta * (speed * 0.05);
      const warpFactor = 1 + (velocity * 0.5);

      // Rotate the stars
      ref.current.rotation.x -= baseRotation;
      ref.current.rotation.y -= baseRotation * 1.5;

      // Pulse size based on velocity (Warp Speed effect)
      if (ref.current.material instanceof THREE.PointsMaterial) {
          ref.current.material.size = THREE.MathUtils.lerp(
            ref.current.material.size,
            0.002 + (velocity * 0.001),
            0.1
          );
          ref.current.material.opacity = THREE.MathUtils.lerp(
            ref.current.material.opacity,
            0.2 + (velocity * 0.3),
            0.05
          );
      }
      
      // Decay velocity
      setVelocity(v => v * 0.95);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#bd9dff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#020202]">
      {/* Background static glow with dynamic hue based on AuraSync might be cool, but let's stick to the theme */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(189,157,255,0.08),transparent_80%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(106,156,255,0.05),transparent_50%)]" />
      
      <Canvas 
        camera={{ position: [0, 0, 1.5], fov: 60 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <StarField />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
