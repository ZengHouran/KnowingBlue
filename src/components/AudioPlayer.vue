<script setup>
import { PauseCircle, Play } from "@lucide/vue";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "../composables/useRouter.js";

const { isVision } = useRouter();

const audio = ref(null);
const isPlaying = ref(false);
const progress = ref(0);
const playerHidden = ref(false);

let mobileHideTimer;
let removeInteractionHandlers = () => {};

const progressOffset = computed(() => 125.6 - progress.value * 125.6);

async function toggleAudio() {
  if (!audio.value) return;

  if (isPlaying.value) {
    audio.value.pause();
    isPlaying.value = false;
    return;
  }

  try {
    await audio.value.play();
    isPlaying.value = true;
    removeInteractionHandlers();
  } catch (error) {
    console.info("Audio play prevented:", error);
  }
}

function updateProgress() {
  if (!audio.value?.duration) {
    progress.value = 0;
    return;
  }
  progress.value = audio.value.currentTime / audio.value.duration;
}

function saveAudioState() {
  if (!audio.value) return;

  sessionStorage.setItem(
    "audioState",
    JSON.stringify({
      currentTime: audio.value.currentTime,
      isPlaying: !audio.value.paused,
      volume: audio.value.volume,
      muted: audio.value.muted,
    }),
  );
}

async function attemptAutoplay() {
  if (!audio.value) return;

  try {
    await audio.value.play();
    isPlaying.value = true;
  } catch (error) {
    console.info("Autoplay prevented:", error);
    setupInteractionPlay();
  }
}

function setupInteractionPlay() {
  const playOnInteraction = async () => {
    if (!audio.value || isPlaying.value) return;

    try {
      await audio.value.play();
      isPlaying.value = true;
      removeInteractionHandlers();
    } catch (error) {
      console.info("Interaction play failed:", error);
    }
  };

  const events = ["click", "scroll", "mousemove", "touchstart", "keydown"];
  events.forEach((eventName) => document.addEventListener(eventName, playOnInteraction, { once: true }));
  removeInteractionHandlers = () => {
    events.forEach((eventName) => document.removeEventListener(eventName, playOnInteraction));
    removeInteractionHandlers = () => {};
  };
}

function schedulePlayerHide() {
  clearTimeout(mobileHideTimer);
  if (window.innerWidth < 768) {
    mobileHideTimer = window.setTimeout(() => {
      playerHidden.value = true;
    }, 3000);
  }
}

function showPlayer() {
  clearTimeout(mobileHideTimer);
  playerHidden.value = false;
}

onMounted(() => {
  const savedState = sessionStorage.getItem("audioState");
  if (savedState && audio.value) {
    const state = JSON.parse(savedState);
    audio.value.currentTime = state.currentTime || 0;
    audio.value.volume = state.volume || 1;
    audio.value.muted = state.muted || false;
    sessionStorage.removeItem("audioState");
  }
  attemptAutoplay();
  schedulePlayerHide();

  window.addEventListener("beforeunload", saveAudioState);
  window.addEventListener("resize", schedulePlayerHide);
});

onUnmounted(() => {
  clearTimeout(mobileHideTimer);
  removeInteractionHandlers();
  window.removeEventListener("beforeunload", saveAudioState);
  window.removeEventListener("resize", schedulePlayerHide);
});
</script>

<template>
  <div
    class="audio-player"
    :class="{ hiddenMobile: playerHidden, visionStyle: isVision }"
    @mouseenter="showPlayer"
    @mouseleave="schedulePlayerHide"
    @focusin="showPlayer"
  >
    <button type="button" class="audio-button" :aria-label="isPlaying ? 'Pause music' : 'Play music'" @click="toggleAudio">
      <PauseCircle v-if="isPlaying" :size="22" aria-hidden="true" />
      <Play v-else :size="20" aria-hidden="true" />
    </button>
    <svg class="progress-ring" viewBox="0 0 48 48" aria-hidden="true">
      <circle class="progress-track" cx="24" cy="24" r="20" />
      <circle
        class="progress-value"
        cx="24"
        cy="24"
        r="20"
        :stroke-dashoffset="progressOffset"
      />
    </svg>
  </div>

  <audio ref="audio" loop @timeupdate="updateProgress" @ended="isPlaying = false">
    <source src="/music/music.mp3" type="audio/mpeg" />
  </audio>
</template>
