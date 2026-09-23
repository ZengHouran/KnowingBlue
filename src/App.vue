<script setup>
import { nextTick, onMounted, onUnmounted, watch } from "vue";
import AudioPlayer from "./components/AudioPlayer.vue";
import HomeHero from "./components/HomeHero.vue";
import SiteHeader from "./components/SiteHeader.vue";
import VisionPage from "./components/VisionPage.vue";
import WorksPage from "./components/WorksPage.vue";
import AstraPage from "./components/astra/AstraPage.vue";
import { useFadeInObserver } from "./composables/useFadeIn.js";
import { useHeroTypewriter } from "./composables/useHeroTypewriter.js";
import { useLanguage } from "./composables/useLanguage.js";
import { bindRouteListeners, useRouter } from "./composables/useRouter.js";
import { metaByLanguage } from "./data/translations.js";

const { language } = useLanguage();
const { route, isHome, isVision, isWorks, isAstra } = useRouter();
const { startHeroTypewriter, stopHeroTypewriter } = useHeroTypewriter();
const { observeFadeIn, disconnectFadeIn } = useFadeInObserver();

function syncMeta() {
  const meta = metaByLanguage[language.value];

  if (isAstra.value) {
    document.documentElement.lang = language.value === "zh" ? "zh-CN" : language.value;
    document.title = meta.astraTitle;
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      meta.astraDescription,
    );
    return;
  }

  document.documentElement.lang = language.value === "zh" ? "zh-CN" : language.value;
  const title = isVision.value ? meta.visionTitle : isWorks.value ? meta.worksTitle : meta.homeTitle;
  const description = isVision.value
    ? meta.visionDescription
    : isWorks.value
      ? meta.worksDescription
      : meta.homeDescription;
  document.title = title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", description);
}

function syncPageEffects() {
  stopHeroTypewriter();
  disconnectFadeIn();
  if (isAstra.value) return;
  if (isHome.value) startHeroTypewriter();
  observeFadeIn();
}

watch([language, route], async () => {
  syncMeta();
  await nextTick();
  syncPageEffects();
});

let unbindRouteListeners = () => {};

onMounted(() => {
  syncMeta();
  syncPageEffects();
  unbindRouteListeners = bindRouteListeners();
});

onUnmounted(() => {
  disconnectFadeIn();
  stopHeroTypewriter();
  unbindRouteListeners();
});
</script>

<template>
  <AstraPage v-if="isAstra" />

  <div v-else class="site-shell" :class="{ 'home-shell': isHome, 'works-shell': isWorks }">
    <SiteHeader />

    <main>
      <HomeHero v-if="isHome" />
      <VisionPage v-else-if="isVision" />
      <WorksPage v-else />
    </main>

    <AudioPlayer />
  </div>
</template>
