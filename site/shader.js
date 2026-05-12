(function() {
const canvas = document.getElementById('shader-bg');
if (!canvas) return;
const gl = canvas.getContext('webgl2');
if (!gl) return;

function resize() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    gl.viewport(0, 0, canvas.width, canvas.height);
}
window.addEventListener('resize', resize);
resize();

function getThemeColors() {
    const style = getComputedStyle(document.documentElement);
    const bg = style.getPropertyValue('--bg').trim();
    const fg = style.getPropertyValue('--fg').trim();
    const textSoft = style.getPropertyValue('--text-soft').trim();
    const textHard = style.getPropertyValue('--text-hard').trim();
    return { bg, fg, textSoft, textHard };
}

function hexToVec3(hex) {
    hex = hex.replace('#', '');
    return [
        parseInt(hex.substring(0, 2), 16) / 255,
        parseInt(hex.substring(2, 4), 16) / 255,
        parseInt(hex.substring(4, 6), 16) / 255
    ];
}

const vs = `#version 300 es
in vec2 a_pos;
out vec2 v_uv;
void main() {
    v_uv = a_pos * 0.5 + 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const fs = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 fragColor;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_bg;
uniform vec3 u_fg;
uniform vec3 u_text_soft;
uniform vec3 u_text_hard;

// Aurora threads — thin luminous ribbons drifting like northern lights

vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

float ridge(float n) {
    return 1.0 - abs(n);
}

void main() {
    vec2 uv = v_uv;
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 p = (uv - 0.5) * aspect;

    float t = u_time * 0.1;

    // Stretch space diagonally for sweeping ribbon feel
    vec2 sp = vec2(p.x * 0.7 + p.y * 0.5, p.y * 1.2 - p.x * 0.3);

    // Ridged noise creates thin bright lines
    float r1 = ridge(snoise(vec3(sp * 0.5, t * 0.3)));
    r1 = pow(r1, 9.0);

    float r2 = ridge(snoise(vec3(sp * 1.0 + 10.0, t * 0.25 + 5.0)));
    r2 = pow(r2, 10.0);

    float r3 = ridge(snoise(vec3(sp * 1.8 + 20.0, t * 0.2 + 10.0)));
    r3 = pow(r3, 12.0);

    // Combine ribbons
    float ribbons = r1 * 0.5 + r2 * 0.3 + r3 * 0.2;

    // Soft glow around ribbons
    float glow = ridge(snoise(vec3(sp * 1.5, t * 0.2)));
    glow = pow(glow, 2.0) * 0.3;

    float intensity = ribbons * 0.6 + glow * 0.4;

    float lum = dot(u_bg, vec3(0.299, 0.587, 0.114));
    float strength = mix(0.55, 0.9, lum);
    vec3 color = mix(u_bg, u_fg, intensity * strength);

    fragColor = vec4(color, 1.0);
}`;

function compile(src, type) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
    }
    return s;
}

const prog = gl.createProgram();
gl.attachShader(prog, compile(vs, gl.VERTEX_SHADER));
gl.attachShader(prog, compile(fs, gl.FRAGMENT_SHADER));
gl.linkProgram(prog);
gl.useProgram(prog);

const buf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
const loc = gl.getAttribLocation(prog, 'a_pos');
gl.enableVertexAttribArray(loc);
gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

const timeOffset = Math.random() * 10000.0;

const uTime = gl.getUniformLocation(prog, 'u_time');
const uRes = gl.getUniformLocation(prog, 'u_resolution');
const uBg = gl.getUniformLocation(prog, 'u_bg');
const uFg = gl.getUniformLocation(prog, 'u_fg');
const uTextSoft = gl.getUniformLocation(prog, 'u_text_soft');
const uTextHard = gl.getUniformLocation(prog, 'u_text_hard');

// Lerp colors over 100ms to match CSS transition
const EASE_DURATION = 0.1;
let currentColors = { bg: [0,0,0], fg: [0,0,0], textSoft: [0,0,0], textHard: [0,0,0] };
let startColors = { bg: [0,0,0], fg: [0,0,0], textSoft: [0,0,0], textHard: [0,0,0] };
let targetColors = { bg: [0,0,0], fg: [0,0,0], textSoft: [0,0,0], textHard: [0,0,0] };
let easeStart = -1;
let initialized = false;

function ease(t) {
    return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3) / 2;
}

function lerpVec3(a, b, t) {
    const e = ease(t);
    return [a[0]+(b[0]-a[0])*e, a[1]+(b[1]-a[1])*e, a[2]+(b[2]-a[2])*e];
}

function colorsEqual(a, b) {
    return Math.abs(a[0]-b[0]) < 0.001 && Math.abs(a[1]-b[1]) < 0.001 && Math.abs(a[2]-b[2]) < 0.001;
}

function render(t) {
    const seconds = t * 0.001;
    const colors = getThemeColors();
    const newBg = hexToVec3(colors.bg);
    const newFg = hexToVec3(colors.fg);
    const newTextSoft = hexToVec3(colors.textSoft);
    const newTextHard = hexToVec3(colors.textHard);

    if (!initialized) {
        currentColors = { bg: newBg, fg: newFg, textSoft: newTextSoft, textHard: newTextHard };
        startColors = { bg: newBg, fg: newFg, textSoft: newTextSoft, textHard: newTextHard };
        targetColors = { bg: newBg, fg: newFg, textSoft: newTextSoft, textHard: newTextHard };
        initialized = true;
    } else if (!colorsEqual(newBg, targetColors.bg)) {
        startColors = { bg: [...currentColors.bg], fg: [...currentColors.fg], textSoft: [...currentColors.textSoft], textHard: [...currentColors.textHard] };
        targetColors = { bg: newBg, fg: newFg, textSoft: newTextSoft, textHard: newTextHard };
        easeStart = seconds;
    }

    if (easeStart >= 0) {
        const progress = Math.min((seconds - easeStart) / EASE_DURATION, 1.0);
        currentColors.bg = lerpVec3(startColors.bg, targetColors.bg, progress);
        currentColors.fg = lerpVec3(startColors.fg, targetColors.fg, progress);
        currentColors.textSoft = lerpVec3(startColors.textSoft, targetColors.textSoft, progress);
        currentColors.textHard = lerpVec3(startColors.textHard, targetColors.textHard, progress);
        if (progress >= 1.0) easeStart = -1;
    }

    gl.uniform1f(uTime, seconds + timeOffset);
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform3f(uBg, currentColors.bg[0], currentColors.bg[1], currentColors.bg[2]);
    gl.uniform3f(uFg, currentColors.fg[0], currentColors.fg[1], currentColors.fg[2]);
    gl.uniform3f(uTextSoft, currentColors.textSoft[0], currentColors.textSoft[1], currentColors.textSoft[2]);
    gl.uniform3f(uTextHard, currentColors.textHard[0], currentColors.textHard[1], currentColors.textHard[2]);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);
})();
