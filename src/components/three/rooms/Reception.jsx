import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * Reception — Contact (vintage post office counter)
 * Wooden post counter with stacked envelopes, vintage postbox,
 * brass service bell, ink stamp, postal scale, wax seal.
 */
export default function Reception() {
  const bellRef = useRef();
  const scaleRef = useRef();
  useFrame(({ clock }) => {
    if (bellRef.current) {
      bellRef.current.rotation.z =
        Math.sin(clock.elapsedTime * 1.5) * 0.04;
    }
    if (scaleRef.current) {
      scaleRef.current.position.y =
        0.42 + Math.sin(clock.elapsedTime * 0.8) * 0.005;
    }
  });

  return (
    <group>
      {/* Wooden counter base */}
      <mesh position={[0, 0.22, -0.1]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 0.44, 0.5]} />
        <meshStandardMaterial color="#5a3318" roughness={0.85} />
      </mesh>
      {/* Counter front panels */}
      {[-0.5, 0, 0.5].map((x, i) => (
        <mesh key={i} position={[x, 0.22, 0.16]}>
          <boxGeometry args={[0.36, 0.36, 0.005]} />
          <meshStandardMaterial color="#3b2c14" roughness={0.85} />
        </mesh>
      ))}
      {/* Counter top with overhang */}
      <mesh position={[0, 0.46, -0.08]} castShadow>
        <boxGeometry args={[1.78, 0.04, 0.56]} />
        <meshStandardMaterial color="#3b2c14" roughness={0.8} />
      </mesh>
      {/* Brass trim band */}
      <mesh position={[0, 0.495, 0.16]}>
        <boxGeometry args={[1.78, 0.012, 0.005]} />
        <meshStandardMaterial color="#a87a3d" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* === Vintage postbox (left) === */}
      <group position={[-0.6, 0.62, -0.15]}>
        {/* Body — terracotta red */}
        <mesh castShadow>
          <cylinderGeometry args={[0.16, 0.16, 0.38, 16]} />
          <meshStandardMaterial color="#9a4731" roughness={0.7} />
        </mesh>
        {/* Domed top */}
        <mesh position={[0, 0.21, 0]} castShadow>
          <sphereGeometry args={[0.16, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#9a4731" roughness={0.7} />
        </mesh>
        {/* Letter slot */}
        <mesh position={[0, 0.1, 0.16]}>
          <boxGeometry args={[0.18, 0.025, 0.005]} />
          <meshBasicMaterial color="#1a1308" />
        </mesh>
        {/* "POST" label */}
        <mesh position={[0, -0.05, 0.16]}>
          <planeGeometry args={[0.16, 0.04]} />
          <meshBasicMaterial color="#f5ede0" />
        </mesh>
        {/* Brass collection door hinges */}
        <mesh position={[0.16, -0.12, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.04, 0.06, 0.008]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.85} roughness={0.3} />
        </mesh>
        {/* Royal-style finial on top */}
        <mesh position={[0, 0.42, 0]} castShadow>
          <cylinderGeometry args={[0.018, 0.018, 0.04, 12]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.85} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.46, 0]} castShadow>
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.85} roughness={0.3} />
        </mesh>
        {/* Base ring */}
        <mesh position={[0, -0.21, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.04, 16]} />
          <meshStandardMaterial color="#3b2c14" roughness={0.9} />
        </mesh>
      </group>

      {/* === Stacked envelopes on counter === */}
      <group position={[-0.05, 0.5, -0.04]}>
        {[0, 0.012, 0.024, 0.036, 0.048].map((y, i) => (
          <mesh
            key={i}
            position={[i * 0.005, y, (i % 2 ? 0.02 : -0.02)]}
            rotation={[0, (i % 2 ? 0.06 : -0.05), 0]}
            castShadow
          >
            <boxGeometry args={[0.32, 0.005, 0.22]} />
            <meshStandardMaterial
              color={i === 2 ? "#e8d8b8" : "#faf5ec"}
              roughness={0.95}
            />
          </mesh>
        ))}
        {/* Top envelope details — wax seal + address line */}
        <mesh position={[-0.08, 0.06, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.004, 12]} />
          <meshStandardMaterial color="#9a4731" roughness={0.5} />
        </mesh>
        {[0.04, -0.02, -0.06].map((z, i) => (
          <mesh
            key={i}
            position={[0.04, 0.058, z]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[0.18 - i * 0.03, 0.005]} />
            <meshBasicMaterial color="#3b2c14" />
          </mesh>
        ))}
      </group>

      {/* === Brass service bell === */}
      <group ref={bellRef} position={[0.5, 0.5, -0.04]}>
        {/* Base */}
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.09, 0.018, 16]} />
          <meshStandardMaterial color="#3b2c14" roughness={0.85} />
        </mesh>
        {/* Bell dome */}
        <mesh position={[0, 0.05, 0]} castShadow>
          <sphereGeometry args={[0.07, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#a87a3d"
            metalness={0.9}
            roughness={0.2}
            emissive="#5a3318"
            emissiveIntensity={0.1}
          />
        </mesh>
        {/* Plunger */}
        <mesh position={[0, 0.13, 0]} castShadow>
          <cylinderGeometry args={[0.012, 0.012, 0.04, 12]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.85} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.155, 0]} castShadow>
          <sphereGeometry args={[0.018, 12, 12]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.85} roughness={0.3} />
        </mesh>
      </group>

      {/* === Postal scale (animated, gentle bobbing) === */}
      <group position={[0.85, 0, -0.04]}>
        {/* Base */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[0.16, 0.04, 0.16]} />
          <meshStandardMaterial color="#3b2c14" roughness={0.85} />
        </mesh>
        {/* Pole */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <cylinderGeometry args={[0.008, 0.008, 0.16, 12]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.85} roughness={0.3} />
        </mesh>
        {/* Beam */}
        <mesh position={[0, 0.68, 0]} castShadow>
          <boxGeometry args={[0.22, 0.008, 0.008]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.85} roughness={0.3} />
        </mesh>
        {/* Pans on chains */}
        {[-1, 1].map((side, i) => (
          <group key={i} position={[side * 0.1, 0.68, 0]}>
            {[0, 1, 2, 3].map((j) => (
              <mesh
                key={j}
                position={[side * 0.005 * j, -0.04 - j * 0.025, 0]}
              >
                <torusGeometry args={[0.005, 0.001, 4, 8]} />
                <meshStandardMaterial color="#a87a3d" metalness={0.85} roughness={0.3} />
              </mesh>
            ))}
            <mesh
              ref={i === 0 ? scaleRef : null}
              position={[side * 0.018, -0.16, 0]}
              castShadow
            >
              <cylinderGeometry args={[0.05, 0.04, 0.012, 16]} />
              <meshStandardMaterial color="#a87a3d" metalness={0.85} roughness={0.3} />
            </mesh>
          </group>
        ))}
      </group>

      {/* === Ink stamp + ink pad === */}
      <group position={[0.18, 0.49, 0.06]} rotation={[0, 0.3, 0]}>
        {/* Pad */}
        <mesh castShadow>
          <boxGeometry args={[0.14, 0.018, 0.1]} />
          <meshStandardMaterial color="#3b2c14" roughness={0.85} />
        </mesh>
        {/* Pad surface */}
        <mesh position={[0, 0.012, 0]}>
          <boxGeometry args={[0.12, 0.001, 0.08]} />
          <meshStandardMaterial color="#9a4731" roughness={0.95} />
        </mesh>
        {/* Stamp handle */}
        <group position={[0.05, 0.04, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.025, 0.025, 0.04, 12]} />
            <meshStandardMaterial color="#5a3318" roughness={0.85} />
          </mesh>
          <mesh position={[0, 0.04, 0]} castShadow>
            <cylinderGeometry args={[0.012, 0.012, 0.05, 12]} />
            <meshStandardMaterial color="#3b2c14" roughness={0.85} />
          </mesh>
          <mesh position={[0, 0.075, 0]} castShadow>
            <sphereGeometry args={[0.022, 12, 12]} />
            <meshStandardMaterial color="#8a5a2e" roughness={0.85} />
          </mesh>
        </group>
      </group>

      {/* === "POST OFFICE" hanging signboard === */}
      <group position={[0, 1.2, -0.55]}>
        {/* Two chains */}
        <mesh position={[-0.28, 0.18, 0]}>
          <cylinderGeometry args={[0.003, 0.003, 0.32, 6]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.85} roughness={0.3} />
        </mesh>
        <mesh position={[0.28, 0.18, 0]}>
          <cylinderGeometry args={[0.003, 0.003, 0.32, 6]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.85} roughness={0.3} />
        </mesh>
        {/* Sign board */}
        <mesh castShadow>
          <boxGeometry args={[0.74, 0.18, 0.04]} />
          <meshStandardMaterial color="#5a3318" roughness={0.85} />
        </mesh>
        {/* Cream painted face */}
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[0.66, 0.12]} />
          <meshBasicMaterial color="#f5ede0" />
        </mesh>
        {/* Painted "POST" letters as little blocks */}
        {[-0.18, -0.06, 0.06, 0.18].map((x, i) => (
          <mesh key={i} position={[x, 0, 0.024]}>
            <boxGeometry args={[0.04, 0.06, 0.001]} />
            <meshBasicMaterial color="#9a4731" />
          </mesh>
        ))}
      </group>

      {/* === Cream paper note pinned on counter front === */}
      <mesh
        position={[0.0, 0.36, 0.165]}
        rotation={[0, 0, 0.04]}
        castShadow
      >
        <boxGeometry args={[0.16, 0.18, 0.003]} />
        <meshStandardMaterial color="#faf5ec" roughness={0.95} />
      </mesh>
      {/* Push pin */}
      <mesh position={[0.0, 0.42, 0.169]}>
        <cylinderGeometry args={[0.008, 0.008, 0.005, 12]} />
        <meshStandardMaterial color="#9a4731" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
}
