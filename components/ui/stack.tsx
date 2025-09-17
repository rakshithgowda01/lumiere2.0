"use client"
import { useEffect, useMemo, useState } from "react"
import type React from "react"

import { motion, AnimatePresence } from "motion/react"

interface StackItem {
  id: number
  content: React.ReactNode
}

interface StackProps {
  items: StackItem[]
  onActiveChange?: (index: number) => void
  className?: string
}

export function Stack({ items, onActiveChange, className = "" }: StackProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Deterministic pseudo-random based on item id and index
  const prng = (seed: number) => {
    let x = Math.sin(seed) * 10000
    return x - Math.floor(x)
  }

  const initialTransforms = useMemo(() => {
    return items.map((item, index) => {
      const seed = item.id * 997 + index * 131
      const r1 = prng(seed)
      const r2 = prng(seed + 1)
      const r3 = prng(seed + 2)
      return {
        rotate: r1 * 10 - 5,
        x: r2 * 20 - 10,
        y: r3 * 20 - 10,
      }
    })
  }, [items])

  useEffect(() => {
    onActiveChange?.(activeIndex)
  }, [activeIndex, onActiveChange])

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  return (
    <div className={`relative w-64 h-80 ${className}`}>
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => {
          const offset = index - activeIndex
          const isActive = index === activeIndex

          return (
            <motion.div
              key={item.id}
              className="absolute inset-0 cursor-pointer"
              initial={{
                scale: 0.8,
                rotate: initialTransforms[index].rotate,
                x: initialTransforms[index].x,
                y: initialTransforms[index].y,
              }}
              animate={{
                scale: isActive ? 1 : 0.9 - Math.abs(offset) * 0.05,
                rotate: isActive ? 0 : initialTransforms[index].rotate,
                x: isActive ? 0 : offset * 15,
                y: isActive ? 0 : Math.abs(offset) * 10,
                zIndex: items.length - Math.abs(offset),
                opacity: Math.abs(offset) > 2 ? 0 : 1,
              }}
              exit={{
                scale: 0.8,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              onClick={isActive ? handleNext : () => setActiveIndex(index)}
              whileHover={{ scale: isActive ? 1.02 : 0.92 }}
              whileTap={{ scale: isActive ? 0.98 : 0.88 }}
            >
              {item.content}
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* Navigation dots */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${index === activeIndex ? "bg-white" : "bg-white/30"}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
