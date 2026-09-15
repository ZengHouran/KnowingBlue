<script setup>
import { useLanguage } from "../composables/useLanguage.js";

const { t } = useLanguage();
</script>

<template>
  <section class="hero vision-hero">
    <div class="hero-overlay"></div>
    <div class="hero-content vision-hero-content">
      <div class="letter vision-hero-letter fade-in" data-delay="150">
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
    </div>
  </section>

  <footer class="site-footer">
    <p>{{ t.copyright }}</p>
  </footer>
</template>
