export const glassDefaults = Object.freeze({
  blur: 6,
  saturation: 125,
  refraction: 18,
});

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

// Evaluate the rounded-rectangle normal in CSS pixels, independent of texture size.
export function getGlassNormal(x, y, width, height, radius, bezel = 12) {
  const corner = clamp(radius, 0, Math.min(width, height) / 2);
  const dx = x - width / 2;
  const dy = y - height / 2;
  const qx = Math.abs(dx) - width / 2 + corner;
  const qy = Math.abs(dy) - height / 2 + corner;
  const nx = Math.max(qx, 0);
  const ny = Math.max(qy, 0);
  const length = Math.hypot(nx, ny);
  const depth = -(length + Math.min(Math.max(qx, qy), 0) - corner);
  if (depth <= 0 || depth >= bezel) return { x: 0, y: 0 };

  const strength = Math.sin((Math.PI * depth) / bezel) ** 2;
  const normalX = length ? nx / length : Number(qx >= qy);
  const normalY = length ? ny / length : Number(qy > qx);

  // Sample inward, keeping the rounded silhouette intact instead of pulling in transparency.
  return {
    x: -Math.sign(dx) * normalX * strength,
    y: -Math.sign(dy) * normalY * strength,
  };
}
