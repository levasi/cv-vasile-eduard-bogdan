export type PanelRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

const DESKTOP_MIN = 1024;
const TABLET_MIN = 640;

export function rectFromDOM(rect: DOMRect): PanelRect {
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
}

export function getPanelTargetRect(): PanelRect {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  if (vw < TABLET_MIN) {
    const margin = 16;
    const width = vw - margin * 2;
    const height = Math.min(vh - margin * 2, vh * 0.94);
    return {
      width,
      height,
      left: margin,
      top: Math.max(margin, (vh - height) / 2),
    };
  }

  if (vw < DESKTOP_MIN) {
    const margin = vw * 0.04;
    const width = vw - margin * 2;
    const height = Math.min(640, vh * 0.9);
    return {
      width,
      height,
      left: margin,
      top: (vh - height) / 2,
    };
  }

  const width = vw * 0.8;
  const height = Math.min(680, vh * 0.88);
  return {
    width,
    height,
    left: vw * 0.1,
    top: (vh - height) / 2,
  };
}
