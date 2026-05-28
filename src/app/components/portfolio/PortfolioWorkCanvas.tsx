import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HEX_RADIUS = 15;
const HEX_OPACITY = 0.3;
const HEX_PARALLAX_FACTOR = 0.22;

function drawHexagonPath(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const px = x + radius * Math.cos(angle);
    const py = y + radius * Math.sin(angle);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

function drawHexPattern(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  offsetY: number
) {
  const r = HEX_RADIUS;
  const colStep = Math.sqrt(3) * r;
  const rowStep = 1.5 * r;
  const cols = Math.ceil(width / colStep) + 2;
  const pad = Math.abs(offsetY) + rowStep * 2;
  const rows = Math.ceil((height + pad * 2) / rowStep) + 2;
  const startRow = Math.floor((-pad - offsetY) / rowStep) - 1;

  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(255, 220, 160, 0.09)";
  ctx.fillStyle = "rgba(255, 200, 120, 0.025)";

  ctx.save();
  ctx.globalAlpha = HEX_OPACITY;
  ctx.translate(0, offsetY);

  for (let row = startRow; row < startRow + rows; row++) {
    const y = row * rowStep;
    const rowOffset = row % 2 === 0 ? 0 : colStep / 2;

    for (let col = -1; col < cols; col++) {
      const x = col * colStep + rowOffset;
      drawHexagonPath(ctx, x, y, r);
      ctx.fill();
      ctx.stroke();
    }
  }

  ctx.restore();
}

function paint(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  parallaxY: number
) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#1a1008");
  gradient.addColorStop(0.45, "#3d2214");
  gradient.addColorStop(1, "#120a06");

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  drawHexPattern(ctx, width, height, parallaxY);

  const glow = ctx.createRadialGradient(
    width * 0.72,
    height * 0.35,
    0,
    width * 0.72,
    height * 0.35,
    Math.max(width, height) * 0.55
  );
  glow.addColorStop(0, "rgba(251, 191, 36, 0.22)");
  glow.addColorStop(1, "rgba(251, 191, 36, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);
}

type PortfolioWorkCanvasProps = {
  sectionRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLElement | null>;
};

export function PortfolioWorkCanvas({ sectionRef, contentRef }: PortfolioWorkCanvasProps) {
  const slotRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sizeRef = useRef({ width: 0, height: 0 });
  const parallaxRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const slot = slotRef.current;
    const canvas = canvasRef.current;
    if (!section || !content || !slot || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const render = () => {
      const { width, height } = sizeRef.current;
      if (!width || !height) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint(ctx, width, height, parallaxRef.current);
    };

    const resize = () => {
      const width = section.offsetWidth;
      const height = content.offsetHeight + 104;
      if (!width || !height) return;

      sizeRef.current = { width, height };
      slot.style.width = `${width}px`;
      slot.style.height = `${height}px`;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      render();
      ScrollTrigger.refresh();
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(section);
    observer.observe(content);

    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: reducedMotion ? false : 0.6,
      invalidateOnRefresh: true,
      onUpdate(self) {
        if (reducedMotion) {
          parallaxRef.current = 0;
        } else {
          const { height } = sizeRef.current;
          parallaxRef.current = (self.progress - 0.5) * height * HEX_PARALLAX_FACTOR;
        }
        render();
      },
    });

    // Initial paint for current scroll position
    scrollTrigger.refresh();
    parallaxRef.current = reducedMotion
      ? 0
      : (scrollTrigger.progress - 0.5) * sizeRef.current.height * HEX_PARALLAX_FACTOR;
    render();

    return () => {
      observer.disconnect();
      scrollTrigger.kill();
    };
  }, [sectionRef, contentRef]);

  return (
    <div ref={slotRef} className="portfolio-work-canvas-slot absolute inset-0" aria-hidden>
      <canvas ref={canvasRef} className="portfolio-work-canvas absolute inset-0 block" />
    </div>
  );
}
