import { computed, ref } from "vue";
import { translations } from "../data/translations.js";

const language = ref(localStorage.getItem("language") || "zh");

export function useLanguage() {
  const t = computed(() => translations[language.value]);

  function setLanguage(nextLanguage) {
    language.value = nextLanguage;
    localStorage.setItem("language", nextLanguage);
  }

  return { language, t, setLanguage };
}
