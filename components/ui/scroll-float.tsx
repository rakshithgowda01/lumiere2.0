"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface ScrollFloatProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  direction?: "up" | "down" | "left" | "right"
}

export default function ScrollFloat({ children, className = "", intensity = 0.5, direction = "up" }: ScrollFloatProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [elementTop, setElementTop] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleResize = () => {
      if (elementRef.current) {
        setElementTop(elementRef.current.offsetTop)
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const getTransform = () => {
    const offset = (scrollY - elementTop) * intensity

    switch (direction) {
      case "up":
        return `translateY(${-offset}px)`
      case "down":
        return `translateY(${offset}px)`
      case "left":
        return `translateX(${-offset}px)`
      case "right":
        return `translateX(${offset}px)`
      default:
        return `translateY(${-offset}px)`
    }
  }

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        transform: getTransform(),
        transition: "transform 0.1s ease-out",
      }}
    >
      {children}
    </div>
  )
}
