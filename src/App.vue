<script setup>
import {
  ChevronDown,
  Heart,
  Menu,
  PauseCircle,
  Play,
  Sparkles,
  X,
  Zap,
} from "@lucide/vue";
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";

const translations = {
  zh: {
    home: "首页",
    vision: "愿景",
    languageLabel: "语言 / Language",
    heroDescription: "我们专注于感性与认知心理的创意探索，用设计触达内心深处。",
    visionPageTitle: "愿景",
    visionPageSubtitle: "探索感性与认知的边界，用设计连接内心与世界",
    visionTitle: "我们的愿景",
    visionContent1:
      "KnowingBlue 致力于探索感性与认知心理学的交汇点，我们相信真正触动人心的设计源于对人类情感和认知模式的深度理解。",
    visionContent2:
      "通过将感性思维与理性分析相结合，我们创造出既美观又具有深层意义的作品，让每一次体验都能触达用户的内心深处。",
    sensibilityTitle: "感性",
    sensibilityDesc: "用情感驱动设计，创造有温度的体验",
    tasteTitle: "品味",
    tasteDesc: "追求卓越的美学标准和精致的细节",
    connectionTitle: "触达",
    connectionDesc: "建立深层次的情感连接和共鸣",
    copyright: "© 2026 KnowingBlue. 保留所有权利。",
  },
  en: {
    home: "Home",
    vision: "Vision",
    languageLabel: "Language",
    heroDescription:
      "We focus on creative exploration of emotion and cognitive psychology, using design to reach the depths of the heart.",
    visionPageTitle: "Vision",
    visionPageSubtitle:
      "Exploring the boundaries of emotion and cognition, connecting hearts with the world through design",
    visionTitle: "Our Vision",
    visionContent1:
      "KnowingBlue is dedicated to exploring the intersection of emotion and cognitive psychology. We believe that truly touching design stems from a deep understanding of human emotions and cognitive patterns.",
    visionContent2:
      "By combining emotional thinking with rational analysis, we create works that are both beautiful and deeply meaningful, allowing every experience to reach the depths of users' hearts.",
    sensibilityTitle: "Sensibility",
    sensibilityDesc: "Emotion-driven design creating warm experiences",
    tasteTitle: "Taste",
    tasteDesc: "Pursuing excellence in aesthetics and refined details",
    connectionTitle: "Connection",
    connectionDesc: "Building deep emotional connections and resonance",
    copyright: "© 2026 KnowingBlue. All rights reserved.",
  },
  ja: {
    home: "ホーム",
    vision: "ビジョン",
    languageLabel: "言語 / Language",
    heroDescription:
      "私たちは感性と認知心理学の創造的探求に焦点を当て、デザインで心の奥深くに触れることを目指しています。",
    visionPageTitle: "ビジョン",
    visionPageSubtitle: "感性と認知の境界を探求し、デザインで心と世界をつなぐ",
    visionTitle: "私たちのビジョン",
    visionContent1:
      "KnowingBlue は感性と認知心理学の交差点を探求することに専念しています。私たちは、真に心を動かすデザインは人間の感情と認知パターンの深い理解から生まれると信じています。",
    visionContent2:
      "感性的思考と理性的分析を組み合わせることで、美しく深い意味を持つ作品を創造し、すべての体験がユーザーの心の奥深くに届くようにします。",
    sensibilityTitle: "感性",
    sensibilityDesc: "感情に駆動されたデザインで温かい体験を創造",
    tasteTitle: "品味",
    tasteDesc: "美学の卓越性と洗練されたディテールの追求",
    connectionTitle: "触達",
    connectionDesc: "深い感情的つながりと共鳴の構築",
    copyright: "© 2026 KnowingBlue. 全著作権所有。",
  },
};

