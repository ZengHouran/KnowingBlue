export const cosmicVertexShader = `
precision highp float;
attribute vec3 aPosition;
attribute float aSize;
attribute float aBrightness;
attribute float aPhase;
attribute float aTemperature;
attribute float aType; // 0.0: 普通深空微星, 1.0: 亮恒星(具备十字衍射星芒)

uniform vec2 uResolution;
uniform float uTime;
uniform float uDpr;
uniform float uReducedMotion;

varying float vBrightness;
varying float vTemperature;
varying float vType;
varying float vSize;

void main() {
  vec3 p = aPosition;
  
  // 宇宙深空恒定不变，与星系旋转完全解耦；仅有亿万光年尺度的深空微漂移
  if (uReducedMotion < 0.5) {
    p.x += cos(aPhase + uTime * 0.012) * 0.001;
    p.y += sin(aPhase + uTime * 0.010) * 0.001;
  }
  
  gl_Position = vec4(p.xy, 0.0, 1.0);
  
  // GPU 并行计算的恒星呼吸微闪烁
  float twinkle = 1.0;
  if (uReducedMotion < 0.5) {
    float rate = 0.75 + fract(aPhase * 5.41) * 1.5;
    twinkle = 0.82 + 0.18 * sin(uTime * rate + aPhase * 6.28318);
  }
  
  vBrightness = aBrightness * twinkle;
  vTemperature = aTemperature;
  vType = aType;
  vSize = aSize;
  
  // 点精灵尺寸映射：亮恒星放大以展开衍射星芒，微星保持紧致针尖状
  float baseScale = (aType > 0.5) ? 9.2 : 3.6;
  gl_PointSize = max(1.0, aSize * uDpr * baseScale);
}
`;

export const cosmicFragmentShader = `
precision mediump float;

varying float vBrightness;
varying float vTemperature;
varying float vType;
varying float vSize;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float r = length(uv) * 2.0;
  if (r > 1.0) discard;
  
  // 天体物理黑体光谱色温插值：冷白/冰蓝 -> 纯晶白 -> 琥珀微金 -> 浅绯红
  vec3 cold = vec3(0.42, 0.74, 1.0);
  vec3 pureWhite = vec3(0.96, 0.98, 1.0);
  vec3 warm = vec3(1.0, 0.76, 0.44);
  
  vec3 color = vTemperature < 0.68 
    ? mix(cold, pureWhite, vTemperature / 0.68)
    : mix(pureWhite, warm, (vTemperature - 0.68) / 0.32);
  
  float alpha = 0.0;
  
  if (vType > 0.5) {
    // 亮恒星：纯正高斯针尖光核 + 镜头光晕 + 四向衍射星芒（Diffraction Spikes）
    float core = exp(-r * r * 130.0);
    float bloom = exp(-r * r * 11.0) * 0.25;
    float halo = exp(-r * r * 3.2) * 0.045;
    float rays = (exp(-abs(uv.x) * 135.0) + exp(-abs(uv.y) * 135.0)) * exp(-r * 7.5) * 0.22;
    alpha = (core + bloom + halo + rays) * vBrightness;
    // 核心过曝纯白提亮
    color = mix(color, vec3(1.0), core * 0.85);
  } else {
    // 普通深空微星：致密清晰的高斯微核与自然漫晕
    float smallCore = exp(-r * r * 18.0);
    float halo = exp(-r * r * 4.2) * 0.12;
    alpha = (smallCore + halo) * vBrightness;
  }
  
  gl_FragColor = vec4(color, alpha);
}
`;
