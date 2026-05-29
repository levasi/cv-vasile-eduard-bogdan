import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { getPanelTargetRect, type PanelRect } from "./portfolioDetailTypes";

const EXPAND_DURATION = 0.58;
const COLLAPSE_DURATION = 0.42;
const BODY_REVEAL_DURATION = 0.35;

function applyScreenRect(el: HTMLElement, rect: PanelRect, borderRadius: number) {
  gsap.set(el, {
    position: "fixed",
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    borderRadius,
    margin: 0,
    transform: "none",
    opacity: 1,
  });
}

function getRevealTargets(
  contentRef: RefObject<HTMLElement | null>,
  closeRef: RefObject<HTMLElement | null>
) {
  return [contentRef.current, closeRef.current].filter(
    (el): el is HTMLElement => el !== null
  );
}

export function usePortfolioDetailExpand(
  open: boolean,
  originRect: PanelRect | null,
  projectSlug: string | undefined,
  screenRef: RefObject<HTMLElement | null>,
  backdropRef: RefObject<HTMLElement | null>,
  contentRef: RefObject<HTMLElement | null>,
  closeRef: RefObject<HTMLElement | null>,
  onExitComplete: () => void
) {
  const tweenRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const screen = screenRef.current;
    if (!screen || !originRect || !projectSlug) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = getPanelTargetRect();

    tweenRef.current?.kill();

    if (reducedMotion) {
      applyScreenRect(screen, open ? target : originRect, open ? 20 : 18);
      if (backdropRef.current) {
        gsap.set(backdropRef.current, { opacity: open ? 1 : 0 });
      }
      getRevealTargets(contentRef, closeRef).forEach((el) => {
        gsap.set(el, { opacity: open ? 1 : 0 });
      });
      if (!open) onExitComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (!open) onExitComplete();
      },
    });

    tweenRef.current = tl;

    if (open) {
      applyScreenRect(screen, originRect, 18);

      if (backdropRef.current) {
        gsap.set(backdropRef.current, { opacity: 0 });
      }
      getRevealTargets(contentRef, closeRef).forEach((el) => {
        gsap.set(el, { opacity: 0 });
      });

      tl.to(
        backdropRef.current,
        { opacity: 1, duration: EXPAND_DURATION * 0.85, ease: "power2.out" },
        0
      );

      tl.to(
        screen,
        {
          top: target.top,
          left: target.left,
          width: target.width,
          height: target.height,
          borderRadius: 20,
          duration: EXPAND_DURATION,
          ease: "power3.inOut",
        },
        0
      );

      const revealTargets = getRevealTargets(contentRef, closeRef);
      if (revealTargets.length) {
        tl.to(
          revealTargets,
          { opacity: 1, duration: BODY_REVEAL_DURATION, ease: "power2.out" },
          EXPAND_DURATION
        );
      }
    } else {
      const revealTargets = getRevealTargets(contentRef, closeRef);
      if (revealTargets.length) {
        tl.to(revealTargets, { opacity: 0, duration: 0.12, ease: "power1.in" }, 0);
      }

      tl.to(
        backdropRef.current,
        { opacity: 0, duration: COLLAPSE_DURATION * 0.75, ease: "power2.in" },
        0
      );

      tl.to(
        screen,
        {
          top: originRect.top,
          left: originRect.left,
          width: originRect.width,
          height: originRect.height,
          borderRadius: 18,
          duration: COLLAPSE_DURATION,
          ease: "power3.inOut",
        },
        0.04
      );
    }

    return () => {
      tweenRef.current?.kill();
    };
  }, [
    open,
    originRect,
    projectSlug,
    screenRef,
    backdropRef,
    contentRef,
    closeRef,
    onExitComplete,
  ]);

  useEffect(() => {
    const screen = screenRef.current;
    if (!open || !screen) return;

    const handleResize = () => {
      const target = getPanelTargetRect();
      gsap.to(screen, {
        top: target.top,
        left: target.left,
        width: target.width,
        height: target.height,
        duration: 0.28,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open, screenRef]);
}
