"use client"

import { useState } from "react"
import Image from "next/image"
import { MessageCircle, Instagram, Mail, MessageSquare, X } from "lucide-react"

export default function FloatingSocialWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const brandLogoSrc = "/image.png"

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://instagram.com/lumiere",
      label: "Instagram",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Mail,
      href: "mailto:hello@lumiere.com",
      label: "Email",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: MessageSquare,
      href: "https://wa.me/1234567890",
      label: "WhatsApp",
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Social Icons */}
      <div
        className={`flex flex-col gap-3 mb-4 transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {socialLinks.map((social, index) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative w-12 h-12 rounded-full bg-gradient-to-r ${social.color} 
              flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300
              hover:scale-110 animate-fade-in-up`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Glow effect */}
            <div
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${social.color} 
              opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300`}
            />

            <social.icon className="w-5 h-5 text-white relative z-10" />

            {/* Tooltip */}
            <div
              className="absolute right-full mr-3 px-3 py-2 bg-black text-white text-xs 
              rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap
              shadow-lg border border-gray-700"
            >
              {social.label}
            </div>
          </a>
        ))}
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full 
          flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300
          hover:scale-105 border border-gray-700 group relative overflow-hidden"
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Button content */}
        <div className="relative z-10 transition-transform duration-300">
          {isOpen ? (
            <X className="w-6 h-6 text-gray-300 group-hover:text-white" />
          ) : (
            <Image src={brandLogoSrc} alt="Brand" width={32} height={32} className="w-8 h-8 object-contain" />
          )}
        </div>

        {/* Pulse animation when closed */}
        {!isOpen && (
          <div
            className="absolute inset-0 rounded-full border-2 border-blue-500/30 
            animate-ping opacity-75"
          />
        )}
      </button>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
