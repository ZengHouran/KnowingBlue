<script setup>
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  PauseCircle,
  Play,
  X,
} from "@lucide/vue";
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";

const translations = {
  zh: {
    home: "首页",
    works: "作品",
    vision: "愿景",
    languageLabel: "语言 / Language",
    heroDescription: "我们专注于感性与认知心理的创意探索，用设计触达内心深处。",
    visionPageTitle: "愿景",
    visionPageSubtitle: "探索感性与认知的边界，用设计连接内心与世界",
    worksPageTitle: "作品",
    worksPageSubtitle: "每一件作品，都是感性与理性的一次相遇",
    worksStoreLink: "在 App Store 查看",
    worksDeveloperLink: "访问开发者主页",
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
    works: "Works",
    vision: "Vision",
    languageLabel: "Language",
    heroDescription:
      "We focus on creative exploration of emotion and cognitive psychology, using design to reach the depths of the heart.",
    visionPageTitle: "Vision",
    visionPageSubtitle:
      "Exploring the boundaries of emotion and cognition, connecting hearts with the world through design",
    worksPageTitle: "Works",
    worksPageSubtitle: "Every piece is an encounter between sensibility and reason",
    worksStoreLink: "View on App Store",
    worksDeveloperLink: "Visit Developer Page",
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
    works: "作品",
    vision: "ビジョン",
    languageLabel: "言語 / Language",
    heroDescription:
      "私たちは感性と認知心理学の創造的探求に焦点を当て、デザインで心の奥深くに触れることを目指しています。",
    visionPageTitle: "ビジョン",
    visionPageSubtitle: "感性と認知の境界を探求し、デザインで心と世界をつなぐ",
    worksPageTitle: "作品",
    worksPageSubtitle: "すべての作品は、感性と理性の出会い",
    worksStoreLink: "App Store で見る",
    worksDeveloperLink: "開発者ページを見る",
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
    worksTitle: "作品 - KnowingBlue",
    worksDescription:
      "KnowingBlue 的作品 - 由曾厚然打造的 iOS 应用：SolarFocus、Zemi Note、App Collector、Glint、Appilot 等。",
  },
  en: {
    homeTitle: "KnowingBlue - Emotional Design Studio",
    visionTitle: "Vision - KnowingBlue",
    homeDescription:
      "KnowingBlue - A creative studio focused on emotion and cognitive psychology, with sensibility, taste, and connection as core concepts.",
    visionDescription:
      "Learn about KnowingBlue's vision - A creative studio focused on emotion and cognitive psychology, with sensibility, taste, and connection as core concepts.",
    worksTitle: "Works - KnowingBlue",
    worksDescription:
      "Works by KnowingBlue - iOS apps crafted by Zeng Houran: SolarFocus, Zemi Note, App Collector, Glint, Appilot, and more.",
  },
  ja: {
    homeTitle: "KnowingBlue - 感性デザインスタジオ",
    visionTitle: "ビジョン - KnowingBlue",
    homeDescription:
      "KnowingBlue - 感性と認知心理学に特化したクリエイティブスタジオ、感性、品味、触達を核心理念とする。",
    visionDescription:
      "KnowingBlueのビジョンについて - 感性と認知心理学に特化したクリエイティブスタジオ、感性、品味、触達を核心理念とする。",
    worksTitle: "作品 - KnowingBlue",
    worksDescription:
      "KnowingBlue の作品 - Zeng Houran が手がけた iOS アプリ：SolarFocus、Zemi Note、App Collector、Glint、Appilot など。",
  },
};

const langNames = {
  zh: "中文",
  en: "English",
  ja: "日本語",
};

const developerId = "1804756359";

