"use client"
import React, { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface Dimensions {
  width: number
  height: number
}

function useDimensions(ref: React.RefObject<HTMLElement | SVGElement>): Dimensions {
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 })

  useEffect(() => {
    let timeoutId: number

    const updateDimensions = () => {
      if (ref.current) {
        const { width, height } = (ref.current as HTMLElement).getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    const debouncedUpdateDimensions = () => {
      clearTimeout(timeoutId)
      timeoutId = window.setTimeout(updateDimensions, 250)
    }

    updateDimensions()
    window.addEventListener('resize', debouncedUpdateDimensions)

    return () => {
      window.removeEventListener('resize', debouncedUpdateDimensions)
      clearTimeout(timeoutId)
    }
  }, [ref])

  return dimensions
}

interface BackgroundProps {
  children?: React.ReactNode
  className?: string
}

const Background: React.FC<BackgroundProps> = ({ children, className }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const dimensions = useDimensions(containerRef)

  const colors = [
    "rgba(139, 92, 246, 0.55)",   // violet-500
    "rgba(59, 130, 246, 0.5)",    // blue-500
    "rgba(16, 185, 129, 0.45)",   // emerald-500
    "rgba(236, 72, 153, 0.5)",    // pink-500
    "rgba(14, 165, 233, 0.5)",    // sky-500
  ]

  const circleSize = Math.max(dimensions.width || 800, dimensions.height || 600)

  return (
    <div
      ref={containerRef}
      className={cn("fixed inset-0 z-0 overflow-hidden bg-black", className)}
    >
      <div className="absolute inset-0 blur-2xl">
        {colors.map((color, index) => (
          <svg
            key={index}
            className="absolute animate-background-gradient"
            style={{
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 50}%`,
              // @ts-expect-error CSS vars
              "--background-gradient-speed": "25s",
              // @ts-expect-error CSS vars
              "--tx-1": Math.random() - 0.5,
              // @ts-expect-error CSS vars
              "--ty-1": Math.random() - 0.5,
              // @ts-expect-error CSS vars
              "--tx-2": Math.random() - 0.5,
              // @ts-expect-error CSS vars
              "--ty-2": Math.random() - 0.5,
              // @ts-expect-error CSS vars
              "--tx-3": Math.random() - 0.5,
              // @ts-expect-error CSS vars
              "--ty-3": Math.random() - 0.5,
              // @ts-expect-error CSS vars
              "--tx-4": Math.random() - 0.5,
              // @ts-expect-error CSS vars
              "--ty-4": Math.random() - 0.5,
              animationDelay: `${index * 2}s`,
            } as React.CSSProperties}
            width={circleSize * (0.6 + Math.random() * 0.8)}
            height={circleSize * (0.6 + Math.random() * 0.8)}
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="50" fill={color} className="opacity-90" />
          </svg>
        ))}
      </div>


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

export default Background


