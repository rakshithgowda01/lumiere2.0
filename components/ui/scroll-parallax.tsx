"use client"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef, type ReactNode } from "react"

interface ScrollParallaxProps {
  children: ReactNode
  className?: string
  offset?: number[]
}

export const ScrollParallax = ({
  children,
  className = "",
  offset = ["start end", "end start"],
}: ScrollParallaxProps) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  )
}