const worksApps = [
  {
    id: "6744120438",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/37/7a/19/377a1987-6c22-9ba7-2466-dda144b1616d/AppIcon-0-0-1x_U007epad-0-1-85-220.png/256x256bb.jpg",
    name: {
      zh: "SolarFocus - 专注行星",
      en: "SolarFocus",
      ja: "集中の星たち - SolarFocus",
    },
    tagline: {
      zh: "把太阳系变成专注的舞台，行星轨道实时运转，让每一次计时都充满想象。",
      en: "Turn the solar system into your focus stage — planets orbit in real time while you work.",
      ja: "太陽系を集中の舞台に。リアルタイムで動く惑星の軌道とともに、時間に意味を与える。",
    },
    url: {
      cn: "https://apps.apple.com/cn/app/id6744120438",
      us: "https://apps.apple.com/us/app/id6744120438",
      jp: "https://apps.apple.com/jp/app/id6744120438",
    },
  },
  {
    id: "6745965004",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/c0/01/86/c00186c8-1f84-8aa2-1a5f-a19d8a4befe5/AppIcon-0-0-1x_U007epad-0-1-sRGB-85-220.png/256x256bb.jpg",
    name: {
      zh: "Zemi Note - 语音识别翻译笔记",
      en: "Zemi Note - Voice Translation",
      ja: "ゼミノート - 音声認識翻訳ノート",
    },
    tagline: {
      zh: "实时语音转文字并自动翻译成母语，为跨语言沟通保存每一次重要对话。",
      en: "Real-time speech-to-text with instant translation — capture every conversation abroad.",
      ja: "音声をリアルタイムで文字起こしし、母語へ自動翻訳。留学や異文化コミュニケーションを支える。",
    },
    url: {
      cn: "https://apps.apple.com/cn/app/id6745965004",
      us: "https://apps.apple.com/us/app/id6745965004",
      jp: "https://apps.apple.com/jp/app/id6745965004",
    },
  },
  {
    id: "6749210346",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b3/16/ad/b316ad9b-4fab-f346-56bd-354bf13aa206/AppIcon-0-0-1x_U007epad-0-1-sRGB-85-220.png/256x256bb.jpg",
    name: {
      zh: "App Collector：应用收藏夹",
      en: "App Collector: Your Favorites",
      ja: "App Collector：お気に入り管理",
    },
    tagline: {
      zh: "为 App 爱好者与设计师打造的灵感收藏夹，统一收藏、分类和管理你关注的应用。",
      en: "A favorites library for app lovers, designers and developers — collect, organize and revisit inspiring apps.",
      ja: "App を愛する人、デザイナー、開発者のためのインスピレーション庫。お気に入りをまとめて管理。",
    },
    url: {
      cn: "https://apps.apple.com/cn/app/id6749210346",
      us: "https://apps.apple.com/us/app/id6749210346",
      jp: "https://apps.apple.com/jp/app/id6749210346",
    },
  },
  {
    id: "6757810839",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/fc/28/80/fc2880b0-4767-de1c-b454-7b60abdc39e3/AppIcon-0-0-1x_U007epad-0-1-85-220.png/256x256bb.jpg",
    name: {
      zh: "Glint: 树影拼图",
      en: "Glint: Tree Shadow Art",
      ja: "グリント: 樹影パズル",
    },
    tagline: {
      zh: "透过树影间的缝隙重塑视野，用 AI 抠图与创意填充，创作你的树影艺术。",
      en: "Re-imagine the world through nature's gaps — create tree-shadow art with AI masking and creative fills.",
      ja: "木漏れ日の隙間から世界を再構築する。AI が切り取る樹影に、創造性を注ぎ込む。",
    },
    url: {
      cn: "https://apps.apple.com/cn/app/id6757810839",
      us: "https://apps.apple.com/us/app/id6757810839",
      jp: "https://apps.apple.com/jp/app/id6757810839",
    },
  },
  {
    id: "6757530321",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/58/0a/78/580a7806-9db3-b815-9ee9-86c7de9ce7c7/AppIcon-0-0-1x_U007epad-0-1-sRGB-85-220.png/256x256bb.jpg",
    name: {
      zh: "Appilot: 你的应用上架神器",
      en: "Appilot: Vibe Coding Publisher",
      ja: "Appilot: AI駆動の配信ツール",
    },
    tagline: {
      zh: "开发者的全球化效率引擎，AI 自动翻译与智能设备适配，让应用上架全球市场更简单。",
      en: "An efficiency engine for developers — AI translation and smart device mockups make going global effortless.",
      ja: "開発者のためのグローバル化エンジン。AI 翻訳とデバイス対応で、世界への配信を身近に。",
    },
    url: {
      cn: "https://apps.apple.com/cn/app/id6757530321",
      us: "https://apps.apple.com/us/app/id6757530321",
      jp: "https://apps.apple.com/jp/app/id6757530321",
    },
  },
  {
    id: "6790173430",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/de/fc/59/defc5987-8fe3-9cb2-a89d-c9f6dd981f13/AppIcon-0-0-1x_U007epad-0-1-sRGB-85-220.png/256x256bb.jpg",
    name: {
      zh: "Astral Survivors",
      en: "Astral Survivors",
      ja: "Astral Survivors",
    },
    tagline: {
      zh: "Roguelike 星际生存动作游戏——选择你的英雄，在无尽的敌人浪潮中生存 40 分钟。",
      en: "A roguelike survival action game — choose your hero and survive 40 minutes against the endless tide.",
      ja: "ローグライク生存アクション。16 人のヒーローとともに、終わりのない波に立ち向かう。",
    },
    url: {
      us: "https://apps.apple.com/us/app/id6790173430",
      jp: "https://apps.apple.com/jp/app/id6790173430",
    },
  },
];

const language = ref(localStorage.getItem("language") || "zh");
const route = ref(getInitialRoute());
const isMenuOpen = ref(false);
const isLanguageOpen = ref(false);
const hasScrolled = ref(false);
const audio = ref(null);
const isPlaying = ref(false);
const progress = ref(0);
const playerHidden = ref(false);
const typedHeroTitle = ref("");
const typedHeroDescription = ref("");

let observer;
let mobileHideTimer;
let typewriterTimer;
let removeInteractionHandlers = () => {};

