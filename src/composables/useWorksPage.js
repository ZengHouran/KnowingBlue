import { computed, nextTick, ref } from "vue";
import { useLanguage } from "./useLanguage.js";
import { useFadeInObserver } from "./useFadeIn.js";
import { developerId, worksApps } from "../data/works.js";

export function useWorksPage() {
  const { t, language } = useLanguage();
  const { observeFadeIn } = useFadeInObserver();

  const selectedCategory = ref("all");

  const categories = [
    { key: "all", labelKey: "worksCategoryAll" },
    { key: "metacognition", labelKey: "worksCategoryMetacognition" },
    { key: "productivity", labelKey: "worksCategoryProductivity" },
    { key: "entertainment", labelKey: "worksCategoryEntertainment" },
  ];

  const storefront = computed(() => ({ zh: "cn", en: "us", ja: "jp" })[language.value]);
  const developerUrl = computed(() => `https://apps.apple.com/${storefront.value}/developer/id${developerId}`);

  const filteredApps = computed(() => {
    if (selectedCategory.value === "all") {
      return worksApps;
    }
    return worksApps.filter((app) => app.category === selectedCategory.value);
  });

  async function setCategory(key) {
    if (selectedCategory.value === key) return;
    selectedCategory.value = key;
    await nextTick();
    observeFadeIn();
  }

  return {
    t,
    language,
    storefront,
    developerUrl,
    worksApps,
    selectedCategory,
    categories,
    filteredApps,
    setCategory,
  };
}
