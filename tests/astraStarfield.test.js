import assert from "node:assert/strict";
import test from "node:test";
import { createStarfield, getStarfieldQuality } from "../src/models/astraStarfield.js";

test("star positions are deterministic for a seed and vary between seeds", () => {
  const stars = createStarfield(256, 614);

  assert.ok(stars instanceof Float32Array);
  assert.equal(stars.length, 256 * 8);
  assert.deepEqual(stars, createStarfield(256, 614));
  assert.notDeepEqual(stars, createStarfield(256, 615));
  assert.equal(createStarfield().length, 12_000 * 8);
});

test("all star attributes remain finite and inside the renderer's expected ranges", () => {
  const stars = createStarfield(16_000);
  const ranges = [[-1, 1], [-1, 1], [-1, 1], [0.2, 5], [0.1, 1], [0, Math.PI * 2], [0, 1], [0, 1]];

  for (let index = 0; index < stars.length; index += 1) {
    const value = stars[index];
    const [minimum, maximum] = ranges[index % 8];
    assert.ok(Number.isFinite(value));
    assert.ok(value >= minimum - 1e-6 && value <= maximum + 1e-6);
  }
});

test("both spiral arms fit in the viewport with stars between and around them", () => {
  const stars = createStarfield(8_000);
  let figureCount = 0;
  let upperTail = 0;
  let bottomArc = 0;
  let ambientCorners = 0;
  let smallStars = 0;
  let brightStars = 0;

  for (let index = 0; index < stars.length; index += 8) {
    const [x, y] = stars.subarray(index, index + 2);
    if (stars[index + 7] === 1) {
      figureCount += 1;
      assert.ok(Math.hypot(x, y) < 0.96);
      if (y > 0.55) upperTail += 1;
      if (y < -0.55) bottomArc += 1;
    } else if (Math.abs(x) > 0.65 && Math.abs(y) > 0.65) {
      ambientCorners += 1;
    }
    if (stars[index + 3] <= 1.1) smallStars += 1;
    if (stars[index + 3] >= 2.5) brightStars += 1;
  }

  assert.equal(figureCount, 6_800);
  assert.ok(upperTail > 100);
  assert.ok(bottomArc > 100);
  assert.ok(ambientCorners > 90);
  assert.ok(smallStars > 5_000);
  assert.ok(brightStars > 0 && brightStars < 100);
});

test("ambient stars stay faint and bright outliers remain rare", () => {
  const stars = createStarfield(16_000);
  let ambientCount = 0;
  let brightAmbientCount = 0;
  let coreCount = 0;
  let coreBrightness = 0;

  for (let index = 0; index < stars.length; index += 8) {
    const [x, y, , size, brightness, , , group] = stars.subarray(index, index + 8);
    if (group === 0) {
      ambientCount += 1;
      assert.ok(brightness >= 0.1 && brightness <= 0.6);
      if (size > 1.1) {
        assert.equal(size, 2.5);
        brightAmbientCount += 1;
      }
    } else if (Math.hypot(x, y) < 0.13) {
      coreCount += 1;
      coreBrightness += brightness;
    }
  }

  assert.ok(ambientCount > 0);
  assert.equal(brightAmbientCount, 0, "large bright stars should stay within the arms");
  assert.ok(coreCount > 1500, "the central bulge must be densely populated");
  assert.ok(coreBrightness / coreCount < 0.55, "central density must not cause overexposure");
});

test("edge-on views preserve a thin disk with a thicker central bulge", () => {
  const stars = createStarfield(16_000);
  let diskDepth = 0, diskRadius = 0, diskCount = 0;
  let bulgeDepth = 0, bulgeCount = 0;
  for (let i = 0; i < stars.length; i += 8) {
    if (!stars[i + 7]) continue;
    const radius = Math.hypot(stars[i], stars[i + 1]);
    if (radius > 0.4) {
      diskDepth += stars[i + 2] ** 2;
      diskRadius += radius ** 2;
      diskCount += 1;
    } else if (radius < 0.13) {
      bulgeDepth += stars[i + 2] ** 2;
      bulgeCount += 1;
    }
  }
  assert.ok(Math.sqrt(diskDepth / diskRadius) < 0.025);
  assert.ok(bulgeDepth / bulgeCount > 2 * diskDepth / diskCount);
});

test("quality presets cap pixel density and reduce particles on smaller screens or reduced motion", () => {
  assert.deepEqual(getStarfieldQuality({ width: 1440, height: 900, pixelRatio: 3 }), {
    count: 32_000,
    pixelRatio: 2,
  });
  assert.deepEqual(getStarfieldQuality({ width: 390, height: 844, pixelRatio: 1.5 }), {
    count: 12_000,
    pixelRatio: 1.5,
  });
  assert.deepEqual(getStarfieldQuality({ width: 1440, height: 900, pixelRatio: 0.5, reducedMotion: true }), {
    count: 8_000,
    pixelRatio: 1,
  });
});

test("invalid sizes cannot allocate unbounded buffers or produce invalid quality settings", () => {
  for (const count of [0, -1, 1.5, NaN, Infinity, 48_001, "100", null]) {
    assert.throws(() => createStarfield(count), RangeError);
  }
  for (const seed of [NaN, Infinity, "614", null]) {
    assert.throws(() => createStarfield(1, seed), TypeError);
  }
  for (const field of ["width", "height", "pixelRatio"]) {
    for (const value of [0, -1, NaN, Infinity]) {
      assert.throws(() => getStarfieldQuality({ width: 1440, height: 900, [field]: value }), RangeError);
    }
  }
  assert.throws(() => getStarfieldQuality(), RangeError);
  assert.equal(createStarfield(48_000).length, 48_000 * 8);
});
