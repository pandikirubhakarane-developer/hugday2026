import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Heart({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x + 0.25, y + 0.25);
    shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.1, y, x, y);
    shape.bezierCurveTo(x - 0.15, y, x - 0.15, y + 0.175, x - 0.15, y + 0.175);
    shape.bezierCurveTo(x - 0.15, y + 0.275, x - 0.075, y + 0.4125, x + 0.25, y + 0.525);
    shape.bezierCurveTo(x + 0.575, y + 0.4125, x + 0.65, y + 0.275, x + 0.65, y + 0.175);
    shape.bezierCurveTo(x + 0.65, y + 0.175, x + 0.65, y, x + 0.5, y);
    shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);
    return shape;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.15,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    });
    geo.center();
    geo.rotateZ(Math.PI);
    return geo;
  }, [heartShape]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.3;
    meshRef.current.rotation.x = Math.cos(t * 0.3) * 0.1;
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
      <meshStandardMaterial
        color="#e8466a"
        emissive="#d4365a"
        emissiveIntensity={0.4}
        roughness={0.3}
        metalness={0.2}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

function Particles({ count = 80 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      sz[i] = Math.random() * 0.05 + 0.02;
    }
    return [pos, sz];
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    const posAttr = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const y = posAttr.getY(i);
      posAttr.setY(i, y + Math.sin(state.clock.elapsedTime + i) * 0.001);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#ffb6c1"
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Scene() {
  const hearts = useMemo(() => [
    { position: [-2.5, 1, -2] as [number, number, number], scale: 0.6, speed: 0.4 },
    { position: [2.8, -0.5, -1.5] as [number, number, number], scale: 0.45, speed: 0.55 },
    { position: [-1, -1.5, -3] as [number, number, number], scale: 0.35, speed: 0.65 },
    { position: [1.5, 1.8, -2.5] as [number, number, number], scale: 0.5, speed: 0.35 },
    { position: [0, 0, -4] as [number, number, number], scale: 0.7, speed: 0.3 },
    { position: [-3, -0.8, -3.5] as [number, number, number], scale: 0.3, speed: 0.5 },
    { position: [3.2, 1.2, -3] as [number, number, number], scale: 0.4, speed: 0.45 },
  ], []);

  return (
    <>
      <ambientLight intensity={0.3} color="#ffb6c1" />
      <pointLight position={[0, 3, 2]} intensity={1.5} color="#e8466a" />
      <pointLight position={[-3, -2, 3]} intensity={0.8} color="#ff69b4" />
      <pointLight position={[3, 1, -2]} intensity={0.6} color="#daa520" />
      {hearts.map((h, i) => (
        <Heart key={i} {...h} />
      ))}
      <Particles />
    </>
  );
}

export default function FloatingHearts() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
