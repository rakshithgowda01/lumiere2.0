"use client"

import { useEffect, useRef, useState } from "react"

interface VariableProximityProps {
  text: string
  className?: string
}

export default function VariableProximity({ text, className = "" }: VariableProximityProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && isHovered) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      return () => container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isHovered])

  const getLetterStyle = (index: number, totalLetters: number) => {
    if (!containerRef.current || !isHovered) {
      return {
        fontSize: "1em",
        fontWeight: 400,
        color: "rgba(255, 255, 255, 0.9)",
        transform: "translateY(0px)",
        transition: "all 0.3s ease-out",
      }
    }

    const rect = containerRef.current.getBoundingClientRect()
    const letterWidth = rect.width / totalLetters
    const letterX = letterWidth * index + letterWidth / 2
    const letterY = rect.height / 2

    const distance = Math.sqrt(Math.pow(mousePosition.x - letterX, 2) + Math.pow(mousePosition.y - letterY, 2))

    const maxDistance = 100
    const proximity = Math.max(0, 1 - distance / maxDistance)

    return {
      fontSize: `${1 + proximity * 0.2}em`,
      fontWeight: 400 + proximity * 200,
      color: `rgba(255, 255, 255, ${0.9 + proximity * 0.1})`,
      transform: `translateY(${-proximity * 5}px)`,
      transition: "all 0.1s ease-out",
    }
  }

  return (
    <div
      ref={containerRef}
      className={`inline-block cursor-default ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text.split("").map((letter, index) => (
        <span key={index} style={getLetterStyle(index, text.length)} className="inline-block">
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </div>
  )
}
