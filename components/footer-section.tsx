"use client"

import { Instagram, Youtube, Mail } from "lucide-react"

export default function FooterSection() {
  return (
    <footer className="py-12 px-6 bg-black">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-12"></div>

      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-8">Lumiere</h2>

        <div className="flex justify-center items-center gap-8 mb-8">
          <a
            href="mailto:hello@lumiere.com"
            className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
          >
            <Mail className="w-5 h-5" />
            <span className="hidden sm:inline">Email</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
            <Instagram className="w-5 h-5" />
            <span className="hidden sm:inline">Instagram</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
            <Youtube className="w-5 h-5" />
            <span className="hidden sm:inline">YouTube</span>
          </a>
        </div>

        <p className="text-gray-400 text-lg">Thank you for visiting</p>
      </div>
    </footer>
  )
}
