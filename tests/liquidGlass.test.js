import assert from "node:assert/strict";
import test from "node:test";
import { getGlassNormal } from "../src/models/liquidGlass.js";

test("flat centers and exterior pixels have no refraction", () => {
  for (const [width, height] of [
    [344, 268],
    [362, 244],
    [700, 100],
  ]) {
    assert.deepEqual(getGlassNormal(width / 2, height / 2, width, height, 22), {
      x: 0,
      y: 0,
    });
    assert.deepEqual(getGlassNormal(0, 0, width, height, 22), { x: 0, y: 0 });
  }
});

test("rectangular surfaces sample inward with equal edge thickness", () => {
  const width = 344;
  const height = 268;
  const left = getGlassNormal(6, height / 2, width, height, 22);
  const right = getGlassNormal(width - 6, height / 2, width, height, 22);
  const top = getGlassNormal(width / 2, 6, width, height, 22);
  assert.equal(left.x, 1);
  assert.equal(right.x, -1);
  assert.equal(top.y, 1);
  assert.ok(left.y === 0);
  assert.ok(top.x === 0);
});

test("corner normals remain finite and bounded at different sizes", () => {
  for (const [width, height] of [
    [344, 268],
    [80, 40],
  ]) {
    for (let y = 0; y < height; y += 2) {
      for (let x = 0; x < width; x += 2) {
        const normal = getGlassNormal(x, y, width, height, 22);
        assert.ok(Number.isFinite(normal.x) && Number.isFinite(normal.y));
        assert.ok(Math.hypot(normal.x, normal.y) <= 1.000001);
      }
    }
  }
});
