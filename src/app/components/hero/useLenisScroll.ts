import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type LenisScrollApi = {
  scrollTo: (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => void;
  stopScroll: () => void;
  startScroll: () => void;
};

const LenisScrollContext = createContext<LenisScrollApi | null>(null);

export function useLenisScrollApi() {
  return useContext(LenisScrollContext);
}

export function LenisScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  const scrollTo = useCallback<LenisScrollApi["scrollTo"]>((target, options) => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    const el =
      typeof target === "string"
        ? target.startsWith("#")
          ? document.querySelector(target)
          : document.getElementById(target)
        : target;

    if (!el || !(el instanceof HTMLElement)) return;

    lenis.scrollTo(el, {
      offset: options?.offset ?? 0,
      duration: options?.duration ?? 1.4,
    });
  }, []);

  const stopScroll = useCallback(() => {
    lenisRef.current?.stop();
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    ScrollTrigger.getAll().forEach((trigger) => {
      trigger.disable(false, false);
    });
  }, []);

  const startScroll = useCallback(() => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    const lenis = lenisRef.current;
    lenis?.start();
    ScrollTrigger.getAll().forEach((trigger) => {
      trigger.enable(false, false);
    });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.update();
      });
    });
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.defaults({ scroller: document.documentElement });

    const scrollFromHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      window.setTimeout(() => scrollTo(hash), 120);
    };

    scrollFromHash();
    window.addEventListener("hashchange", scrollFromHash);
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("hashchange", scrollFromHash);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [scrollTo]);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    const hash = location.hash;

    if (hash) {
      const id = window.setTimeout(() => scrollTo(hash), 120);
      const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 400);
      return () => {
        window.clearTimeout(id);
        window.clearTimeout(refreshId);
      };
    }

    lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(refreshId);
  }, [location.pathname, location.hash, scrollTo]);

  return createElement(LenisScrollContext.Provider, { value: { scrollTo, stopScroll, startScroll } }, children);
}
