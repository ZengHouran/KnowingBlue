<script setup>
import AstraHeader from './AstraHeader.vue';
import AstraStarfield from './AstraStarfield.vue';
import '../../styles/astra/page.css';
</script>

<template>
  <div class="astra-page">
    <a class="astra-skip" href="#introduction">メインコンテンツにスキップ</a>
    <AstraHeader />
    <main>
      <AstraStarfield />
    </main>
  </div>
</template>
