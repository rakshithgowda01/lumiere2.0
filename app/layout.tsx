import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import LiquidEther from "@/components/ui/liquid-ether"
import FloatingSocialWidget from "@/components/floating-social-widget"
import "./globals.css"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "Lumière - Where Stories Shine Brighter",
  description: "Professional video production and editing services",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfairDisplay.variable}`}>
        <div className="fixed inset-0 pointer-events-none z-0">
          <LiquidEther />
        </div>
        <div className="relative z-10">
          <Suspense fallback={null}>{children}</Suspense>
        </div>
        <FloatingSocialWidget />
        <Analytics />
      </body>
    </html>
  )
}
