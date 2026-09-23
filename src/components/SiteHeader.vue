<script setup>
import { ChevronDown, Menu, X } from "@lucide/vue";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useLanguage } from "../composables/useLanguage.js";
import { useRouter } from "../composables/useRouter.js";
import { navigationItems } from "../data/navigation.js";
import { langNames } from "../data/translations.js";

const { t, language, setLanguage } = useLanguage();
const { route, isHome, isVision, isWorks, isAstra, navigate } = useRouter();

const isMenuOpen = ref(false);
const isLanguageOpen = ref(false);
const hasScrolled = ref(false);

function isRouteActive(itemRoute) {
  if (itemRoute === "home") return isHome.value;
  if (itemRoute === "astra") return isAstra.value;
  if (itemRoute === "works") return isWorks.value;
  if (itemRoute === "vision") return isVision.value;
  return route.value === itemRoute;
}

function handleScroll() {
  hasScrolled.value = window.scrollY > 10;
}

function handleOutsideClick(event) {
  if (!event.target.closest(".language-switcher")) {
    isLanguageOpen.value = false;
  }
}

function handleKeyDown(event) {
  if (event.key === "Escape") {
    isMenuOpen.value = false;
    isLanguageOpen.value = false;
  }
}

function syncMobileMenuLock() {
  document.body.classList.toggle("mobile-menu-open", isMenuOpen.value);
}

function navigateAndClose(nextRoute) {
  navigate(nextRoute);
  isMenuOpen.value = false;
  isLanguageOpen.value = false;
}

function changeLanguage(nextLanguage) {
  setLanguage(nextLanguage);
  isLanguageOpen.value = false;
  isMenuOpen.value = false;
}

watch(isMenuOpen, syncMobileMenuLock);
watch(route, () => {
  isMenuOpen.value = false;
});

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
  document.addEventListener("click", handleOutsideClick);
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("click", handleOutsideClick);
  window.removeEventListener("keydown", handleKeyDown);
  document.body.classList.remove("mobile-menu-open");
});
</script>

<template>
  <header
    class="site-header"
    :class="{
      scrolled: hasScrolled && !isAstra,
      open: isMenuOpen,
      'astra-mode': isAstra,
    }"
  >
    <div class="header-inner">
      <button
        class="brand-link"
        type="button"
        :aria-label="t.brandHome || t.astraBrandHome"
        @click="navigateAndClose('home')"
      >
        KnowingBlue
      </button>

      <nav class="desktop-nav" :aria-label="t.primaryNavigation || t.astraPrimaryNavigation">
        <button
          v-for="item in navigationItems"
          :key="item.key"
          type="button"
          :class="{ active: isRouteActive(item.route) }"
          @click="navigateAndClose(item.route)"
        >
          {{ t[item.labelKey] }}
        </button>

        <div class="language-switcher">
          <button
            class="language-button"
            type="button"
            aria-haspopup="menu"
            :aria-expanded="isLanguageOpen"
            :aria-label="t.languageLabel"
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
              :class="{ selected: language === key }"
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
        :aria-label="
          isMenuOpen
            ? t.closeNavigation || t.astraCloseNavigation
            : t.openNavigation || t.astraOpenNavigation
        "
        :aria-expanded="isMenuOpen"
        @click="isMenuOpen = !isMenuOpen"
      >
        <Menu v-if="!isMenuOpen" :size="26" aria-hidden="true" />
        <X v-else :size="26" aria-hidden="true" />
      </button>
    </div>

    <Teleport to="body">
      <div
        class="mobile-menu"
        :class="{
          visible: isMenuOpen,
          'theme-light': (isWorks || hasScrolled) && !isAstra,
          'theme-dark': isAstra,
        }"
        @click.self="isMenuOpen = false"
      >
        <div class="mobile-menu-inner" @click.stop>
          <nav :aria-label="t.mobileNavigation || t.astraMobileNavigation">
            <button
              v-for="item in navigationItems"
              :key="item.key"
              type="button"
              :class="{ active: isRouteActive(item.route) }"
              @click="navigateAndClose(item.route)"
            >
              {{ t[item.labelKey] }}
            </button>
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
    </Teleport>
  </header>
</template>
