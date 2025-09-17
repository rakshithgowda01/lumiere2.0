"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Photo {
  id: number
  src: string
  title: string
  description: string
}

interface GalleryShowcaseProps {
  photos?: Photo[]
  autoPlaySpeed?: number
  className?: string
}

// Helper image that supports extension fallbacks when src is provided without extension
const SmartImg: React.FC<{
  src: string
  alt: string
  className?: string
  motionProps?: any
}> = ({ src, alt, className, motionProps }) => {
  const hasExtension = /\.[a-zA-Z0-9]+$/.test(src)
  const candidates = hasExtension
    ? [src]
    : [
        `${src}.jpg`,
        `${src}.JPG`,
        `${src}.jpeg`,
        `${src}.JPEG`,
        `${src}.png`,
        `${src}.PNG`,
        `${src}.webp`,
        `${src}.WEBP`,
      ]
  const [index, setIndex] = useState(0)
  const currentSrc = candidates[Math.min(index, candidates.length - 1)]

  return (
    <motion.img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={() => setIndex((i) => Math.min(i + 1, candidates.length - 1))}
      {...motionProps}
    />
  )
}

const defaultPhotos: Photo[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    title: "Mountain Landscape",
    description: "Beautiful mountain scenery with crystal clear lakes",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop",
    title: "Forest Path",
    description: "Serene forest trail leading into the wilderness",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop",
    title: "Ocean Waves",
    description: "Powerful ocean waves crashing against the shore",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=600&fit=crop",
    title: "Desert Sunset",
    description: "Golden sunset over vast desert dunes",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=400&h=600&fit=crop",
    title: "City Skyline",
    description: "Modern city skyline illuminated at night",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=600&fit=crop",
    title: "Autumn Forest",
    description: "Colorful autumn leaves in a peaceful forest",
  },
]

export const GalleryShowcase: React.FC<GalleryShowcaseProps> = ({
  photos = defaultPhotos,
  autoPlaySpeed = 5000,
  className = '',
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [modalCurrentIndex, setModalCurrentIndex] = useState(0)
  const [modalIsPlaying, setModalIsPlaying] = useState(true)
  const [showTitle, setShowTitle] = useState(false)
  const modalIntervalRef = useRef<number | null>(null)

  const extendedPhotos = [...photos, ...photos, ...photos]

  useEffect(() => {
    if (modalIsPlaying && selectedPhoto) {
      modalIntervalRef.current = window.setInterval(() => {
        setModalCurrentIndex((prev) => (prev + 1) % photos.length)
      }, autoPlaySpeed)
    } else if (modalIntervalRef.current) {
      clearInterval(modalIntervalRef.current)
      modalIntervalRef.current = null
    }
    return () => {
      if (modalIntervalRef.current) {
        clearInterval(modalIntervalRef.current)
        modalIntervalRef.current = null
      }
    }
  }, [modalIsPlaying, selectedPhoto, photos.length, autoPlaySpeed])

  const openModal = (photo: Photo) => {
    setSelectedPhoto(photo)
    setModalCurrentIndex(photos.findIndex((p) => p.id === photo.id))
    setShowTitle(false)
    setTimeout(() => setShowTitle(true), 500)
  }

  const closeModal = () => {
    setSelectedPhoto(null)
    setShowTitle(false)
  }

  const nextPhoto = () => setModalCurrentIndex((prev) => (prev + 1) % photos.length)
  const prevPhoto = () => setModalCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)

  return (
    <div className={`w-full ${className}`}>
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg bg-gray-900 border border-gray-700">
        <motion.div
          className="flex h-full"
          animate={{ x: [`0%`, `-${photos.length * (320 + 16)}px`] }}
          transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: photos.length * (autoPlaySpeed / 1000), ease: 'linear' } }}
          style={{ width: `${extendedPhotos.length * (320 + 16)}px` }}
        >
          {extendedPhotos.map((photo, index) => (
            <div
              key={`${photo.id}-${index}`}
              className="w-[300px] md:w-[320px] h-full relative cursor-pointer group flex-shrink-0 mr-4"
              onClick={() => openModal(photo)}
            >
              <SmartImg
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover rounded-lg"
                motionProps={{ whileHover: { scale: 1.05 }, transition: { duration: 0.3 } }}
              />
              <div className="absolute bottom-6 left-6 text-white z-10">
                <h3 className="text-lg md:text-xl font-semibold drop-shadow-lg">{photo.title}</h3>
                <p className="text-sm opacity-80 drop-shadow-lg">{photo.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" onClick={closeModal}>
            <div className="flex items-center justify-center min-h-screen p-4">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="bg-gray-900 rounded-lg shadow-2xl w-auto max-h-[90vh] overflow-hidden max-w-[95vw]" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                  <AnimatePresence>
                    {showTitle && (
                      <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-xl md:text-2xl font-bold text-white">
                        {photos[modalCurrentIndex]?.title}
                      </motion.h2>
                    )}
                  </AnimatePresence>
                  <Button variant="ghost" size="sm" onClick={closeModal} className="text-gray-400 hover:text-white">
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="relative overflow-hidden">
                  <SmartImg
                    src={photos[modalCurrentIndex]?.src}
                    alt={photos[modalCurrentIndex]?.title || ''}
                    className="w-auto h-auto max-h-[70vh] max-w-[90vw] object-contain"
                    motionProps={{ key: modalCurrentIndex, initial: { opacity: 0, x: 100 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5 } }}
                  />
                  <Button variant="ghost" size="sm" className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70" onClick={prevPhoto}>
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70" onClick={nextPhoto}>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function GalleryShowcasePage() {
  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Gallery Showcase</h1>
          <p className="text-gray-400">Infinite rolling gallery with smooth animations. Click any image for detailed view.</p>
        </div>
        <GalleryShowcase />
      </div>
    </div>
  )
}





