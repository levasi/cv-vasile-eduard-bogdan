export type ScrollLockSnapshot = {
  scrollY: number;
  body: {
    position: string;
    top: string;
    left: string;
    right: string;
    paddingRight: string;
  };
  html: {
    paddingRight: string;
    overflow: string;
  };
};

let lockCount = 0;
let snapshot: ScrollLockSnapshot | null = null;

/** Measure scrollbar width while it is still visible. */
export function measureScrollbarWidth() {
  const fromViewport = window.innerWidth - document.documentElement.clientWidth;
  if (fromViewport > 0) return fromViewport;

  const probe = document.createElement("div");
  probe.style.cssText =
    "position:absolute;top:-9999px;width:100px;height:100px;overflow:scroll;visibility:hidden;";
  document.body.appendChild(probe);
  const width = probe.offsetWidth - probe.clientWidth;
  probe.remove();
  return width;
}

export function lockPageScroll(scrollY: number): ScrollLockSnapshot {
  lockCount += 1;
  if (lockCount > 1 && snapshot) return snapshot;

  const scrollbarWidth = measureScrollbarWidth();
  const body = document.body;
  const html = document.documentElement;

  snapshot = {
    scrollY,
    body: {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      paddingRight: body.style.paddingRight,
    },
    html: {
      paddingRight: html.style.paddingRight,
      overflow: html.style.overflow,
    },
  };

  // Pad before hiding overflow so the gutter space stays occupied.
  if (scrollbarWidth > 0) {
    html.style.paddingRight = `${scrollbarWidth}px`;
    body.style.paddingRight = `${scrollbarWidth}px`;
  }

  html.style.overflow = "hidden";
  body.style.position = "fixed";
  body.style.top = `-${scrollY}px`;
  body.style.left = "0";
  body.style.right = "0";

  return snapshot;
}

export function unlockPageScroll(): number {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount > 0 || !snapshot) {
    return snapshot?.scrollY ?? 0;
  }

  const saved = snapshot;
  snapshot = null;

  const body = document.body;
  const html = document.documentElement;

  body.style.position = saved.body.position;
  body.style.top = saved.body.top;
  body.style.left = saved.body.left;
  body.style.right = saved.body.right;
  body.style.paddingRight = saved.body.paddingRight;
  html.style.overflow = saved.html.overflow;
  html.style.paddingRight = saved.html.paddingRight;

  return saved.scrollY;
}
