<script setup>
import { computed } from "vue";
import { useLanguage } from "../composables/useLanguage.js";

const { t } = useLanguage();

const pillars = computed(() => [
  {
    title: t.value.sensibilityTitle,
    description: t.value.sensibilityDesc,
  },
  {
    title: t.value.tasteTitle,
    description: t.value.tasteDesc,
  },
  {
    title: t.value.connectionTitle,
    description: t.value.connectionDesc,
  },
]);
</script>

<template>
  <section class="hero vision-hero">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <div class="fade-in" data-delay="200">
        <h1>{{ t.visionPageTitle }}</h1>
      </div>
      <div class="fade-in" data-delay="300">
        <p>{{ t.visionPageSubtitle }}</p>
      </div>
    </div>
  </section>

  <section class="vision-content-section">
    <div class="content-wrap">
      <div class="letter fade-in" data-delay="100">
        <h2>{{ t.visionTitle }}</h2>
        <div class="letter-body">
          <p class="letter-greeting">{{ t.letterGreeting }}</p>
          <p
            v-for="(paragraph, index) in t.letterParagraphs"
            :key="index"
            class="letter-paragraph"
          >
            {{ paragraph }}
          </p>
          <p class="letter-wish">{{ t.letterWish }}</p>
        </div>
      </div>

      <div class="pillar-grid">
        <article
          v-for="(pillar, index) in pillars"
          :key="pillar.title"
          class="pillar fade-in"
          :data-delay="200 + index * 100"
        >
          <span class="pillar-index">{{ String(index + 1).padStart(2, "0") }}</span>
          <h3>{{ pillar.title }}</h3>
          <p>{{ pillar.description }}</p>
        </article>
      </div>
    </div>
  </section>

  <footer class="site-footer">
    <p>{{ t.copyright }}</p>
  </footer>
</template>
