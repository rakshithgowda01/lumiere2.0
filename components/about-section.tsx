"use client"

import { useEffect, useRef, useState } from "react"
import ScrollFloat from "./ui/scroll-float"

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className={`transition-all duration-1000 ${isVisible ? "fade-in-up" : "opacity-0"}`}>
          <ScrollFloat intensity={0.3}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-mono">About Lumière</h2>
          </ScrollFloat>
          <ScrollFloat intensity={0.2}>
            <p className="text-lg text-secondary leading-relaxed mb-8">
              We are a creative video production company dedicated to bringing your stories to life. With years of
              experience in video editing, content creation, and digital marketing, we transform ideas into compelling
              visual narratives that captivate audiences.
            </p>
          </ScrollFloat>
          <ScrollFloat intensity={0.1}>
            <p className="text-lg text-secondary leading-relaxed">
              From concept to completion, we handle every aspect of video production with meticulous attention to detail
              and a passion for storytelling excellence.
            </p>
          </ScrollFloat>
        </div>
      </div>
    </section>
  )
}
