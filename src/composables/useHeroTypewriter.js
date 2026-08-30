import { ref } from "vue";
import { useLanguage } from "./useLanguage.js";
import { useRouter } from "./useRouter.js";

const typedHeroTitle = ref("");
const typedHeroDescription = ref("");

let typewriterTimer;

export function useHeroTypewriter() {
  const { t } = useLanguage();
  const { isVision, isWorks } = useRouter();

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

  function stopHeroTypewriter() {
    clearTimeout(typewriterTimer);
  }

  return { typedHeroTitle, typedHeroDescription, startHeroTypewriter, stopHeroTypewriter };
}
