import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * Trophy Room — Achievements (vintage display cabinet)
 * Stacked leather books, brass medal on a ribbon, framed sepia photo,
 * pocket watch, antique globe — warm gallery of memories.
 */
export default function TrophyRoom() {
  const watchRef = useRef();
  const ribbonRef = useRef();
  useFrame(({ clock }) => {
    if (watchRef.current) {
      watchRef.current.rotation.z =
        Math.sin(clock.elapsedTime * 1.2) * 0.18;
    }
    if (ribbonRef.current) {
      ribbonRef.current.rotation.y =
        Math.sin(clock.elapsedTime * 0.4) * 0.06;
    }
  });

  return (
    <group>
      {/* Wood shelf back panel */}
      <mesh position={[0, 0.78, -0.55]} castShadow>
        <boxGeometry args={[1.8, 1.4, 0.04]} />
        <meshStandardMaterial color="#5a3318" roughness={0.7} />
      </mesh>
      {/* Two horizontal shelves */}
      {[0.45, 0.95].map((y, i) => (
        <mesh key={i} position={[0, y, -0.42]} castShadow>
          <boxGeometry args={[1.7, 0.05, 0.28]} />
          <meshStandardMaterial color="#3b2c14" roughness={0.7} />
        </mesh>
      ))}
      {/* Shelf trim */}
      {[0.45, 0.95].map((y, i) => (
        <mesh key={i} position={[0, y - 0.025, -0.3]}>
          <boxGeometry args={[1.7, 0.01, 0.02]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.7} roughness={0.4} />
        </mesh>
      ))}

      {/* === Top shelf: book stack + framed sepia photo + pocket watch === */}
      {/* Stack of leather books */}
      <group position={[-0.55, 0.97, -0.4]}>
        {[
          { color: "#5a3318", w: 0.22, h: 0.05, z: 0 },
          { color: "#9a4731", w: 0.2, h: 0.05, z: 0.005 },
          { color: "#3b2c14", w: 0.24, h: 0.05, z: 0.002 },
          { color: "#a87a3d", w: 0.18, h: 0.05, z: 0 },
        ].map((b, i) => (
          <mesh
            key={i}
            position={[0, 0.025 + i * 0.05, b.z]}
            rotation={[0, i * 0.05 - 0.05, 0]}
            castShadow
          >
            <boxGeometry args={[b.w, b.h, 0.18]} />
            <meshStandardMaterial color={b.color} roughness={0.8} />
          </mesh>
        ))}
        {/* Gold spine band */}
        <mesh position={[0.01, 0.04, 0.092]}>
          <boxGeometry args={[0.16, 0.012, 0.005]} />
          <meshStandardMaterial color="#d4a04c" metalness={0.7} roughness={0.4} />
        </mesh>
      </group>

      {/* Framed sepia photo */}
      <group position={[0, 1.08, -0.4]} rotation={[0, 0.05, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.32, 0.26, 0.03]} />
          <meshStandardMaterial color="#8a5a2e" roughness={0.7} />
        </mesh>
        {/* Mat */}
        <mesh position={[0, 0, 0.018]}>
          <planeGeometry args={[0.26, 0.2]} />
          <meshBasicMaterial color="#f5ede0" />
        </mesh>
        {/* Sepia silhouette */}
        <mesh position={[0, -0.02, 0.02]}>
          <planeGeometry args={[0.18, 0.13]} />
          <meshBasicMaterial color="#a87a3d" />
        </mesh>
        <mesh position={[0, 0.04, 0.022]}>
          <circleGeometry args={[0.025, 16]} />
          <meshBasicMaterial color="#5a3318" />
        </mesh>
      </group>

      {/* Pocket watch */}
      <group ref={watchRef} position={[0.55, 1.05, -0.36]} rotation={[0.1, 0, 0.1]}>
        {/* Chain */}
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={i}
            position={[-0.02 - i * 0.015, 0.13 - i * 0.012, 0]}
            castShadow
          >
            <torusGeometry args={[0.008, 0.002, 6, 12]} />
            <meshStandardMaterial color="#a87a3d" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
        {/* Body */}
        <mesh castShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.02, 24]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Crown */}
        <mesh position={[0, 0.075, 0]} castShadow>
          <cylinderGeometry args={[0.012, 0.012, 0.025, 12]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Face */}
        <mesh position={[0, 0, 0.011]}>
          <circleGeometry args={[0.06, 32]} />
          <meshBasicMaterial color="#f5ede0" />
        </mesh>
        {/* Hour ticks */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.sin(a) * 0.045, Math.cos(a) * 0.045, 0.012]}
            >
              <boxGeometry args={[0.005, 0.012, 0.002]} />
              <meshBasicMaterial color="#3b2c14" />
            </mesh>
          );
        })}
        {/* Clock hands */}
        <mesh position={[0, 0.01, 0.013]} rotation={[0, 0, -0.5]}>
          <boxGeometry args={[0.005, 0.04, 0.002]} />
          <meshBasicMaterial color="#3b2c14" />
        </mesh>
        <mesh position={[0, 0.005, 0.014]} rotation={[0, 0, 0.8]}>
          <boxGeometry args={[0.004, 0.025, 0.002]} />
          <meshBasicMaterial color="#9a4731" />
        </mesh>
      </group>

      {/* === Bottom shelf: brass medal on ribbon, vintage globe, certificate === */}
      {/* Brass medal hanging from ribbon */}
      <group ref={ribbonRef} position={[-0.55, 0.62, -0.36]}>
        {/* Ribbon */}
        <mesh position={[0, 0.18, 0]} rotation={[0, 0, -0.1]} castShadow>
          <boxGeometry args={[0.06, 0.18, 0.005]} />
          <meshStandardMaterial color="#9a4731" roughness={0.85} />
        </mesh>
        <mesh position={[0.012, 0.18, 0]} rotation={[0, 0, 0.1]} castShadow>
          <boxGeometry args={[0.06, 0.18, 0.005]} />
          <meshStandardMaterial color="#c98a35" roughness={0.85} />
        </mesh>
        {/* Medal disc */}
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.018, 24]} />
          <meshStandardMaterial color="#d4a04c" metalness={0.9} roughness={0.2} emissive="#a87a3d" emissiveIntensity={0.15} />
        </mesh>
        {/* Star embossed */}
        <mesh position={[0, 0, 0.012]}>
          <circleGeometry args={[0.05, 5]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Antique globe */}
      <group position={[0, 0.62, -0.36]}>
        {/* Stand */}
        <mesh position={[0, 0.04, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 0.04, 16]} />
          <meshStandardMaterial color="#3b2c14" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.08, 0]} castShadow>
          <cylinderGeometry args={[0.005, 0.005, 0.06, 8]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Globe sphere */}
        <mesh position={[0, 0.18, 0]} castShadow>
          <sphereGeometry args={[0.1, 24, 24]} />
          <meshStandardMaterial color="#c98a35" roughness={0.8} />
        </mesh>
        {/* Continents abstraction */}
        <mesh position={[0.06, 0.2, 0.06]} rotation={[0, 0.5, 0.3]}>
          <sphereGeometry args={[0.045, 12, 12, 0, Math.PI]} />
          <meshBasicMaterial color="#7a8442" />
        </mesh>
        {/* Brass meridian ring */}
        <mesh position={[0, 0.18, 0]} rotation={[0, 0, 0.2]}>
          <torusGeometry args={[0.105, 0.005, 6, 32]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Rolled certificate / scroll */}
      <group position={[0.5, 0.51, -0.36]} rotation={[0, 0.3, 0]}>
        <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.32, 16]} />
          <meshStandardMaterial color="#faf5ec" roughness={0.95} />
        </mesh>
        {/* Wax seal */}
        <mesh position={[0, 0, 0.04]} castShadow>
          <cylinderGeometry args={[0.022, 0.022, 0.008, 16]} />
          <meshStandardMaterial color="#9a4731" roughness={0.6} />
        </mesh>
        {/* Tied ribbon */}
        <mesh position={[0, -0.005, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.045, 0.004, 6, 16]} />
          <meshStandardMaterial color="#9a4731" roughness={0.85} />
        </mesh>
      </group>

      {/* Floor: braided rug */}
      <mesh position={[0, 0.13, 0.3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[0.2, 0.62, 32]} />
        <meshStandardMaterial color="#9a4731" roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.131, 0.3]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.32, 0.5, 32]} />
        <meshStandardMaterial color="#c98a35" roughness={0.95} />
      </mesh>
    </group>
  );
}
