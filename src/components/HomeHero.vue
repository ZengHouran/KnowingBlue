<script setup>
import { useHeroTypewriter } from "../composables/useHeroTypewriter.js";
import { useLanguage } from "../composables/useLanguage.js";

const { t } = useLanguage();
const { typedHeroTitle, typedHeroDescription } = useHeroTypewriter();
</script>

<template>
  <section class="hero home-hero">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <div class="fade-in" data-delay="200">
        <h1 class="typewriter-heading" aria-label="KnowingBlue">
          <span aria-hidden="true">{{ typedHeroTitle }}</span>
          <span
            v-if="typedHeroTitle !== 'KnowingBlue'"
            class="typewriter-cursor title-cursor"
            aria-hidden="true"
          ></span>
        </h1>
      </div>
      <div class="fade-in" data-delay="300">
        <p class="typewriter-text" :aria-label="t.heroDescription">
          <span aria-hidden="true">{{ typedHeroDescription }}</span>
          <span
            v-if="typedHeroTitle === 'KnowingBlue' && typedHeroDescription.length > 0 && typedHeroDescription !== t.heroDescription"
            class="typewriter-cursor"
            aria-hidden="true"
          ></span>
        </p>
      </div>
    </div>
    <small class="home-copyright">{{ t.copyright }}</small>
  </section>
</template>
