<script setup>
import AstraStarfield from './AstraStarfield.vue';
import { useLanguage } from '../../composables/useLanguage.js';
import '../../styles/astra/page.css';

const { t } = useLanguage();
</script>

<template>
  <div class="astra-page">
    <a class="astra-skip" href="#astra-hero">{{ t.astraSkip }}</a>
    <AstraStarfield />
  </div>
</template>
