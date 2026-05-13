(function() {
const canvas = document.getElementById('shader-bg');
if (!canvas) return;
const gl = canvas.getContext('webgl2');
if (!gl) return;

const DPR = Math.min(devicePixelRatio, 1.5);
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

// Cheap 3D value noise — much faster than simplex

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

float sdf(vec3 pos, float t) {
    pos += vec3(
        sin(t * 0.15) * 2.0 + sin(t * 0.07) * 1.5,
        cos(t * 0.12) * 1.8 + sin(t * 0.09) * 1.2,
        sin(t * 0.1) * 2.0 + cos(t * 0.13) * 1.5
    );

    float n1 = vnoise(pos * 0.6 + t * 0.1);
    float n2 = vnoise(pos * 0.9 + vec3(10.0) + t * 0.08);

    float blobs = n1 * 0.6 + n2 * 0.4;
    return -(blobs - 0.15);
}

void main() {
    vec2 uv = v_uv;
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 p = (uv - 0.5) * aspect;

    float t = u_time * 0.025;

    vec3 ro = vec3(0.0, 0.0, 0.0);
    vec3 rd = normalize(vec3(p * 0.5, -1.0));

    float dist = 0.0;
    float hit = 0.0;
    float minD = 1.0;
    for (int i = 0; i < 32; i++) {
        vec3 pos = ro + rd * dist;
        float d = sdf(pos, t);
        minD = min(minD, d);
        if (d < 0.01) { hit = 1.0; break; }
        if (dist > 4.0) break;
        dist += d;
    }

    vec3 color = u_bg;

    if (hit > 0.5) {
        vec3 pos = ro + rd * dist;

        // Tetrahedron normal — 4 sdf calls instead of 6
        vec2 e = vec2(0.02, -0.02);
        vec3 nor = normalize(
            e.xyy * sdf(pos + e.xyy, t) +
            e.yyx * sdf(pos + e.yyx, t) +
            e.yxy * sdf(pos + e.yxy, t) +
            e.xxx * sdf(pos + e.xxx, t)
        );

        float diff = max(dot(nor, normalize(vec3(0.4, 0.7, 0.5))), 0.0) * 0.6 + 0.4;
        float fresnel = pow(1.0 - max(dot(nor, -rd), 0.0), 2.5);
        float fog = exp(-dist * 0.35);

        float intensity = (diff * 0.7 + fresnel * 0.3) * fog;
        color = mix(u_bg, u_fg, intensity * 0.5);
    } else {
        // Soft glow near misses
        float glow = smoothstep(0.3, 0.0, minD);
        color = mix(u_bg, u_fg, glow * 0.08);
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
    const seconds = t * 0.006;
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
