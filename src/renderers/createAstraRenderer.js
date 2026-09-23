import { vertexShader, fragmentShader } from './astraShaders.js';

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const error = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(error);
  }
  return shader;
}

/** GPU rendering only. Input and animation state belong to the ViewModel. */
export function createAstraRenderer(canvas, stars) {
  const gl = canvas.getContext('webgl', { alpha: true, antialias: false, depth: false, powerPreference: 'low-power' });
  if (!gl) return null;
  const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const error = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(error);
  }
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, stars, gl.STATIC_DRAW);
  const attributes = [['aPosition',3,0],['aSize',1,3],['aBrightness',1,4],['aPhase',1,5],['aTemperature',1,6],['aGroup',1,7]];
  for (const [name, size, offset] of attributes) {
    const location = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 32, offset * 4);
  }
  const uniforms = Object.fromEntries(['Resolution','Pointer','Rotation','Time','Intro','Presence','Dpr','Scroll'].map(name => [name, gl.getUniformLocation(program, `u${name}`)]));
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
  gl.clearColor(0, 0, 0, 0);
  let width = 1, height = 1, dpr = 1;

  return {
    resize(nextWidth, nextHeight, nextDpr) {
      width = nextWidth; height = nextHeight; dpr = nextDpr;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    },
    render({ time, intro, pointer, rotation, presence, scroll }) {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uniforms.Resolution, width, height);
      gl.uniform2f(uniforms.Pointer, pointer.x, pointer.y);
      gl.uniform2f(uniforms.Rotation, rotation.x, rotation.y);
      gl.uniform1f(uniforms.Time, time);
      gl.uniform1f(uniforms.Intro, intro);
      gl.uniform1f(uniforms.Presence, presence);
      gl.uniform1f(uniforms.Dpr, dpr);
      gl.uniform1f(uniforms.Scroll, scroll);
      gl.drawArrays(gl.POINTS, 0, stars.length / 8);
    },
    dispose() {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    },
  };
}
