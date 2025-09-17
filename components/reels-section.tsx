"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Heart, MessageCircle, User, Volume2, VolumeX } from "lucide-react"

interface ReelData {
  id: string
  videoUrl: string
  thumbnail: string
  title: string
  creator: string
  likes: number
  comments: number
  description: string
  tags: string[]
}

interface ReelCardProps {
  reel: ReelData
  isExpanded: boolean
  onHover: () => void
  onLeave: () => void
  isMobile: boolean
}

const ReelCard: React.FC<ReelCardProps> = ({ reel, isExpanded, onHover, onLeave, isMobile }) => {
  const [isMuted, setIsMuted] = React.useState(true)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  React.useEffect(() => {
    if (!videoRef.current) return
    const el = videoRef.current
    // Try to autoplay whenever available
    const tryPlay = () => el.play().catch(() => {})
    el.muted = isMuted
    el.addEventListener('loadedmetadata', tryPlay, { once: true })
    tryPlay()
    if (isExpanded) {
      tryPlay()
    }
    return () => {
      el.pause()
      el.removeEventListener('loadedmetadata', tryPlay as any)
    }
  }, [isExpanded])

  return (
    <motion.div
      className="relative bg-black border border-gray-800 rounded-xl overflow-hidden cursor-pointer group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={isMobile ? (isExpanded ? onLeave : onHover) : undefined}
      layout
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ width: isMobile ? "90vw" : (isExpanded ? "600px" : "200px"), height: "350px" }}
    >
      <div className="flex h-full">
        <AnimatePresence mode="wait">
          {isMobile && isExpanded ? (
            <motion.div
              key="info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full p-6 flex flex-col justify-between bg-black"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{reel.creator}</h3>
                    <p className="text-sm text-gray-400">Creator</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white mb-2">{reel.title}</h2>
                  <p className="text-sm text-gray-300 leading-relaxed">{reel.description}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {reel.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1"><Heart className="w-4 h-4" />{reel.likes.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" />{reel.comments.toLocaleString()}</span>
                </div>
                <button className="px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Watch Now</button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative flex-shrink-0 bg-gray-900"
              style={{ width: isMobile ? "100%" : "200px" }}
              layout
            >
              <video ref={videoRef} src={reel.videoUrl} poster={reel.thumbnail} className="w-full h-full object-cover" loop muted={isMuted} playsInline preload="auto" autoPlay />
              <button
                onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted) }}
                className="absolute top-4 left-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isExpanded && !isMobile && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="w-px bg-gray-700 mx-4 my-6"
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isExpanded && !isMobile && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex-1 p-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center"><User className="w-5 h-5 text-gray-400" /></div>
                  <div>
                    <h3 className="font-semibold text-white">{reel.creator}</h3>
                    <p className="text-sm text-gray-400">Creator</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white mb-2">{reel.title}</h2>
                  <p className="text-sm text-gray-300 leading-relaxed">{reel.description}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {reel.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1"><Heart className="w-4 h-4" />{reel.likes.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" />{reel.comments.toLocaleString()}</span>
                </div>
                <button className="px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Watch Now</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

const ReelsSection: React.FC = () => {
  const [expandedReel, setExpandedReel] = React.useState<string | null>(null)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const reelsData: ReelData[] = [
    {
      id: "1",
      videoUrl: "/video-1.mp4",
      thumbnail: "/thumbnail-1.jpg",
      title: "KOREAN CLOTHING BRAND",
      creator: "Noil Arthur",
      likes: 1200,
      comments: 45,
      description: "Fusing K-style flair with urban Bangalore vibes, this promo reel shows how branding comes to life.",
      tags: ["brand", "fashion", "promo"],
    },
    {
      id: "2",
      videoUrl: "/video-2.mp4",
      thumbnail: "/thumbnail-2.jpg",
      title: "Wholegrain Goodness",
      creator: "Team Lumiere",
      likes: 980,
      comments: 30,
      description: "They asked for something real. We delivered Don-style wholegrain goodness.",
      tags: ["food", "brand", "real"],
    },
    {
      id: "3",
      videoUrl: "/video-3.mp4",
      thumbnail: "/thumbnail-3.jpg",
      title: "Identity In Motion",
      creator: "Team Lumiere",
      likes: 1430,
      comments: 62,
      description: "Every frame tells a story — that’s how we shape brand identity in motion.",
      tags: ["identity", "motion", "brand"],
    },
  ]

  return (
    <section id="portfolio" className="min-h-screen py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Reels</h1>
          <p className="text-base md:text-lg text-gray-400">Discover amazing content from our creators</p>
        </div>
        <div className={cn("flex justify-center items-center gap-4 md:gap-8", isMobile ? "flex-col" : "flex-row flex-wrap")}> 
          {reelsData.map((reel) => (
            <ReelCard key={reel.id} reel={reel} isExpanded={expandedReel === reel.id} onHover={() => setExpandedReel(reel.id)} onLeave={() => setExpandedReel(null)} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReelsSection



