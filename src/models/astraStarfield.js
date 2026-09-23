import { sampleGalaxy } from './astraGalaxyGeometry.js';

const STRIDE = 8;
const MAX_STARS = 48_000;
const FULL_TURN = Math.PI * 2;

function createRandom(seed) {
  let state = seed >>> 0;

  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = Math.imul(state ^ (state >>> 15), state | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
  };
}

function assertPositiveFinite(value, name) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${name} must be a finite positive number.`);
  }
}

/**
 * Interleaved, viewport-independent stars:
 * x, y, z, size, brightness, phase, temperature, group.
 * Group 1 forms the galaxy; group 0 fills the surrounding sky.
 */
export function createStarfield(count = 12_000, seed = 614) {
  if (!Number.isInteger(count) || count <= 0 || count > MAX_STARS) {
    throw new RangeError(`count must be an integer between 1 and ${MAX_STARS}.`);
  }
  if (!Number.isFinite(seed)) {
    throw new TypeError("seed must be a finite number.");
  }

  const random = createRandom(seed);
  const stars = new Float32Array(count * STRIDE);
  const figureCount = Math.round(count * 0.85);

  for (let index = 0; index < count; index += 1) {
    const offset = index * STRIDE;
    const isFigure = index < figureCount;
    let isCore = false;
    let isArm = false;
    let isCluster = false;
    let brightEligible = false;

    if (isFigure) {
      const galaxy = sampleGalaxy(random, index);
      isCore = galaxy.core;
      isArm = galaxy.arm;
      isCluster = galaxy.cluster;
      brightEligible = galaxy.brightEligible;
      stars.set(galaxy.position, offset);
    } else {
      stars[offset] = random() * 2 - 1;
      stars[offset + 1] = random() * 2 - 1;
      stars[offset + 2] = random() * 2 - 1;
    }

    const prominence = random();
    const brightnessSample = random();
    // Rare luminous stars favor arm interiors and compact star-forming knots.
    const isBright = brightEligible && brightnessSample < (isCluster ? 0.055 : 0.018);
    if (isFigure) {
      stars[offset + 3] = isCore ? 0.5 + prominence ** 5 * 0.8
        : isBright ? 2.5 + prominence ** 2 * 1.5
        : isArm || isCluster ? 0.5 + prominence ** 5 * 1.7 : 0.35 + prominence ** 5 * 0.6;
      stars[offset + 4] = isCore ? 0.3 + random() * 0.2
        : isBright ? 0.8 + random() * 0.2
        : isArm || isCluster ? 0.35 + random() * 0.35 : 0.15 + random() * 0.3;
    } else {
      stars[offset + 3] = 0.35 + prominence ** 5 * 0.6;
      stars[offset + 4] = 0.1 + random() ** 1.4 * 0.5;
    }
    stars[offset + 5] = random() * FULL_TURN;
    const temperature = random();
    stars[offset + 6] = isCore ? 0.4 + temperature * 0.2
      : isBright ? 0.18 + temperature * 0.48 : temperature;
    stars[offset + 7] = Number(isFigure);
  }

  return stars;
}

export function getStarfieldQuality({ width, height, pixelRatio = 1, reducedMotion = false } = {}) {
  assertPositiveFinite(width, "width");
  assertPositiveFinite(height, "height");
  assertPositiveFinite(pixelRatio, "pixelRatio");

  return {
    count: reducedMotion ? 8_000 : width < 768 ? 12_000 : 32_000,
    pixelRatio: Math.min(2, Math.max(1, pixelRatio)),
  };
}