const metaByLanguage = {
  zh: {
    homeTitle: "KnowingBlue - 感性设计工作室",
    visionTitle: "愿景 - KnowingBlue",
    homeDescription:
      "KnowingBlue - 专注于感性与认知心理相关的创意工作室，以感性、品味、触达为核心理念。",
    visionDescription:
      "了解KnowingBlue的愿景 - 专注于感性与认知心理相关的创意工作室，以感性、品味、触达为核心理念。",
  },
  en: {
    homeTitle: "KnowingBlue - Emotional Design Studio",
    visionTitle: "Vision - KnowingBlue",
    homeDescription:
      "KnowingBlue - A creative studio focused on emotion and cognitive psychology, with sensibility, taste, and connection as core concepts.",
    visionDescription:
      "Learn about KnowingBlue's vision - A creative studio focused on emotion and cognitive psychology, with sensibility, taste, and connection as core concepts.",
  },
  ja: {
    homeTitle: "KnowingBlue - 感性デザインスタジオ",
    visionTitle: "ビジョン - KnowingBlue",
    homeDescription:
      "KnowingBlue - 感性と認知心理学に特化したクリエイティブスタジオ、感性、品味、触達を核心理念とする。",
    visionDescription:
      "KnowingBlueのビジョンについて - 感性と認知心理学に特化したクリエイティブスタジオ、感性、品味、触達を核心理念とする。",
  },
};

const langNames = {
  zh: "中文",
  en: "English",
  ja: "日本語",
};

const language = ref(localStorage.getItem("language") || "zh");
const route = ref(getInitialRoute());
const isMenuOpen = ref(false);
const isLanguageOpen = ref(false);
const hasScrolled = ref(false);
const audio = ref(null);
const isPlaying = ref(false);
const progress = ref(0);
const playerHidden = ref(false);

let observer;
let mobileHideTimer;
let removeInteractionHandlers = () => {};

const t = computed(() => translations[language.value]);
const currentMeta = computed(() => metaByLanguage[language.value]);
const isVision = computed(() => route.value === "vision");
const progressOffset = computed(() => 125.6 - progress.value * 125.6);

const pillars = computed(() => [
  {
    icon: Heart,
    title: t.value.sensibilityTitle,
    description: t.value.sensibilityDesc,
  },
  {
    icon: Sparkles,
    title: t.value.tasteTitle,
    description: t.value.tasteDesc,
  },
  {
    icon: Zap,
    title: t.value.connectionTitle,
    description: t.value.connectionDesc,
  },
]);

