import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Sphere, MeshWobbleMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function FloatingCore() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef1 = useRef<THREE.Mesh>(null!);
  const ringRef2 = useRef<THREE.Mesh>(null!);

  const texture = useTexture("/profile.jpg");

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // The rings still rotate, but the photo stays stable
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
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Flat Profile Photo - Perfect Visibility */}
        <mesh ref={meshRef}>
          <circleGeometry args={[1, 64]} />
          <meshBasicMaterial
            map={texture}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>

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
