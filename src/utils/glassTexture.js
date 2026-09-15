import { getGlassNormal } from "../models/liquidGlass.js";

const textures = new Map();
const maxTextures = 12;

export function getGlassTexture(width, height, radius) {
  const key = `${width}:${height}:${radius}`;
  if (textures.has(key)) return textures.get(key);

  const ratio = Math.min(1, 256 / Math.max(width, height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width * ratio));
  canvas.height = Math.max(1, Math.round(height * ratio));
  const context = canvas.getContext("2d");
  if (!context) return "";
  const pixels = context.createImageData(canvas.width, canvas.height);

  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const normal = getGlassNormal(
        ((x + 0.5) * width) / canvas.width,
        ((y + 0.5) * height) / canvas.height,
        width,
        height,
        radius,
      );
      const offset = (y * canvas.width + x) * 4;
      pixels.data[offset] = 128 + normal.x * 127;
      pixels.data[offset + 1] = 128 + normal.y * 127;
      pixels.data[offset + 2] = 128;
      pixels.data[offset + 3] = 255;
    }
  }

  context.putImageData(pixels, 0, 0);
  const texture = canvas.toDataURL();
  if (textures.size >= maxTextures)
    textures.delete(textures.keys().next().value);
  textures.set(key, texture);
  return texture;
}
