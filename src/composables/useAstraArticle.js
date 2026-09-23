import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { astraBenchmarks } from "../data/astraArticle.js";

export function useAstraArticle(benchmarks = astraBenchmarks) {
  const menuOpen = ref(false);
  const activeBenchmarkId = ref(benchmarks[0]?.id ?? "");
  const activeBenchmark = computed(() => benchmarks.find((item) => item.id === activeBenchmarkId.value));
  const chartSeries = computed(() => (activeBenchmark.value?.series || []).map((series) => {
    const chart = activeBenchmark.value;
    const points = series.points.map(([cost, score]) => ({ cost, score, x: 56 + cost / chart.xMax * 412, y: 300 - (score - chart.yMin) / (chart.yMax - chart.yMin) * 242 }));
    return { ...series, points, path: points.map((point) => `${point.x},${point.y}`).join(" ") };
  }));

  function toggleMenu() { menuOpen.value = !menuOpen.value; }
  function closeMenu() { menuOpen.value = false; }
  function selectBenchmark(id) {
    if (benchmarks.some((item) => item.id === id)) activeBenchmarkId.value = id;
  }
  function handleEscape(event) {
    if (event.key === "Escape") closeMenu();
  }

  onMounted(() => window.addEventListener("keydown", handleEscape));
  onBeforeUnmount(() => window.removeEventListener("keydown", handleEscape));

  return { menuOpen, activeBenchmarkId, activeBenchmark, chartSeries, toggleMenu, closeMenu, selectBenchmark };
}
