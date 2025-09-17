import type React from "react"
import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
const BackgroundClient = dynamic(() => import("@/components/ui/background"), { ssr: false })
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
        <div className="fixed inset-0 z-0">
          <BackgroundClient />
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
