"use client"
/* eslint-disable react/no-unknown-property */
import { useEffect, useRef } from 'react'
import './GradientBlinds.css'

const MAX_COLORS = 8
const hexToRGB = (hex: string) => {
  const c = hex.replace('#', '').padEnd(6, '0')
  const r = parseInt(c.slice(0, 2), 16) / 255
  const g = parseInt(c.slice(2, 4), 16) / 255
  const b = parseInt(c.slice(4, 6), 16) / 255
  return [r, g, b]
}
const prepStops = (stops?: string[]) => {
  const base = (stops && stops.length ? stops : ['#FF9FFC', '#5227FF']).slice(0, MAX_COLORS)
  if (base.length === 1) base.push(base[0])
  while (base.length < MAX_COLORS) base.push(base[base.length - 1])
  const arr: number[][] = []
  for (let i = 0; i < MAX_COLORS; i++) arr.push(hexToRGB(base[i]))
  const count = Math.max(2, Math.min(MAX_COLORS, stops?.length ?? 2))
  return { arr, count }
}

type Props = {
  className?: string
  dpr?: number
  paused?: boolean
  gradientColors?: string[]
  angle?: number
  noise?: number
  blindCount?: number
  blindMinWidth?: number
  mouseDampening?: number
  mirrorGradient?: boolean
  spotlightRadius?: number
  spotlightSoftness?: number
  spotlightOpacity?: number
  distortAmount?: number
  shineDirection?: 'left' | 'right'
  mixBlendMode?: React.CSSProperties['mixBlendMode']
}

const GradientBlinds = ({
  className = '',
  dpr,
  paused = false,
  gradientColors,
  angle = 0,
  noise = 0.3,
  blindCount = 16,
  blindMinWidth = 60,
  mouseDampening = 0.15,
  mirrorGradient = false,
  spotlightRadius = 0.5,
  spotlightSoftness = 1,
  spotlightOpacity = 1,
  distortAmount = 0,
  shineDirection = 'left',
  mixBlendMode = 'lighten',
}: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const positionBufferRef = useRef<WebGLBuffer | null>(null)
  const uvBufferRef = useRef<WebGLBuffer | null>(null)
  const attribsRef = useRef<{ position?: number; uv?: number }>({})
  const mouseTargetRef = useRef<[number, number]>([0, 0])
  const lastTimeRef = useRef(0)
  const firstResizeRef = useRef(true)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const canvas = document.createElement('canvas')
    const gl = (canvas.getContext('webgl', { alpha: true, antialias: true }) ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (!gl) return
    glRef.current = gl

    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.display = 'block'
    container.appendChild(canvas)

    const vertex = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

    const fragment = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec3  iResolution;
uniform vec2  iMouse;
uniform float iTime;

uniform float uAngle;
uniform float uNoise;
uniform float uBlindCount;
uniform float uSpotlightRadius;
uniform float uSpotlightSoftness;
uniform float uSpotlightOpacity;
uniform float uMirror;
uniform float uDistort;
uniform float uShineFlip;
uniform vec3  uColor0;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform vec3  uColor3;
uniform vec3  uColor4;
uniform vec3  uColor5;
uniform vec3  uColor6;
uniform vec3  uColor7;
uniform int   uColorCount;

varying vec2 vUv;

float rand(vec2 co){
  return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453);
}

vec2 rotate2D(vec2 p, float a){
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c) * p;
}