function normalizeRoute(path) {
  const value = path.replace(/^#\/?/, "").replace(/^\//, "").replace(/\/$/, "");
  return value === "vision" || value === "vision.html" ? "vision" : "home";
}

function getInitialRoute() {
  const redirect = new URLSearchParams(window.location.search).get("redirect");

  if (redirect) {
    const nextUrl = new URL(redirect, window.location.origin);
    window.history.replaceState({}, "", nextUrl.pathname + nextUrl.search + nextUrl.hash);
    return normalizeRoute(nextUrl.hash) === "vision" ? "vision" : normalizeRoute(nextUrl.pathname);
  }

  return normalizeRoute(window.location.hash) === "vision" ? "vision" : normalizeRoute(window.location.pathname);
}

function navigate(nextRoute) {
  const nextPath = nextRoute === "vision" ? "/vision" : "/";

  if (window.location.pathname !== nextPath) {
    window.history.pushState({}, "", nextPath);
  }

  route.value = nextRoute;
  isMenuOpen.value = false;
  isLanguageOpen.value = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function changeLanguage(nextLanguage) {
  language.value = nextLanguage;
  localStorage.setItem("language", nextLanguage);
  isLanguageOpen.value = false;
  isMenuOpen.value = false;
}

function handlePopState() {
  route.value = getInitialRoute();
  isMenuOpen.value = false;
}

function handleHashChange() {
  route.value = getInitialRoute();
  isMenuOpen.value = false;
}

function handleScroll() {
  hasScrolled.value = window.scrollY > 10;
}

function handleOutsideClick(event) {
  if (!event.target.closest(".language-switcher")) {
    isLanguageOpen.value = false;
  }
}

function observeFadeIn() {
  observer?.disconnect();
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = Number(entry.target.dataset.delay || 0);
          window.setTimeout(() => entry.target.classList.add("visible"), delay);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  document.querySelectorAll(".fade-in").forEach((element) => {
    element.classList.remove("visible");
    observer.observe(element);
  });
}

async function toggleAudio() {
  if (!audio.value) return;

  if (isPlaying.value) {
    audio.value.pause();
    isPlaying.value = false;
    return;
  }

  try {
    await audio.value.play();
    isPlaying.value = true;
    removeInteractionHandlers();
  } catch (error) {
    console.info("Audio play prevented:", error);
  }
}

function updateProgress() {
  if (!audio.value?.duration) {
    progress.value = 0;
    return;
  }
  progress.value = audio.value.currentTime / audio.value.duration;
}

function saveAudioState() {
  if (!audio.value) return;

  sessionStorage.setItem(
    "audioState",
    JSON.stringify({
      currentTime: audio.value.currentTime,
      isPlaying: !audio.value.paused,
      volume: audio.value.volume,
      muted: audio.value.muted,
    }),
  );
}

async function attemptAutoplay() {
  if (!audio.value) return;

  try {
    await audio.value.play();
    isPlaying.value = true;
  } catch (error) {
    console.info("Autoplay prevented:", error);
    setupInteractionPlay();
  }
}

function setupInteractionPlay() {
  const playOnInteraction = async () => {
    if (!audio.value || isPlaying.value) return;

    try {
      await audio.value.play();
      isPlaying.value = true;
      removeInteractionHandlers();
    } catch (error) {
      console.info("Interaction play failed:", error);
    }
  };

  const events = ["click", "scroll", "mousemove", "touchstart", "keydown"];
  events.forEach((eventName) => document.addEventListener(eventName, playOnInteraction, { once: true }));
  removeInteractionHandlers = () => {
    events.forEach((eventName) => document.removeEventListener(eventName, playOnInteraction));
    removeInteractionHandlers = () => {};
  };
}

function schedulePlayerHide() {
  clearTimeout(mobileHideTimer);
  if (window.innerWidth < 768) {
    mobileHideTimer = window.setTimeout(() => {
      playerHidden.value = true;
    }, 3000);
  }
}

function showPlayer() {
  clearTimeout(mobileHideTimer);
  playerHidden.value = false;
}

function syncMeta() {
  const meta = currentMeta.value;
  document.documentElement.lang = language.value === "zh" ? "zh-CN" : language.value;
  document.title = isVision.value ? meta.visionTitle : meta.homeTitle;
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", isVision.value ? meta.visionDescription : meta.homeDescription);
}

watch([language, route], async () => {
  syncMeta();
  await nextTick();
  observeFadeIn();
});

onMounted(() => {
  handleScroll();
  syncMeta();
  observeFadeIn();

  const savedState = sessionStorage.getItem("audioState");
  if (savedState && audio.value) {
    const state = JSON.parse(savedState);
    audio.value.currentTime = state.currentTime || 0;
    audio.value.volume = state.volume || 1;
    audio.value.muted = state.muted || false;
    sessionStorage.removeItem("audioState");
  }
  attemptAutoplay();
  schedulePlayerHide();

  window.addEventListener("popstate", handlePopState);
  window.addEventListener("hashchange", handleHashChange);
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("beforeunload", saveAudioState);
  window.addEventListener("resize", schedulePlayerHide);
  document.addEventListener("click", handleOutsideClick);
});

onUnmounted(() => {
  observer?.disconnect();
  clearTimeout(mobileHideTimer);
  removeInteractionHandlers();
  window.removeEventListener("popstate", handlePopState);
  window.removeEventListener("hashchange", handleHashChange);
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("beforeunload", saveAudioState);
  window.removeEventListener("resize", schedulePlayerHide);
  document.removeEventListener("click", handleOutsideClick);
});
</script>

<template>
  <div class="site-shell" :class="{ 'home-shell': !isVision }">
    <header class="site-header" :class="{ scrolled: hasScrolled, open: isMenuOpen }">
      <div class="header-inner">
        <button class="brand-link" type="button" @click="navigate('home')">KnowingBlue</button>

        <nav class="desktop-nav" aria-label="Primary navigation">
          <button type="button" :class="{ active: !isVision }" @click="navigate('home')">
            {{ t.home }}
          </button>
          <button type="button" :class="{ active: isVision }" @click="navigate('vision')">
            {{ t.vision }}
          </button>

          <div class="language-switcher">
            <button
              class="language-button"
              type="button"
              aria-haspopup="menu"
              :aria-expanded="isLanguageOpen"
              @click.stop="isLanguageOpen = !isLanguageOpen"
            >
              <span>{{ langNames[language] }}</span>
              <ChevronDown :size="16" aria-hidden="true" />
            </button>
            <div v-if="isLanguageOpen" class="language-menu" role="menu">
              <button
                v-for="(name, key) in langNames"
                :key="key"
                type="button"
                role="menuitem"
                @click="changeLanguage(key)"
              >
                {{ name }}
              </button>
            </div>
          </div>
        </nav>

        <button
          class="mobile-menu-button"
          type="button"
          :aria-label="isMenuOpen ? 'Close navigation' : 'Open navigation'"
          @click="isMenuOpen = !isMenuOpen"
        >
          <Menu v-if="!isMenuOpen" :size="26" aria-hidden="true" />
          <X v-else :size="26" aria-hidden="true" />
        </button>
      </div>

      <div class="mobile-menu" :class="{ visible: isMenuOpen }">
        <div class="mobile-menu-inner">
          <nav aria-label="Mobile navigation">
            <button type="button" @click="navigate('home')">{{ t.home }}</button>
            <button type="button" @click="navigate('vision')">{{ t.vision }}</button>
          </nav>

          <div class="mobile-language">
            <span>{{ t.languageLabel }}</span>
            <div>
              <button
                v-for="(name, key) in langNames"
                :key="key"
                type="button"
                :class="{ selected: language === key }"
                @click="changeLanguage(key)"
              >
                {{ key === "en" ? "EN" : name }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main>
      <section v-if="!isVision" class="hero home-hero">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="fade-in" data-delay="200">
            <h1>KnowingBlue</h1>
          </div>
          <div class="fade-in" data-delay="300">
            <p>{{ t.heroDescription }}</p>
          </div>
          <div class="fade-in" data-delay="400">
            <small>{{ t.copyright }}</small>
          </div>
        </div>
      </section>

      <template v-else>
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
            <div class="vision-copy fade-in" data-delay="100">
              <h2>{{ t.visionTitle }}</h2>
              <p>{{ t.visionContent1 }}</p>
              <p>{{ t.visionContent2 }}</p>
            </div>

            <div class="pillar-grid">
              <article
                v-for="(pillar, index) in pillars"
                :key="pillar.title"
                class="pillar fade-in"
                :data-delay="200 + index * 100"
              >
                <div class="pillar-icon">
                  <component :is="pillar.icon" :size="24" aria-hidden="true" />
                </div>
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
    </main>

    <div
      class="audio-player"
      :class="{ hiddenMobile: playerHidden, visionStyle: isVision }"
      @mouseenter="showPlayer"
      @mouseleave="schedulePlayerHide"
      @focusin="showPlayer"
    >
      <button type="button" class="audio-button" :aria-label="isPlaying ? 'Pause music' : 'Play music'" @click="toggleAudio">
        <PauseCircle v-if="isPlaying" :size="22" aria-hidden="true" />
        <Play v-else :size="20" aria-hidden="true" />
      </button>
      <svg class="progress-ring" viewBox="0 0 48 48" aria-hidden="true">
        <circle class="progress-track" cx="24" cy="24" r="20" />
        <circle
          class="progress-value"
          cx="24"
          cy="24"
          r="20"
          :stroke-dashoffset="progressOffset"
        />
      </svg>
    </div>

    <audio ref="audio" loop @timeupdate="updateProgress" @ended="isPlaying = false">
      <source src="/music/music.mp3" type="audio/mpeg" />
    </audio>
  </div>
</template>
