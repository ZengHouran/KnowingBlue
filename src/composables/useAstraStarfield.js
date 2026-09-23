import { onMounted, onUnmounted, ref } from 'vue';
import { createStarfield, getStarfieldQuality } from '../models/astraStarfield.js';
import { GALAXY_INCLINATION } from '../models/astraGalaxyGeometry.js';
import { createAstraRenderer } from '../renderers/createAstraRenderer.js';

const approach = (current, target, amount) => current + (target - current) * amount;

export function useAstraStarfield(canvasRef, stageRef) {
  const ready = ref(false);
  const dragging = ref(false);
  const fallbackStars = ref([]);
  const motionReduced = ref(false);
  let renderer, resizeObserver, intersectionObserver, mediaQuery;
  let frame = 0, previousTime = 0, visible = true, elapsed = 0, introTime = 0;
  let lastPointer = null;
  const target = { x: 0, y: 0, presence: 0, rotationX: 0, rotationY: GALAXY_INCLINATION };
  const state = { time: 0, intro: 0, pointer: { x: 0, y: 0 }, rotation: { x: 0, y: GALAXY_INCLINATION }, presence: 0, scroll: 0 };

  function render(timestamp) {
    frame = 0;
    const delta = previousTime ? Math.min((timestamp - previousTime) / 1000, .05) : .016;
    previousTime = timestamp;
    if (!motionReduced.value) { elapsed += delta; introTime += delta; }
    const ease = motionReduced.value ? 1 : 1 - Math.exp(-delta * 6);
    state.time = elapsed;
    state.intro = motionReduced.value ? 1 : Math.min(1, introTime / 3);
    state.pointer.x = approach(state.pointer.x, target.x, ease);
    state.pointer.y = approach(state.pointer.y, target.y, ease);
    state.presence = approach(state.presence, target.presence, ease);
    state.rotation.x = approach(state.rotation.x, target.rotationX, ease);
    state.rotation.y = approach(state.rotation.y, target.rotationY, ease);
    renderer?.render(state);
    if (renderer && visible && !document.hidden && !motionReduced.value) frame = requestAnimationFrame(render);
  }

  function invalidate() {
    if (!frame && renderer && visible && !document.hidden) frame = requestAnimationFrame(render);
  }

  function syncAnimation() {
    cancelAnimationFrame(frame);
    frame = 0; previousTime = 0;
    invalidate();
  }

  function resize() {
    const rect = stageRef.value?.getBoundingClientRect();
    if (!rect || !rect.width || !rect.height) return;
    const quality = getStarfieldQuality({ width: rect.width, height: rect.height, pixelRatio: window.devicePixelRatio, reducedMotion: motionReduced.value });
    renderer?.resize(rect.width, rect.height, quality.pixelRatio);
    invalidate();
  }

  function pointerMove(event) {
    const rect = stageRef.value.getBoundingClientRect();
    target.x = (event.clientX - rect.left) / rect.width * 2 - 1;
    target.y = 1 - (event.clientY - rect.top) / rect.height * 2;
    target.presence = 1;
    if (dragging.value && lastPointer) {
      target.rotationX += (event.clientX - lastPointer.x) / rect.width * 3.6;
      target.rotationY = Math.max(-1.57, Math.min(1.57, target.rotationY + (event.clientY - lastPointer.y) / rect.height * 2.4));
      lastPointer = { x: event.clientX, y: event.clientY };
    }
    invalidate();
  }

  function pointerDown(event) {
    if (event.button !== 0) return;
    dragging.value = true;
    lastPointer = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerMove(event);
  }

  function pointerUp(event) {
    dragging.value = false; lastPointer = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (event.pointerType === 'touch') pointerLeave();
  }

  function pointerLeave() {
    target.presence = 0;
    invalidate();
  }

  function replay() {
    introTime = 0;
    target.rotationX = 0; target.rotationY = GALAXY_INCLINATION;
    target.presence = 0;
    invalidate();
  }

  function keyDown(event) {
    const keys = { ArrowLeft: [-.16, 0], ArrowRight: [.16, 0], ArrowUp: [0, -.12], ArrowDown: [0, .12] };
    if (keys[event.key]) {
      event.preventDefault();
      target.rotationX += keys[event.key][0];
      target.rotationY = Math.max(-1.57, Math.min(1.57, target.rotationY + keys[event.key][1]));
      invalidate();
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); replay();
    } else if (event.key === 'Escape') replay();
  }

  function motionChange() {
    motionReduced.value = mediaQuery.matches;
    syncAnimation();
  }

  function scroll() {
    const rect = stageRef.value?.getBoundingClientRect();
    if (rect) state.scroll = Math.max(0, Math.min(1, -rect.top / rect.height));
    invalidate();
  }

  function contextLost(event) {
    event.preventDefault();
    cancelAnimationFrame(frame); frame = 0;
    ready.value = false;
  }

  function contextRestored() {
    renderer?.dispose();
    initialize();
  }

  function initialize() {
    const rect = stageRef.value.getBoundingClientRect();
    const quality = getStarfieldQuality({ width: rect.width, height: rect.height, pixelRatio: window.devicePixelRatio, reducedMotion: motionReduced.value });
    const stars = createStarfield(quality.count);
    // SVG fallback keeps the composition visible when GPU rendering is unavailable.
    fallbackStars.value = Array.from({ length: Math.min(1600, quality.count) }, (_, i) => {
      const index = Math.floor(i * quality.count / 1600) * 8;
      return { x: 500 + stars[index] * 500, y: 500 - stars[index + 1] * 500, size: stars[index + 3] * .55 * 1.1664, opacity: Math.min(1, stars[index + 4] * 1.08), color: stars[index + 6] > .72 ? '#ffc195' : '#bce4ff' };
    });
    try { renderer = createAstraRenderer(canvasRef.value, stars); }
    catch (error) { console.warn('Astra star field: using the static fallback.', error); renderer = null; }
    ready.value = Boolean(renderer);
    resize();
    syncAnimation();
  }

  onMounted(() => {
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionReduced.value = mediaQuery.matches;
    initialize();
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stageRef.value);
    intersectionObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; syncAnimation(); });
    intersectionObserver.observe(canvasRef.value);
    mediaQuery.addEventListener('change', motionChange);
    document.addEventListener('visibilitychange', syncAnimation);
    window.addEventListener('scroll', scroll, { passive: true });
    canvasRef.value.addEventListener('webglcontextlost', contextLost);
    canvasRef.value.addEventListener('webglcontextrestored', contextRestored);
  });

  onUnmounted(() => {
    cancelAnimationFrame(frame);
    renderer?.dispose();
    resizeObserver?.disconnect();
    intersectionObserver?.disconnect();
    mediaQuery?.removeEventListener('change', motionChange);
    document.removeEventListener('visibilitychange', syncAnimation);
    window.removeEventListener('scroll', scroll);
    canvasRef.value?.removeEventListener('webglcontextlost', contextLost);
    canvasRef.value?.removeEventListener('webglcontextrestored', contextRestored);
  });

  return { ready, dragging, fallbackStars, motionReduced, pointerMove, pointerDown, pointerUp, pointerLeave, keyDown, replay };
}
