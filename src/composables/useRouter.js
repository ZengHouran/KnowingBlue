import { computed, ref } from "vue";

const routePaths = { home: "/", works: "/works", vision: "/vision" };

export function normalizeRoute(path) {
  const value = path.replace(/^#\/?/, "").replace(/^\//, "").replace(/\/$/, "");
  if (value === "vision" || value === "vision.html") return "vision";
  if (value === "works" || value === "works.html") return "works";
  return "home";
}

export function getInitialRoute() {
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

const route = ref(getInitialRoute());

export function useRouter() {
  const isHome = computed(() => route.value === "home");
  const isVision = computed(() => route.value === "vision");
  const isWorks = computed(() => route.value === "works");

  function navigate(nextRoute) {
    const nextPath = routePaths[nextRoute] || "/";

    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }

    route.value = nextRoute;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return { route, isHome, isVision, isWorks, navigate };
}

export function bindRouteListeners() {
  const syncRoute = () => {
    route.value = getInitialRoute();
  };

  window.addEventListener("popstate", syncRoute);
  window.addEventListener("hashchange", syncRoute);

  return () => {
    window.removeEventListener("popstate", syncRoute);
    window.removeEventListener("hashchange", syncRoute);
  };
}
