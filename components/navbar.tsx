"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu as MenuIcon, Home, Briefcase, Phone } from "lucide-react"
import { MenuContainer, MenuItem } from "@/components/ui/fluid-menu"
import { MenuVertical } from "@/components/ui/menu-vertical"
import { ScheduleCalendar } from "@/components/ui/schedule-calendar"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "#contact" },
    { name: "Share", href: "#share" },
  ]

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <div
        className={`relative transition-all duration-300 rounded-full px-6 py-2 overflow-hidden ${
          isScrolled ? "bg-black/80 backdrop-blur-sm border border-gray-800" : "bg-black/40 backdrop-blur-sm"
        }`}
      >
        {/* Torch effect */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(120px 120px at ${mousePos.x}px ${mousePos.y - 16}px, rgba(255,255,255,0.08), transparent 60%)`,
          }}
        />

        <div className="relative flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-xl font-serif font-bold text-white">
            <Image src="/image.png" alt="Lumière" width={28} height={28} className="w-7 h-7 object-contain" />
            <span>Lumière</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="text-gray-300 hover:text-white transition-colors duration-200">
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <a
              href={process.env.NEXT_PUBLIC_CAL_URL || "https://cal.com/your-username/15min"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200 text-black px-4 py-1.5 rounded-full hover:bg-white transition-colors duration-200 font-medium text-sm"
            >
              Schedule Call
            </a>
          </div>

          <div className="md:hidden">
            <MenuContainer>
              <MenuItem icon={<MenuIcon className="w-5 h-5 text-white" />} />
              <MenuItem icon={<Home className="w-5 h-5 text-white" />} onClick={() => (window.location.href = "/")} />
              <MenuItem icon={<Briefcase className="w-5 h-5 text-white" />} onClick={() => (window.location.href = "/portfolio")} />
              <MenuItem icon={<Phone className="w-5 h-5 text-white" />} onClick={() => (window.location.hash = "contact")} />
            </MenuContainer>
          </div>
        </div>
      </div>
    </nav>
  )
}
