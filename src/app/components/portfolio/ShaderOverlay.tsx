import React, { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type ShaderOverlayProps = {
  seed: number;
  /** Opacity of the overlay (0..1). Keep subtle. */
  opacity?: number;
};

function hash01(n: number) {
  const x = Math.sin(n) * 43758.5453123;
  return x - Math.floor(x);
}

function ShaderPlane({
  seed,
  opacity = 0.22,
}: ShaderOverlayProps) {
  const matRef = useRef<THREE.ShaderMaterial | null>(null);
  const baseHue = useMemo(() => {
    // tie hue to seed but keep in a premium range (violet ↔ warm)
    const h = 0.72 - hash01(seed) * 0.32;
    return h;
  }, [seed]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSeed: { value: seed },
      uOpacity: { value: opacity },
      uHue: { value: baseHue },
      uRes: { value: new THREE.Vector2(1, 1) },
    }),
    [seed, opacity, baseHue],
  );

  useEffect(() => {
    uniforms.uOpacity.value = opacity;
  }, [opacity, uniforms]);

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    const { width, height } = state.size;
    matRef.current.uniforms.uRes.value.set(width, height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={(r) => {
          matRef.current = r;
        }}
        transparent
        depthWrite={false}
        depthTest={false}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform float uSeed;
          uniform float uOpacity;
          uniform float uHue;
          uniform vec2 uRes;

          // hsv2rgb
          vec3 hsv2rgb(vec3 c) {
            vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
            vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
            return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
          }

          float hash(vec2 p) {
            p = fract(p * vec2(123.34, 456.21));
            p += dot(p, p + 45.32);
            return fract(p.x * p.y);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
          }

          void main() {
            vec2 uv = vUv;

            // normalize aspect to keep blobs round
            float aspect = uRes.x / max(1.0, uRes.y);
            vec2 p = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);

            // slow drift + subtle swirl
            float t = uTime * 0.35 + uSeed * 0.01;
            float ang = 0.35 * sin(t + p.y * 2.0) + 0.2 * cos(t * 0.7 + p.x * 2.0);
            float cs = cos(ang), sn = sin(ang);
            vec2 rp = vec2(cs * p.x - sn * p.y, sn * p.x + cs * p.y);

            // layered noise
            float n1 = noise(rp * 3.0 + t);
            float n2 = noise(rp * 7.0 - t * 1.2);
            float n = 0.55 * n1 + 0.45 * n2;

            // shimmer line (very subtle)
            float line = smoothstep(0.02, 0.0, abs((uv.y + 0.08 * sin(t + uv.x * 6.0)) - 0.55));
            float shimmer = line * (0.25 + 0.25 * sin(uTime * 2.2 + uv.x * 10.0));

            // vignette to keep edges quiet
            float v = smoothstep(0.95, 0.35, length(p));

            float intensity = (0.22 + 0.55 * n + shimmer) * v;

            vec3 colA = hsv2rgb(vec3(uHue, 0.65, 0.95));
            vec3 colB = hsv2rgb(vec3(uHue - 0.18, 0.55, 0.95));
            vec3 col = mix(colA, colB, uv.y);

            // push towards highlights, not a full tint
            vec3 outCol = col * intensity;

            gl_FragColor = vec4(outCol, intensity * uOpacity);
          }
        `}
      />
    </mesh>
  );
}
