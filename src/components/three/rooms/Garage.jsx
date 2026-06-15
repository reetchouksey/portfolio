import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * Garage — Projects (vintage workshop)
 * Wooden workbench with rolled blueprints, paper tags hanging from twine,
 * leather suitcase, brass drafting compass, jar of brushes — like a
 * scrapbook page of the maker's craft.
 */
export default function Garage() {
  const tagsRef = useRef();
  useFrame(({ clock }) => {
    if (!tagsRef.current) return;
    tagsRef.current.children.forEach((c, i) => {
      c.rotation.z =
        Math.sin(clock.elapsedTime * 1.0 + i) * 0.18 - 0.05;
    });
  });

  return (
    <group>
      {/* Twine string across back wall — paper tags hang from it */}
      <mesh position={[0, 1.15, -0.5]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.003, 0.003, 1.7, 6]} />
        <meshStandardMaterial color="#5a3318" roughness={0.95} />
      </mesh>

      {/* Hanging paper tags */}
      <group ref={tagsRef} position={[0, 1.05, -0.46]}>
        {[
          { x: -0.65, label: "DREAM", color: "#f5ede0" },
          { x: -0.32, label: "BUILD", color: "#e8d8b8" },
          { x: 0, label: "SHIP", color: "#faf5ec" },
          { x: 0.32, label: "REPEAT", color: "#e8d8b8" },
          { x: 0.65, label: "CRAFT", color: "#f5ede0" },
        ].map((t, i) => (
          <group key={i} position={[t.x, 0, 0]}>
            {/* Tiny twine drop */}
            <mesh position={[0, 0.07, 0]}>
              <cylinderGeometry args={[0.002, 0.002, 0.06, 6]} />
              <meshStandardMaterial color="#5a3318" />
            </mesh>
            {/* Tag */}
            <mesh position={[0, -0.04, 0]} castShadow>
              <boxGeometry args={[0.16, 0.18, 0.005]} />
              <meshStandardMaterial color={t.color} roughness={0.95} />
            </mesh>
            {/* Hole punch ring */}
            <mesh position={[0, 0.03, 0.003]}>
              <torusGeometry args={[0.012, 0.003, 6, 12]} />
              <meshStandardMaterial color="#a87a3d" metalness={0.7} roughness={0.4} />
            </mesh>
            {/* Faux text strip */}
            <mesh position={[0, -0.04, 0.003]}>
              <planeGeometry args={[0.1, 0.012]} />
              <meshBasicMaterial color="#3b2c14" />
            </mesh>
          </group>
        ))}
      </group>

      {/* Workbench top */}
      <mesh position={[0, 0.34, -0.25]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 0.08, 0.78]} />
        <meshStandardMaterial color="#5a3318" roughness={0.85} />
      </mesh>
      {/* Bench plank seam */}
      <mesh position={[0, 0.381, -0.25]}>
        <boxGeometry args={[1.7, 0.001, 0.05]} />
        <meshStandardMaterial color="#3b2c14" />
      </mesh>
      {/* Bench legs */}
      {[
        [-0.75, 0.16, 0.1],
        [0.75, 0.16, 0.1],
        [-0.75, 0.16, -0.55],
        [0.75, 0.16, -0.55],
      ].map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <boxGeometry args={[0.08, 0.34, 0.08]} />
          <meshStandardMaterial color="#3b2c14" roughness={0.9} />
        </mesh>
      ))}

      {/* Rolled blueprints stacked on the bench */}
      <group position={[-0.55, 0.43, -0.3]} rotation={[0, 0.1, 0]}>
        {/* Bottom roll */}
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.42, 16]} />
          <meshStandardMaterial color="#e8d8b8" roughness={0.95} />
        </mesh>
        {/* Top roll */}
        <mesh
          position={[0.02, 0.085, 0.04]}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry args={[0.045, 0.045, 0.36, 16]} />
          <meshStandardMaterial color="#faf5ec" roughness={0.95} />
        </mesh>
        {/* Blueprint twine ring */}
        <mesh position={[0.02, 0.085, 0.04]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.046, 0.004, 6, 24]} />
          <meshStandardMaterial color="#9a4731" roughness={0.85} />
        </mesh>
      </group>

      {/* Open drafted page on bench */}
      <mesh
        position={[0.05, 0.385, -0.1]}
        rotation={[-Math.PI / 2, 0, 0.1]}
        castShadow
      >
        <planeGeometry args={[0.5, 0.36]} />
        <meshStandardMaterial color="#faf5ec" roughness={0.95} />
      </mesh>
      {/* Faint sketch grid on the page */}
      {[-0.12, -0.04, 0.04, 0.12].map((y, i) => (
        <mesh
          key={i}
          position={[0.05, 0.387, -0.1 + y]}
          rotation={[-Math.PI / 2, 0, 0.1]}
        >
          <planeGeometry args={[0.42, 0.001]} />
          <meshBasicMaterial color="#9a4731" transparent opacity={0.35} />
        </mesh>
      ))}
      {/* Sketched diagonal line representing a drawing */}
      <mesh
        position={[0.05, 0.388, -0.1]}
        rotation={[-Math.PI / 2, 0, 0.5]}
      >
        <planeGeometry args={[0.32, 0.005]} />
        <meshBasicMaterial color="#3b2c14" transparent opacity={0.7} />
      </mesh>

      {/* Drafting compass */}
      <group position={[0.45, 0.39, -0.05]} rotation={[0, 0, 0.2]}>
        {/* Hinge */}
        <mesh position={[0, 0.06, 0]} castShadow>
          <sphereGeometry args={[0.012, 12, 12]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.85} roughness={0.3} />
        </mesh>
        {/* Left leg */}
        <mesh position={[-0.025, 0.025, 0]} rotation={[0, 0, 0.4]} castShadow>
          <cylinderGeometry args={[0.005, 0.005, 0.1, 8]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.85} roughness={0.3} />
        </mesh>
        {/* Right leg */}
        <mesh position={[0.025, 0.025, 0]} rotation={[0, 0, -0.4]} castShadow>
          <cylinderGeometry args={[0.005, 0.005, 0.1, 8]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.85} roughness={0.3} />
        </mesh>
      </group>

      {/* Jar of brushes / pencils */}
      <group position={[0.6, 0.42, -0.55]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.07, 0.06, 0.16, 16]} />
          <meshStandardMaterial
            color="#d4ad84"
            transparent
            opacity={0.55}
            roughness={0.2}
          />
        </mesh>
        {[
          { color: "#3b2c14", lean: 0 },
          { color: "#9a4731", lean: -0.15 },
          { color: "#d4a04c", lean: 0.12 },
          { color: "#5a3318", lean: 0.06 },
          { color: "#7a8442", lean: -0.08 },
        ].map((p, i) => (
          <mesh
            key={i}
            position={[(i - 2) * 0.012, 0.16, (i % 2) * 0.012]}
            rotation={[0, 0, p.lean]}
            castShadow
          >
            <cylinderGeometry args={[0.008, 0.008, 0.24, 8]} />
            <meshStandardMaterial color={p.color} roughness={0.7} />
          </mesh>
        ))}
      </group>

      {/* Vintage leather suitcase on the floor */}
      <group position={[-0.65, 0.18, 0.3]} rotation={[0, 0.4, 0]}>
        {/* Body */}
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.22, 0.32]} />
          <meshStandardMaterial color="#8a5a2e" roughness={0.85} />
        </mesh>
        {/* Belt straps */}
        <mesh position={[-0.14, 0, 0.001]}>
          <boxGeometry args={[0.04, 0.24, 0.33]} />
          <meshStandardMaterial color="#3b2c14" roughness={0.9} />
        </mesh>
        <mesh position={[0.14, 0, 0.001]}>
          <boxGeometry args={[0.04, 0.24, 0.33]} />
          <meshStandardMaterial color="#3b2c14" roughness={0.9} />
        </mesh>
        {/* Brass clasp */}
        <mesh position={[-0.14, 0, 0.165]}>
          <boxGeometry args={[0.045, 0.04, 0.012]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.85} roughness={0.3} />
        </mesh>
        <mesh position={[0.14, 0, 0.165]}>
          <boxGeometry args={[0.045, 0.04, 0.012]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.85} roughness={0.3} />
        </mesh>
        {/* Handle */}
        <mesh position={[0, 0.13, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.05, 0.012, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#3b2c14" roughness={0.9} />
        </mesh>
      </group>

      {/* Small ink splatter on bench (decoration) */}
      {[
        { x: -0.2, z: -0.4, r: 0.018 },
        { x: -0.18, z: -0.36, r: 0.008 },
        { x: -0.24, z: -0.34, r: 0.006 },
      ].map((s, i) => (
        <mesh
          key={i}
          position={[s.x, 0.385, s.z]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <circleGeometry args={[s.r, 12]} />
          <meshBasicMaterial color="#3b2c14" />
        </mesh>
      ))}

      {/* Hanging Edison bulb — matches the writer's desk */}
      <group position={[-0.05, 1.4, 0.15]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.006, 0.006, 0.55, 8]} />
          <meshStandardMaterial color="#3b2c14" roughness={0.9} />
        </mesh>
        <mesh position={[0, -0.27, 0]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.04, 12]} />
          <meshStandardMaterial color="#8a5a2e" metalness={0.7} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.3, 0]} castShadow>
          <cylinderGeometry args={[0.028, 0.022, 0.025, 12]} />
          <meshStandardMaterial color="#a87a3d" metalness={0.85} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.37, 0]} castShadow>
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
        <mesh position={[0, -0.37, 0]}>
          <boxGeometry args={[0.005, 0.04, 0.005]} />
          <meshBasicMaterial color="#fde9b8" toneMapped={false} />
        </mesh>
        <pointLight
          position={[0, -0.37, 0]}
          intensity={0.6}
          distance={1.2}
          decay={2}
          color="#c98a35"
        />
      </group>
    </group>
  );
}
