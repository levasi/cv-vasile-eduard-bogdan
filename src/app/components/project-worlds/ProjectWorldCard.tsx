import React, { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioProject } from "../../data/portfolio";

export type ProjectWorldType = "ecommerce" | "dashboard" | "landing" | "content";

function inferWorldType(project: PortfolioProject): ProjectWorldType {
  const tags = project.tags.map((t) => t.toLowerCase());
  if (tags.some((t) => t.includes("e-commerce") || t.includes("ecommerce"))) return "ecommerce";
  if (project.slug === "zion-builder") return "dashboard";
  if (tags.some((t) => t.includes("information architecture") || t.includes("accessibility"))) return "content";
  return "landing";
}

function worldAccent(type: ProjectWorldType) {
  switch (type) {
    case "ecommerce":
      return { a: "#7C3AED", b: "#A855F7" };
    case "dashboard":
      return { a: "#3B82F6", b: "#7C3AED" };
    case "content":
      return { a: "#A855F7", b: "#3B82F6" };
    default:
      return { a: "#7C3AED", b: "#3B82F6" };
  }
}

type Props = {
  project: PortfolioProject;
  onOpenWorld: (project: PortfolioProject, sourceRect: DOMRect) => void;
};

export function ProjectWorldCard({ project, onOpenWorld }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const type = useMemo(() => inferWorldType(project), [project]);
  const accent = useMemo(() => worldAccent(type), [type]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const q = gsap.utils.selector(root);
    const layers = q("[data-world-layer]");
    const glow = q("[data-world-glow]")[0] as HTMLElement | undefined;

    gsap.set(root, { transformStyle: "preserve-3d" });
    gsap.set(layers, { transformStyle: "preserve-3d" });

    const hoverTl = gsap.timeline({ paused: true, defaults: { ease: "power3.out", duration: 0.55 } });
    hoverTl
      .to(root, { scale: 1.015 }, 0)
      .to(layers, { z: (i: number) => (i + 1) * 18, rotateX: -0.35, rotateY: 0.45 }, 0)
      .to(glow ?? {}, { opacity: 1 }, 0);

    const handleEnter = () => hoverTl.play();
    const handleLeave = () => hoverTl.reverse();

    let raf = 0;
    const handleMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * 8.5;
      const ry = (px - 0.5) * 10.5;

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        gsap.to(root, { rotateX: rx, rotateY: ry, duration: 0.35, ease: "power3.out" });
        gsap.to(layers, {
          x: (i: number) => (px - 0.5) * (6 + i * 2),
          y: (i: number) => (py - 0.5) * (6 + i * 2),
          duration: 0.45,
          ease: "power3.out",
        });
      });
    };

    root.addEventListener("pointerenter", handleEnter);
    root.addEventListener("pointerleave", handleLeave);
    root.addEventListener("pointermove", handleMove);

    return () => {
      root.removeEventListener("pointerenter", handleEnter);
      root.removeEventListener("pointerleave", handleLeave);
      root.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(raf);
      hoverTl.kill();
    };
  }, []);

  return (
    <div className="world-perspective">
      <div
        ref={rootRef}
        data-world-root={project.slug}
        className="world-card group relative isolate rounded-[24px] border border-white/10 bg-white/[0.04] shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
        style={
          {
            perspective: "1100px",
            willChange: "transform",
            "--world-a": accent.a,
            "--world-b": accent.b,
          } as React.CSSProperties
        }
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[24px] opacity-0 transition-opacity"
          data-world-glow
          style={{
            background:
              "radial-gradient(900px circle at 20% 15%, color-mix(in srgb, var(--world-a) 22%, transparent), transparent 55%), radial-gradient(800px circle at 80% 65%, color-mix(in srgb, var(--world-b) 18%, transparent), transparent 58%)",
          }}
        />

        <div
          data-world-layer
          className="pointer-events-none absolute inset-0 rounded-[24px] opacity-95"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,11,20,0.12), rgba(7,11,20,0.65)), radial-gradient(1200px circle at 30% 20%, color-mix(in srgb, var(--world-a) 16%, transparent), transparent 55%), radial-gradient(900px circle at 70% 80%, color-mix(in srgb, var(--world-b) 14%, transparent), transparent 60%)",
          }}
        />

        <div data-world-layer className="relative rounded-[24px] overflow-hidden">
          <div className="world-surface absolute inset-0" aria-hidden />
          {project.screenshot ? (
            <img
              src={project.screenshot}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-top opacity-[0.72] saturate-[1.05]"
              loading="lazy"
            />
          ) : null}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070B14]/90 via-[#070B14]/20 to-transparent" />
        </div>

        <div data-world-layer className="pointer-events-none absolute inset-0">
          <div className="world-fragment world-fragment--a" aria-hidden />
          <div className="world-fragment world-fragment--b" aria-hidden />
          <div className="world-fragment world-fragment--c" aria-hidden />
        </div>

        <div data-world-layer className="pointer-events-none absolute inset-0">
          {type === "ecommerce" ? <EcommerceMicroPreview /> : null}
          {type === "dashboard" ? <DashboardMicroPreview /> : null}
          {type === "landing" ? <LandingMicroPreview /> : null}
          {type === "content" ? <ContentMicroPreview /> : null}
        </div>

        <div data-world-layer className="relative p-5 sm:p-6">
          <div className="world-glass-panel rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full shadow-[0_0_20px_rgba(124,58,237,0.55)]"
                    style={{ background: "var(--world-a)" }}
                  />
                  <div className="text-xs uppercase tracking-[0.26em] text-[#94A3B8]">Project world</div>
                </div>
                <div className="mt-2 truncate text-lg font-semibold tracking-tight text-[#F8FAFC]">{project.title}</div>
                <div className="mt-1 line-clamp-2 text-sm leading-relaxed text-[#94A3B8]">{project.headline}</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  const rect = rootRef.current?.getBoundingClientRect() ?? new DOMRect(0, 0, 0, 0);
                  onOpenWorld(project, rect);
                }}
                className="pointer-events-auto inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3.5 py-2 text-xs font-semibold text-[#F8FAFC] backdrop-blur-md transition-colors hover:bg-white/[0.10]"
              >
                Open
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-[#94A3B8]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-white/[0.06]" aria-hidden />
      </div>
    </div>
  );
}

function EcommerceMicroPreview() {
  return (
    <div className="absolute left-5 top-5 hidden sm:block">
      <div className="world-mini-panel">
        <div className="world-mini-chip" />
        <div className="world-mini-line w-24" />
        <div className="world-mini-line w-16" />
      </div>
    </div>
  );
}

function DashboardMicroPreview() {
  return (
    <div className="absolute right-5 top-6 hidden sm:block">
      <div className="world-mini-panel">
        <div className="world-spark-bars" />
        <div className="mt-2 flex gap-2">
          <div className="world-mini-line w-12" />
          <div className="world-mini-line w-8" />
        </div>
      </div>
    </div>
  );
}

function LandingMicroPreview() {
  return (
    <div className="absolute right-6 bottom-24 hidden sm:block">
      <div className="world-mini-panel">
        <div className="world-mini-line w-28" />
        <div className="world-mini-line w-20" />
        <div className="mt-3 world-mini-cta" />
      </div>
    </div>
  );
}

function ContentMicroPreview() {
  return (
    <div className="absolute left-6 bottom-24 hidden sm:block">
      <div className="world-mini-panel">
        <div className="world-mini-line w-28" />
        <div className="world-mini-line w-24" />
        <div className="world-mini-line w-16" />
      </div>
    </div>
  );
}

