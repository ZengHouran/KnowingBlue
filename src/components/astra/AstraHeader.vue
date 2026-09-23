<script setup>
import { ChevronDown } from "@lucide/vue";
import { useAstraHeader } from "../../composables/useAstraHeader.js";
import { langNames } from "../../data/translations.js";
import "../../styles/astra-header.css";

const {
  t,
  language,
  isHome,
  isVision,
  isWorks,
  isAstra,
  menuOpen,
  languageOpen,
  toggleMenu,
  navigateAndClose,
  changeLanguage,
} = useAstraHeader();
</script>

<template>
  <header class="astra-header">
    <a class="astra-wordmark" href="https://www.knowingblue.com" aria-label="Knowingblue 首页">Knowingblue</a>

    <nav class="astra-desktop-nav" aria-label="主导航">
      <button type="button" :class="{ active: isHome }" @click="navigateAndClose('home')">{{ t.home }}</button>
      <button type="button" :class="{ active: isAstra }" @click="navigateAndClose('astra')">Astra</button>
      <button type="button" :class="{ active: isWorks }" @click="navigateAndClose('works')">{{ t.works }}</button>
      <button type="button" :class="{ active: isVision }" @click="navigateAndClose('vision')">{{ t.vision }}</button>

      <div class="astra-language-switcher">
        <button
          class="astra-language-button"
          type="button"
          aria-haspopup="menu"
          :aria-expanded="languageOpen"
          @click="languageOpen = !languageOpen"
        >
          <span>{{ langNames[language] }}</span>
          <ChevronDown :size="16" aria-hidden="true" />
        </button>
        <div v-if="languageOpen" class="astra-language-menu" role="menu">
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
      class="astra-menu-toggle"
      type="button"
      :aria-expanded="menuOpen"
      aria-controls="astra-mobile-menu"
      :aria-label="menuOpen ? '关闭导航' : '打开导航'"
      @click="toggleMenu"
    >
      <span :class="{ 'is-open': menuOpen }"></span>
      <span :class="{ 'is-open': menuOpen }"></span>
    </button>

    <nav v-if="menuOpen" id="astra-mobile-menu" class="astra-mobile-nav" aria-label="移动端导航">
      <button type="button" @click="navigateAndClose('home')">{{ t.home }}</button>
      <button type="button" @click="navigateAndClose('astra')">Astra</button>
      <button type="button" @click="navigateAndClose('works')">{{ t.works }}</button>
      <button type="button" @click="navigateAndClose('vision')">{{ t.vision }}</button>
      <div class="astra-mobile-language">
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
    </nav>
  </header>
</template>
