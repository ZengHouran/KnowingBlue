export function useFadeInObserver() {
  let observer;

  function observeFadeIn() {
    observer?.disconnect();
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = Number(entry.target.dataset.delay || 0);
            window.setTimeout(() => entry.target.classList.add("visible"), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    document.querySelectorAll(".fade-in").forEach((element) => {
      element.classList.remove("visible");
      observer.observe(element);
    });
  }

  function disconnectFadeIn() {
    observer?.disconnect();
  }

  return { observeFadeIn, disconnectFadeIn };
}
