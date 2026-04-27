import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Sphere, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function FloatingCore() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef1 = useRef<THREE.Mesh>(null!);
  const ringRef2 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
    }

    if (ringRef1.current) {
      ringRef1.current.rotation.z = time * 0.5;
      ringRef1.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.z = -time * 0.3;
      ringRef2.current.rotation.y = Math.cos(time * 0.3) * 0.2;
    }
  });

  return (
    <group scale={1.5}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        {/* Central Core */}
        <Sphere args={[1, 64, 64]} ref={meshRef}>
          <MeshDistortMaterial
            color="#bd9dff"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0}
            metalness={1}
            opacity={0.8}
            transparent
          />
        </Sphere>

        {/* Energy Rings */}
        <mesh ref={ringRef1} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.01, 16, 100]} />
          <meshBasicMaterial color="#bd9dff" transparent opacity={0.3} />
        </mesh>

        <mesh ref={ringRef2} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[1.8, 0.005, 16, 100]} />
          <meshBasicMaterial color="#6a9cff" transparent opacity={0.2} />
        </mesh>

        {/* Inner Glow */}
        <pointLight intensity={2} distance={5} color="#bd9dff" />
      </Float>
    </group>
  );
}