const t = computed(() => translations[language.value]);
const currentMeta = computed(() => metaByLanguage[language.value]);
const isHome = computed(() => route.value === "home");
const isVision = computed(() => route.value === "vision");
const isWorks = computed(() => route.value === "works");
const storefront = computed(() => ({ zh: "cn", en: "us", ja: "jp" })[language.value]);
const developerUrl = computed(() => `https://apps.apple.com/${storefront.value}/developer/id${developerId}`);
const progressOffset = computed(() => 125.6 - progress.value * 125.6);

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

function normalizeRoute(path) {
  const value = path.replace(/^#\/?/, "").replace(/^\//, "").replace(/\/$/, "");
  if (value === "vision" || value === "vision.html") return "vision";
  if (value === "works" || value === "works.html") return "works";
  return "home";
}

function getInitialRoute() {
  const redirect = new URLSearchParams(window.location.search).get("redirect");

  if (redirect) {
    const nextUrl = new URL(redirect, window.location.origin);
    window.history.replaceState({}, "", nextUrl.pathname + nextUrl.search + nextUrl.hash);
    const fromHash = normalizeRoute(nextUrl.hash);
    return fromHash !== "home" ? fromHash : normalizeRoute(nextUrl.pathname);
  }

  const fromHash = normalizeRoute(window.location.hash);
  return fromHash !== "home" ? fromHash : normalizeRoute(window.location.pathname);
}

function navigate(nextRoute) {
  const nextPath = { home: "/", works: "/works", vision: "/vision" }[nextRoute] || "/";

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
  const title = isVision.value ? meta.visionTitle : isWorks.value ? meta.worksTitle : meta.homeTitle;
  const description = isVision.value
    ? meta.visionDescription
    : isWorks.value
      ? meta.worksDescription
      : meta.homeDescription;
  document.title = title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", description);
}

function syncMobileMenuLock() {
  document.body.classList.toggle("mobile-menu-open", isMenuOpen.value);
}

function startHeroTypewriter() {
  clearTimeout(typewriterTimer);
  typedHeroTitle.value = "";
  typedHeroDescription.value = "";

  if (isVision.value || isWorks.value) return;

  const title = "KnowingBlue";
  const text = t.value.heroDescription;
  let index = 0;

  const typeTitle = () => {
    typedHeroTitle.value = title.slice(0, index);

    if (index < title.length) {
      index += 1;
      typewriterTimer = window.setTimeout(typeTitle, 95);
      return;
    }

    index = 0;
    typewriterTimer = window.setTimeout(typeDescription, 160);
  };

  const typeDescription = () => {
    typedHeroDescription.value = text.slice(0, index);

    if (index < text.length) {
      index += 1;
      typewriterTimer = window.setTimeout(typeDescription, 38);
    }
  };

  typeTitle();
}

watch([language, route], async () => {
  syncMeta();
  startHeroTypewriter();
  await nextTick();
  observeFadeIn();
});

watch(isMenuOpen, syncMobileMenuLock);

onMounted(() => {
  handleScroll();
  syncMeta();
  startHeroTypewriter();
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
  clearTimeout(typewriterTimer);
  document.body.classList.remove("mobile-menu-open");
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
  <div class="site-shell" :class="{ 'home-shell': isHome }">
    <header class="site-header" :class="{ scrolled: hasScrolled, open: isMenuOpen }">
      <div class="header-inner">
        <button class="brand-link" type="button" @click="navigate('home')">KnowingBlue</button>

        <nav class="desktop-nav" aria-label="Primary navigation">
          <button type="button" :class="{ active: isHome }" @click="navigate('home')">
            {{ t.home }}
          </button>
          <button type="button" :class="{ active: isWorks }" @click="navigate('works')">
            {{ t.works }}
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

      <div class="mobile-menu" :class="{ visible: isMenuOpen }" @click.self="isMenuOpen = false">
        <div class="mobile-menu-inner" @click.stop>
          <nav aria-label="Mobile navigation">
            <button type="button" @click="navigate('home')">{{ t.home }}</button>
            <button type="button" @click="navigate('works')">{{ t.works }}</button>
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
      <section v-if="isHome" class="hero home-hero">
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

      <template v-else-if="isVision">
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

      <template v-else>
        <section class="hero works-hero">
          <div class="hero-overlay"></div>
          <div class="hero-content">
            <div class="fade-in" data-delay="200">
              <h1>{{ t.worksPageTitle }}</h1>
            </div>
            <div class="fade-in" data-delay="300">
              <p>{{ t.worksPageSubtitle }}</p>
            </div>
          </div>
        </section>

        <section class="works-content-section">
          <div class="works-wrap">
            <div class="app-grid">
              <article
                v-for="(app, index) in worksApps"
                :key="app.id"
                class="app-card fade-in"
                :data-delay="120 + (index % 3) * 90"
              >
                <div
                  class="app-cover"
                  :style="{ backgroundImage: 'url(' + app.icon + ')' }"
                  aria-hidden="true"
                ></div>
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
    </main>

    <div
      class="audio-player"
      :class="{ hiddenMobile: playerHidden, visionStyle: isVision || isWorks }"
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