vec3 getGradientColor(float t){
  float tt = clamp(t, 0.0, 1.0);
  int count = uColorCount;
  if (count < 2) count = 2;
  float scaled = tt * float(count - 1);
  float seg = floor(scaled);
  float f = fract(scaled);

  if (seg < 1.0) return mix(uColor0, uColor1, f);
  if (seg < 2.0 && count > 2) return mix(uColor1, uColor2, f);
  if (seg < 3.0 && count > 3) return mix(uColor2, uColor3, f);
  if (seg < 4.0 && count > 4) return mix(uColor3, uColor4, f);
  if (seg < 5.0 && count > 5) return mix(uColor4, uColor5, f);
  if (seg < 6.0 && count > 6) return mix(uColor5, uColor6, f);
  if (seg < 7.0 && count > 7) return mix(uColor6, uColor7, f);
  if (count > 7) return uColor7;
  if (count > 6) return uColor6;
  if (count > 5) return uColor5;
  if (count > 4) return uColor4;
  if (count > 3) return uColor3;
  if (count > 2) return uColor2;
  return uColor1;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv0 = fragCoord.xy / iResolution.xy;

    float aspect = iResolution.x / iResolution.y;
    vec2 p = uv0 * 2.0 - 1.0;
    p.x *= aspect;
    vec2 pr = rotate2D(p, uAngle);
    pr.x /= aspect;
    vec2 uv = pr * 0.5 + 0.5;

    vec2 uvMod = uv;
    if (uDistort > 0.0) {
      float a = uvMod.y * 6.0;
      float b = uvMod.x * 6.0;
      float w = 0.01 * uDistort;
      uvMod.x += sin(a) * w;
      uvMod.y += cos(b) * w;
    }
    float t = uvMod.x;
    if (uMirror > 0.5) {
      t = 1.0 - abs(1.0 - 2.0 * fract(t));
    }
    vec3 base = getGradientColor(t);

    vec2 offset = vec2(iMouse.x/iResolution.x, iMouse.y/iResolution.y);
  float d = length(uv0 - offset);
  float r = max(uSpotlightRadius, 1e-4);
  float dn = d / r;
  float spot = (1.0 - 2.0 * pow(dn, uSpotlightSoftness)) * uSpotlightOpacity;
  vec3 cir = vec3(spot);
  float stripe = fract(uvMod.x * max(uBlindCount, 1.0));
  if (uShineFlip > 0.5) stripe = 1.0 - stripe;
    vec3 ran = vec3(stripe);

    vec3 col = cir + base - ran;
    col += (rand(gl_FragCoord.xy + iTime) - 0.5) * uNoise;

    fragColor = vec4(col, 1.0);
}

