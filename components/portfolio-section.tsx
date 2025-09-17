"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react"

const videoProjects = [
  {
    title: "Conversion",
    subtitle: "Lorem ipsum dolor sit amet consectetur.",
    category: "RESULTS",
    thumbnail: "/luxury-watch-mechanism-close-up.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.",
    tags: ["Conversion", "Analytics", "UX"],
  },
  {
    title: "Speed",
    subtitle: "Lorem ipsum dolor sit amet consectetur.",
    category: "SPEED",
    thumbnail: "/blue-digital-waveform-time-revolution.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.",
    tags: ["Fast Delivery", "Efficiency", "Quality"],
  },
  {
    title: "BUY IT BEFORE IT'S GONE! Ready",
    subtitle: "Lorem ipsum dolor sit amet consectetur.",
    category: "SOCIAL",
    thumbnail: "/product-bottle-ocean-background-luxury.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.",
    tags: ["Social Media", "Viral", "Engagement"],
  },
  {
    title: "Standout",
    subtitle: "Lorem ipsum dolor sit amet consectetur.",
    category: "STANDOUT",
    thumbnail: "/blue-digital-waveform-standout-design.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.",
    tags: ["Creative", "Branding", "Innovation"],
  },
]

export default function PortfolioSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [mutedCards, setMutedCards] = useState<{ [key: number]: boolean }>({})
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const initialMutedState: { [key: number]: boolean } = {}
    videoProjects.forEach((_, index) => {
      initialMutedState[index] = true
    })
    setMutedCards(initialMutedState)
  }, [])

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (hoveredCard === index) {
          video.currentTime = 0
          video.play().catch(() => {
            // Handle play promise rejection silently
          })
        } else {
          video.pause()
        }
      }
    })
  }, [hoveredCard])

  const toggleCardMute = (cardIndex: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setMutedCards((prev) => ({
      ...prev,
      [cardIndex]: !prev[cardIndex],
    }))

    const video = videoRefs.current[cardIndex]
    if (video) {
      video.muted = !mutedCards[cardIndex]
    }
  }

  const navigateToCard = (direction: "prev" | "next") => {
    if (hoveredCard === null) return

    if (direction === "prev" && hoveredCard > 0) {
      setHoveredCard(hoveredCard - 1)
    } else if (direction === "next" && hoveredCard < videoProjects.length - 1) {
      setHoveredCard(hoveredCard + 1)
    }
  }

  const closeExpandedView = () => {
    setHoveredCard(null)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className={`py-20 px-6 bg-black transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white font-mono">Our Work</h2>
        </div>

        <div className="relative h-[500px] flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl">
            {videoProjects.map((project, index) => (
              <div
                key={`normal-${index}`}
                className={`transition-all duration-500 ${
                  hoveredCard !== null ? "opacity-0 scale-95" : "opacity-100 scale-100 hover:scale-105"
                }`}
                onMouseEnter={() => setHoveredCard(index)}
              >
                <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-white/10 overflow-hidden hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20">
                  <CardContent className="p-0 h-full">
                    <div className="aspect-[9/16] relative h-96">
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        muted
                        loop
                        playsInline
                        poster={project.thumbnail}
                      >
                        <source src={project.videoUrl} type="video/mp4" />
                      </video>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => toggleCardMute(index, e)}
                        className="absolute top-3 left-3 w-8 h-8 bg-black/70 border-white/30 hover:bg-black/90 text-white transition-all duration-300"
                      >
                        {mutedCards[index] ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block bg-green-500 text-white px-2 py-1 rounded text-xs font-bold mb-2">
                          {project.category}
                        </span>
                        <h3 className="text-white text-xl font-bold mb-1">{project.title}</h3>
                        <p className="text-white/80 text-sm">{project.subtitle}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {hoveredCard !== null && (
            <div
              className="absolute inset-0 flex justify-center items-center z-20 animate-in fade-in-0 zoom-in-95 duration-500"
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="w-full max-w-4xl">
                <Card className="bg-black/95 border border-white/20 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex h-96">
                      <div className="w-64 relative">
                        <video
                          ref={(el) => (videoRefs.current[hoveredCard] = el)}
                          className="w-full h-full object-cover aspect-[9/16]"
                          muted={mutedCards[hoveredCard]}
                          loop
                          playsInline
                        >
                          <source src={videoProjects[hoveredCard].videoUrl} type="video/mp4" />
                        </video>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={(e) => toggleCardMute(hoveredCard, e)}
                          className="absolute top-4 left-4 w-10 h-10 bg-black/70 border-white/30 hover:bg-black/90 text-white transition-all duration-300"
                        >
                          {mutedCards[hoveredCard] ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setHoveredCard(null)}
                          className="absolute top-4 right-4 w-10 h-10 bg-black/70 border-white/30 hover:bg-black/90 text-white transition-all duration-300"
                        >
                          ✕
                        </Button>
                        {hoveredCard > 0 && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setHoveredCard(hoveredCard - 1)}
                            className="absolute bottom-4 left-4 w-10 h-10 bg-black/70 border-white/30 hover:bg-black/90 text-white transition-all duration-300"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </Button>
                        )}
                        {hoveredCard < videoProjects.length - 1 && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setHoveredCard(hoveredCard + 1)}
                            className="absolute bottom-4 right-4 w-10 h-10 bg-black/70 border-white/30 hover:bg-black/90 text-white transition-all duration-300"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </Button>
                        )}
                      </div>
                      <div className="w-px bg-white/30 my-6"></div>
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <span className="inline-block bg-green-500 text-white px-3 py-1 rounded text-sm font-bold mb-4">
                            {videoProjects[hoveredCard].category}
                          </span>
                          <h3 className="text-white text-2xl font-bold mb-3">{videoProjects[hoveredCard].title}</h3>
                          <p className="text-white/70 text-base mb-4">{videoProjects[hoveredCard].subtitle}</p>
                          <p className="text-white/80 text-sm leading-relaxed">
                            {videoProjects[hoveredCard].description}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-6">
                          {videoProjects[hoveredCard].tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="bg-white/90 text-black px-3 py-1 rounded-full text-sm border border-white/30"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
