import { onBeforeUnmount, onMounted, ref } from "vue";
import { useLanguage } from "./useLanguage.js";
import { useRouter } from "./useRouter.js";

export function useAstraHeader() {
  const menuOpen = ref(false);
  const languageOpen = ref(false);
  const { t, language, setLanguage } = useLanguage();
  const { isHome, isVision, isWorks, isAstra, navigate } = useRouter();

  function closeMenus() {
    menuOpen.value = false;
    languageOpen.value = false;
  }

  function toggleMenu() {
    menuOpen.value = !menuOpen.value;
  }

  function navigateAndClose(nextRoute) {
    navigate(nextRoute);
    closeMenus();
  }

  function changeLanguage(nextLanguage) {
    setLanguage(nextLanguage);
    closeMenus();
  }

  function handleDocumentClick(event) {
    if (!event.target.closest(".astra-language-switcher")) languageOpen.value = false;
  }

  function handleEscape(event) {
    if (event.key === "Escape") closeMenus();
  }

  onMounted(() => {
    document.addEventListener("click", handleDocumentClick);
    window.addEventListener("keydown", handleEscape);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("click", handleDocumentClick);
    window.removeEventListener("keydown", handleEscape);
  });

  return {
    t,
    language,
    isHome,
    isVision,
    isWorks,
    isAstra,
    menuOpen,
    languageOpen,
    toggleMenu,
    closeMenus,
    navigateAndClose,
    changeLanguage,
  };
}
