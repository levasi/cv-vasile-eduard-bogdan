import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { X, ArrowUpRight } from "lucide-react";
import type { PortfolioProject } from "../../data/portfolio";

export type OpenState = {
  project: PortfolioProject;
  sourceRect: DOMRect;
} | null;

type Props = {
  open: OpenState;
  onClose: () => void;
};

export function ProjectWorldOverlay({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const project = open?.project ?? null;
  const source = open?.sourceRect ?? null;

  const start = useMemo(() => {
    if (!source) return null;
    const cx = source.left + source.width / 2;
    const cy = source.top + source.height / 2;
    const tx = cx - window.innerWidth / 2;
    const ty = cy - window.innerHeight / 2;
    const scale = Math.max(
      0.22,
      Math.min(0.92, Math.min(source.width / window.innerWidth, source.height / window.innerHeight))
    );
    return { tx, ty, scale };
  }, [source]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;

    tlRef.current?.kill();

    if (!open || !start) {
      gsap.set(overlay, { pointerEvents: "none", opacity: 0 });
      return;
    }

    gsap.set(overlay, { pointerEvents: "auto" });
    gsap.set(panel, {
      x: start.tx,
      y: start.ty,
      scale: start.scale,
      rotateX: 9,
      rotateY: -6,
      transformOrigin: "50% 50%",
    });
    gsap.set("[data-world-overlay-content]", { opacity: 0, y: 18, filter: "blur(8px)" });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(overlay, { opacity: 1, duration: 0.25 }, 0)
      .to(panel, { x: 0, y: 0, scale: 1, rotateX: 0, rotateY: 0, duration: 0.85 }, 0)
      .to("[data-world-overlay-content]", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.65, stagger: 0.06 }, 0.18);

    tlRef.current = tl;
    return () => tl.kill();
  }, [open, start]);

  if (!project) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[80] opacity-0"
      style={{
        background:
          "radial-gradient(900px circle at 20% 10%, rgba(124,58,237,0.20), transparent 55%), radial-gradient(900px circle at 80% 70%, rgba(59,130,246,0.16), transparent 58%), rgba(7,11,20,0.72)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
      role="dialog"
      aria-modal="true"
    >
      <button type="button" onClick={onClose} className="absolute inset-0 cursor-pointer" aria-label="Close" />

      <div className="relative mx-auto flex min-h-full max-w-5xl items-center px-4 sm:px-8 py-10">
        <div
          ref={panelRef}
          className="relative w-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.06] shadow-[0_40px_120px_rgba(0,0,0,0.65)]"
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
          <div className="pointer-events-none absolute inset-0 world-surface opacity-90" aria-hidden />
          {project.screenshot ? (
            <img
              src={project.screenshot}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top opacity-[0.55]"
              aria-hidden
            />
          ) : null}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070B14]/90 via-[#070B14]/30 to-transparent" aria-hidden />

          <div className="relative p-5 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div data-world-overlay-content className="text-xs uppercase tracking-[0.28em] text-[#94A3B8]">
                  Project world
                </div>
                <div data-world-overlay-content className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-[#F8FAFC]">
                  {project.title}
                </div>
                <div
                  data-world-overlay-content
                  className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-[#94A3B8]"
                >
                  {project.medium}
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="relative z-10 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] p-2 text-[#F8FAFC] backdrop-blur-md hover:bg-white/[0.10] transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div data-world-overlay-content className="world-glass-panel rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
                <div className="text-xs uppercase tracking-[0.22em] text-[#94A3B8]">Role</div>
                <div className="mt-2 text-sm font-semibold text-[#F8FAFC]">{project.role}</div>
                <div className="mt-4 text-xs uppercase tracking-[0.22em] text-[#94A3B8]">Highlights</div>
                <ul className="mt-2 space-y-2">
                  {project.technicalHighlights.slice(0, 3).map((h) => (
                    <li key={h} className="text-sm text-[#94A3B8]">
                      <span className="mr-2 text-[#A855F7]">•</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div data-world-overlay-content className="world-glass-panel rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
                <div className="text-xs uppercase tracking-[0.22em] text-[#94A3B8]">Preview</div>
                <div className="mt-2 text-sm text-[#94A3B8]">
                  A lightweight “mini world” that showcases depth, motion, and polish—without heavy WebGL.
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.slice(0, 6).map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-[#94A3B8]">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#7C3AED] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#6D28D9] transition-colors"
                  >
                    {project.cta}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold text-[#F8FAFC] backdrop-blur-md hover:bg-white/[0.10] transition-colors"
                  >
                    Back to worlds
                  </button>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl opacity-60" style={{ background: "rgba(124,58,237,0.22)" }} />
            <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full blur-3xl opacity-55" style={{ background: "rgba(59,130,246,0.18)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

