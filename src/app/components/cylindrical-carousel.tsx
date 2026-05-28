import React, { useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

type CylinderItem = {
  key: string;
  children: React.ReactNode;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function normalizeDeg(deg: number) {
  let d = deg % 360;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
}

type CylindricalCarouselProps = {
  items: CylinderItem[];
  /** Visual height of the cylinder area */
  height?: number;
  /** Card width in px (used for spacing/radius heuristics) */
  cardWidth?: number;
  /** Base radius in px */
  radius?: number;
  /** When true, wheel/trackpad scroll rotates the cylinder while hovered */
  wheelScroll?: boolean;
};

export function CylindricalCarousel({
  items,
  height = 520,
  cardWidth = 360,
  radius,
  wheelScroll = true,
}: CylindricalCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    dragFree: true,
    containScroll: false,
  });

  const sceneRef = useRef<HTMLDivElement | null>(null);
  const [rotation, setRotation] = useState(0);
  const [sceneWidth, setSceneWidth] = useState(0);

  const count = items.length;
  const step = useMemo(() => (count > 0 ? 360 / count : 0), [count]);

  // Radius heuristic based on available width and card size
  const computedRadius = useMemo(() => {
    const base = radius ?? Math.round(sceneWidth / 2.25);
    return clamp(base, 280, 680);
  }, [radius, sceneWidth]);

  // Keep a stable vertical perspective across screens
  const perspective = useMemo(() => Math.round(computedRadius * 3.2), [computedRadius]);

  useEffect(() => {
    if (!sceneRef.current) return;
    const el = sceneRef.current;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width ?? 0;
      setSceneWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!emblaApi || count === 0) return;

    const api = emblaApi;

    const update = () => {
      // progress is [0..1] but loops; use internal location for smoother continuous rotation
      const engine = api.internalEngine();
      const location = engine.location.get(); // in snaps units
      // Convert location to degrees: each snap roughly maps to one item
      const deg = -(location * step);
      setRotation(deg);
    };

    update();
    api.on("scroll", update);
    api.on("reInit", update);
    return () => {
      api.off("scroll", update);
      api.off("reInit", update);
    };
  }, [emblaApi, count, step]);

  useEffect(() => {
    if (!wheelScroll) return;
    if (!sceneRef.current) return;
    if (!emblaApi) return;

    const api = emblaApi;
    const target = sceneRef.current;

    let remainder = 0;
    const WHEEL_STEP = 90; // smaller = more sensitive

    const onWheel = (e: WheelEvent) => {
      // Only hijack vertical scroll (trackpads may send both)
      const dominant = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (dominant === 0) return;

      // Prevent page scroll while interacting with the carousel
      e.preventDefault();

      remainder += dominant;
      const steps = Math.trunc(remainder / WHEEL_STEP);
      if (steps === 0) return;

      remainder -= steps * WHEEL_STEP;
      const current = api.selectedScrollSnap();
      api.scrollTo(current + steps, true);
    };

    target.addEventListener("wheel", onWheel, { passive: false });
    return () => target.removeEventListener("wheel", onWheel as EventListener);
  }, [wheelScroll, emblaApi]);

  // Embla track is just for input/dragging; visual comes from our 3D stage.
  // Each slide maps to a snap; keep the same count.
  return (
    <div className="w-full">
      <div ref={sceneRef} className="relative w-full">
        {/* Input layer (Embla requires viewport -> container -> slides) */}
        <div
          ref={emblaRef}
          className="absolute inset-0 z-20"
          aria-label="Portfolio carousel"
        >
          <div className="h-full">
            <div className="flex h-full">
              {items.map((item) => (
                <div key={item.key} className="flex-[0_0_100%]" />
              ))}
            </div>
          </div>
        </div>

        {/* Visual layer */}
        <div
          className="relative z-10 mx-auto"
          style={{
            height,
            perspective: `${perspective}px`,
            perspectiveOrigin: "50% 45%",
          }}
        >
          {/* Soft vignette to hide side artifacts */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/70" />
          </div>

          <div
            className="absolute left-1/2 top-1/2"
            style={{
              transformStyle: "preserve-3d",
              transform: `translate(-50%, -50%) translateZ(${-computedRadius}px) rotateY(${rotation}deg)`,
              transition: "transform 60ms linear",
            }}
          >
            {items.map((item, idx) => {
              const angle = idx * step;
              const rel = normalizeDeg(angle + rotation); // 0 = front
              const relRad = (rel * Math.PI) / 180;
              const depth = (Math.cos(relRad) + 1) / 2; // 0..1
              const away = Math.min(1, Math.abs(rel) / 180); // 0..1

              // Visual tuning: make the front card “premium”
              const scale = 0.78 + depth * 0.28; // 0.78..1.06
              const opacity = 0.18 + depth * 0.82; // 0.18..1
              const blur = away > 0.55 ? (away - 0.55) * 6 : 0; // subtle blur on the back half
              const yLift = (1 - depth) * 16; // lift front slightly
              const tiltX = (away - 0.2) * 8; // small tilt for depth

              return (
                <div
                  key={item.key}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: `${cardWidth}px`,
                    transformStyle: "preserve-3d",
                    transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${computedRadius}px)`,
                  }}
                >
                  <div
                    className="relative"
                    style={{
                      transform: `translateZ(0) translateY(${-yLift}px) scale(${scale}) rotateX(${tiltX}deg)`,
                      opacity,
                      filter: blur ? `blur(${blur}px)` : undefined,
                      transformOrigin: "50% 70%",
                      willChange: "transform, opacity, filter",
                    }}
                  >
                    {/* Card */}
                    <div className="relative overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.28)]">
                      {item.children}

                      {/* Specular highlight */}
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(80% 60% at 30% 20%, rgba(255,255,255,0.55), rgba(255,255,255,0.08) 40%, rgba(0,0,0,0) 70%)",
                          opacity: 0.15 + depth * 0.35,
                          mixBlendMode: "overlay",
                        }}
                      />

                      {/* Edge vignette */}
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(120% 120% at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.35) 100%)",
                          opacity: 0.18 + away * 0.18,
                        }}
                      />
                    </div>

                    {/* Reflection (cheap but effective) */}
                    <div
                      className="pointer-events-none absolute left-0 right-0 -bottom-10 h-24"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(255,255,255,0.22), rgba(255,255,255,0))",
                        opacity: depth * 0.22,
                        transform: "skewX(-8deg)",
                        filter: "blur(10px)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subtle “floor” for depth */}
          <div
            className="pointer-events-none absolute left-1/2 bottom-10 -translate-x-1/2 blur-2xl opacity-30"
            style={{
              width: "min(760px, 92%)",
              height: 60,
              background: "radial-gradient(ellipse at center, rgba(0,0,0,0.55), transparent 70%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

