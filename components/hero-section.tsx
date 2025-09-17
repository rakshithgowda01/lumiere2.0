"use client"

import { useEffect, useState } from "react"
import VariableProximity from "./ui/variable-proximity"
import TextPressure from "./ui/text-pressure"
import Magnet from "./ui/magnet"

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="text-center z-10 px-6"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        <div style={{ position: "relative", height: "220px" }} className="mb-8">
          <TextPressure
            text={"LUMIÈRE!"}
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#ffffff"
            strokeColor="#ff0000"
            minFontSize={36}
            className=""
          />
        </div>

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
