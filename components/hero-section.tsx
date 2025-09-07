"use client"

import { useEffect, useRef, useState } from "react"
import VariableProximity from "./ui/variable-proximity"
import Magnet from "./ui/magnet"

export default function HeroSection() {
  const particlesRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const createParticle = () => {
      if (!particlesRef.current) return

      const particle = document.createElement("div")
      particle.className = "absolute w-1 h-1 bg-secondary rounded-full particle opacity-30"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.top = Math.random() * 100 + "%"
      particle.style.animationDuration = Math.random() * 3 + 3 + "s"

      particlesRef.current.appendChild(particle)

      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
      }, 6000)
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const interval = setInterval(createParticle, 200)
    window.addEventListener("scroll", handleScroll)

    return () => {
      clearInterval(interval)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-gray-600" />
          <polygon
            points="200,100 400,200 300,400 100,300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-500"
          />
          <polygon
            points="800,150 1000,250 900,450 700,350"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-500"
          />
          <circle
            cx="600"
            cy="200"
            r="80"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-500"
          />
        </svg>
      </div>

      {/* Particle Background */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      <div
        className="text-center z-10 px-6"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        <VariableProximity
          text="LUMIÈRE"
          className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold mb-8 tracking-tight block"
        />

        <h2
          className="text-2xl md:text-3xl lg:text-4xl text-white mb-6 font-light"
          style={{
            transform: `translateY(${scrollY * 0.15}px)`,
          }}
        >
          We turn stories into scroll stopping content
        </h2>

        <p
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        >
          Cinematic video editing, viral Instagram reels, and brand storytelling
          <br />
          that makes your audience stop scrolling
        </p>

        <div
          style={{
            transform: `translateY(${scrollY * 0.05}px)`,
          }}
        >
          <Magnet strength={0.2}>
            <button className="bg-gray-200 hover:bg-white text-black px-8 py-4 rounded-full transition-all duration-300 font-medium text-lg flex items-center space-x-2 mx-auto">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span>Start Your Project</span>
            </button>
          </Magnet>
        </div>
      </div>
    </section>
  )
}
