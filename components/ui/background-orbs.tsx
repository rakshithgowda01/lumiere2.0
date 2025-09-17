"use client"
import React, { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface Dimensions { width: number; height: number }

function useDimensions(ref: React.RefObject<HTMLElement | SVGElement>): Dimensions {
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 })
  useEffect(() => {
    let timeoutId: number
    const update = () => {
      if (ref.current) {
        const { width, height } = (ref.current as HTMLElement).getBoundingClientRect()
        setDimensions({ width, height })
      }
    }
    const debounced = () => { clearTimeout(timeoutId); timeoutId = window.setTimeout(update, 250) }
    update()
    window.addEventListener('resize', debounced)
    return () => { window.removeEventListener('resize', debounced); clearTimeout(timeoutId) }
  }, [ref])
  return dimensions
}

type BackgroundProps = { children?: React.ReactNode; className?: string }

const BackgroundOrbs: React.FC<BackgroundProps> = ({ children, className }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const dimensions = useDimensions(containerRef)

  const colors = [
    "rgba(59, 10, 69, 0.4)",
    "rgba(10, 31, 68, 0.3)",
    "rgba(26, 26, 26, 0.5)",
    "rgba(59, 10, 69, 0.2)",
    "rgba(10, 31, 68, 0.4)",
  ]

  const circleSize = Math.max(dimensions.width || 800, dimensions.height || 600)

  return (
    <div ref={containerRef} className={cn("fixed inset-0 z-0 overflow-hidden bg-black", className)}>
      <div className="absolute inset-0 blur-3xl">
        {colors.map((color, index) => (
          <svg
            key={index}
            className="absolute animate-background-gradient"
            style={{
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 50}%`,
              // @ts-expect-error CSS variables at runtime
              "--background-gradient-speed": "25s",
              // @ts-expect-error CSS variables at runtime
              "--tx-1": Math.random() - 0.5,
              // @ts-expect-error CSS variables at runtime
              "--ty-1": Math.random() - 0.5,
              // @ts-expect-error CSS variables at runtime
              "--tx-2": Math.random() - 0.5,
              // @ts-expect-error CSS variables at runtime
              "--ty-2": Math.random() - 0.5,
              // @ts-expect-error CSS variables at runtime
              "--tx-3": Math.random() - 0.5,
              // @ts-expect-error CSS variables at runtime
              "--ty-3": Math.random() - 0.5,
              // @ts-expect-error CSS variables at runtime
              "--tx-4": Math.random() - 0.5,
              // @ts-expect-error CSS variables at runtime
              "--ty-4": Math.random() - 0.5,
              animationDelay: `${index * 2}s`,
            } as React.CSSProperties}
            width={circleSize * (0.6 + Math.random() * 0.8)}
            height={circleSize * (0.6 + Math.random() * 0.8)}
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="50" fill={color} className="opacity-60" />
          </svg>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A]/80 via-transparent to-[#0A0A0A]/60" />

      {children}

      <style jsx>{`
        @keyframes background-gradient {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(calc(100% * var(--tx-1, 1)), calc(100% * var(--ty-1, 1))); }
          40% { transform: translate(calc(100% * var(--tx-2, -1)), calc(100% * var(--ty-2, 1))); }
          60% { transform: translate(calc(100% * var(--tx-3, 1)), calc(100% * var(--ty-3, -1))); }
          80% { transform: translate(calc(100% * var(--tx-4, -1)), calc(100% * var(--ty-4, -1))); }
        }
        .animate-background-gradient {
          animation: background-gradient var(--background-gradient-speed, 25s) cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
        }
      `}</style>
    </div>
  )
}

export default BackgroundOrbs


