<script setup>
import { ChevronDown, Menu, X } from "@lucide/vue";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useLanguage } from "../composables/useLanguage.js";
import { useRouter } from "../composables/useRouter.js";
import { langNames } from "../data/translations.js";

const { t, language, setLanguage } = useLanguage();
const { route, isHome, isVision, isWorks, navigate } = useRouter();

const isMenuOpen = ref(false);
const isLanguageOpen = ref(false);
const hasScrolled = ref(false);

function handleScroll() {
  hasScrolled.value = window.scrollY > 10;
}

function handleOutsideClick(event) {
  if (!event.target.closest(".language-switcher")) {
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
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("click", handleOutsideClick);
  document.body.classList.remove("mobile-menu-open");
});
</script>

<template>
  <header class="site-header" :class="{ scrolled: hasScrolled, open: isMenuOpen }">
    <div class="header-inner">
      <button class="brand-link" type="button" @click="navigateAndClose('home')">KnowingBlue</button>

      <nav class="desktop-nav" aria-label="Primary navigation">
        <button type="button" :class="{ active: isHome }" @click="navigateAndClose('home')">
          {{ t.home }}
        </button>
        <button type="button" :class="{ active: isWorks }" @click="navigateAndClose('works')">
          {{ t.works }}
        </button>
        <button type="button" :class="{ active: isVision }" @click="navigateAndClose('vision')">
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

    <Teleport to="body">
      <div
        class="mobile-menu"
        :class="{
          visible: isMenuOpen,
          'theme-light': isWorks || hasScrolled,
        }"
        @click.self="isMenuOpen = false"
      >
        <div class="mobile-menu-inner" @click.stop>
          <nav aria-label="Mobile navigation">
            <button type="button" @click="navigateAndClose('home')">{{ t.home }}</button>
            <button type="button" @click="navigateAndClose('works')">{{ t.works }}</button>
            <button type="button" @click="navigateAndClose('vision')">{{ t.vision }}</button>
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
