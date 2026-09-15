import { computed } from "vue";
import { useLanguage } from "./useLanguage.js";
import { developerId, worksApps } from "../data/works.js";

export function useWorksPage() {
  const { t, language } = useLanguage();
  const storefront = computed(() => ({ zh: "cn", en: "us", ja: "jp" })[language.value]);
  const developerUrl = computed(() => `https://apps.apple.com/${storefront.value}/developer/id${developerId}`);

  return { t, language, storefront, developerUrl, worksApps };
}
