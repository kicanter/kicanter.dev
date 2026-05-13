(function() {
const canvas = document.getElementById('shader-bg');
if (!canvas) return;
const gl = canvas.getContext('webgl2');
if (!gl) return;

const DPR = Math.min(devicePixelRatio, 1.0);
function resize() {
    canvas.width = window.innerWidth * DPR;
    canvas.height = window.innerHeight * DPR;
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

float hash3(vec3 p) {
    p = fract(p * 0.1031);
    p += dot(p, p.zyx + 31.32);
    return fract((p.x + p.y) * p.z);
}

float vnoise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(mix(hash3(i), hash3(i + vec3(1,0,0)), f.x),
            mix(hash3(i + vec3(0,1,0)), hash3(i + vec3(1,1,0)), f.x), f.y),
        mix(mix(hash3(i + vec3(0,0,1)), hash3(i + vec3(1,0,1)), f.x),
            mix(hash3(i + vec3(0,1,1)), hash3(i + vec3(1,1,1)), f.x), f.y),
        f.z
    ) * 2.0 - 1.0;
}

float scene(vec3 pos, float t) {
    float d = 1000.0;

    for (int i = 0; i < 3; i++) {
        float fi = float(i);
        float phase = fi * 1.7 + fi * fi * 0.4;

        vec3 center = vec3(
            sin(t * (0.1 + fi * 0.025) + phase) * (4.5 + fi * 0.7),
            cos(t * (0.08 + fi * 0.02) + phase * 1.4) * (3.5 + fi * 0.6),
            sin(t * (0.07 + fi * 0.015) + phase * 0.9) * 2.5 - 5.0
        );

        vec3 diff = pos - center;
        float len = length(diff);
        float radius = 2.8 + sin(fi * 2.1) * 0.6 + 0.4 * sin(t * 0.12 + fi * 3.0);

        // Single noise displacement on the surface
        vec3 dir = diff / max(len, 0.001);
        radius += vnoise(dir * 3.0 + t * 0.12 + fi * 5.0) * 0.5;

        float sphere = len - radius;
        float k = 0.6;
        float h = clamp(0.5 + 0.5 * (sphere - d) / k, 0.0, 1.0);
        d = mix(sphere, d, h) - k * h * (1.0 - h);
    }

    return d;
}

void main() {
    vec2 uv = v_uv;
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 p = (uv - 0.5) * aspect;

    float t = u_time * 0.25;

    vec3 ro = vec3(0.0, 0.0, 3.0);
    vec3 rd = normalize(vec3(p, -1.2));

    float dist = 0.0;
    float hit = 0.0;
    for (int i = 0; i < 24; i++) {
        vec3 pos = ro + rd * dist;
        float d = scene(pos, t);
        if (d < 0.03) { hit = 1.0; break; }
        if (dist > 10.0) break;
        dist += d * 0.75;
    }

    vec3 color = u_bg;

    if (hit > 0.5) {
        vec3 pos = ro + rd * dist;

        // 3-call normal (forward differences only)
        float d0 = scene(pos, t);
        vec3 nor = normalize(vec3(
            scene(pos + vec3(0.04, 0.0, 0.0), t) - d0,
            scene(pos + vec3(0.0, 0.04, 0.0), t) - d0,
            scene(pos + vec3(0.0, 0.0, 0.04), t) - d0
        ));

        vec3 lightDir = normalize(vec3(0.5, 0.8, 0.3));
        float diff = max(dot(nor, lightDir), 0.0) * 0.6 + 0.4;
        float fresnel = pow(1.0 - max(dot(nor, -rd), 0.0), 3.0);
        float fog = exp(-dist * 0.12);

        float intensity = (diff * 0.6 + fresnel * 0.4) * fog;
        color = mix(u_bg, u_fg, intensity * 0.6);
    }

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

const timeOffset = Math.random() * 200.0;

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
