/**
 * 宇宙深空背景模型
 * 生成紧凑型 WebGL 交错顶点缓冲区（Interleaved Float32Array）
 * 专精于深空微星与四向衍射星芒恒星，彻底剔除大尺寸星云蓝圆斑
 */

const STRIDE = 8; // x, y, z, size, brightness, phase, temperature, type

function createRandom(seed = 8848) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = Math.imul(state ^ (state >>> 15), state | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
  };
}

/**
 * 构建全屏深空星辰的 WebGL 顶点数据
 * @param {number} width 视口宽度
 * @param {number} height 视口高度
 * @param {number} seed 随机种子
 * @returns {{ buffer: Float32Array, count: number }} 顶点数组及点数量
 */
export function createCosmicBackgroundData(width = 1440, height = 900, seed = 2026) {
  const random = createRandom(seed);
  
  // 自适应计算恒星总数（约 2000 ~ 3800 颗，确保夜空深邃且纯净）
  const area = width * height;
  const starCount = Math.min(3800, Math.max(1800, Math.round(area / 520)));
  
  const buffer = new Float32Array(starCount * STRIDE);
  
  for (let i = 0; i < starCount; i += 1) {
    const offset = i * STRIDE;
    
    // 全景视口自然散布 [-1.02, 1.02]，确保边缘无裁切无暗角
    buffer[offset + 0] = random() * 2.04 - 1.02; // x
    buffer[offset + 1] = random() * 2.04 - 1.02; // y
    buffer[offset + 2] = 0.0;                    // z
    
    const roll = random();
    let type = 0.0;
    let size = 0.55 + random() * 0.4;
    let brightness = 0.22 + random() * 0.42;
    let temperature = random();
    
    if (roll > 0.94) {
      // 约 6% 亮恒星：带有高斯光核与哈勃望远镜特有的四向十字衍射星芒
      type = 1.0;
      size = 1.3 + random() * 0.6;
      brightness = 0.82 + random() * 0.35;
      temperature = random(); // 全光谱覆盖（冷白、淡蓝、晶白至微暖金）
    } else if (roll > 0.76) {
      // 约 18% 中等清亮星
      type = 0.0;
      size = 0.8 + random() * 0.32;
      brightness = 0.42 + random() * 0.32;
    } else {
      // 约 76% 极微细致密深空星尘
      type = 0.0;
      size = 0.38 + random() * 0.26;
      brightness = 0.12 + random() * 0.28;
    }
    
    buffer[offset + 3] = size;
    buffer[offset + 4] = brightness;
    buffer[offset + 5] = random(); // 随机初相位
    buffer[offset + 6] = temperature;
    buffer[offset + 7] = type;
  }
  
  return { buffer, count: starCount };
}
