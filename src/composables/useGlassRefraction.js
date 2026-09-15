import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { getGlassTexture } from "../utils/glassTexture.js";

export function useGlassRefraction(surface, amount) {
  const map = ref("");
  const available = ref(false);
  const enabled = computed(() => available.value && amount.value > 0);
  let observer;
  let media;
  let timer;

  function updateTexture() {
    const element = surface.value;
    if (!enabled.value || !element) return;
    const width = element.clientWidth;
    const height = element.clientHeight;
    const radius =
      parseFloat(getComputedStyle(element).borderTopLeftRadius) || 0;
    if (width && height) map.value = getGlassTexture(width, height, radius);
  }

  function scheduleTexture() {
    clearTimeout(timer);
    timer = setTimeout(updateTexture, 80);
  }

  function syncObserver() {
    clearTimeout(timer);
    observer?.disconnect();
    if (enabled.value && surface.value) {
      updateTexture();
      observer?.observe(surface.value);
    } else {
      map.value = "";
    }
  }

  function syncCapabilities() {
    // WebKit accepts the CSS syntax but cannot reliably displace a live backdrop.
    const chromium = /Chrome\/|Chromium\/|Edg\//.test(navigator.userAgent);
    available.value =
      chromium &&
      !media.matches &&
      CSS.supports("backdrop-filter", "blur(1px)");
  }

  watch(enabled, syncObserver, { flush: "post" });

  onMounted(() => {
    media = window.matchMedia(
      "(pointer: coarse), (prefers-reduced-motion: reduce), (prefers-reduced-transparency: reduce), (prefers-contrast: more), (forced-colors: active)",
    );
    observer = new ResizeObserver(scheduleTexture);
    media.addEventListener("change", syncCapabilities);
    syncCapabilities();
  });

  onUnmounted(() => {
    clearTimeout(timer);
    observer?.disconnect();
    media?.removeEventListener("change", syncCapabilities);
  });

  return { map };
}
