import { computed, onMounted, onUnmounted, ref, useId, watch } from "vue";
import { clamp, glassDefaults } from "../models/liquidGlass.js";
import { useGlassRefraction } from "./useGlassRefraction.js";

export function useLiquidGlass(props) {
  const surface = ref(null);
  const filterId = `liquid-glass-${useId()}`;
  const refraction = computed(() =>
    finiteValue(props.refraction, glassDefaults.refraction, 24),
  );
  const { map } = useGlassRefraction(surface, refraction);
  let media;
  let frame = 0;
  let point;

  function finiteValue(value, fallback, max) {
    return Number.isFinite(value) ? clamp(value, 0, max) : fallback;
  }

  const glassStyle = computed(() => ({
    "--glass-blur": `${finiteValue(props.blur, glassDefaults.blur, 30)}px`,
    "--glass-saturation": `${finiteValue(props.saturation, glassDefaults.saturation, 200)}%`,
    "--glass-filter": map.value ? `url(#${filterId})` : "none",
  }));

  function resetHighlight() {
    cancelAnimationFrame(frame);
    frame = 0;
    surface.value?.style.removeProperty("--glass-light-angle");
  }

  function moveHighlight(event) {
    if (!props.interactive || !media?.matches || event.pointerType === "touch")
      return;
    point = { x: event.clientX, y: event.clientY };
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const element = surface.value;
      if (!element) return;
      const bounds = element.getBoundingClientRect();
      const x = clamp((point.x - bounds.left) / bounds.width, 0, 1);
      const y = clamp((point.y - bounds.top) / bounds.height, 0, 1);
      element.style.setProperty(
        "--glass-light-angle",
        `${120 + x * 90 - y * 40}deg`,
      );
    });
  }

  watch(() => props.interactive, resetHighlight);

  onMounted(() => {
    media = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    media.addEventListener("change", resetHighlight);
  });

  onUnmounted(() => {
    cancelAnimationFrame(frame);
    media?.removeEventListener("change", resetHighlight);
  });

  return {
    surface,
    map,
    filterId,
    refraction,
    glassStyle,
    moveHighlight,
    resetHighlight,
  };
}
