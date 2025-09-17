"use client"

import { useRef, useEffect, type ReactNode } from "react"

interface MagnetProps {
  children: ReactNode
  className?: string
  strength?: number
}

export default function Magnet({ children, className = "", strength = 0.3 }: MagnetProps) {
  const magnetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const magnet = magnetRef.current
    if (!magnet) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = magnet.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength

      magnet.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    }

    const handleMouseLeave = () => {
      magnet.style.transform = "translate(0px, 0px)"
    }

    magnet.addEventListener("mousemove", handleMouseMove)
    magnet.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      magnet.removeEventListener("mousemove", handleMouseMove)
      magnet.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [strength])

  return (
    <div ref={magnetRef} className={`transition-transform duration-200 ease-out ${className}`}>
      {children}
    </div>
  )
}
