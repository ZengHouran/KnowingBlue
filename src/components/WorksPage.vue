<script setup>
import { ArrowUpRight } from "@lucide/vue";
import LiquidGlass from "./LiquidGlass.vue";
import { useWorksPage } from "../composables/useWorksPage.js";

const {
  t,
  language,
  storefront,
  developerUrl,
  selectedCategory,
  categories,
  filteredApps,
  setCategory,
} = useWorksPage();
</script>

<template>
  <section class="works-content-section">
    <div class="works-wrap">
      <div class="works-header-bar fade-in" data-delay="80">
        <div class="works-tabs" role="tablist" aria-label="Works categories">
          <button
            v-for="cat in categories"
            :key="cat.key"
            type="button"
            role="tab"
            class="works-tab-btn"
            :class="{ active: selectedCategory === cat.key }"
            :aria-selected="selectedCategory === cat.key"
            @click="setCategory(cat.key)"
          >
            {{ t[cat.labelKey] }}
          </button>
        </div>
      </div>

      <div v-if="filteredApps.length > 0" class="app-grid">
        <LiquidGlass
          as="article"
          v-for="(app, index) in filteredApps"
          :key="app.id"
          class="app-card fade-in"
          :data-delay="120 + (index % 3) * 90"
        >
          <template #background>
            <div class="app-card-gradient">
              <div
                class="app-card-gradient__image"
                :style="{ backgroundImage: `url(${app.icon})` }"
              ></div>
            </div>
          </template>
          <img class="app-icon" :src="app.icon" :alt="app.name[language]" loading="lazy" />
          <h3 class="app-name">{{ app.name[language] }}</h3>
          <p class="app-tagline">{{ app.tagline[language] }}</p>
          <div class="app-meta">
            <a class="app-store-link" :href="app.url[storefront] || app.url.us" target="_blank" rel="noopener">
              {{ t.worksStoreLink }}
              <ArrowUpRight :size="15" aria-hidden="true" />
            </a>
          </div>
        </LiquidGlass>
      </div>

      <div v-else class="works-empty fade-in" data-delay="120">
        <p>{{ t.worksEmptyCategory }}</p>
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
