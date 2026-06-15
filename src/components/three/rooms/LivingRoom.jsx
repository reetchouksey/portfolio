import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * Living Room — About Me (vintage reading nook)
 * Walnut bookshelf with leather-bound books, wing armchair, brass floor lamp,
 * vintage wall clock, sepia photo on the wall, side table with teacup.
 */
export default function LivingRoom() {
  const clockHandRef = useRef();
  useFrame(({ clock }) => {
    if (clockHandRef.current) {
      clockHandRef.current.rotation.z = -clock.elapsedTime * 0.3;
    }
  });

  return (
    <group>
      {/* === Bookshelf (left back) === */}
      {/* Outer frame */}
      <mesh position={[-0.6, 0.6, -0.55]} castShadow>
        <boxGeometry args={[1, 1.16, 0.08]} />
        <meshStandardMaterial color="#3b2c14" roughness={0.85} />
      </mesh>
      {/* Inner panel */}
      <mesh position={[-0.6, 0.6, -0.52]}>
        <boxGeometry args={[0.92, 1.08, 0.02]} />
        <meshStandardMaterial color="#5a3318" roughness={0.85} />
      </mesh>
      {/* Shelves */}
      {[0.2, 0.5, 0.8, 1.05].map((y, i) => (
        <mesh key={i} position={[-0.6, y, -0.5]} castShadow>
          <boxGeometry args={[0.92, 0.03, 0.16]} />
          <meshStandardMaterial color="#8a5a2e" roughness={0.8} />
        </mesh>
      ))}
      {/* Books — leather-bound in warm browns/honey/terracotta */}
      {[
        // shelf 1 (low)
        ["#5a3318", -0.96, 0.32, 0.18],
        ["#9a4731", -0.84, 0.32, 0.22],
        ["#3b2c14", -0.72, 0.32, 0.2],
        ["#a87a3d", -0.6, 0.32, 0.18],
        ["#8a5a2e", -0.48, 0.32, 0.22],
        ["#9a4731", -0.36, 0.32, 0.2],
        ["#3b2c14", -0.24, 0.32, 0.18],
        // shelf 2 (mid)
        ["#8a5a2e", -0.96, 0.62, 0.2],
        ["#9a4731", -0.84, 0.62, 0.18],
        ["#5a3318", -0.72, 0.62, 0.22],
        ["#a87a3d", -0.6, 0.62, 0.2],
        ["#3b2c14", -0.48, 0.62, 0.18],
        ["#9a4731", -0.36, 0.62, 0.22],
        // shelf 3 (top) — slightly leaning + a stack
        ["#5a3318", -0.96, 0.92, 0.18],
        ["#a87a3d", -0.84, 0.92, 0.2],
        ["#9a4731", -0.72, 0.92, 0.16],
      ].map(([color, x, y, h], i) => (
        <mesh key={i} position={[x, y, -0.5]} castShadow>
          <boxGeometry args={[0.08, h, 0.1]} />
          <meshStandardMaterial color={color} roughness={0.8} />
        </mesh>
      ))}
      {/* Horizontal stacked books on top shelf */}
      <group position={[-0.42, 0.86, -0.5]}>
        <mesh castShadow>
          <boxGeometry args={[0.16, 0.04, 0.1]} />
          <meshStandardMaterial color="#9a4731" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.04, 0]} castShadow>
          <boxGeometry args={[0.14, 0.04, 0.1]} />
          <meshStandardMaterial color="#5a3318" roughness={0.8} />
        </mesh>
      </group>
      {/* Brass bookshelf trim band */}
      <mesh position={[-0.6, 0.16, -0.45]}>
        <boxGeometry args={[0.92, 0.012, 0.005]} />
        <meshStandardMaterial color="#a87a3d" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* === Vintage wing armchair === */}
      <group position={[0.45, 0.18, 0.18]} rotation={[0, -0.3, 0]}>
        {/* Seat cushion */}
        <mesh position={[0, 0.08, 0]} castShadow>
          <boxGeometry args={[0.5, 0.16, 0.46]} />
          <meshStandardMaterial color="#8a5a2e" roughness={0.85} />
        </mesh>
        {/* Backrest with wing */}
        <mesh position={[0, 0.32, -0.18]} castShadow>
          <boxGeometry args={[0.5, 0.5, 0.1]} />
          <meshStandardMaterial color="#5a3318" roughness={0.85} />
        </mesh>
        {/* Wing left */}
        <mesh position={[-0.2, 0.32, -0.05]} castShadow>
          <boxGeometry args={[0.05, 0.5, 0.36]} />
          <meshStandardMaterial color="#5a3318" roughness={0.85} />
        </mesh>
        {/* Wing right */}
        <mesh position={[0.2, 0.32, -0.05]} castShadow>
          <boxGeometry args={[0.05, 0.5, 0.36]} />
          <meshStandardMaterial color="#5a3318" roughness={0.85} />
        </mesh>
        {/* Cream throw pillow */}
        <mesh
          position={[-0.12, 0.18, 0.05]}
          rotation={[0.2, 0.1, 0]}
          castShadow
        >
          <boxGeometry args={[0.18, 0.08, 0.18]} />
          <meshStandardMaterial color="#f5ede0" roughness={0.95} />
        </mesh>
        {/* Knitted blanket draped */}
        <mesh
          position={[0.15, 0.16, 0.1]}
          rotation={[0, 0.2, -0.1]}
          castShadow
        >
          <boxGeometry args={[0.18, 0.04, 0.32]} />
          <meshStandardMaterial color="#c98a35" roughness={0.95} />
        </mesh>
        {/* Wood feet */}
        {[-0.18, 0.18].map((x, i) =>
          [-0.18, 0.18].map((z, j) => (
            <mesh key={`${i}-${j}`} position={[x, -0.02, z]} castShadow>
              <cylinderGeometry args={[0.02, 0.02, 0.06, 8]} />
              <meshStandardMaterial color="#3b2c14" roughness={0.9} />
            </mesh>
          ))
        )}
      </group>

      {/* === Side table with teacup and book === */}
      <group position={[0.85, 0.18, -0.25]}>
        {/* Round table top */}
        <mesh position={[0, 0.34, 0]} castShadow>
          <cylinderGeometry args={[0.16, 0.16, 0.03, 16]} />
          <meshStandardMaterial color="#5a3318" roughness={0.85} />
        </mesh>
        {/* Pedestal */}
        <mesh position={[0, 0.18, 0]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.32, 12]} />
          <meshStandardMaterial color="#3b2c14" roughness={0.85} />
        </mesh>
        {/* Base */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.12, 0.04, 16]} />
          <meshStandardMaterial color="#3b2c14" roughness={0.85} />
        </mesh>
        {/* Teacup */}
        <group position={[-0.04, 0.36, 0.04]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.04, 0.035, 0.05, 16]} />
            <meshStandardMaterial color="#faf5ec" roughness={0.6} />
          </mesh>
          {/* Saucer */}
          <mesh position={[0, -0.025, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.005, 16]} />
            <meshStandardMaterial color="#faf5ec" roughness={0.6} />
          </mesh>
          {/* Handle */}
          <mesh
            position={[0.04, 0, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <torusGeometry args={[0.018, 0.004, 6, 12]} />
            <meshStandardMaterial color="#faf5ec" roughness={0.6} />
          </mesh>
          {/* Tea liquid */}
          <mesh position={[0, 0.025, 0]}>
            <cylinderGeometry args={[0.038, 0.038, 0.001, 16]} />
            <meshStandardMaterial color="#5a3318" roughness={0.5} />
          </mesh>
        </group>
        {/* Open book */}
        <mesh position={[0.04, 0.36, -0.05]} rotation={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[0.16, 0.012, 0.12]} />
          <meshStandardMaterial color="#9a4731" roughness={0.85} />
        </mesh>
      </group>

      {/* === Brass floor lamp === */}
      <group position={[1.0, 0.18, 0.25]}>
        {/* Base */}
        <mesh castShadow>
          <cylinderGeometry args={[0.12, 0.14, 0.04, 16]} />
          <meshStandardMaterial color="#3b2c14" roughness={0.9} />
        </mesh>
        {/* Pole */}
        <mesh position={[0, 0.42, 0]} castShadow>
          <cylinderGeometry args={[0.012, 0.012, 0.84, 12]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.85} roughness={0.3} />
        </mesh>
        {/* Lamp shade — fabric cone */}
        <mesh position={[0, 0.92, 0]} castShadow>
          <coneGeometry args={[0.18, 0.22, 16, 1, true]} />
          <meshStandardMaterial
            color="#d4a04c"
            roughness={0.95}
            side={2}
          />
        </mesh>
        {/* Inner glow */}
        <mesh position={[0, 0.86, 0]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color="#fde9b8" toneMapped={false} />
        </mesh>
        <pointLight
          position={[0, 0.85, 0]}
          intensity={0.9}
          distance={1.4}
          decay={2}
          color="#d4a04c"
        />
      </group>

      {/* === Vintage wall clock === */}
      <group position={[0.55, 1.0, -0.55]} rotation={[0, 0, 0]}>
        {/* Outer wood frame */}
        <mesh castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.04, 24]} />
          <meshStandardMaterial color="#3b2c14" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0, 0.025]}>
          <cylinderGeometry args={[0.16, 0.16, 0.005, 24]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.7} roughness={0.4} />
        </mesh>
        {/* Face */}
        <mesh position={[0, 0, 0.029]}>
          <circleGeometry args={[0.14, 32]} />
          <meshBasicMaterial color="#f5ede0" />
        </mesh>
        {/* Hour numerals (12 ticks) */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.sin(a) * 0.11, Math.cos(a) * 0.11, 0.031]}
            >
              <boxGeometry args={[0.012, 0.025, 0.001]} />
              <meshBasicMaterial color="#3b2c14" />
            </mesh>
          );
        })}
        {/* Hands group */}
        <group ref={clockHandRef} position={[0, 0, 0.034]}>
          <mesh position={[0, 0.04, 0]}>
            <boxGeometry args={[0.008, 0.08, 0.002]} />
            <meshBasicMaterial color="#3b2c14" />
          </mesh>
          <mesh position={[0, 0.025, 0]}>
            <boxGeometry args={[0.012, 0.05, 0.002]} />
            <meshBasicMaterial color="#9a4731" />
          </mesh>
        </group>
        {/* Center pin */}
        <mesh position={[0, 0, 0.035]}>
          <cylinderGeometry args={[0.01, 0.01, 0.008, 12]} />
          <meshStandardMaterial color="#3b2c14" />
        </mesh>
      </group>

      {/* === Sepia framed photo on wall === */}
      <group position={[0.95, 0.95, -0.55]} rotation={[0, 0, 0.06]}>
        <mesh castShadow>
          <boxGeometry args={[0.28, 0.34, 0.03]} />
          <meshStandardMaterial color="#5a3318" roughness={0.85} />
        </mesh>
        {/* Mat */}
        <mesh position={[0, 0, 0.018]}>
          <planeGeometry args={[0.22, 0.28]} />
          <meshBasicMaterial color="#f5ede0" />
        </mesh>
        {/* Sepia abstract */}
        <mesh position={[0, -0.02, 0.022]}>
          <planeGeometry args={[0.16, 0.18]} />
          <meshBasicMaterial color="#a87a3d" />
        </mesh>
        <mesh position={[0, 0.05, 0.024]}>
          <circleGeometry args={[0.025, 16]} />
          <meshBasicMaterial color="#5a3318" />
        </mesh>
      </group>

      {/* === Persian rug === */}
      <mesh
        position={[0.4, 0.13, 0.25]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[1.0, 0.7]} />
        <meshStandardMaterial color="#9a4731" roughness={0.95} />
      </mesh>
      <mesh
        position={[0.4, 0.131, 0.25]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[0.9, 0.6]} />
        <meshStandardMaterial color="#c98a35" roughness={0.95} />
      </mesh>
      <mesh
        position={[0.4, 0.132, 0.25]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[0.6, 0.4]} />
        <meshStandardMaterial color="#5a3318" roughness={0.95} />
      </mesh>
    </group>
  );
}
