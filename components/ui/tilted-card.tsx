"use client"
import type React from "react"
import { motion } from "framer-motion"

interface TiltedCardProps {
  image: string
  title?: string
  description?: string
  onClose?: () => void
}

export const TiltedCard: React.FC<TiltedCardProps> = ({ image, title, description, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-2xl max-h-[80vh] bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
        style={{ perspective: "1000px" }}
        whileHover={{ rotateY: 5, rotateX: 5 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-auto object-cover" />
        {(title || description) && (
          <div className="p-6">
            {title && <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>}
            {description && <p className="text-gray-600 dark:text-gray-300">{description}</p>}
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center text-white transition-colors"
        >
          ×
        </button>
      </motion.div>
    </motion.div>
  )
}
