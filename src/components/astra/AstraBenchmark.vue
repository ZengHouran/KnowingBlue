<script setup>
import { astraBenchmarkGroups } from "../../data/astraArticle.js";
import { useAstraArticle } from "../../composables/useAstraArticle.js";

const props = defineProps({ group: { type: String, required: true } });
const benchmarks = astraBenchmarkGroups[props.group];
const { activeBenchmarkId, activeBenchmark, chartSeries, selectBenchmark } = useAstraArticle(benchmarks);
</script>

<template>
  <section v-if="activeBenchmark" class="astra-benchmarks" aria-label="評価結果">
    <div class="astra-benchmark-tabs" role="tablist" aria-label="ベンチマーク">
      <button v-for="benchmark in benchmarks" :id="`tab-${group}-${benchmark.id}`" :key="benchmark.id" type="button" role="tab" :aria-selected="activeBenchmarkId === benchmark.id" :aria-controls="`panel-${group}`" :class="{ 'is-active': activeBenchmarkId === benchmark.id }" @click="selectBenchmark(benchmark.id)">{{ benchmark.label }}</button>
    </div>
    <div :id="`panel-${group}`" class="astra-benchmark-panel" role="tabpanel" :aria-labelledby="`tab-${group}-${activeBenchmark.id}`">
      <h3>{{ activeBenchmark.title }}</h3>
      <template v-if="activeBenchmark.kind === 'scatter'">
        <div class="astra-chart-legend"><span v-for="series in chartSeries" :key="series.label"><i :style="{ background: series.color }"></i>{{ series.label }}</span></div>
        <svg class="astra-scatter-chart" viewBox="0 0 500 355" role="img" :aria-label="`${activeBenchmark.title}：API コストと解決率`">
          <g class="astra-chart-axis">
            <line x1="56" y1="58" x2="56" y2="300" /><line x1="56" y1="300" x2="468" y2="300" />
            <g v-for="(tick, index) in [20, 30, 40, 50, 60, 70]" :key="tick"><text x="46" :y="304 - index * 48.4" text-anchor="end">{{ tick }}%</text></g>
            <g v-for="(tick, index) in [0, 20, 40, 60, 80]" :key="tick"><text :x="56 + index * 103" y="323" text-anchor="middle">${{ tick }}</text></g>
            <text x="264" y="347" text-anchor="middle">API Cost</text><text x="15" y="180" text-anchor="middle" transform="rotate(-90 15 180)">解決率</text>
          </g>
          <g v-for="series in chartSeries" :key="series.label">
            <polyline :points="series.path" fill="none" :stroke="series.color" stroke-width="2" />
            <circle v-for="(point, index) in series.points" :key="index" :cx="point.x" :cy="point.y" r="4.5" :fill="series.color"><title>{{ series.label }} · {{ point.score }}% · ${{ point.cost.toFixed(2) }}</title></circle>
          </g>
        </svg>
      </template>
      <div v-else class="astra-bar-chart">
        <div v-for="entry in activeBenchmark.entries" :key="entry.label" class="astra-chart-column">
          <span class="astra-chart-value">{{ entry.displayValue }}</span>
          <div class="astra-chart-bar" :style="{ '--bar-height': `${entry.value / (activeBenchmark.max || 100) * 100}%`, background: entry.color }"></div>
          <span class="astra-chart-label">{{ entry.label }}</span>
        </div>
      </div>
      <p v-if="activeBenchmark.note" class="astra-chart-note">{{ activeBenchmark.note }}</p>
    </div>
  </section>
</template>
