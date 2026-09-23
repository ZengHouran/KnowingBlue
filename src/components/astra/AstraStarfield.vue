<script setup>
import { ref } from 'vue';
import { useAstraStarfield } from '../../composables/useAstraStarfield.js';
import { useCosmicBackground } from '../../composables/useCosmicBackground.js';
import { useLanguage } from '../../composables/useLanguage.js';

const canvas = ref(null);
const cosmicCanvas = ref(null);
const stage = ref(null);

const { ready, dragging, fallbackStars, motionReduced, pointerMove, pointerDown, pointerUp, pointerLeave, keyDown, replay } = useAstraStarfield(canvas, stage);
useCosmicBackground(cosmicCanvas);

const { t } = useLanguage();
</script>

<template>
  <section id="astra-hero" ref="stage" class="astra-hero" :class="{ 'astra-hero--ready': ready, 'astra-hero--reduced': motionReduced }" :aria-label="t.astraHeroTitle">
    <h1 class="astra-sr-only">{{ t.astraHeroTitle }}</h1>
    <div class="astra-field-backdrop">
      <div class="astra-space" aria-hidden="true"></div>
      <canvas ref="cosmicCanvas" class="astra-cosmic-canvas" aria-hidden="true"></canvas>
      <svg v-if="!ready" class="astra-star-fallback" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <circle v-for="(star, index) in fallbackStars" :key="index" :cx="star.x" :cy="star.y" :r="star.size" :fill="star.color" :opacity="star.opacity" />
      </svg>
      <canvas ref="canvas" class="astra-star-canvas" aria-hidden="true"></canvas>
    </div>
    <div class="astra-star-interaction" :class="{ 'is-dragging': dragging }" role="button" tabindex="0" :aria-label="t.astraInteractionLabel" @pointerdown="pointerDown" @pointermove="pointerMove" @pointerup="pointerUp" @pointercancel="pointerUp" @pointerleave="pointerLeave" @lostpointercapture="dragging = false" @keydown="keyDown"></div>
    <div class="astra-hero-wordmark" aria-hidden="true"><span>{{ t.astraHello }}</span><span>{{ t.astraFuture }}</span></div>
    <button class="astra-replay" :aria-label="t.astraReplayLabel" :title="t.astraReplayLabel" @click="replay">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.4 8.2A8 8 0 1 1 4 15M4.4 8.2V3.5m0 4.7h4.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </button>
  </section>
</template>
