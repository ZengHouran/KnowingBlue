<script setup>
defineProps({
  id: { type: String, required: true },
  map: { type: String, required: true },
  scale: { type: Number, required: true },
});
</script>

<template>
  <svg class="liquid-glass__definitions" aria-hidden="true" focusable="false">
    <defs>
      <filter
        :id="id"
        x="0"
        y="0"
        width="100%"
        height="100%"
        color-interpolation-filters="sRGB"
      >
        <feImage
          :href="map"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          result="normal"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="normal"
          :scale="scale"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  </svg>
</template>
