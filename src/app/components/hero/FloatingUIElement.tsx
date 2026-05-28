import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";
import { HERO_COLORS, type UIElementConfig } from "./constants";
import { useHeroMotion } from "./HeroMotionProvider";

type FloatingUIElementProps = {
  config: UIElementConfig;
  index: number;
};

function GlassMaterial({ color = "#ffffff", opacity = 0.18 }: { color?: string; opacity?: number }) {
  return (
    <meshPhysicalMaterial
      color={color}
      transparent
      opacity={opacity}
      roughness={0.18}
      metalness={0.08}
      transmission={0.55}
      thickness={0.35}
      clearcoat={0.4}
      clearcoatRoughness={0.25}
    />
  );
}

function ButtonPiece() {
  return (
    <group>
      <RoundedBox args={[0.9, 0.28, 0.06]} radius={0.08} smoothness={4}>
        <meshStandardMaterial color={HERO_COLORS.primary} emissive={HERO_COLORS.primary} emissiveIntensity={0.35} metalness={0.2} roughness={0.35} />
      </RoundedBox>
      <Text position={[0, 0, 0.04]} fontSize={0.08} color={HERO_COLORS.text} anchorX="center" anchorY="middle">
        Deploy
      </Text>
    </group>
  );
}

function CardPiece() {
  return (
    <group>
      <RoundedBox args={[1.1, 0.75, 0.05]} radius={0.06} smoothness={4}>
        <GlassMaterial />
      </RoundedBox>
      <mesh position={[0, 0.22, 0.03]}>
        <planeGeometry args={[0.95, 0.18]} />
        <meshBasicMaterial color={HERO_COLORS.secondary} transparent opacity={0.35} />
      </mesh>
      <mesh position={[0, -0.05, 0.03]}>
        <planeGeometry args={[0.75, 0.05]} />
        <meshBasicMaterial color={HERO_COLORS.muted} transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, -0.15, 0.03]}>
        <planeGeometry args={[0.55, 0.05]} />
        <meshBasicMaterial color={HERO_COLORS.muted} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function ChartPiece() {
  const bars = [0.18, 0.32, 0.24, 0.42, 0.3];
  return (
    <group>
      <RoundedBox args={[1, 0.7, 0.05]} radius={0.05} smoothness={4}>
        <GlassMaterial opacity={0.14} />
      </RoundedBox>
      {bars.map((height, i) => (
        <mesh key={i} position={[-0.32 + i * 0.16, -0.18 + height / 2, 0.04]}>
          <boxGeometry args={[0.08, height, 0.04]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? HERO_COLORS.primary : HERO_COLORS.secondary}
            emissive={i % 2 === 0 ? HERO_COLORS.primary : HERO_COLORS.secondary}
            emissiveIntensity={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}

function CodePiece() {
  const lines = [
    { y: 0.18, width: 0.55, color: HERO_COLORS.accent },
    { y: 0.06, width: 0.72, color: HERO_COLORS.secondary },
    { y: -0.06, width: 0.48, color: HERO_COLORS.primary },
    { y: -0.18, width: 0.62, color: HERO_COLORS.muted },
  ];

  return (
    <group>
      <RoundedBox args={[1.05, 0.72, 0.05]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#0B1220" roughness={0.4} metalness={0.15} />
      </RoundedBox>
      {lines.map((line, i) => (
        <mesh key={i} position={[-0.12, line.y, 0.04]}>
          <planeGeometry args={[line.width, 0.05]} />
          <meshBasicMaterial color={line.color} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function NavPiece() {
  return (
    <group>
      <RoundedBox args={[1.35, 0.22, 0.05]} radius={0.05} smoothness={4}>
        <GlassMaterial />
      </RoundedBox>
      {[ -0.42, -0.14, 0.14, 0.42 ].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.04]}>
          <planeGeometry args={[0.18, 0.05]} />
          <meshBasicMaterial color={i === 0 ? HERO_COLORS.primary : HERO_COLORS.muted} transparent opacity={0.75} />
        </mesh>
      ))}
    </group>
  );
}

function ProductPiece() {
  return (
    <group>
      <RoundedBox args={[0.85, 1.05, 0.05]} radius={0.06} smoothness={4}>
        <GlassMaterial />
      </RoundedBox>
      <mesh position={[0, 0.22, 0.04]}>
        <planeGeometry args={[0.72, 0.42]} />
        <meshStandardMaterial color={HERO_COLORS.secondary} emissive={HERO_COLORS.secondary} emissiveIntensity={0.15} roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.28, 0.04]}>
        <planeGeometry args={[0.55, 0.06]} />
        <meshBasicMaterial color={HERO_COLORS.text} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

function DashboardPiece() {
  return (
    <group>
      <RoundedBox args={[1.15, 0.85, 0.05]} radius={0.05} smoothness={4}>
        <GlassMaterial opacity={0.12} />
      </RoundedBox>
      {[
        [-0.28, 0.18, 0.28, 0.22],
        [0.18, 0.18, 0.28, 0.22],
        [-0.28, -0.18, 0.28, 0.22],
        [0.18, -0.18, 0.28, 0.22],
      ].map(([x, y, w, h], i) => (
        <mesh key={i} position={[x, y, 0.04]}>
          <planeGeometry args={[w, h]} />
          <meshBasicMaterial color={i === 0 ? HERO_COLORS.primary : HERO_COLORS.border} transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  );
}

function TypographyPiece() {
  return (
    <group>
      <Text fontSize={0.42} color={HERO_COLORS.text} anchorX="center" anchorY="middle" letterSpacing={-0.04}>
        Aa
      </Text>
      <mesh position={[0, -0.28, 0]}>
        <planeGeometry args={[0.8, 0.04]} />
        <meshBasicMaterial color={HERO_COLORS.accent} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

function TokenPiece() {
  return (
    <group>
      <RoundedBox args={[0.95, 0.24, 0.05]} radius={0.12} smoothness={4}>
        <meshStandardMaterial color={HERO_COLORS.accent} emissive={HERO_COLORS.accent} emissiveIntensity={0.2} roughness={0.3} />
      </RoundedBox>
      <Text position={[0, 0, 0.04]} fontSize={0.07} color={HERO_COLORS.text} anchorX="center" anchorY="middle">
        primary.500
      </Text>
    </group>
  );
}

function GridPiece() {
  const grid = useMemo(() => {
    const size = 1.2;
    const divisions = 8;
    return new THREE.GridHelper(size, divisions, HERO_COLORS.primary, HERO_COLORS.border);
  }, []);

  return (
    <group>
      <primitive object={grid} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.2, 1.2]} />
        <meshBasicMaterial color={HERO_COLORS.secondary} transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

function PieceByType({ type }: { type: UIElementConfig["type"] }) {
  switch (type) {
    case "button":
      return <ButtonPiece />;
    case "card":
      return <CardPiece />;
    case "chart":
      return <ChartPiece />;
    case "code":
      return <CodePiece />;
    case "nav":
      return <NavPiece />;
    case "product":
      return <ProductPiece />;
    case "dashboard":
      return <DashboardPiece />;
    case "typography":
      return <TypographyPiece />;
    case "token":
      return <TokenPiece />;
    case "grid":
      return <GridPiece />;
    default:
      return null;
  }
}

export function FloatingUIElement({ config, index }: FloatingUIElementProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse, scrollProgress, introProgress, activePhase } = useHeroMotion();

  const basePosition = useMemo(() => new THREE.Vector3(...config.position), [config.position]);
  const orbitOffset = useMemo(() => index * 0.7, [index]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const t = clock.getElapsedTime();
    const floatY = Math.sin(t * 0.8 + orbitOffset) * 0.08;
    const floatX = Math.cos(t * 0.6 + orbitOffset) * 0.05;

    const phaseSpread = activePhase * 0.18;
    const scrollShift = scrollProgress * 0.35;
    const intro = THREE.MathUtils.smoothstep(introProgress, 0, 1);

    groupRef.current.position.set(
      basePosition.x + floatX + phaseSpread * Math.sin(orbitOffset),
      basePosition.y + floatY - scrollShift * 0.25,
      basePosition.z - scrollShift * 0.4
    );

    groupRef.current.rotation.x = config.rotation[0] + mouse.y * 0.12 + Math.sin(t * 0.4 + orbitOffset) * 0.03;
    groupRef.current.rotation.y = config.rotation[1] + mouse.x * 0.18 + Math.cos(t * 0.35 + orbitOffset) * 0.04;
    groupRef.current.rotation.z = config.rotation[2] + mouse.x * 0.05;

    const targetScale = config.scale * (0.35 + intro * 0.65);
    groupRef.current.scale.setScalar(targetScale);
  });

  return (
    <group ref={groupRef} position={config.position} rotation={config.rotation} scale={config.scale}>
      <PieceByType type={config.type} />
    </group>
  );
}
