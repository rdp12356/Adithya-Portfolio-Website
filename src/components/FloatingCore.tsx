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
    
    if (ringRef1.current) {
      ringRef1.current.rotation.z = time * 0.3;
      ringRef1.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.z = -time * 0.2;
      ringRef2.current.rotation.y = Math.cos(time * 0.3) * 0.1;
    }

    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
    }
  });

  return (
    <group scale={1.5}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Holographic Image Core */}
        <mesh ref={meshRef}>
          <circleGeometry args={[1, 64]} />
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Digital Scanning Overlay */}
        <mesh position={[0, 0, 0.01]}>
          <circleGeometry args={[1, 64]} />
          <meshBasicMaterial
            color="#bd9dff"
            transparent
            opacity={0.15}
            wireframe
          />
        </mesh>

        {/* Outer Tech Shell */}
        <Sphere args={[1.05, 32, 32]}>
          <meshPhongMaterial
            color="#bd9dff"
            wireframe
            transparent
            opacity={0.05}
          />
        </Sphere>

        {/* Energy Rings */}
        <mesh ref={ringRef1} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.005, 16, 100]} />
          <meshBasicMaterial color="#bd9dff" transparent opacity={0.3} />
        </mesh>

        <mesh ref={ringRef2} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[1.8, 0.005, 16, 100]} />
          <meshBasicMaterial color="#6a9cff" transparent opacity={0.2} />
        </mesh>

        <pointLight intensity={1.5} distance={5} color="#bd9dff" />
      </Float>
    </group>
  );
}
