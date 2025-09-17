"use client"
import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"

interface DomeGalleryProps {
  images: string[]
  onImageClick?: (index: number) => void
}

export const DomeGallery: React.FC<DomeGalleryProps> = ({ images, onImageClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="relative w-96 h-96">
        {images.map((image, index) => {
          const angle = (index / images.length) * 2 * Math.PI
          const radius = 150
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          return (
            <motion.div
              key={index}
              className="absolute w-20 h-20 cursor-pointer"
              style={{
                left: `calc(50% + ${x}px - 40px)`,
                top: `calc(50% + ${y}px - 40px)`,
              }}
              whileHover={{ scale: 1.2, zIndex: 10 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => onImageClick?.(index)}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover rounded-lg border-2 border-white/20"
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
