"use client"

import type React from "react"
import { useEffect, useRef, useCallback } from "react"

interface ScrollStackProps {
  children: React.ReactNode
  className?: string
  itemDistance?: number
  itemStackDistance?: number
  stackPosition?: string
  scaleEndPosition?: string
  baseScale?: number
  rotationAmount?: number
  blurAmount?: number
}

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 450,
  itemStackDistance = 30,
  stackPosition = "35%",
  scaleEndPosition = "10%",
  baseScale = 0.75,
  rotationAmount = 0.7,
  blurAmount = 0,
}: ScrollStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLElement[]>([])
  const rafId = useRef<number>()

  const updateCards = useCallback(() => {
    if (!containerRef.current || cardsRef.current.length === 0) return

    const scrollY = window.scrollY
    const windowHeight = window.innerHeight
    const containerRect = containerRef.current.getBoundingClientRect()
    const containerTop = containerRect.top + scrollY

    cardsRef.current.forEach((card, index) => {
      if (!card) return

      const cardRect = card.getBoundingClientRect()
      const cardTop = cardRect.top + scrollY

      const stackStart = cardTop - windowHeight * 0.8
      const stackEnd = cardTop - windowHeight * 0.2

      const progress = Math.max(0, Math.min(1, (scrollY - stackStart) / (stackEnd - stackStart)))

      const scale = 1 - progress * (1 - baseScale)
      const translateY = -progress * itemStackDistance
      const rotation = progress * rotationAmount

      const zIndex = cardsRef.current.length + index + Math.floor(progress * 100)

      card.style.transform = `
        translate3d(0, ${translateY}px, 0) 
        scale(${Math.max(baseScale, scale)}) 
        rotate(${rotation}deg)
      `
      card.style.filter = "none"
      card.style.zIndex = `${zIndex}`
      card.style.transformOrigin = "center center"
    })
  }, [baseScale, itemStackDistance, rotationAmount, itemDistance])

  const handleScroll = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current)
    }
    rafId.current = requestAnimationFrame(updateCards)
  }, [updateCards])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cards = Array.from(container.querySelectorAll(".scroll-stack-card")) as HTMLElement[]
    cardsRef.current = cards

    cards.forEach((card, index) => {
      card.style.position = "relative"
      card.style.transformOrigin = "center center"
      card.style.willChange = "transform"
      card.style.backfaceVisibility = "hidden"

      if (index < cards.length - 1) {
        card.style.marginBottom = `${itemDistance * 0.01}px` // Minimal gap
      }
    })

    window.addEventListener("scroll", handleScroll, { passive: true })
    updateCards()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [handleScroll, updateCards, itemDistance])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {children}
    </div>
  )
}

export default ScrollStack
