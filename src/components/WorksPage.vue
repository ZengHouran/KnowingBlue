<script setup>
import { ArrowUpRight } from "@lucide/vue";
import { computed } from "vue";
import { useLanguage } from "../composables/useLanguage.js";
import { developerId, worksApps } from "../data/works.js";

const { t, language } = useLanguage();

const storefront = computed(() => ({ zh: "cn", en: "us", ja: "jp" })[language.value]);
const developerUrl = computed(
  () => `https://apps.apple.com/${storefront.value}/developer/id${developerId}`,
);
</script>

<template>
  <section class="works-content-section">
    <div class="works-wrap">
      <div class="app-grid">
        <article
          v-for="(app, index) in worksApps"
          :key="app.id"
          class="app-card fade-in"
          :data-delay="120 + (index % 3) * 90"
        >
          <div class="app-card-bg" aria-hidden="true">
            <div
              class="app-cover"
              :style="{ backgroundImage: 'url(' + app.icon + ')' }"
            ></div>
            <div class="app-card-overlay"></div>
          </div>
          <img class="app-icon" :src="app.icon" :alt="app.name[language]" loading="lazy" />
          <h3 class="app-name">{{ app.name[language] }}</h3>
          <p class="app-tagline">{{ app.tagline[language] }}</p>
          <div class="app-meta">
            <a class="app-store-link" :href="app.url[storefront] || app.url.us" target="_blank" rel="noopener">
              {{ t.worksStoreLink }}
              <ArrowUpRight :size="15" aria-hidden="true" />
            </a>
          </div>
        </article>
      </div>

      <div class="works-developer fade-in" data-delay="200">
        <a :href="developerUrl" target="_blank" rel="noopener">
          {{ t.worksDeveloperLink }}
          <ArrowUpRight :size="15" aria-hidden="true" />
        </a>
      </div>
    </div>
  </section>

  <footer class="site-footer">
    <p>{{ t.copyright }}</p>
  </footer>
</template>
