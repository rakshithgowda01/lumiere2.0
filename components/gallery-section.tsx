"use client"
import { useState, useRef, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const galleryPhotos = [
  {
    id: 1,
    title: "Creative Vision",
    thumbnail: "/placeholder.svg?height=600&width=400&text=Photo+1",
    images: [
      "/placeholder.svg?height=800&width=600&text=Gallery+1A",
      "/placeholder.svg?height=800&width=600&text=Gallery+1B",
      "/placeholder.svg?height=800&width=600&text=Gallery+1C",
      "/placeholder.svg?height=800&width=600&text=Gallery+1D",
      "/placeholder.svg?height=800&width=600&text=Gallery+1E",
    ],
  },
  {
    id: 2,
    title: "Brand Identity",
    thumbnail: "/placeholder.svg?height=600&width=400&text=Photo+2",
    images: [
      "/placeholder.svg?height=800&width=600&text=Gallery+2A",
      "/placeholder.svg?height=800&width=600&text=Gallery+2B",
      "/placeholder.svg?height=800&width=600&text=Gallery+2C",
    ],
  },
  {
    id: 3,
    title: "Digital Art",
    thumbnail: "/placeholder.svg?height=600&width=400&text=Photo+3",
    images: [
      "/placeholder.svg?height=800&width=600&text=Gallery+3A",
      "/placeholder.svg?height=800&width=600&text=Gallery+3B",
      "/placeholder.svg?height=800&width=600&text=Gallery+3C",
    ],
  },
  {
    id: 4,
    title: "Photography",
    thumbnail: "/placeholder.svg?height=600&width=400&text=Photo+4",
    images: [
      "/placeholder.svg?height=800&width=600&text=Gallery+4A",
      "/placeholder.svg?height=800&width=600&text=Gallery+4B",
      "/placeholder.svg?height=800&width=600&text=Gallery+4C",
    ],
  },
  {
    id: 5,
    title: "Illustration",
    thumbnail: "/placeholder.svg?height=600&width=400&text=Photo+5",
    images: [
      "/placeholder.svg?height=800&width=600&text=Gallery+5A",
      "/placeholder.svg?height=800&width=600&text=Gallery+5B",
      "/placeholder.svg?height=800&width=600&text=Gallery+5C",
    ],
  },
  {
    id: 6,
    title: "Motion Graphics",
    thumbnail: "/placeholder.svg?height=600&width=400&text=Photo+6",
    images: [
      "/placeholder.svg?height=800&width=600&text=Gallery+6A",
      "/placeholder.svg?height=800&width=600&text=Gallery+6B",
      "/placeholder.svg?height=800&width=600&text=Gallery+6C",
    ],
  },
]

export default function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [autoScrollOffset, setAutoScrollOffset] = useState(0)

  const sectionRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null)
  const imageChangeRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1, rootMargin: "-50px" },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isDragging && selectedPhoto === null) {
      autoScrollRef.current = setInterval(() => {
        setAutoScrollOffset((prev) => prev - 0.5)
      }, 16) // 60fps
    } else {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }
  }, [isDragging, selectedPhoto])

  useEffect(() => {
    if (selectedPhoto !== null) {
      imageChangeRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % galleryPhotos[selectedPhoto].images.length)
      }, 1000) // 1 second intervals
    } else {
      if (imageChangeRef.current) {
        clearInterval(imageChangeRef.current)
      }
    }

    return () => {
      if (imageChangeRef.current) {
        clearInterval(imageChangeRef.current)
      }
    }
  }, [selectedPhoto])

  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true)
    setDragStart(clientX)
  }, [])

  const handleDragMove = useCallback(
    (clientX: number) => {
      if (!isDragging) return
      const diff = clientX - dragStart
      setDragOffset(diff)
    },
    [isDragging, dragStart],
  )

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
    setAutoScrollOffset((prev) => prev + dragOffset)
    setDragOffset(0)
  }, [dragOffset])

  const handlePhotoClick = (index: number) => {
    if (!isDragging) {
      setSelectedPhoto(index)
      setCurrentImageIndex(0)
    }
  }

  const closeGallery = () => {
    setSelectedPhoto(null)
    setCurrentImageIndex(0)
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedPhoto === null) return

    const totalImages = galleryPhotos[selectedPhoto].images.length
    if (direction === "prev") {
      setCurrentImageIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1))
    } else {
      setCurrentImageIndex((prev) => (prev + 1) % totalImages)
    }
  }

  return (
    <section
      ref={sectionRef}
      className={`py-20 px-6 bg-black transition-all duration-1000 overflow-hidden ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white font-mono">Gallery Showcase</h2>
        </div>

        <div className="relative h-[600px] overflow-hidden">
          <div
            ref={carouselRef}
            className="flex gap-8 h-full cursor-grab active:cursor-grabbing"
            style={{
              transform: `translateX(${autoScrollOffset + dragOffset}px)`,
              transition: isDragging ? "none" : "transform 0.1s ease-out",
            }}
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
          >
            {[...galleryPhotos, ...galleryPhotos, ...galleryPhotos].map((photo, index) => {
              const originalIndex = index % galleryPhotos.length
              return (
                <div
                  key={`photo-${index}`}
                  className="flex-shrink-0 transition-all duration-500 hover:scale-105"
                  onClick={() => handlePhotoClick(originalIndex)}
                >
                  <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-white/20 overflow-hidden hover:border-white/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30">
                    <CardContent className="p-4">
                      <div className="w-80 h-96 relative">
                        <img
                          src={photo.thumbnail || "/placeholder.svg"}
                          alt={photo.title}
                          className="w-full h-full object-cover rounded-lg transition-transform duration-500"
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-lg" />
                        <div className="absolute bottom-6 left-6 right-6">
                          <h3 className="text-white text-xl font-bold">{photo.title}</h3>
                        </div>
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/30 flex items-center justify-center transition-all duration-300 rounded-lg">
                          <span className="text-white text-lg font-bold opacity-0 hover:opacity-100 transition-opacity duration-300">
                            Click to View
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>

        {selectedPhoto !== null && (
          <div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center animate-in fade-in-0 duration-500"
            onClick={closeGallery} // Click outside to close modal
          >
            <div
              className="relative w-full max-w-7xl h-full flex items-center justify-center p-8"
              onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
            >
              <div className="flex w-full h-[80vh] gap-8">
                <div className="flex-1 flex items-center justify-center">
                  <div className="relative">
                    <img
                      src={galleryPhotos[selectedPhoto].images[currentImageIndex] || "/placeholder.svg"}
                      alt={`${galleryPhotos[selectedPhoto].title} - Image ${currentImageIndex + 1}`}
                      className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    />

                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {galleryPhotos[selectedPhoto].images.map((_, index) => (
                        <div
                          key={index}
                          className={`h-1 transition-all duration-300 ${
                            index === currentImageIndex ? "w-8 bg-white" : "w-2 bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="w-px bg-white/20"></div>

                <div className="flex-1 flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold text-white mb-2">{galleryPhotos[selectedPhoto].title}</h3>
                    <p className="text-white/60">
                      {currentImageIndex + 1} of {galleryPhotos[selectedPhoto].images.length} images
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 overflow-y-auto flex-1 pr-4">
                    {galleryPhotos[selectedPhoto].images.map((image, index) => (
                      <div
                        key={index}
                        className={`relative cursor-pointer transition-all duration-300 hover:scale-105 ${
                          index === currentImageIndex ? "ring-2 ring-white" : ""
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${galleryPhotos[selectedPhoto].title} - ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        {index === currentImageIndex && <div className="absolute inset-0 bg-white/20 rounded-lg"></div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={closeGallery}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-black/70 border-white/30 hover:bg-black/90 text-white"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
