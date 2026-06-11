function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i) * (i + 1)) % 9973;
  }
  return hash;
}

export function getProjectGridLayout(_index: number, slug: string) {
  const n = hashSlug(slug);
  const speed = 0 + (n % 9) * 0.005;
  const floatDelay = (n % 6) * 0.55;
  const floatDuration = 6.2 + (n % 5) * 1.05;

  return { speed, floatDelay, floatDuration };
}
