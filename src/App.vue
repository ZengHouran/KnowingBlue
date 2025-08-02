<template>
  <div id="app">
    <!-- Header -->
    <header 
      id="header" 
      :class="[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'py-3 bg-white/90 backdrop-blur-md border-b border-gray-200/20 shadow-sm' : 'py-5 bg-transparent'
      ]"
    >
      <div class="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a 
          href="#home" 
          :class="[
            'text-xl font-serif font-medium tracking-tight transition-colors',
            isScrolled ? 'text-gray-900 hover:text-orange-500' : 'text-white hover:text-gray-200'
          ]"
        >
          KnowingBlue
        </a>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <a 
            href="#home" 
            :class="[
              'text-sm transition-colors',
              isScrolled ? 'text-gray-900 hover:text-orange-500' : 'text-white hover:text-gray-200'
            ]"
          >
            {{ translations[currentLang].home }}
          </a>
          
          <!-- Language Switcher -->
          <div class="relative">
            <button 
              @click="toggleLangMenu"
              :class="[
                'text-sm transition-colors flex items-center space-x-1',
                isScrolled ? 'text-gray-900 hover:text-orange-500' : 'text-white hover:text-gray-200'
              ]"
            >
              <span>{{ langNames[currentLang] }}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div 
              v-show="showLangMenu" 
              class="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[100px]"
            >
              <button 
                v-for="(name, lang) in langNames" 
                :key="lang"
                @click="switchLanguage(lang)"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {{ name }}
              </button>
            </div>
          </div>
        </nav>
        
        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu"
          :class="[
            'md:hidden',
            isScrolled ? 'text-gray-900' : 'text-white'
          ]"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      
      <!-- Mobile Menu -->
      <div 
        v-show="showMobileMenu" 
        class="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200"
      >
        <nav class="container mx-auto px-4 py-4 space-y-2">
          <a 
            href="#home" 
            class="block text-sm text-gray-900 hover:text-orange-500 transition-colors"
            @click="closeMobileMenu"
          >
            {{ translations[currentLang].home }}
          </a>
          
          <!-- Mobile Language Switcher -->
          <div class="border-t border-gray-200 pt-2 mt-2">
            <div class="text-xs text-gray-500 mb-2">语言 / Language</div>
            <div class="flex space-x-2">
              <button 
                v-for="(name, lang) in langNames" 
                :key="lang"
                @click="switchLanguage(lang)"
                class="px-3 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200 transition-colors"
              >
                {{ name === '中文' ? '中文' : name === 'English' ? 'EN' : '日本語' }}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>

    <main class="relative">
      <!-- Hero Section -->
      <section id="home" class="relative min-h-screen flex items-center overflow-hidden hero-bg">
        <div class="absolute inset-0 bg-black/30"></div>
        
        <div class="container mx-auto px-4 md:px-6 py-20 md:py-32 relative z-10 max-w-4xl">
          <div class="max-w-3xl mx-auto text-center">
            <div class="fade-in" :class="{ visible: isVisible }" data-delay="200">
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-white leading-tight mb-6">
                KnowingBlue
              </h1>
            </div>
            
            <div class="fade-in" :class="{ visible: isVisible }" data-delay="300">
              <p class="text-lg md:text-xl text-white/90 mb-4">
                {{ translations[currentLang]['hero-subtitle'] }}
              </p>
              <p class="text-lg md:text-xl text-white/90 mb-8">
                {{ translations[currentLang]['hero-description'] }}
              </p>
            </div>
            
            <div class="fade-in" :class="{ visible: isVisible }" data-delay="400">
              <p class="text-sm text-white/70 mt-12">
                {{ translations[currentLang].copyright }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'App',
  setup() {
    const isScrolled = ref(false)
    const showLangMenu = ref(false)
    const showMobileMenu = ref(false)
    const isVisible = ref(false)
    const currentLang = ref(localStorage.getItem('language') || 'zh')

    const langNames = {
      zh: '中文',
      en: 'English',
      ja: '日本語'
    }

    const translations = {
      zh: {
        home: '首页',
        'hero-subtitle': '感性驱动认知，品味塑造体验。',
        'hero-description': '我们专注于感性与认知心理的创意探索，用设计触达内心深处。',
        copyright: '© 2025 KnowingBlue. 保留所有权利。'
      },
      en: {
        home: 'Home',
        'hero-subtitle': 'Emotion drives cognition, taste shapes experience.',
        'hero-description': 'We focus on creative exploration of emotion and cognitive psychology, using design to reach the depths of the heart.',
        copyright: '© 2025 KnowingBlue. All rights reserved.'
      },
      ja: {
        home: 'ホーム',
        'hero-subtitle': '感性が認知を駆動し、品味が体験を形作る。',
        'hero-description': '私たちは感性と認知心理学の創造的探求に焦点を当て、デザインで心の奥深くに触れることを目指しています。',
        copyright: '© 2025 KnowingBlue. 全著作権所有。'
      }
    }

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 10
    }

    const toggleLangMenu = () => {
      showLangMenu.value = !showLangMenu.value
    }

    const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value
    }

    const closeMobileMenu = () => {
      showMobileMenu.value = false
    }

    const switchLanguage = (lang) => {
      currentLang.value = lang
      localStorage.setItem('language', lang)
      showLangMenu.value = false
      showMobileMenu.value = false
      
      // Update page title and meta description
      if (lang === 'zh') {
        document.title = 'KnowingBlue - 感性设计工作室'
        document.querySelector('meta[name="description"]').content = 'KnowingBlue - 专注于感性与认知心理相关的创意工作室，以感性、品味、触达为核心理念。'
      } else if (lang === 'en') {
        document.title = 'KnowingBlue - Emotional Design Studio'
        document.querySelector('meta[name="description"]').content = 'KnowingBlue - A creative studio focused on emotion and cognitive psychology, with sensibility, taste, and connection as core concepts.'
      } else if (lang === 'ja') {
        document.title = 'KnowingBlue - 感性デザインスタジオ'
        document.querySelector('meta[name="description"]').content = 'KnowingBlue - 感性と認知心理学に特化したクリエイティブスタジオ、感性、品味、触達を核心理念とする。'
      }
    }

    const handleClickOutside = (event) => {
      if (!event.target.closest('.relative')) {
        showLangMenu.value = false
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      document.addEventListener('click', handleClickOutside)
      
      // Initialize fade-in animation
      setTimeout(() => {
        isVisible.value = true
      }, 100)
      
      // Initialize language
      switchLanguage(currentLang.value)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      isScrolled,
      showLangMenu,
      showMobileMenu,
      isVisible,
      currentLang,
      langNames,
      translations,
      toggleLangMenu,
      toggleMobileMenu,
      closeMobileMenu,
      switchLanguage
    }
  }
}
</script>