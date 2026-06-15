import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * Office Room — Skills (Writer's desk)
 * Vintage typewriter, ink bottle & quill, stack of papers, jar of pencils,
 * leather notebook on a warm wooden desk. Scrapbook / journal aesthetic.
 */
export default function OfficeRoom() {
  const paperRef = useRef();
  useFrame(({ clock }) => {
    if (paperRef.current) {
      paperRef.current.rotation.z =
        Math.sin(clock.elapsedTime * 0.6) * 0.02;
    }
  });

  return (
    <group>
      {/* Wooden writing desk top */}
      <mesh position={[0, 0.36, -0.32]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.08, 0.78]} />
        <meshStandardMaterial color="#8a5a2e" roughness={0.7} />
      </mesh>
      {/* Desk drawer trim */}
      <mesh position={[0, 0.31, 0.04]} castShadow>
        <boxGeometry args={[1.6, 0.04, 0.06]} />
        <meshStandardMaterial color="#5a3318" roughness={0.7} />
      </mesh>
      {/* Desk legs */}
      {[
        [-0.7, 0.18, -0.12],
        [0.7, 0.18, -0.12],
        [-0.7, 0.18, -0.6],
        [0.7, 0.18, -0.6],
      ].map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <boxGeometry args={[0.06, 0.36, 0.06]} />
          <meshStandardMaterial color="#5a3318" roughness={0.7} />
        </mesh>
      ))}

      {/* Typewriter — body */}
      <group position={[0, 0.42, -0.36]}>
        {/* Base block */}
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.16, 0.42]} />
          <meshStandardMaterial color="#2a1f0e" metalness={0.5} roughness={0.5} />
        </mesh>
        {/* Bevel top */}
        <mesh position={[0, 0.1, 0]} castShadow>
          <boxGeometry args={[0.62, 0.05, 0.34]} />
          <meshStandardMaterial color="#3b2c14" metalness={0.5} roughness={0.5} />
        </mesh>
        {/* Carriage rail */}
        <mesh position={[0, 0.16, -0.08]} castShadow>
          <boxGeometry args={[0.7, 0.05, 0.1]} />
          <meshStandardMaterial color="#1a1308" metalness={0.7} roughness={0.4} />
        </mesh>
        {/* Spool wheels */}
        <mesh position={[-0.27, 0.2, -0.08]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.04, 16]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.7} roughness={0.4} />
        </mesh>
        <mesh position={[0.27, 0.2, -0.08]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.04, 16]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.7} roughness={0.4} />
        </mesh>

        {/* Paper sticking out top */}
        <group ref={paperRef} position={[0, 0.18, -0.05]} rotation={[-0.25, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.5, 0.32, 0.005]} />
            <meshStandardMaterial color="#faf5ec" roughness={0.95} />
          </mesh>
          {/* Typed lines */}
          {[0.1, 0.04, -0.02, -0.08].map((y, i) => (
            <mesh key={i} position={[-0.02, y, 0.003]}>
              <planeGeometry args={[0.36 - i * 0.04, 0.012]} />
              <meshBasicMaterial color="#3b2c14" />
            </mesh>
          ))}
        </group>

        {/* Keys — three rows of small round keys */}
        {Array.from({ length: 3 }).map((_, row) =>
          Array.from({ length: 9 }).map((__, col) => (
            <mesh
              key={`${row}-${col}`}
              position={[
                -0.24 + col * 0.06,
                0.135,
                0.04 + row * 0.05,
              ]}
              castShadow
            >
              <cylinderGeometry args={[0.018, 0.018, 0.012, 12]} />
              <meshStandardMaterial color="#f5ede0" roughness={0.6} />
            </mesh>
          ))
        )}
        {/* Space bar */}
        <mesh position={[0, 0.135, 0.2]} castShadow>
          <boxGeometry args={[0.36, 0.012, 0.025]} />
          <meshStandardMaterial color="#f5ede0" roughness={0.6} />
        </mesh>
      </group>

      {/* Ink bottle */}
      <group position={[-0.6, 0.41, -0.3]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.08, 12]} />
          <meshStandardMaterial color="#2a1f0e" metalness={0.3} roughness={0.4} />
        </mesh>
        {/* Cap */}
        <mesh position={[0, 0.06, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.04, 12]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.7} roughness={0.4} />
        </mesh>
      </group>

      {/* Quill pen — leaning against the ink bottle */}
      <mesh position={[-0.55, 0.55, -0.22]} rotation={[0, 0, 0.6]} castShadow>
        <cylinderGeometry args={[0.005, 0.005, 0.34, 8]} />
        <meshStandardMaterial color="#5a3318" />
      </mesh>
      <mesh position={[-0.4, 0.69, -0.18]} rotation={[0, 0, -0.4]} castShadow>
        <coneGeometry args={[0.04, 0.18, 8]} />
        <meshStandardMaterial color="#d4a04c" roughness={0.9} />
      </mesh>

      {/* Stack of papers */}
      <group position={[0.6, 0.42, -0.3]}>
        {[0, 0.012, 0.024, 0.036].map((y, i) => (
          <mesh
            key={i}
            position={[0, y, 0]}
            rotation={[0, (i % 2 ? 0.04 : -0.03), 0]}
            castShadow
          >
            <boxGeometry args={[0.32, 0.005, 0.4]} />
            <meshStandardMaterial color={i === 0 ? "#e8d8b8" : "#faf5ec"} roughness={0.95} />
          </mesh>
        ))}
        {/* Top sheet handwritten lines */}
        {[0.12, 0.06, 0, -0.06, -0.12].map((z, i) => (
          <mesh key={i} position={[0, 0.042, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.22 - i * 0.02, 0.008]} />
            <meshBasicMaterial color="#5a3318" opacity={0.7} transparent />
          </mesh>
        ))}
      </group>

      {/* Mason jar with pencils & brushes */}
      <group position={[0.6, 0.45, -0.6]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.07, 0.06, 0.16, 16]} />
          <meshStandardMaterial
            color="#d4ad84"
            transparent
            opacity={0.6}
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>
        {/* Pencils & brushes sticking out */}
        {[
          { color: "#d4a04c", x: 0, y: 0.15, z: 0, lean: 0 },
          { color: "#9a4731", x: -0.025, y: 0.16, z: 0, lean: -0.15 },
          { color: "#3b2c14", x: 0.025, y: 0.15, z: 0.01, lean: 0.12 },
          { color: "#7a8442", x: 0, y: 0.16, z: -0.025, lean: 0.05 },
        ].map((p, i) => (
          <mesh
            key={i}
            position={[p.x, p.y, p.z]}
            rotation={[0, 0, p.lean]}
            castShadow
          >
            <cylinderGeometry args={[0.008, 0.008, 0.22, 8]} />
            <meshStandardMaterial color={p.color} roughness={0.7} />
          </mesh>
        ))}
      </group>

      {/* Leather notebook */}
      <mesh position={[-0.25, 0.41, -0.05]} rotation={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.28, 0.04, 0.36]} />
        <meshStandardMaterial color="#5a3318" roughness={0.85} />
      </mesh>
      {/* Notebook strap */}
      <mesh position={[-0.25, 0.435, -0.05]} rotation={[0, 0.2, 0]}>
        <boxGeometry args={[0.04, 0.005, 0.36]} />
        <meshStandardMaterial color="#3b2c14" roughness={0.95} />
      </mesh>

      {/* Wax seal stamp + small brass dot */}
      <mesh position={[0.25, 0.41, 0.0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.025, 16]} />
        <meshStandardMaterial color="#9a4731" roughness={0.6} />
      </mesh>

      {/* Vintage stool */}
      <group position={[0, 0.18, 0.3]}>
        <mesh position={[0, 0.18, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.16, 0.05, 16]} />
          <meshStandardMaterial color="#8a5a2e" roughness={0.7} />
        </mesh>
        {[
          [-0.12, 0.04, 0.1],
          [0.12, 0.04, 0.1],
          [-0.12, 0.04, -0.1],
          [0.12, 0.04, -0.1],
        ].map((p, i) => (
          <mesh key={i} position={p} rotation={[0, 0, 0.05]} castShadow>
            <cylinderGeometry args={[0.012, 0.012, 0.32, 8]} />
            <meshStandardMaterial color="#5a3318" roughness={0.7} />
          </mesh>
        ))}
      </group>

      {/* Hanging Edison bulb — vintage brass + amber glass */}
      <group position={[0.05, 1.4, -0.1]}>
        {/* Cord */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.006, 0.006, 0.6, 8]} />
          <meshStandardMaterial color="#3b2c14" roughness={0.9} />
        </mesh>
        {/* Brass socket cap */}
        <mesh position={[0, -0.3, 0]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.04, 12]} />
          <meshStandardMaterial color="#8a5a2e" metalness={0.7} roughness={0.4} />
        </mesh>
        {/* Threaded brass band */}
        <mesh position={[0, -0.33, 0]} castShadow>
          <cylinderGeometry args={[0.028, 0.022, 0.025, 12]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.85} roughness={0.3} />
        </mesh>
        {/* Amber glass bulb */}
        <mesh position={[0, -0.4, 0]} castShadow>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial
            color="#9a4731"
            emissive="#c98a35"
            emissiveIntensity={0.55}
            metalness={0.4}
            roughness={0.35}
            transparent
            opacity={0.92}
          />
        </mesh>
        {/* Glowing filament inside */}
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[0.005, 0.04, 0.005]} />
          <meshBasicMaterial color="#fde9b8" toneMapped={false} />
        </mesh>
        {/* Soft pool of warm light */}
        <pointLight
          position={[0, -0.4, 0]}
          intensity={0.7}
          distance={1.2}
          decay={2}
          color="#c98a35"
        />
      </group>
    </group>
  );
}
