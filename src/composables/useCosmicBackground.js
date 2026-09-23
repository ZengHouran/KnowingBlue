import { onMounted, onUnmounted } from "vue";
import { createCosmicBackgroundData } from "../models/astraCosmicBackground.js";
import {
  cosmicFragmentShader,
  cosmicVertexShader,
} from "../renderers/cosmicShaders.js";

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const error = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Cosmic Shader Compile Error: ${error}`);
  }
  return shader;
}

/**
 * 宇宙深空 WebGL GPU 原生渲染 Composable
 * 达到与中央星系同等级别的高级光学高斯光核、衍射星芒与加色混合渲染质感
 * @param {import('vue').Ref<HTMLCanvasElement|null>} canvasRef 底层 Canvas 引用
 */
export function useCosmicBackground(canvasRef) {
  let gl = null;
  let program = null;
  let vertexBuffer = null;
  let particleCount = 0;
  let animationFrameId = null;
  let resizeObserver = null;
  let mediaQuery = null;
  let isMotionReduced = false;
  let isPageVisible = true;
  let lastTimestamp = 0;
  let elapsedTime = 0;

  let width = 1;
  let height = 1;
  let dpr = 1;

  let uniforms = {};

  function initGL() {
    if (!canvasRef.value) return false;
    const canvas = canvasRef.value;

    gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: "low-power",
    });

    if (!gl) {
      console.warn("Astra: WebGL not supported for cosmic background.");
      return false;
    }

    try {
      const vertex = compileShader(gl, gl.VERTEX_SHADER, cosmicVertexShader);
      const fragment = compileShader(gl, gl.FRAGMENT_SHADER, cosmicFragmentShader);

      program = gl.createProgram();
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.linkProgram(program);

      gl.deleteShader(vertex);
      gl.deleteShader(fragment);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program));
      }

      gl.useProgram(program);

      vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

      // 上传顶点属性
      const attributes = [
        ["aPosition", 3, 0],
        ["aSize", 1, 3],
        ["aBrightness", 1, 4],
        ["aPhase", 1, 5],
        ["aTemperature", 1, 6],
        ["aType", 1, 7],
      ];

      for (const [name, size, offset] of attributes) {
        const location = gl.getAttribLocation(program, name);
        if (location >= 0) {
          gl.enableVertexAttribArray(location);
          gl.vertexAttribPointer(location, size, gl.FLOAT, false, 32, offset * 4);
        }
      }

      uniforms = {
        Resolution: gl.getUniformLocation(program, "uResolution"),
        Time: gl.getUniformLocation(program, "uTime"),
        Dpr: gl.getUniformLocation(program, "uDpr"),
        ReducedMotion: gl.getUniformLocation(program, "uReducedMotion"),
      };

      // 核心物理光学效果：GPU 硬件加色混合
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      gl.clearColor(0.0, 0.0, 0.0, 0.0);

      return true;
    } catch (error) {
      console.error("Cosmic background WebGL initialization failed:", error);
      return false;
    }
  }

  function uploadStarData() {
    if (!gl || !vertexBuffer) return;
    const { buffer, count } = createCosmicBackgroundData(width, height);
    particleCount = count;
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, buffer, gl.STATIC_DRAW);
  }

  function render(timestamp) {
    if (!gl || !program || particleCount === 0) return;

    if (!isMotionReduced) {
      if (lastTimestamp > 0) {
        const delta = Math.min((timestamp - lastTimestamp) / 1000, 0.08);
        elapsedTime += delta;
      }
      lastTimestamp = timestamp;
    }

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);

    gl.uniform2f(uniforms.Resolution, width, height);
    gl.uniform1f(uniforms.Time, elapsedTime);
    gl.uniform1f(uniforms.Dpr, dpr);
    gl.uniform1f(uniforms.ReducedMotion, isMotionReduced ? 1.0 : 0.0);

    // 单次硬件绘制所有深空星辰与星云，性能极好
    gl.drawArrays(gl.POINTS, 0, particleCount);

    if (!isMotionReduced && isPageVisible) {
      animationFrameId = requestAnimationFrame(render);
    }
  }

  function startLoop() {
    stopLoop();
    if (isMotionReduced) {
      render(performance.now());
    } else if (isPageVisible) {
      lastTimestamp = performance.now();
      animationFrameId = requestAnimationFrame(render);
    }
  }

  function stopLoop() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  function resize() {
    if (!canvasRef.value || !gl) return;
    const parent = canvasRef.value.parentElement || document.body;
    const rect = parent.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvasRef.value.width = Math.round(width * dpr);
    canvasRef.value.height = Math.round(height * dpr);
    gl.viewport(0, 0, canvasRef.value.width, canvasRef.value.height);

    uploadStarData();
    startLoop();
  }

  function handleVisibilityChange() {
    isPageVisible = !document.hidden;
    if (isPageVisible) {
      startLoop();
    } else {
      stopLoop();
    }
  }

  function handleMotionChange() {
    isMotionReduced = Boolean(mediaQuery?.matches);
    startLoop();
  }

  onMounted(() => {
    mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    isMotionReduced = mediaQuery.matches;

    if (initGL()) {
      resize();

      if (canvasRef.value?.parentElement) {
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvasRef.value.parentElement);
      }

      mediaQuery.addEventListener("change", handleMotionChange);
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }
  });

  onUnmounted(() => {
    stopLoop();
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
    mediaQuery?.removeEventListener("change", handleMotionChange);
    document.removeEventListener("visibilitychange", handleVisibilityChange);

    if (gl) {
      if (vertexBuffer) gl.deleteBuffer(vertexBuffer);
      if (program) gl.deleteProgram(program);
    }
  });

  return {
    resize,
  };
}
