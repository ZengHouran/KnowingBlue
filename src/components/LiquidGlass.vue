<script setup>
import { useLiquidGlass } from "../composables/useLiquidGlass.js";
import { glassDefaults } from "../models/liquidGlass.js";
import GlassFilter from "./GlassFilter.vue";
import "../styles/liquid-glass.css";

const props = defineProps({
  as: { type: String, default: "div" },
  blur: { type: Number, default: glassDefaults.blur },
  saturation: { type: Number, default: glassDefaults.saturation },
  refraction: { type: Number, default: glassDefaults.refraction },
  interactive: { type: Boolean, default: true },
});

const {
  surface,
  map,
  filterId,
  refraction,
  glassStyle,
  moveHighlight,
  resetHighlight,
} = useLiquidGlass(props);
</script>

<template>
  <component
    :is="as"
    ref="surface"
    class="liquid-glass"
    :style="glassStyle"
    @pointermove="moveHighlight"
    @pointerleave="resetHighlight"
    @pointercancel="resetHighlight"
  >
    <GlassFilter v-if="map" :id="filterId" :map="map" :scale="refraction" />
    <div class="liquid-glass__effects" aria-hidden="true">
      <span class="liquid-glass__backdrop"></span>
      <span class="liquid-glass__finish"></span>
      <slot name="background" />
    </div>
    <span class="liquid-glass__rim" aria-hidden="true"></span>
    <div class="liquid-glass__content"><slot /></div>
  </component>
</template>
