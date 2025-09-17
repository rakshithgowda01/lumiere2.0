"use client"
import { useEffect, useRef } from 'react'

// Lightweight, dependency-free, minimal animated gradient waves using 2D canvas
// Focuses on subtle movement and low CPU/GPU usage

const MinimalWavesBg = () => {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const DPR = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(width * DPR))
      canvas.height = Math.max(1, Math.floor(height * DPR))
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    let t0 = performance.now()
    const palette = [
      [20, 24, 38],   // base dark
      [64, 76, 140],  // deep indigo
      [92, 98, 188],  // wave highlight
    ]

    const draw = (now: number) => {
      const t = (now - t0) / 1000
      const w = canvas.width
      const h = canvas.height

      // clear with soft dark
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = 'rgba(10, 10, 16, 0.9)'
      ctx.fillRect(0, 0, w, h)

      // subtle radial glow
      const grad = ctx.createRadialGradient(w * 0.5, h * 0.35, Math.max(w, h) * 0.1, w * 0.5, h * 0.35, Math.max(w, h) * 0.8)
      grad.addColorStop(0, 'rgba(100,110,220,0.12)')
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // three layered waves
      const layers = 3
      for (let i = 0; i < layers; i++) {
        const amp = (h * 0.02) * (1 + i * 0.3)
        const yBase = h * (0.68 + i * 0.06)
        const speed = 0.3 + i * 0.12
        const hue = palette[i]
        const alpha = 0.06 + i * 0.04
        ctx.fillStyle = `rgba(${hue[0]}, ${hue[1]}, ${hue[2]}, ${alpha})`
        ctx.beginPath()
        ctx.moveTo(0, h)
        ctx.lineTo(0, yBase)
        const k = 0.0018 + i * 0.0007
        for (let x = 0; x <= w; x += Math.max(1, Math.floor(w / 160))) {
          const y = yBase + Math.sin(x * k + t * speed) * amp + Math.cos(x * k * 0.5 + t * speed * 0.7) * (amp * 0.4)
          ctx.lineTo(x, y)
        }
        ctx.lineTo(w, h)
        ctx.closePath()
        ctx.fill()
      }

      // soft vignette
      const vg = ctx.createLinearGradient(0, 0, 0, h)
      vg.addColorStop(0, 'rgba(0,0,0,0.25)')
      vg.addColorStop(0.3, 'rgba(0,0,0,0)')
      vg.addColorStop(1, 'rgba(0,0,0,0.55)')
      ctx.fillStyle = vg
      ctx.fillRect(0, 0, w, h)

      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <canvas
        ref={ref}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  )
}

export default MinimalWavesBg