void main() {
    vec4 color;
    mainImage(color, vUv * iResolution.xy);
    gl_FragColor = color;
}
`

    const { arr: colorArr, count: colorCount } = prepStops(gradientColors)

    const createShader = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s))
      }
      return s
    }

    const vs = createShader(gl.VERTEX_SHADER, vertex)
    const fs = createShader(gl.FRAGMENT_SHADER, fragment)
    const program = gl.createProgram()!
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program))
    }
    gl.useProgram(program)
    programRef.current = program

    // Fullscreen triangle
    const positionBuffer = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    const positions = new Float32Array([-1, -1, 3, -1, -1, 3])
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)
    positionBufferRef.current = positionBuffer

    const uvBuffer = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer)
    const uvs = new Float32Array([0, 0, 2, 0, 0, 2])
    gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW)
    uvBufferRef.current = uvBuffer

    const positionLoc = gl.getAttribLocation(program, 'position')
    const uvLoc = gl.getAttribLocation(program, 'uv')
    attribsRef.current = { position: positionLoc, uv: uvLoc }

    // enable attributes
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.enableVertexAttribArray(positionLoc)
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer)
    gl.enableVertexAttribArray(uvLoc)
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0)

    // Uniform locations
    const uni = {
      iResolution: gl.getUniformLocation(program, 'iResolution'),
      iMouse: gl.getUniformLocation(program, 'iMouse'),
      iTime: gl.getUniformLocation(program, 'iTime'),
      uAngle: gl.getUniformLocation(program, 'uAngle'),
      uNoise: gl.getUniformLocation(program, 'uNoise'),
      uBlindCount: gl.getUniformLocation(program, 'uBlindCount'),
      uSpotlightRadius: gl.getUniformLocation(program, 'uSpotlightRadius'),
      uSpotlightSoftness: gl.getUniformLocation(program, 'uSpotlightSoftness'),
      uSpotlightOpacity: gl.getUniformLocation(program, 'uSpotlightOpacity'),
      uMirror: gl.getUniformLocation(program, 'uMirror'),
      uDistort: gl.getUniformLocation(program, 'uDistort'),
      uShineFlip: gl.getUniformLocation(program, 'uShineFlip'),
      uColor0: gl.getUniformLocation(program, 'uColor0'),
      uColor1: gl.getUniformLocation(program, 'uColor1'),
      uColor2: gl.getUniformLocation(program, 'uColor2'),
      uColor3: gl.getUniformLocation(program, 'uColor3'),
      uColor4: gl.getUniformLocation(program, 'uColor4'),
      uColor5: gl.getUniformLocation(program, 'uColor5'),
      uColor6: gl.getUniformLocation(program, 'uColor6'),
      uColor7: gl.getUniformLocation(program, 'uColor7'),
      uColorCount: gl.getUniformLocation(program, 'uColorCount'),
    }

    // initial uniform values
    gl.uniform1f(uni.uAngle, (angle * Math.PI) / 180)
    gl.uniform1f(uni.uNoise, noise)
    gl.uniform1f(uni.uBlindCount, Math.max(1, blindCount))
    gl.uniform1f(uni.uSpotlightRadius, spotlightRadius)
    gl.uniform1f(uni.uSpotlightSoftness, spotlightSoftness)
    gl.uniform1f(uni.uSpotlightOpacity, spotlightOpacity)
    gl.uniform1f(uni.uMirror, mirrorGradient ? 1 : 0)
    gl.uniform1f(uni.uDistort, distortAmount)
    gl.uniform1f(uni.uShineFlip, shineDirection === 'right' ? 1 : 0)
    gl.uniform3fv(uni.uColor0, new Float32Array(colorArr[0]))
    gl.uniform3fv(uni.uColor1, new Float32Array(colorArr[1]))
    gl.uniform3fv(uni.uColor2, new Float32Array(colorArr[2]))
    gl.uniform3fv(uni.uColor3, new Float32Array(colorArr[3]))
    gl.uniform3fv(uni.uColor4, new Float32Array(colorArr[4]))
    gl.uniform3fv(uni.uColor5, new Float32Array(colorArr[5]))
    gl.uniform3fv(uni.uColor6, new Float32Array(colorArr[6]))
    gl.uniform3fv(uni.uColor7, new Float32Array(colorArr[7]))
    gl.uniform1i(uni.uColorCount, colorCount)

    const resize = () => {
      const rect = container.getBoundingClientRect()
      const deviceRatio = dpr ?? (window.devicePixelRatio || 1)
      canvas.width = Math.max(1, Math.floor(rect.width * deviceRatio))
      canvas.height = Math.max(1, Math.floor(rect.height * deviceRatio))
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform3f(uni.iResolution, canvas.width, canvas.height, 1)

      if (blindMinWidth && blindMinWidth > 0) {
        const maxByMinWidth = Math.max(1, Math.floor(rect.width / blindMinWidth))
        const effective = blindCount ? Math.min(blindCount, maxByMinWidth) : maxByMinWidth
        gl.uniform1f(uni.uBlindCount, Math.max(1, effective))
      } else {
        gl.uniform1f(uni.uBlindCount, Math.max(1, blindCount))
      }

      if (firstResizeRef.current) {
        firstResizeRef.current = false
        const cx = canvas.width / 2
        const cy = canvas.height / 2
        gl.uniform2f(uni.iMouse, cx, cy)
        mouseTargetRef.current = [cx, cy]
      }
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const scale = dpr ?? (window.devicePixelRatio || 1)
      const x = (e.clientX - rect.left) * scale
      const y = (rect.height - (e.clientY - rect.top)) * scale
      mouseTargetRef.current = [x, y]
      if (mouseDampening <= 0) {
        gl.uniform2f(uni.iMouse, x, y)
      }
    }
    canvas.addEventListener('pointermove', onPointerMove)

    const loop = (t: number) => {
      rafRef.current = requestAnimationFrame(loop)
      gl.uniform1f(uni.iTime, t * 0.001)
      if (mouseDampening > 0) {
        if (!lastTimeRef.current) lastTimeRef.current = t
        const dt = (t - lastTimeRef.current) / 1000
        lastTimeRef.current = t
        const tau = Math.max(1e-4, mouseDampening)
        let factor = 1 - Math.exp(-dt / tau)
        if (factor > 1) factor = 1
        const target = mouseTargetRef.current
        const cur = { x: 0, y: 0 }
        // readback not available; approximate by moving towards target from previous uniform by factor
        // store last in mouseTargetRef as current uniform too
        const prev = mouseTargetRef.current
        const nx = prev[0] + (target[0] - prev[0]) * factor
        const ny = prev[1] + (target[1] - prev[1]) * factor
        mouseTargetRef.current = [nx, ny]
        gl.uniform2f(uni.iMouse, nx, ny)
      } else {
        lastTimeRef.current = t
      }
      if (!paused && programRef.current) {
        gl.drawArrays(gl.TRIANGLES, 0, 3)
      }
    }
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      canvas.removeEventListener('pointermove', onPointerMove)
      ro.disconnect()
      if (canvas.parentElement === container) {
        container.removeChild(canvas)
      }
      gl.deleteBuffer(positionBufferRef.current)
      gl.deleteBuffer(uvBufferRef.current)
      if (programRef.current) gl.deleteProgram(programRef.current)
      programRef.current = null
      glRef.current = null
    }
  }, [
    dpr,
    paused,
    gradientColors,
    angle,
    noise,
    blindCount,
    blindMinWidth,
    mouseDampening,
    mirrorGradient,
    spotlightRadius,
    spotlightSoftness,
    spotlightOpacity,
    distortAmount,
    shineDirection,
  ])

  return (
    <div
      ref={containerRef}
      className={`gradient-blinds-container ${className}`}
      style={{ ...(mixBlendMode && { mixBlendMode }) }}
    />
  )
}

export default GradientBlinds


