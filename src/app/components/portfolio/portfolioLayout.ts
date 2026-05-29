function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i) * (i + 1)) % 9973;
  }
  return hash;
}

export function getProjectGridLayout(_index: number, slug: string) {
  const n = hashSlug(slug);
  const speed = 0.12 + (n % 9) * 0.07;
  const floatDelay = (n % 6) * 0.55;
  const floatDuration = 4.2 + (n % 5) * 0.85;

  return { speed, floatDelay, floatDuration };
}
