import React, { useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { MTLLoader, OBJLoader } from "three-stdlib";
import { HERO_COLORS } from "./constants";
import { useHeroMotion } from "./HeroMotionProvider";

type WrenchModelProps = {
  objUrl?: string;
  mtlUrl?: string;
  bumpUrl?: string;
};

export function WrenchModel({
  objUrl = "/assets/wrench1/13073_Combination_Wrench_v1_l3.obj",
  mtlUrl = "/assets/wrench1/13073_Combination_Wrench_v1_l3.mtl",
  bumpUrl = "/assets/wrench1/Combination_Wrench_bump.jpg",
}: WrenchModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Object3D>(null);
  const { mouse, scrollProgress, introProgress } = useHeroMotion();

  const materials = useLoader(MTLLoader, mtlUrl);
  const object = useLoader(
    OBJLoader,
    objUrl,
    (loader) => {
      materials.preload();
      // @ts-expect-error OBJLoader supports setMaterials via three-stdlib
      loader.setMaterials(materials);
    }
  ) as THREE.Group;

  const bumpMap = useLoader(THREE.TextureLoader, bumpUrl);

  const targetScale = useMemo(() => 1.25, []);

  useEffect(() => {
    // Improve material response (more premium metal, less flat lambert)
    object.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      child.castShadow = false;
      child.receiveShadow = false;

      const baseColor = new THREE.Color("#BFC6D4");
      const mat = new THREE.MeshPhysicalMaterial({
        color: baseColor,
        metalness: 0.85,
        roughness: 0.22,
        clearcoat: 0.25,
        clearcoatRoughness: 0.25,
        envMapIntensity: 1.15,
      });

      bumpMap.wrapS = bumpMap.wrapT = THREE.RepeatWrapping;
      bumpMap.repeat.set(1, 1);
      bumpMap.anisotropy = 8;
      bumpMap.needsUpdate = true;
      mat.bumpMap = bumpMap;
      mat.bumpScale = 0.12;

      child.material = mat;
      child.material.needsUpdate = true;
    });

    // Center + normalize size
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    object.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const normalize = maxDim > 0 ? 1 / maxDim : 1;
    object.scale.setScalar(normalize);
  }, [object, bumpMap]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const intro = THREE.MathUtils.smoothstep(introProgress, 0, 1);

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.45 + 0.6 + Math.sin(t * 0.2) * 0.05,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.y * 0.18 + Math.cos(t * 0.15) * 0.03,
        0.05
      );

      const floatY = Math.sin(t * 0.9) * 0.08;
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        floatY - scrollProgress * 0.25,
        0.05
      );

      const scale = targetScale * (0.4 + intro * 0.6);
      groupRef.current.scale.setScalar(scale);
    }

    if (modelRef.current) {
      // Subtle rim glow via emissive on all meshes when moving mouse
      const intensity = 0.06 + Math.min(0.18, Math.abs(mouse.x) + Math.abs(mouse.y)) * 0.14;
      modelRef.current.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        const mat = child.material as THREE.MeshPhysicalMaterial;
        mat.emissive = new THREE.Color(HERO_COLORS.primary);
        mat.emissiveIntensity = intensity;
      });
    }
  });

  return (
    <group ref={groupRef} position={[1.8, 0.0, -1.2]}>
      <primitive ref={modelRef} object={object} />
    </group>
  );
}

