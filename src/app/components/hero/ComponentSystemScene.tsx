import React, { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { HERO_COLORS } from "./constants";
import { useHeroMotion } from "./HeroMotionProvider";

export function ComponentSystemScene() {
  const { mouse, scrollProgress, introProgress } = useHeroMotion();
  const { camera, scene } = useThree();

  useEffect(() => {
    scene.background = null;
    scene.fog = new THREE.Fog(HERO_COLORS.background, 4, 14);

    const ambient = new THREE.AmbientLight(new THREE.Color(HERO_COLORS.text), 0.35);
    const directional = new THREE.DirectionalLight(new THREE.Color(HERO_COLORS.text), 1.1);
    directional.position.set(4, 6, 3);

    const pointA = new THREE.PointLight(new THREE.Color(HERO_COLORS.primary), 1.4, 8);
    pointA.position.set(-2, 1, 2);

    const pointB = new THREE.PointLight(new THREE.Color(HERO_COLORS.secondary), 0.9, 7);
    pointB.position.set(3, -1, 1);

    const spot = new THREE.SpotLight(new THREE.Color(HERO_COLORS.accent), 1.2, 0, 0.35, 0.8);
    spot.position.set(0, 4, 2);

    scene.add(ambient, directional, pointA, pointB, spot);

    return () => {
      scene.remove(ambient, directional, pointA, pointB, spot);
      scene.fog = null;
      scene.background = null;
    };
  }, [scene]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const intro = THREE.MathUtils.smoothstep(introProgress, 0, 1);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0.2 + mouse.x * 0.25, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.15 + mouse.y * 0.15 - scrollProgress * 0.2, 0.04);
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      4.8 - intro * 0.4 - scrollProgress * 0.5 + Math.sin(t * 0.15) * 0.03,
      0.04
    );
    camera.lookAt(1.6, 0, -1.2);
  });

  return <Environment preset="city" />;
}
