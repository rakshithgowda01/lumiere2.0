"use client"
import React, { useEffect, useRef, useState } from "react"
import { useMotionValueEvent, useScroll } from "motion/react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string
    description: string
    content?: React.ReactNode | any
  }[]
  contentClassName?: string
}) => {
  const [activeCard, setActiveCard] = React.useState(0)
  const ref = useRef<any>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const cardLength = content.length

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength)
    const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint)
      if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
        return index
      }
      return acc
    }, 0)
    setActiveCard(Math.min(closestBreakpointIndex, cardLength - 1))
  })

  // Removed background overlays to let global site background show through

  return (
    <div className="relative h-[500vh]" ref={ref}>
      <div className="sticky top-0 flex h-screen justify-center space-x-10 overflow-hidden rounded-md p-10">
        <div className="relative flex items-start px-4 z-10">
          <div className="max-w-2xl">
            {content.map(
              (item, index) =>
                activeCard === index && (
                  <motion.div
                    key={item.title + index}
                    className="my-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <motion.h2
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-2xl font-bold text-slate-100"
                    >
                      {item.title}
                    </motion.h2>
                    <motion.p
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-kg mt-10 max-w-sm text-slate-300"
                    >
                      {item.description}
                    </motion.p>
                  </motion.div>
                ),
            )}
          </div>
        </div>
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
          className={cn(
            "sticky top-10 hidden lg:flex z-10 h-64 w-64 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm",
            contentClassName,
          )}
        >
          <div className="relative h-40 w-40 rounded-full bg-white flex items-center justify-center">
            <img src="/placeholder-logo.svg" alt="Logo" className="h-16 w-16 object-contain" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
