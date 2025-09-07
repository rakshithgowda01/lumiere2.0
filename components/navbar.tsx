"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
    { name: "Share", href: "#share" },
  ]

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-6">
      <div
        className={`transition-all duration-300 rounded-full px-8 py-4 ${
          isScrolled ? "bg-black/80 backdrop-blur-sm border border-gray-800" : "bg-black/40 backdrop-blur-sm"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-2xl font-serif font-bold text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1L21.99 10c-.25-2.69-2.61-5-5.33-5.28L15 2H9L7.34 4.72C4.62 5 2.26 7.31 2.01 10L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97L2.01 14c.25 2.69 2.61 5 5.33 5.28L9 22h6l1.66-2.72c2.72-.28 5.08-2.59 5.33-5.28L19.43 13.47z" />
            </svg>
            <span>Lumière</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            <button className="bg-gray-200 text-black px-6 py-2 rounded-full hover:bg-white transition-colors duration-200 font-medium">
              Schedule Call
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
