import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { getPanelTargetRect, type PanelRect } from "./portfolioDetailTypes";

const EXPAND_DURATION = 0.58;
const COLLAPSE_DURATION = 0.42;
const BODY_REVEAL_DURATION = 0.35;
const BODY_REVEAL_OFFSET = 18;

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

function setBodyHidden(body: HTMLElement) {
  gsap.set(body, {
    visibility: "hidden",
    y: BODY_REVEAL_OFFSET,
    opacity: 1,
  });
}

function setBodyRevealed(body: HTMLElement) {
  gsap.set(body, {
    visibility: "visible",
    y: 0,
    opacity: 1,
  });
}

function getBodyInner(body: HTMLElement | null) {
  return body?.querySelector<HTMLElement>(".portfolio-detail-panel__body-inner") ?? null;
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
    const body = contentRef.current;
    const close = closeRef.current;
    const bodyInner = getBodyInner(body);

    if (!screen || !originRect || !projectSlug) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = getPanelTargetRect();

    tweenRef.current?.kill();

    if (reducedMotion) {
      applyScreenRect(screen, open ? target : originRect, open ? 20 : 18);
      if (backdropRef.current) {
        gsap.set(backdropRef.current, { opacity: open ? 1 : 0 });
      }
      if (body) {
        if (open) setBodyRevealed(body);
        else setBodyHidden(body);
      }
      if (bodyInner) {
        gsap.set(bodyInner, { opacity: open ? 1 : 0 });
      }
      if (close) {
        gsap.set(close, { opacity: open ? 1 : 0 });
      }
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
      if (body) {
        setBodyHidden(body);
      }
      if (bodyInner) {
        gsap.set(bodyInner, { opacity: 0 });
      }
      if (close) {
        gsap.set(close, { opacity: 0 });
      }

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

      if (body) {
        tl.set(body, { visibility: "visible" }, EXPAND_DURATION);
        tl.to(
          body,
          { y: 0, duration: BODY_REVEAL_DURATION, ease: "power2.out" },
          EXPAND_DURATION
        );
      }

      if (bodyInner) {
        tl.to(
          bodyInner,
          { opacity: 1, duration: BODY_REVEAL_DURATION, ease: "power2.out" },
          EXPAND_DURATION
        );
      }

      if (close) {
        tl.to(
          close,
          { opacity: 1, duration: BODY_REVEAL_DURATION, ease: "power2.out" },
          EXPAND_DURATION
        );
      }
    } else {
      if (bodyInner) {
        tl.to(bodyInner, { opacity: 0, duration: 0.12, ease: "power1.in" }, 0);
      }

      if (body) {
        tl.to(body, { y: BODY_REVEAL_OFFSET, duration: 0.12, ease: "power1.in" }, 0);
        tl.set(body, { visibility: "hidden" }, 0.12);
      }

      if (close) {
        tl.to(close, { opacity: 0, duration: 0.12, ease: "power1.in" }, 0);
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
